import React, { Fragment } from 'react'
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
import { useParams } from 'react-router-dom';
import { BOLoading, TecButton } from "./elements/elements";
import Card from "./Card";
import Styles from "./CourseVideo.module.css"
import Style from "./Comment.module.css"
import CommentStyles from "./Comment.module.css"
import { post } from "../middleware/api";
import { CallAPI } from "../middleware/api";
import { toast } from "react-toastify";
import endpoints from "../middleware/endpoint";
import { FiSend } from "react-icons/fi";
import { decrypt } from '../middleware/auth'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import CourseDetailReply from './CourseDetailReply';
import { AddToTrash, toastError, toastSuccess } from '../util_helper';
import moment from 'moment';
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import messageService from "./MessageService/Index";
import CourseCard from './CourseCard/CourseCard';
import { IMAGE_4 } from './ApiData';
import { getID, SERVER_URL } from '../siteConfig';
import { placeHolderImage } from './Config';
import NoDataFound from './NoDataFound/NoDataFound';
import io from 'socket.io-client'
const socket = io.connect(SERVER_URL)


export default function CommentTab({ cId }) {
  const { courseId } = useParams()
  const _courseId = cId || courseId;

  const [userId, setUserId] = useState()
  const [DataForReplyComponent, setDataForReplyComponent] = useState()
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [showReplyInputBox, setShowReplyInputBox] = useState(false)
  const [loading, setLoading] = useState(false);
  const [discountCourses, setDiscountCourses] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [comment, setComment] = useState({
    course_id: _courseId, comment: ""
  })
  const [reply, setReply] = useState({
    reply_comment: ""
  })
  const [reportReason, setReportReason] = useState("")
  const [reportIssue, setReportIssue] = useState("")
  const [replyLoading, setReplyLoading] = useState(false);
  const [allComments, setAllComments] = useState([])
  const [isEditableComment, setIsEditableComment] = useState(false)
  const [editableData, setEditableData] = useState({})
  const [deletableCommentUUID, setDeletableCommentUUID] = useState("")
  const [loadingLike, setLoadingLike] = useState(false)
  const [loadingDislike, setLoadingDislike] = useState(false)
  const [clickedCommentId, setClickedCommentId] = useState("")
  const [CommentDataForAddtoTrash, setCommentDataForAddtoTrash] = useState({})
  const [showReplyArrowUp, setShowReplyArrowUp] = useState(false)
  const [courseLoading, setCourseLoading] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isOpenAlert, setIsOpenAlert] = React.useState();
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = React.useRef();

  const [SortValue, setSortValue] = useState("Newest First")

  const handlCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }


  const handleReplyChange = (e) => {
    setReply({ ...reply, [e.target.name]: e.target.value })
  }

  const scrollTop = ()=> {
    try {
      window.scrollTo(0, 0);

    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    try {
      setCommentsLoading(true);
      messageService.onMessage().subscribe((m) => {
        if (m.senderId === "recycleBin" && m.target === "restoreData") {
          if (!!_courseId) {
            ReadCommentsWithoutLoading();
          }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }, [courseId, cId])

  // All Functions for the Comment Features.

  const PostComment = () => {
    try {
      setLoading(true)
      if (comment.comment.length < 1) {
        toast.error("Kindly fill the proper field", {
          pauseOnHover: false
        })
        setLoading(false)
      } else {
        post(endpoints.createComment, {
          course_id: _courseId,
          user_id: getID('userId'),
          comment: comment?.comment
        })
          .then((res) => {
            setLoading(false)
            ReadComments()
            // setComment({ ...comment, comment: "" })

          }).catch((error) => {
            toast.error('Failed to post comment', {
              pauseOnHover: false
            })
          });
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    try {
      socket.on('updatedComments', (data) => {
        setAllComments(data.newComment)
      });
      return () => {
        socket.off('updateUserComment');
      };
    } catch (error) {
      console.error(error);
    }
  }, [socket, reply, allComments])




  const ReadCommentsWithoutLoading = () => {
    try {
      post(endpoints.getComments, {
        course_id: _courseId, sortValue: SortValue
      }).then((res) => {
        const data = res.data
        setAllComments(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const ReadComments = () => {
    try {
      if (!!_courseId) {
        post(endpoints.getComments, {
          course_id: _courseId, sortValue: SortValue
        }).then((res) => {
          setCommentsLoading(false)
          setAllComments(res.data)
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const DeleteComment = () => {
    try {
      post(endpoints.deleteComment, {
        uuid: deletableCommentUUID
      }).then((res) => {
        onCloseAlert()
        ReadComments()
        scrollTop();
        AddToTrash(CommentDataForAddtoTrash.uuid, 'comments', `${CommentDataForAddtoTrash?.comment}~${JSON.stringify(CommentDataForAddtoTrash)}`, CommentDataForAddtoTrash?.course_id);
      }).catch((error) => {
        toastError("Failed to Delete");
      });

    } catch (error) {
      console.log(error)
    }
  }

  const PostReply = (commentId) => {
    try {
      setReplyLoading(true)
      if (reply.reply_comment.length < 1) {
        toast.error("All fields are required!", {
          pauseOnHover: false
        })
        setReplyLoading(false)
      } else {
        post(endpoints.createReplies, reply)
          .then((res) => {
            const newReply = res.data;
            const updatedComments = allComments.map((comment) => {
                    if (comment?.uuid === commentId) {
                        return {
                          ...comment,
                          replies: [...comment.replies, newReply]
                        }
                    }
                    return comment;
                });
            ReadComments()
            setAllComments(updatedComments);
            setReply({ ...reply, reply_comment: ""})
            setReplyLoading(false)
            setShowReplyInputBox(false)
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

  const HandleDeletePress = (uuid, dataForTrash) => {
    setDeletableCommentUUID(uuid)
    setIsOpenAlert(true)
    setCommentDataForAddtoTrash(dataForTrash)
  }

  const HandleEditButton = (editedData) => {
    setIsEditableComment(true)
    setEditableData(editedData)
  }

  const handleEditComment = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value })
  }

  const EditCommentInDatabase = () => {
    try {
      if (editableData.comment.length < 1) {
        toast.error("Kindly fill the proper field", {
          pauseOnHover: false
        })
      } else {
        setIsEditableComment(false)
        post(endpoints.updateComment, editableData)
          .then((res) => {
            // toast.success('Comment Edit Successfully');
            setShowReplyBox(false)
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

  const fetchCourseList = () => {
    try {
      CallAPI(endpoints.fetchCourseList)
        .then((res) => {
          if (res?.status.code === 200) {
            const { data } = res;
            if (data) {
              setLoading(false);
              setDiscountCourses(data)
            }
            return;
          }
          toast.error(res?.status?.message, {
            pauseOnHover: false
          })
          setLoading(false);
        })
    } catch (error) {
      console.error(error);
    }
  }


  const handleLike = (uuid, likes, user_id, dislikes) => {
    setClickedCommentId(uuid);
    setLoadingLike(true)
    try {
      post(endpoints.updatelikes, {
        data: {
          uuid: uuid,
          comment_id: uuid,
          user_id: user_id,
          likes: likes,
          dislikes: dislikes
        }
      }).then((res) => {
        if (res?.status == 200) {
          ReadCommentsWithoutLoading()
          setLoadingLike(false)
        }
      })

    } catch (error) {
      console.log(error)
    }
  };


  const handleDislike = (uuid, likes, user_id, dislikes) => {
    setClickedCommentId(uuid)
    setLoadingDislike(true)
    try {
      post(endpoints.updatedislikes, {
        data: {
          uuid: uuid,
          comment_id: uuid,
          user_id: user_id,
          likes: likes,
          dislikes: dislikes,
        }
      }).then((res) => {
        if (res?.status == 200) {
          ReadCommentsWithoutLoading()
          setLoadingDislike(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      setComment({ ...comment, comment: "" })
      PostComment()
    }
  }

  const HandleReport = (user_id, comment_id) => {
    setUserId(user_id)
    setDeletableCommentUUID(comment_id)
    onOpen()
  }

  const submitReport = () => {
    try {
      if (reportIssue === "" || reportReason === "") {
        toast.error("All fields are required!", {
          pauseOnHover: false
        })
      } else {
        post(endpoints.commentReport, {
          user_id: userId, comment_id: deletableCommentUUID, reportReason: reportReason, issue: reportIssue
        }).then((res) => {
          toast.success("Reported Successfully", {
            pauseOnHover: false
          })
          setReportIssue("")
          onClose()
          setReportIssue("")
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showBox = (id, arrowId) => {
    const box = document.getElementById(id)
    const arrow = document.getElementById(arrowId)
    if (box.style.display == "none") {
      box.style.display = "block"
      arrow.style.transform = "rotate(180deg)"
    }
    else if (box.style.display == "block") {
      box.style.display = "none"
      arrow.style.transform = "rotate(360deg)"
    }
  }


  const handleShowReplyBox = (id, uuid, arrowId) => {
    setShowReplyBox(prev => !prev);
    showBox(id, arrowId)
    setDataForReplyComponent({ comment_id: uuid });
    setClickedCommentId(id);
    setShowReplyArrowUp(prev => !prev)
  }

  const handleShowReplyInputBox = (id, uuid) => {
    setShowReplyInputBox(prev => !prev);
    setReply({ ...reply, comment_id: uuid })
    setClickedCommentId(id);
  }

  const handlePressEnterReply = (e) => {
    if (e.keyCode == 13) {
      setReply({ ...reply, reply_comment: "" })
      // PostReply()
    }
  }


  useEffect(() => {
    const userDetail = JSON.parse(decrypt(localStorage.getItem('userData')));
    setUserDetails(userDetail)
    setComment({ ...comment, user_id: userDetail.id })
    // fetchCourseList()
    setReply({ ...reply, user_id: userDetail.id })

  }, [])

  useEffect(() => {
    ReadComments()
  }, [SortValue, cId, courseId])



  const handleDeleteReply = (replyUUid, commentId) => {
    try {
      post(endpoints.deleteReplies, {
        uuid: replyUUid
      }).then((res) => {
        if (res?.status === 200) {
          ///don't call get api
          //instead update state only
          const updated = allComments.map((cItems) => {
            if (cItems?.id === commentId) {
              return { ...cItems, replies: cItems?.replies.filter((items) => items?.uuid !== replyUUid) }
            }
            return cItems;

          })
          setAllComments(updated);
          ReadComments()
          return;
        }
      }).catch((error) => {
        toast.error("Failed to Delete", {
          pauseOnHover: false
        });
      });
    } catch (error) {
      console.error(error);
    }
  }




  const handleAddToCart = (course) => {
    try {
      setCourseLoading(course.id);
      CallAPI(endpoints?.addToCart_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
        bought_price: course?.discounted_price,
        actual_price: course?.actual_price
      }).then((res) => {
        setCourseLoading("");
        toastSuccess(res?.status?.message)
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {
        (allComments.length >= 0) ?
          <>
            <Flex width="100%" alignItems="center">
              {
                (allComments.length === 0) && (<Text color="#8A0EE5" fontSize="18px" fontWeight="bold">Comment</Text>)

              }
              {
                (allComments.length == 1) && (<Text color="#8A0EE5" fontSize="18px" fontWeight="bold">{allComments.length} Comment</Text>)
              }
              {
                (allComments.length > 1) && (<Text color="#8A0EE5" fontSize="18px" fontWeight="bold">{allComments.length} Comments</Text>)
              }
              <select name='sortby'
                style={{ width: "150px", color: "#8A0EE5", padding: "5px 5px", border: "1px solid #8A0EE5", outline: "none", marginLeft: "15px" }}
                onChange={(e) => setSortValue(e.target.value)}
              >
                <option disabled selected>Sort by</option>
                <option>Newest First</option>
                <option>Top Comments</option>
              </select>
            </Flex>
          </> : ""
      }
      <Flex width="100%" gap={"20px"}  height={'100%'}>
        <Box width="100%" className={`${Styles?.commentSections} ${!!cId ? Styles?.iBotCommentSection : ""}`} mt="20px">
          <InputGroup width="100%" mb={2}>
            <Input
              // marginTop="15px"
              placeholder="Please enter your comment!"
              name="comment"
              value={comment.comment}
              onChange={handlCommentChange}
              onKeyUp={handlePressEnter}
            ></Input>
            <InputRightAddon
              // marginTop="15px"
              backgroundColor="white"
              cursor="pointer"
              onClick={PostComment}
            >
              {
                (loading) ? <BOLoading /> : <FiSend />
              }
            </InputRightAddon>
          </InputGroup>
          {

            commentsLoading ?
              <>
                <Flex width="100%" justifyContent="center" alignItems="center" mt="20px">
                  <BOLoading />
                </Flex>
              </> : (allComments) ?
              <div style={{ width:'100%' , height:'230px', overflowY:'auto'}}>         
               {            
                allComments.map((data, index) => {
                  const formattedDate = moment(data.createdAt || moment.now()).fromNow()
                  const replies = data?.replies;

                  return (
                    <Fragment key={index}>
                      <Box height="auto" mb="10px" width="100%" display="flex" flexDir="column">
                        <Box display="flex" marginTop="5px">
                          <img className={CommentStyles?.textSelectedStop} src={data.userDetails.profile_url ? data.userDetails.profile_url : placeHolderImage} style={{ marginRight: "10px", width: "40px", height: "40px", borderRadius: "50%" }} alt='' />
                          {/* <img src="https://as2.ftcdn.net/v2/jpg/02/74/05/81/1000_F_274058177_sKpnAT94o2Gal205KRwbsgVtjmu8wPpe.jpg" style={{ marginRight: "10px", width: "40px", height: "40px", borderRadius:"50%"}} alt=''/> */}
                          <Box w="100%" h="auto" background="#f2f2f5" borderRadius="0px 7px 7px 7px" padding="2px">
                            <Flex justifyContent="space-between">
                              <Text className={CommentStyles?.textSelectedStop} color="black" fontWeight="bold" fontSize="16px" width="90%" paddingLeft="7px">{!data.userDetails.first_name ? "User" : data.userDetails?.first_name + " " + data.userDetails?.last_name}<span className={CommentStyles?.textSelectedStop} style={{ fontSize: "14px", fontWeight: "lighter" }}>&nbsp;&nbsp;{formattedDate}</span></Text>

                              {/* Dropdown */}
                              <div className={CommentStyles?.dropdown}>
                                <button className={CommentStyles?.dropbtn}><BsThreeDotsVertical cursor="pointer" /></button>
                                <div className={CommentStyles?.dropdownContent}>
                                  {
                                    (userDetails.id == data.user_id) ?
                                      <>
                                        <a onClick={() => HandleEditButton(allComments[index])}>Edit</a>
                                        <a onClick={() => HandleDeletePress(data.uuid, data)}>Delete</a>
                                      </>
                                      :
                                      ""
                                  }
                                  {
                                    (userDetails.id != data.user_id) ?
                                      <a onClick={() => HandleReport(data.userDetails.id, data.uuid)}><Flex alignItems="center" justifyContent={"space-evenly"}><MdOutlineOutlinedFlag />Report</Flex></a>
                                      :
                                      ""
                                  }
                                </div>
                              </div>

                            </Flex>

                            {
                              (isEditableComment === true) && (editableData.id == data.id) ?
                                <Flex mt="2px" flexDir="column">
                                  <input className={CommentStyles?.EditInputField} type="text" color="black" fontSize="16px" name="comment" height="30px" value={editableData.comment} onChange={handleEditComment}></input>
                                  <Flex justifyContent="end" mt="2px">
                                    <Button bg="transparent" height="25px" ml="1px" onClick={() => setIsEditableComment(false)}>Cancel</Button>
                                    <Button className={Style?.buttonHover} bg="#8A0EE5" color="white" height="25px" borderRadius="30px" onClick={EditCommentInDatabase} >Save</Button>
                                  </Flex>
                                </Flex>
                                :
                                <Flex flexWrap="wrap" justifyContent="space-between">
                                  <Text className={Style?.textSelectedStop} color="black" fontSize="16px" paddingLeft="7px" >{data.comment}</Text>
                                </Flex>
                            }
                          </Box>
                        </Box>
                        {(isEditableComment === true) && (editableData.id == data.id) ? "" :
                          <>
                            <Flex color="black" fontSize="14px" fontWeight="bold" cursor="pointer" width="50%" alignItems="center" marginLeft="50px">
                              {/* <span style={{ color:"black"}} id={data.uuid} onClick={()=>handleLike(data.uuid, data.likes)}>Like</span> */}
                              <span><AiFillLike size="15" style={data.uuid == clickedCommentId && loadingLike ? { color: "black" } : { color: "lightgray" }} id={data.uuid} onClick={() => !loadingLike && handleLike(data.uuid, data.likes, userDetails.id, data.dislikes)} /></span>
                              {(data.likes === 0) ? "" : <span className={CommentStyles?.textSelectedStop} style={{ fontWeight: "lighter" }}> {data.likes} </span>}
                              <span className={Style?.dislikeBtn}><AiFillDislike size="15" style={data.uuid == clickedCommentId && loadingDislike ? { color: "black" } : { color: "lightgray" }} id={data.uuid} onClick={() => !loadingDislike && handleDislike(data.uuid, data.likes, userDetails.id, data.dislikes)} /></span>
                              {(data.dislikes === 0) ? "" : <span className={CommentStyles?.textSelectedStop} style={{ fontWeight: "lighter" }}> {data.dislikes}</span>}
                              <span className={CommentStyles?.textSelectedStop} style={{ paddingLeft: "10px", color: "#8A0EE5", fontWeight: "lighter" }} onClick={() => handleShowReplyInputBox(data.id, data.uuid)}>Reply</span>
                            </Flex>
                            {
                              (showReplyInputBox === true) && (data.id === clickedCommentId) ?
                                <Box width={"96%"} marginLeft={"auto"}>
                                  <Box width="100%">
                                    <Input
                                      width="100%"
                                      marginTop="15px"
                                      placeholder="Please enter your reply!"
                                      name="reply_comment"
                                      value={reply.reply_comment}
                                      onChange={handleReplyChange}
                                      onKeyUp={handlePressEnterReply}
                                      style={{ height: "30px", marginLeft: "1px", fontSize: "14px" }}
                                    ></Input>
                                  </Box>
                                  <Flex mt="2px" justifyContent="end" className='marginTop-1'>
                                    <TecButton
                                      title="Cancel"
                                      className="tecSecondaryButton marginRight-1"
                                      onClick={() => {
                                        setShowReplyInputBox(false)
                                      }}
                                      small
                                    />
                                    {

                                      <TecButton
                                        // title="Reply"
                                        className="tecPrimaryButton"
                                        onClick={() => PostReply(data?.uuid)}
                                        small
                                      >
                                        Reply {replyLoading && <BOLoading style={{ marginLeft: '1px' }} />}
                                      </TecButton>

                                      // <Button size={"sm"} onClick={() => ()}>Reply</Button>
                                    }
                                  </Flex>
                                </Box> : ""
                            }
                            {
                              (data.replies.length != 0) ?
                                <Button className={CommentStyles?.buttonHover} bg="#8A0EE5" ml="44px" color="white" fontSize="12px" mt="5px" borderRadius="25px" width="73px" p="0px 20px" h="25px" onClick={() => handleShowReplyBox(data.id, data.uuid, index)}>
                                  <span style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ marginRight: "3px" }}><FaChevronDown size="12" id={index} /></span><span>{data.replies.length} replies</span>
                                  </span>
                                </Button> : ""
                            }
                          </>
                        }

                        <Box width="87%" height="auto" marginLeft="42px" id={data.id} style={{ display: "none" }}>
                          <CourseDetailReply replies={replies} commentId={DataForReplyComponent} cId={data?.id} courseId={_courseId} handleDeleteReply={handleDeleteReply} ReadComments={ReadComments} />
                        </Box>
                      </Box>
                    </Fragment>
                  )
                })
              }
                </div>
                :
                <BOLoading />
          }
          {

            !!!commentsLoading && (allComments == "") ?
              <NoDataFound title="No comments yet!" />
              :
              ""
          }


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
                Are you sure  want to delete?
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
                  onClick={DeleteComment}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
        </Box>


      </Flex >
      {false && !!!cId && <Box width="100%" >
        <Text className={Style?.textSelectedStop} color="#6c31ee" fontSize="25px" fontWeight="bold" textAlign="left" padding={"10px"}>Get Discount Up To 30%</Text>
        <div className={Styles?.discountVideos}>
          {

            (discountCourses)?.slice(1, 6).map((value, index) => {
              return (
                <CourseCard
           
                  courseObject={value}
                  key={index}
                  imgsrc={IMAGE_4}
                  title={value?.course_title}
                  profile={userDetails?.profile_url}
                  name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""
                    }`}
                  thumbnail={value?.thumbnail}
                  value={value}
                  isCart={true}
                  course={
                    value
                  }
                  loading={value.id == courseLoading}
                  handleAddToCart={handleAddToCart}
                />

              );
            })}
        </div>
      </Box>}
    </>
  )
}
