import React, { useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { getUserData } from "../../middleware/auth";
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
  Divider,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import {
  MdModeEditOutline,
  MdDelete,
  MdThumbUp,
  MdThumbDown,
  MdReport,
  MdMoreVert,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { useDisclosure } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Ava1 from "../../img/Avatar1.svg";
import { formatDistanceToNow } from "date-fns";
import { placeHolderImage } from "../Config";

const MbotCard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { className = "" } = props;
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
  const [userReactions, setUserReactions] = useState({});
  const fileInputRef = useRef(null);
  const { courseObject } = props;

  const currentUser = getUserData()?.userdata?.id || "guest";

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() || attachedFiles.length > 0) {
      const newComment = {
        text: commentText,
        time: new Date(),
        attachments: attachedFiles,
        reports: [],
        replies: [],
        user: {
          id: currentUser,
          firstName: getUserData()?.userdata?.first_name || "John",
          lastName: getUserData()?.userdata?.last_name || "Doe",
          avatar: getUserData()?.userdata?.avatar || Ava1,
        },
        likes: 0,
        dislikes: 0,
        section: activeSection,
      };
      setComments([...comments, newComment]);
      setCommentText("");
      setAttachedFiles([]);
    }
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditCommentText(comments[index].text);
  };

  const handleEditChange = (event) => {
    setEditCommentText(event.target.value);
  };

  const handleSaveComment = () => {
    const updatedComments = comments.map((comment, index) =>
      index === editIndex ? { ...comment, text: editCommentText } : comment
    );
    setComments(updatedComments);
    setEditIndex(null);
    setEditCommentText("");
  };

  const toggleModal = (content) => {
    setShowModal(!showModal);
    setModalContent(content);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachedFiles(files);
  };

  const handlePopoverSubmit = () => {
    if (popoverInput.trim()) {
      const newComment = {
        text: popoverInput,
        time: new Date(),
        attachments: [],
        reports: [],
        replies: [],
        user: {
          id: currentUser,
          firstName: getUserData()?.userdata?.first_name || "John",
          lastName: getUserData()?.userdata?.last_name || "Doe",
          avatar: getUserData()?.userdata?.avatar || Ava1,
        },
        likes: 0,
        dislikes: 0,
        section: activeSection,
      };
      setComments([...comments, newComment]);
      setPopoverInput("");
    }
  };

  const handleLikeComment = (index) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === index) {
        if (userReactions[index]?.reaction === "disliked") {
          comment.dislikes -= 1;
        }
        if (userReactions[index]?.reaction !== "liked") {
          comment.likes += 1;
          setUserReactions({
            ...userReactions,
            [index]: { userId: currentUser, reaction: "liked" },
          });
        }
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDislikeComment = (index) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === index) {
        if (userReactions[index]?.reaction === "liked") {
          comment.likes -= 1;
        }
        if (userReactions[index]?.reaction !== "disliked") {
          comment.dislikes += 1;
          setUserReactions({
            ...userReactions,
            [index]: { userId: currentUser, reaction: "disliked" },
          });
        }
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReportSubmit = () => {
    if (reportText.trim()) {
      const updatedComments = comments.map((comment, i) =>
        i === reportIndex
          ? {
              ...comment,
              reports: [
                ...comment.reports,
                { text: reportText, reason: reportReason },
              ],
            }
          : comment
      );
      setComments(updatedComments);
      setReportIndex(null);
      setReportText("");
      setReportReason("Irrelevant");
      toggleModal("Report submitted successfully!");
    }
  };

  const handleReplyChange = (event, index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, replyText: event.target.value } : comment
    );
    setComments(updatedComments);
  };

  const handleReplySubmit = (index) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === index && comment.replyText?.trim()) {
        const newReply = {
          text: comment.replyText,
          time: new Date(),
          user: {
            id: currentUser,
            firstName: getUserData()?.userdata?.first_name || "John",
            lastName: getUserData()?.userdata?.last_name || "Doe",
            avatar: getUserData()?.userdata?.avatar || Ava1,
          },
        };
        comment.replies = [...comment.replies, newReply];
        delete comment.replyText;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <Box
      className="col-md-3 col-3"
      width="370px"
      height="auto"
      position="relative"
    >
      <Box className="card p-3">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width="100%"
          height="150px"
          controls
        />
        <Box className="card-body ps-1">
          <Text as="h5" className="card-title font-weight-bold" color="black">
            {props.title}
          </Text>
          <Flex>
            <Flex>
              <Avatar src={Ava1} size="sm" marginRight="6px" />
              <Box mt={6}>
                <Text fontWeight="bold" color={"gray"}>
                  {`${getUserData()?.userdata?.first_name || "John"} ${
                    getUserData()?.userdata?.last_name || "Doe"
                  }`}
                </Text>
              </Box>
            </Flex>
            <NavLink
              to={`/course-overview/${props.title}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              <Text className="ms-auto">
                View All Comments<i className="fas fa-arrow-right"></i>
              </Text>
            </NavLink>
          </Flex>
        </Box>
        <Box mt={2}>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Popover>
              <PopoverTrigger>
                <Button
                  borderRadius="full"
                  onClick={() => setActiveSection("Team Comments")}
                  isActive={activeSection === "Team Comments"}
                >
                  Team Comment
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Top Comments</PopoverHeader>
                <PopoverBody>
                  <Flex>
                    <GrAttachment fontSize="40" onClick={handleButtonClick} />
                    <Input
                      placeholder="Add a comment"
                      value={popoverInput}
                      onChange={(e) => setPopoverInput(e.target.value)}
                      ml={2}
                    />
                    <InputRightAddon>
                      <Button colorScheme="blue" onClick={handlePopoverSubmit}>
                        <FiSend />
                      </Button>
                    </InputRightAddon>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button
                  borderRadius="full"
                  onClick={() => setActiveSection("Group Comments")}
                  isActive={activeSection === "Group Comments"}
                >
                  Group comment
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Group Comments</PopoverHeader>
                <PopoverBody>
                  <Flex>
                    <GrAttachment fontSize="40" onClick={handleButtonClick} />
                    <Input
                      placeholder="Add a comment"
                      value={popoverInput}
                      onChange={(e) => setPopoverInput(e.target.value)}
                      ml={2}
                      onKeyPress={() => {}}
                    />
                    <InputRightAddon>
                      <Button colorScheme="blue" onClick={handlePopoverSubmit}>
                        <FiSend />
                      </Button>
                    </InputRightAddon>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button
                  borderRadius="full"
                  onClick={() => setActiveSection("Private Comments")}
                  isActive={activeSection === "Private Comments"}
                >
                  Private comment
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Private Comments</PopoverHeader>
                <PopoverBody>
                  <Flex>
                    <GrAttachment fontSize="40" onClick={handleButtonClick} />
                    <Input
                      placeholder="Add a comment"
                      value={popoverInput}
                      onChange={(e) => setPopoverInput(e.target.value)}
                      ml={2}
                    />
                    <InputRightAddon>
                      <Button colorScheme="blue" onClick={handlePopoverSubmit}>
                        <FiSend />
                      </Button>
                    </InputRightAddon>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>

          <InputGroup marginTop="15px">
            <Input
              placeholder="Add a comment"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={commentText}
              onChange={handleCommentChange}
            />
            <InputRightAddon>
              <Button colorScheme="blue" onClick={handleCommentSubmit}>
                <FiSend />
              </Button>
            </InputRightAddon>
          </InputGroup>

          {comments.length === 0 ? (
            <Flex align="center" direction="column" mt={2}>
              <Text>No Comments Yet</Text>
            </Flex>
          ) : (
            <Box mt={2} maxH="400px" overflowY="auto" paddingRight="2">
              <VStack spacing={2} align="stretch">
                {["Group Comments", "Team Comments", "Private Comments"].map(
                  (section) => (
                    <Box key={section}>
                      <Text fontWeight="bold" fontSize="lg" mt={2}>
                        {section}
                      </Text>
                      <Divider my={2} />
                      {comments
                        .filter((comment) => comment.section === section)
                        .map((comment, index) => (
                          <Box
                            key={index}
                            p={2}
                            borderWidth="1px"
                            borderRadius="md"
                          >
                            <Flex align="center">
                              <Avatar
                                src={comment?.user?.avatar || placeHolderImage}
                                size="sm"
                                mr={2}
                              />
                              <Box>
                                <Text fontWeight="bold">
                                  {`${comment?.user?.firstName || ""} ${
                                    comment?.user?.lastName || ""
                                  }`}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  {formatDistanceToNow(
                                    new Date(comment?.time),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </Text>
                              </Box>
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  aria-label="Options"
                                  icon={<MdMoreVert />}
                                  variant="outline"
                                  ml="auto"
                                />
                                <MenuList>
                                  <MenuItem
                                    icon={<MdModeEditOutline />}
                                    onClick={() => handleEditComment(index)}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdDelete />}
                                    onClick={() => handleDeleteComment(index)}
                                  >
                                    Delete
                                  </MenuItem>
                                  <MenuItem
                                    icon={<MdReport />}
                                    onClick={() => setReportIndex(index)}
                                  >
                                    Report
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Flex>
                            {editIndex === index ? (
                              <>
                                <Input
                                  value={editCommentText}
                                  onChange={handleEditChange}
                                  mt={2}
                                />
                                <Button
                                  leftIcon={<FiSend />}
                                  onClick={handleSaveComment}
                                  mt={2}
                                >
                                  Save
                                </Button>
                              </>
                            ) : (
                              <>
                                <Text mt={2}>{comment?.text}</Text>
                                <HStack spacing={2} mt={2}>
                                  <Button
                                    leftIcon={<MdThumbUp />}
                                    onClick={() => handleLikeComment(index)}
                                    isDisabled={
                                      userReactions[index]?.reaction === "liked"
                                    }
                                  >
                                    {comment.likes}
                                  </Button>
                                  <Button
                                    leftIcon={<MdThumbDown />}
                                    onClick={() => handleDislikeComment(index)}
                                    isDisabled={
                                      userReactions[index]?.reaction ===
                                      "disliked"
                                    }
                                  >
                                    {comment.dislikes}
                                  </Button>
                                </HStack>
                                <InputGroup mt={2}>
                                  <Input
                                    placeholder="Add a reply"
                                    value={comment.replyText || ""}
                                    onChange={(e) =>
                                      handleReplyChange(e, index)
                                    }
                                  />
                                  <InputRightAddon>
                                    <Button
                                      colorScheme="blue"
                                      onClick={() => handleReplySubmit(index)}
                                    >
                                      <FiSend />
                                    </Button>
                                  </InputRightAddon>
                                </InputGroup>
                                {comment.replies?.length > 0 && (
                                  <Box
                                    mt={4}
                                    pl={4}
                                    borderLeft="1px solid #e2e8f0"
                                  >
                                    {comment.replies.map(
                                      (reply, replyIndex) => (
                                        <Box key={replyIndex} mt={2}>
                                          <Flex align="center">
                                            <Avatar
                                              src={
                                                reply.user.avatar ||
                                                placeHolderImage
                                              }
                                              size="sm"
                                              mr={2}
                                            />
                                            <Box>
                                              <Text fontWeight="bold">
                                                {`${
                                                  reply.user.firstName || ""
                                                } ${reply.user.lastName || ""}`}
                                              </Text>
                                              <Text
                                                fontSize="sm"
                                                color="gray.500"
                                              >
                                                {formatDistanceToNow(
                                                  new Date(reply.time),
                                                  {
                                                    addSuffix: true,
                                                  }
                                                )}
                                              </Text>
                                            </Box>
                                          </Flex>
                                          <Text mt={1}>{reply.text}</Text>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                )}
                              </>
                            )}
                            {comment?.attachments?.length > 0 && (
                              <Box mt={4}>
                                <Text>Attachments:</Text>
                                {comment.attachments.map((file, idx) => (
                                  <Text key={idx}>{file.name}</Text>
                                ))}
                              </Box>
                            )}
                            {reportIndex === index && (
                              <Popover
                                isOpen
                                onClose={() => setReportIndex(null)}
                              >
                                <PopoverContent>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverHeader>Report Comment</PopoverHeader>
                                  <PopoverBody>
                                    <RadioGroup
                                      onChange={setReportReason}
                                      value={reportReason}
                                    >
                                      <Stack direction="column">
                                        <Radio value="Irrelevant">levant</Radio>
                                        <Radio value="Inappropriate">
                                          Inappropriate
                                        </Radio>
                                        <Radio value="Spam">Spam</Radio>
                                      </Stack>
                                    </RadioGroup>
                                    <Input
                                      placeholder="Describe the issue"
                                      value={reportText}
                                      onChange={(e) =>
                                        setReportText(e.target.value)
                                      }
                                      mt={2}
                                    />
                                    <Button
                                      colorScheme="red"
                                      onClick={handleReportSubmit}
                                      mt={2}
                                    >
                                      Submit Report
                                    </Button>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            )}
                          </Box>
                        ))}
                    </Box>
                  )
                )}
              </VStack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MbotCard;
