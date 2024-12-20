import React from 'react'
import {
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { BOLoading, TecButton } from "./elements/elements";
import CommentStyles from "./Comment.module.css"
import { post } from "../middleware/api";
import { toast } from "react-toastify";
import endpoints from "../middleware/endpoint";
import { FiSend } from "react-icons/fi";
import { decrypt, getUserData } from '../middleware/auth'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AddToTrash, createNotifications, toastError } from '../util_helper';
import { MdOutlineOutlinedFlag } from "react-icons/md";
import Style from "./Comment.module.css"


import moment from 'moment';
import { useParams } from 'react-router-dom';
import { placeHolderImage } from './Config';
import { getID } from '../siteConfig';

export default function CourseDetailReply({ ...props }) {
  const comment_id = props?.commentId?.comment_id
  // const CommentUserFirstName= props?.commentId?.CommentUserFirstName
  // const CommentUserLastName= props?.commentId?.CommentUserLastName
  const course_id = props?.courseId
  const replies = props?.replies;

  const { handleDeleteReply, cId } = props;
  const { ReadComments } = props

  const scrollTop = () => {
    try {
      window.scrollTo(0, 0);

    } catch (error) {
      console.error(error);
    }

  }
  const { courseId } = useParams
  // const [FirstName, setFirstName] = useState()
  // const [LastName , setLastName] = useState()
  const [userName, setUserName] = useState()
  const [userId, setUserId] = useState()
  const [showBox, setshowBox] = useState(false)
  const [loading, setLoading] = useState(false);
  // const [replyLoading, setReplyLoading] = useState(false);
  const [RORLoading, setRORLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  // const [reply, setReply] = useState({
  //   comment_id:comment_id, reply_comment: ""
  // })
  const [replyOfReply, setReplyOfReply] = useState({
    reply_comment: ""
  })

  const [clickedReplyId, setClickedReplyId] = useState("")
  const [reportReason, setReportReason] = useState("")
  const [reportIssue, setReportIssue] = useState("")
  const [allReplies, setAllReplies] = useState([])
  const [isEditableComment, setIsEditableComment] = useState(false)
  const [loadingReplyLike, setLoadingReplyLike] = useState(false)
  const [loadingReplyDislike, setLoadingReplyDislike] = useState(false)
  const [editableData, setEditableData] = useState({})
  const [deletableReplyUUID, setDeletableReplyUUID] = useState("")
  const [ReplyDataForAddtoTrash, setReplyDataForAddtoTrash] = useState({})


  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isOpenAlert, setIsOpenAlert] = React.useState();
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();


  // const handleReplyChange = (e) => {
  //   setReply({ ...reply, [e.target.name]: e.target.value })
  // }

  const handleReplyOfReplyChange = (e) => {
    setReplyOfReply({ ...replyOfReply, [e.target.name]: e.target.value })
  }


  // All Functions for the Comment Features.

  // const PostReply = () => {
  //   try {
  //     setReplyLoading(true)
  //     if (reply.reply_comment.length < 1) {
  //       toast.error("Kindly fill the proper field")
  //       setReplyLoading(false)
  //     } else {
  //       post(endpoints.createReplies, reply)
  //         .then((res) => {
  //           setReplyLoading(false)
  //           setReply({...reply, reply_comment:""})
  //           ReadReplies()
  //         }).catch((error) => {
  //           toast.error('Failed to post reply')
  //         });      
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const PostReplyOfReply = () => {
    try {
      const userDetails = getUserData()?.userdata;
      setRORLoading(true)
      if (replyOfReply.reply_comment.length < 1) {
        toastError("Comment is field is required!")
        setRORLoading(false)
      } else {
        post(endpoints.createReplies, replyOfReply)
          .then((res) => {
            setRORLoading(false)
            setReplyOfReply({ ...replyOfReply, reply_comment: "" })
            // ReadReplies()
            setshowBox(false)
            ReadComments()
            if (replyOfReply?.commented_user_id !== getID('userId'))
              createNotifications(
                replyOfReply?.commented_user_id,
                `${userDetails?.first_name || ""} ${userDetails?.last_name || ""} is replied on your comment`,
                null,
                'Go to course',
                '', 'update');
          }).catch((error) => {
            toast.error('Failed to post reply', {
              pauseOnHover: false
            })
          });
      }

    } catch (err) {
      console.log(err)
    }
  }

  const ReadReplies = () => {
    try {
      // setLoading(true)
      // post(endpoints.getReplies,{
      //   comment_id:comment_id
      // }).then((res) => {
      //   setLoading(false)
      //   const data = res.data
      //   setAllReplies(data)
      //   console.log(allReplies)
      // })
    } catch (error) {
      console.log(error)
    }
  }

  const LoadReplyWithoutLoading = () => {
    try {
      post(endpoints.getReplies, {
        comment_id: comment_id
      }).then((res) => {
        const data = res.data
        setAllReplies(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteReply = (deletableCommentUUID, cId) => {
    handleDeleteReply(deletableCommentUUID, cId)
    AddToTrash(ReplyDataForAddtoTrash.uuid, 'comments', `${ReplyDataForAddtoTrash?.reply_comment}~${JSON.stringify(ReplyDataForAddtoTrash)}`, courseId);
    onCloseAlert()
    scrollTop();
  }



  const handleDeletePress = (uuid, trashData) => {
    setDeletableReplyUUID(uuid)
    setIsOpenAlert(true)
    setReplyDataForAddtoTrash(trashData)
    console.log(trashData)
  }

  const HandleEditButton = (editedData) => {
    setIsEditableComment(true)
    setEditableData(editedData)
  }

  const handleEditComment = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value })
  }

  const EditReplyInDatabase = () => {
    try {
      if (editableData.reply_comment.length < 1) {
        toast.error("Kindly fill the proper field", {
          pauseOnHover: false
        })
        setLoading(false)
      } else {
        setIsEditableComment(false)
        post(endpoints.updateReplies, editableData)
          .then((res) => {
            // ReadReplies()
            setshowBox(false)
            ReadComments()
          }).catch((error) => {
            toast.error('Failed to edit comment', {
              pauseOnHover: false
            })
          });
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleLike = (uuid, likes, user_id, dislikes) => {
    setClickedReplyId(uuid);
    setLoadingReplyLike(true)
    try {
      post(endpoints.updateReplyLikes, {
        data: {
          uuid: uuid,
          reply_id: uuid,
          user_id: user_id,
          likes: likes,
          dislikes: dislikes
        }
      }).then((res) => {
        if (res?.status == 200) {
          // LoadReplyWithoutLoading()
          ReadComments()
          setLoadingReplyLike(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  };


  const handleDislike = (uuid, likes, user_id, dislikes) => {
    setClickedReplyId(uuid);
    setLoadingReplyDislike(true)
    try {
      post(endpoints.updateReplyDislikes, {
        data: {
          uuid: uuid,
          reply_id: uuid,
          user_id: user_id,
          likes: likes,
          dislikes: dislikes,
        }
      }).then((res) => {
        if (res?.status == 200) {
          // LoadReplyWithoutLoading()
          ReadComments()
          setLoadingReplyDislike(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  };

  // const handlePressEnter=(e)=>{
  //   if(e.keyCode==13){
  //     setReply({...reply, reply_comment:""})
  //     PostReply()
  //   }
  // }
  const handlePressEnter2 = (e) => {
    if (e.keyCode == 13) {
      setReplyOfReply({ ...replyOfReply, reply_comment: "" })
      PostReplyOfReply()
    }
  }

  const submitReport = () => {
    try {
      if (reportIssue === "" || reportReason === "") {
        toast.error("All fields are required!", {
          pauseOnHover: false
        })
      } else {
        post(endpoints.commentReport, {
          user_id: userId, comment_id: clickedReplyId, reportReason: reportReason, issue: reportIssue
        }).then((res) => {
          toast.success("Reported Successfully", {
            pauseOnHover: false
          })
          onClose()
          setReportIssue("")
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const HandleReplyReport = (user_id, comment_id) => {
    setClickedReplyId(comment_id)
    setUserId(user_id)
    onOpen()
    // console.log(userId, comment_id)
  }



  const handleShowBox = (id, uuid, first_name, last_name, data) => {
    setshowBox(prev => !prev);
    // setReplyOfReply({ ...replyOfReply, comment_id: comment_id })
    setClickedReplyId(id);
    setUserName(first_name + last_name)
    setReplyOfReply({ ...replyOfReply, reply_comment: "@" + first_name + last_name + ' ', comment_id: comment_id, commented_user_id: data?.user_id })
  }

  useEffect(() => {
    const userDetail = JSON.parse(decrypt(localStorage.getItem('userData')));
    setUserDetails(userDetail)
    //  setReply({...reply, user_id:userDetail.id})
    setReplyOfReply({ ...replyOfReply, user_id: userDetail.id })
    //  fetchCourseList()
  }, [])

  // useEffect(() => {
  //   if (comment_id != "" || comment_id != "null" || comment_id != "undefined")
  //     ReadReplies()
  // }, [comment_id])


  const handleKeyPress = (e) => {
    try {
      if (e.keyCode == 13) {
        EditReplyInDatabase()
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
      <Flex width="100%">
        <Box width="100%" height="" overflowX="auto">
          {/* ****************************Comments Replies Here***************************** */}
          {

            (replies) ?
              replies.map((data, index) => {
                const formattedDate = moment(data.createdAt || moment.now()).fromNow()
                return (
                  <>
                    <Box height="auto" marginTop="10px" mb="10px" width="100%" display="flex" flexDir="column" key={index}>
                      <Box display="flex" marginTop="5px">
                        <img className={CommentStyles?.textSelectedStop} src={
                          // data.userDetails.profile_url ? data.userDetails.profile_url || "" : 
                          placeHolderImage} style={{ marginRight: "7px", width: "30px", height: "30px", borderRadius: "50%" }} alt='' />
                        {/* <img src="https://as2.ftcdn.net/v2/jpg/02/74/05/81/1000_F_274058177_sKpnAT94o2Gal205KRwbsgVtjmu8wPpe.jpg" style={{ marginRight: "7px", width: "30px", height: "30px", borderRadius:"50%"}} alt=''/> */}
                        <Box w="100%" h="auto" background="#f2f2f5" borderRadius="0px 7px 7px 7px" padding="3px">
                          <Flex justifyContent="space-between">
                            <Text className={CommentStyles?.textSelectedStop} color="black" fontWeight="bold" fontSize="14px" width="90%" paddingLeft="7px">{!data.userDetails?.first_name ? "User" : data.userDetails?.first_name + " " + data.userDetails?.last_name}<span className={CommentStyles?.textSelectedStop} style={{ fontSize: "12px", fontWeight: "lighter" }}>&nbsp;&nbsp;{formattedDate}</span></Text>

                            {/* Dropdown */}
                            <div className={CommentStyles?.dropdown}>
                              <button className={CommentStyles?.dropbtn}><BsThreeDotsVertical cursor="pointer" /></button>
                              <div className={CommentStyles?.dropdownContent}>
                                {
                                  (userDetails.id == data.user_id) ?
                                    <>
                                      <a onClick={() => HandleEditButton(replies[index])}>Edit</a>
                                      {/* <a onClick={() => handleDeleteReply(data.uuid, cId)}>Delete</a> */}
                                      <a onClick={() => handleDeletePress(data.uuid, data)}>Delete</a>

                                    </>
                                    :
                                    ""
                                }
                                {
                                  (userDetails.id != data.user_id) ?
                                    <a onClick={() => HandleReplyReport(userDetails.id, data.uuid)}><Flex alignItems="center" justifyContent={"space-evenly"}><MdOutlineOutlinedFlag />Report</Flex></a>
                                    :
                                    ""
                                }
                              </div>
                            </div>

                          </Flex>

                          {
                            (isEditableComment === true) && (editableData.id == data.id) ?
                              <Flex mt="2px" flexDir="column">
                                <input className={CommentStyles?.EditInputField} onKeyUp={handleKeyPress} type="text" height="25px" fontSize="14px" name="reply_comment" value={editableData.reply_comment} onChange={handleEditComment}></input>
                                <Flex justifyContent="end" mt="2px">
                                  <TecButton
                                    title="Cancel"
                                    className="tecSecondaryButton"
                                    onClick={() => setIsEditableComment(false)}
                                    small
                                  />
                                  <TecButton
                                    title="Save"
                                    onClick={EditReplyInDatabase}

                                    className="tecPrimaryButton marginLeft-2"
                                    small
                                  />
                                </Flex>
                              </Flex>
                              :
                              <Flex flexWrap="wrap" justifyContent="space-between">
                                <Text color="black" fontSize="14px" mt="2px" paddingLeft="7px">{data?.reply_comment}</Text>
                              </Flex>
                          }
                        </Box>
                      </Box>
                      {(isEditableComment === true) && (editableData.id == data.id) ? "" :
                        <Flex color="black" fontSize="14px" fontWeight="bold" cursor="pointer" width="50%" alignItems="center" marginLeft="42px">
                          {/* <span style={{ color:"black"}} id={data.uuid} onClick={()=>handleLike(data.uuid, data.likes)}>Like</span> */}
                          <span className='paddingLeftRight-1'><AiFillLike size="15" style={data.uuid == clickedReplyId && loadingReplyLike ? { color: "black" } : { color: "lightgray" }} id={data.uuid} onClick={() => !loadingReplyLike && handleLike(data.uuid, data.likes, userDetails.id, data.dislikes)} /></span>
                          {(data.likes === 0) ? "" : <span className={CommentStyles?.textSelectedStop} style={{ paddingRight: "8px", fontWeight: "lighter" }}> {data.likes} </span>}
                          <span className='paddingLeftRight-1'><AiFillDislike size="15" style={data.uuid == clickedReplyId && loadingReplyDislike ? { color: "black" } : { color: "lightgray" }} id={data.uuid} onClick={() => !loadingReplyDislike && handleDislike(data.uuid, data.likes, userDetails.id, data.dislikes)} /></span>
                          {(data.dislikes === 0) ? "" : <span className={CommentStyles?.textSelectedStop} style={{ fontWeight: "lighter" }}> {data.dislikes}</span>}
                          <span className={CommentStyles?.textSelectedStop} style={{ paddingLeft: "10px", color: "#8A0EE5", fontWeight: "lighter" }} onClick={() => handleShowBox(data.id, data.uuid, data.userDetails?.first_name, data.userDetails?.last_name, data)}>Reply </span>
                        </Flex>
                      }

                      {/* *******************Replies of Reply Box******************************* */}


                      {/* ***********************Input Box for Replies of Reply************************* */}

                      {
                        showBox && data.id === clickedReplyId &&
                        (<Box width="99%" height="auto" id={data.id}>
                          <InputGroup width="100%">
                            <Input
                              marginTop="15px"
                              placeholder="Please enter your reply!"
                              name="reply_comment"
                              value={replyOfReply.reply_comment}
                              onChange={handleReplyOfReplyChange}
                              onKeyUp={handlePressEnter2}
                              style={{ height: "30px", marginLeft: "1px", fontSize: "14px" }}
                            ></Input>
                          </InputGroup>
                          <Flex mt="2px" justifyContent="end">
                            <TecButton
                              title="Cancel"
                              className="tecSecondaryButton marginRight-1"
                              onClick={() => {
                                setClickedReplyId("")
                                setshowBox(prev => !prev);
                              }}
                              small
                            >
                              Reply {RORLoading && <BOLoading style={{}} />}
                            </TecButton>
                            <TecButton
                              title="Reply"
                              className="tecPrimaryButton"
                              onClick={PostReplyOfReply}
                              small
                            >
                              Reply {RORLoading && <BOLoading style={{}} />}
                            </TecButton>

                          </Flex>
                        </Box>)
                      }

                    </Box>
                  </>
                )
              })
              :
              "Loading..."
          }
          {/* {
            (replies?.length === 0) ?
              <Text>No Replies Yet!</Text>
              :
              ""

          } */}
          {/* Report Modal */}
          <Modal isOpen={isOpen} onClose={onClose} style={{ boxShadow: "white" }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#8A0EE5">Report</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text textAlign="justify">
                  Reported content will be reviewed by Tecdemy staff to verify whether it violates Terms of Service or Community Guidelines. If you have any question or technical issue, please contact to our Support team.
                </Text>
                <Text fontWeight="bold" pt="5px">
                  Report Reason
                </Text>
                <select
                  name="reportReason"
                  style={{ width: "100%", padding: "10px 5px", border: "1px solid black", outline: "none", marginTop: "5px" }}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="">Select Issue</option>
                  <option>Inappropriate Comment</option>
                  <option>Inappropriate Behavior</option>
                  <option>Spam Content</option>
                  <option>Abusive Content</option>
                  <option>Other</option>
                </select>

                <Text fontWeight="bold" pt="5px">
                  Issue
                </Text>
                <Input
                  name="issue"
                  style={{ width: "100%", padding: "15px 8px", border: "1px solid black", outline: "none", marginTop: "5px", borderRadius: "0px" }}
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                >
                </Input>
              </ModalBody>

              <ModalFooter>
                <TecButton
                  title="Cancel"
                  className="tecSecondaryButton marginRight-1"
                  onClick={onClose}
                />
                <TecButton
                  title="Submit"
                  className="tecPrimaryButton"
                  onClick={submitReport}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Delete Confirmation Box */}
          <AlertDialog
            isOpen={isOpenAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseAlert}
          >
            <AlertDialogOverlay variantColor="yellow" />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Comment
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure want to delete?
              </AlertDialogBody>

              <AlertDialogFooter>
                <TecButton
                  title="Cancel"
                  className="tecSecondaryButton marginRight-1"
                  onClick={onCloseAlert}
                />
                <TecButton
                  title="Delete"
                  className="tecPrimaryButton"
                  onClick={() => DeleteReply(deletableReplyUUID, cId)}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>


      </Flex>
    </>
  )
}