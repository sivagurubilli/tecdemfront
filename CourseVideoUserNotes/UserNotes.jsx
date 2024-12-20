import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Flex,
  Button,
  Box,
  Textarea,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Style from "./UserNotes.module.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { decrypt } from "../../middleware/auth";
import { post } from "../../middleware/api";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";
import { getID } from "../../siteConfig";
import { TimestampConvertor, toastError } from "../../util_helper";
import { AddToTrash } from "../../util_helper";
import { useParams } from "react-router-dom";
import messageService from "../MessageService/Index";
import { BOLoading, TecButton } from "../elements/elements";


export default function UserNotes({ ...props }) {
  const { VideoTimestamp, title, section, videoPause, handleScrollToWidget } = props;

  const { minute, second } = TimestampConvertor(VideoTimestamp);
  // console.log(minute, second)
  // console.log("props>>", props);

  const { courseId } = useParams();
  const userId = getID("userId") || "";
  const [AllNotes, setAllNotes] = useState([]);
  const [EditableNoteData, setEditableNoteData] = useState({});
  const [isEditableNote, setIsEditableNote] = useState(false);
  const [deletableCommentUUID, setDeletableCommentUUID] = useState("");
  const [NotesDataForAddtoTrash, setNotesDataForAddtoTrash] = useState({});
  // const [userId, setUserId] = useState()
  const [note, setNote] = useState({
    note: "",
  });

  const [isOpenAlert, setIsOpenAlert] = React.useState();
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();
  const [loading, setLoading] = useState("")

  // Refresh Notes component when notes is restored.
  useEffect(() => {
    try {
      messageService.onMessage().subscribe((m) => {
        if (m.senderId === "recycleBin" && m.target === "restoreData") {
          if (!!courseId) {
            ReadAllNotes(userId);
          }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }, [courseId])

  const CreateNote = () => {
    try {
      let time = "00:00";
      const timeElement = document.getElementById("currentTimeNotes");
      if (timeElement) {
        time = timeElement.textContent;
      }
      if (note.note.length <= 0) {
        toastError('Notes should not be empty!')
      } else {
        setLoading('create')
        post(endpoints.createUserNotes, {
          user_id: userId,
          course_id: courseId,
          section_name: section,
          video_title: title,
          note: note.note,
          timestamp: time,
        }).then((res) => {
          setLoading('')
          if (res?.status === 200) {
            ReadAllNotes(userId);
            setNote({ ...note, note: "" });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ReadAllNotes = (userId) => {
    try {
      post(endpoints?.getUserNotes, {
        user_id: userId,
        course_id: courseId,
      }).then((res) => {
        if (res?.status === 200) {
          setAllNotes(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateNotes = () => {
    try {
      if (EditableNoteData.note.length <= 0) {
        toastError('Notes should not be empty!')
      } else {
        setLoading('update')
        post(endpoints.updateUserNotes, EditableNoteData).then((res) => {
          setLoading('')

          if (res?.status === 200) {
            ReadAllNotes(userId);
            setIsEditableNote(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteNotes = () => {
    try {
      setLoading('del')

      post(endpoints.deleteUserNotes, {
        uuid: deletableCommentUUID,
      }).then((res) => {
        setLoading('')

        if (res?.status === 200) {
          onCloseAlert();
          AddToTrash(
            NotesDataForAddtoTrash.uuid,
            "notes",
            `${NotesDataForAddtoTrash?.note}~${JSON.stringify(
              NotesDataForAddtoTrash
            )}`,
            NotesDataForAddtoTrash?.course_id
          );
          handleScrollToWidget();
          ReadAllNotes(userId);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCreateNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const HandleDeletePress = (uuid, DataForTrash) => {
    setIsOpenAlert(true);
    setDeletableCommentUUID(uuid);
    setNotesDataForAddtoTrash(DataForTrash);
  };

  const handleEditComment = (e) => {
    setEditableNoteData({
      ...EditableNoteData,
      [e.target.name]: e.target.value,
    });
  };
  const HandleEditButton = (editableData) => {
    setIsEditableNote(true);
    setEditableNoteData(editableData);
  };

  const handleFocusNotesEditField = () => {
    try {
      messageService.sendMessage("userNotes", {}, "videoPlayer");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userDetail = JSON.parse(decrypt(localStorage.getItem("userData")));
    ReadAllNotes(userDetail.id);
  }, []);

  return (
    <>
      <Box
        width="100%"
        height="auto"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Box width="95%" height="auto" d="flex" flexDir="column">
          {/* { */}
          {/* (videoPause===true)? */}
          <Text
            // width="45px"
            bg="#8A0EE5"
            color="white"
            fontSize="14px"
            padding="3px 8px"
            borderRadius="0px"
            id="currentTimeNotes"
            display={"inline-block"}
          >
            00:00
          </Text>
          {/* :"" */}
          {/* } */}
          <Textarea
            className={Style?.textarea}
            placeholder="Type your notes here..."
            name="note"
            focusBorderColor="black"
            width="100%"
            height="100px"
            border="1px solid black"
            mt="2px"
            borderRadius="0px"
            resize="none"
            value={note.note}
            onChange={HandleCreateNote}
            onFocus={handleFocusNotesEditField}
          ></Textarea>
          <TecButton
            className={`tecPrimaryButton ${Style?.saveNoteButton} marginTop-1`}
            onClick={CreateNote}
          >
            Save Note {loading === 'create' && <BOLoading />}
          </TecButton>

        </Box>

        <Box w="100%" h="500px" display="flex" flexDir="column" alignItems="center" mt="5px">
          {
            (AllNotes) ?
              AllNotes.map((item) => {
                return (
                  <>
                    <Box width="95%" height="auto" mt="10px">
                      <Text display={"inline"} bg="#8A0EE5" color="white" fontSize="14px" padding="3px 6px" borderRadius="0px">{item.timestamp}</Text>
                      <Box display="flex" w="100%" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <Text fontWeight="bold">{item.section_name}</Text>
                          <Text fontSize="14px" pl="5px">{item.video_title}</Text>
                        </Box>
                        <Box display="flex" justifyContent="space-between" w="60px">
                          <MdModeEditOutline size="20" color="gray" cursor="pointer" onClick={() => HandleEditButton(item)} />
                          <MdDelete size="20" color="gray" cursor="pointer" onClick={() => HandleDeletePress(item.uuid, item)} />
                        </Box>
                      </Box>
                      <Box width="100%" height="auto" bg="#f2f2f5" mt="2px" borderRadius="0px">
                        {
                          (isEditableNote === true) && (EditableNoteData.id == item.id) ?
                            <>
                              <Textarea className={Style?.textarea} Placeholder="Type Your Notes Here!" name='note' focusBorderColor="black" width="100%" height="auto" borderBottom="2px solid black" mt="2px" borderRadius="0px" resize="none" value={EditableNoteData.note} onChange={handleEditComment}>{EditableNoteData.note}</Textarea>

                              <Box display="flex" justifyContent="end" mt="5px" >
                                <TecButton
                                  title="Cancel"
                                  className={`tecSecondaryButton marginRight-2t`}
                                  onClick={() => setIsEditableNote(false)}
                                  small
                                />
                                <TecButton
                                  // title="Update"
                                  className={`tecPrimaryButton marginLeft-1`}
                                  onClick={UpdateNotes}
                                  small
                                >
                                  Update {loading === 'update' && <BOLoading />}
                                </TecButton>
                                {/* <Button color="black" borderRadius="0px" size="sm" onClick={() => setIsEditableNote(false)}>Cancel</Button> */}
                                {/* <Button className={Style?.buttonHover} bg="#8A0EE5" color="white" borderRadius="0px" size="sm" onClick={UpdateNotes}>Save</Button> */}
                              </Box>
                            </>
                            :
                            <Text padding="15px" textAlign="justify">{item.note}</Text>
                        }
                      </Box>
                    </Box>
                  </>
                )
              }) : "No Notes !"
          }
        </Box>
      </Box>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay variantColor="yellow" />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Note
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure want to delete?</AlertDialogBody>

          <AlertDialogFooter>
            <TecButton
              title="Cancel"
              className={`tecSecondaryButton marginRight-2`}
              onClick={onCloseAlert}

            />
            <TecButton
              // title="Delete"
              className={`tecPrimaryButton`}
              onClick={DeleteNotes}

            >
              Delete {loading === "del" && <BOLoading />}
            </TecButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
