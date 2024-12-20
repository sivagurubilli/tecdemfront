import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { getUserData } from "../middleware/auth";
import useStore from '../store';
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Button,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  VStack,
  Drawer,
  Radio,
  RadioGroup,
  DrawerOverlay,
  Divider,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import {
  MdModeEditOutline,
  MdDelete,
  MdThumbUp,
  MdThumbUpOffAlt,
  MdThumbDown,
  MdThumbDownOffAlt,
  MdReport,
  MdMoreVert,
  MdTranscribe,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { useDisclosure } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Ava1 from "../img/Avatar1.svg";
import { formatDistanceToNow } from "date-fns";
import { CART_ICON, placeHolderImage } from "./Config";
import styles from "./MbotCard.module.css"
import messageService from "./MessageService/Index";
import { BOLoading, TecButton } from "./elements/elements";
import CommentTab from "./CommentTab";
import NoDataFound from "./NoDataFound/NoDataFound";

const MbotCard = ({selectedCourse,selectedYouTube,selectedCourseLoading}) => {
  const { transcription } = useStore();
  const { youtubeUrl } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [reportIndex, setReportIndex] = useState(null);
  const [reportText, setReportText] = useState("");
  const [reportReason, setReportReason] = useState("Irrelevant");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeSection, setActiveSection] = useState("Top Comments");
  const [popoverInput, setPopoverInput] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false);




  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();












  const toggleModal = (content) => {
    setShowModal(!showModal);
    setModalContent(content);
  };


  const handleReportSubmit = () => {
    if (reportText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === reportIndex) {
          return {
            ...comment,
            reports: [
              ...comment.reports,
              { text: reportText, reason: reportReason },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReportIndex(null);
      setReportText("");
      setReportReason("Irrelevant");
      toggleModal("Report submitted successfully!");
    }
  };


  // useEffect(() => {
  //   if (!selectedCourse?.id && !selectedYouTube) {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false); // Stop loading after 5 seconds
  //       setHasError(true); // Show error after the loading time
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [selectedCourse, selectedYouTube]);

  // if (!selectedCourse?.id && !selectedYouTube) {
  //   return (
  //     <Box className={`${styles?.rightPanelVideoWrapper} padding-2`}>
  //       {isLoading ? (
         
  //         <Skeleton height="20px" width="100%" />
  //       ) : (
        
  //         <Box color="red.500">There is something wrong</Box>
  //       )}
  //     </Box>
  //   );
  // }


const url = selectedCourse?.course_preview 
  ? selectedCourse.course_preview 
  : selectedYouTube?.id?.videoId 
    ? `https://www.youtube.com/embed/${selectedYouTube.id.videoId}` 
    : `https://www.youtube.com/embed/ffasf`;



  return (
   selectedCourseLoading ?  <Box className={`${styles?.rightPanelVideoWrapper} padding-2`}>
  <Skeleton height="30vh" width="100%" borderRadius="md" />
  <Skeleton height="45vh" width="100%" borderRadius="md" mt={4} />

   </Box> :(

        <>
        <Box className={`${styles?.rightPanelVideoWrapper} padding-2`}>

          <ReactPlayer
             url={url }
            width="100%"
            height="250px"
            controls
            className="tec-border-radius"
          />

          <Box className="card-body ps-1">
            <Text as="h6" className="paddingTopBottom-2 " color="black">
              {selectedCourse?.course_title || selectedYouTube?.snippet?.title}
            </Text>

            {selectedCourse !== undefined && <Flex className={"marginTop-2"} justifyContent={"space-between"}>
              <Flex alignItems={"center"}>
                <Avatar src={!!selectedCourse?.userDetails?.profile_url ? selectedCourse?.userDetails?.profile_url : placeHolderImage} size="md" marginRight="6px" />
                <Box >
                  <Text fontWeight="bold" fontSize="12px">
                    {selectedCourse?.fullName}
                  </Text>
                </Box>
              </Flex>
              <TecButton
                className="tecPrimaryButton"
              >
                Add To Cart
                {false ? <BOLoading /> : CART_ICON}
              </TecButton>
            </Flex>}


            <Divider marginY="10px" />
            {!!selectedCourse?.uuid || !!selectedYouTube?.id?.videoId ? <CommentTab cId={selectedCourse?.uuid || selectedYouTube?.id?.videoId} /> : <NoDataFound title="Please select something!" />}
          </Box>
        </Box >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="2">Reason for reporting:</Text>
            <RadioGroup
              onChange={setReportReason}
              value={reportReason}
              mb="2"
              display="flex"
              flexDirection="column"
            >
              <Radio value="Irrelevant">Irrelevant</Radio>
              <Radio value="Inappropriate">Inappropriate</Radio>
              <Radio value="Spam">Spam</Radio>
              <Radio value="Harassment">Harassment</Radio>
            </RadioGroup>
            <Input
              placeholder="Additional comments"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <Button
              mt="4"
              colorScheme="red"
              onClick={() => {
                handleReportSubmit();
                onClose();
              }}
            >
              Submit Report
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {
        showModal && (
          <Modal isOpen={showModal} onClose={toggleModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Notification</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{modalContent}</ModalBody>
            </ModalContent>
          </Modal>
        )
      }
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Transcriptions</DrawerHeader>
          <DrawerBody>
            <Text>{transcription} </Text>
            {/* Add the logic to display the transcriptions here */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </>
          )
   
  );

};

export default MbotCard;