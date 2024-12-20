import React, { useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { AiFillDelete, AiFillEdit, AiOutlineSave } from "react-icons/ai";
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
  Image,
  Button,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Flex } from "antd";

import { useDisclosure } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import cardImg from "../img/img5.jpg";
import { placeHolderImage } from "./Config";
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Styles from "./Card.module.css";
import { addCourseToCart } from "../util_helper";
import { CallAPI } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { decrypt } from "../middleware/auth";
import { toast } from "react-toastify";
import { IoIosRemoveCircle } from "react-icons/io";
const Card = (props) => {

  const location = useLocation()
  const userDetail = JSON.parse(decrypt(localStorage.getItem('userData')));

  const { isOpen, onOpen, onClose, } = useDisclosure();
  const navigate = useNavigate();
  const { className = "",
    thumbnail = "",
    profile = "",
    value = {},
    flag,
    isMyCourse = false,
    // videoProgress = 0,
    videoProgress = "0",
    totalVideoLength = "0",
    isCompleted = false,
    myCourse = false,
    isCart = false,
    inProgress = false,
    course,
    cartCourses,
    getCartItems,
    cartItems,
    setCartItems,
    uploadByMe = false,
    hideRemoveBtn

  } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeSection, setActiveSection] = useState("Top Comments");
  const [popoverInput, setPopoverInput] = useState("");
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const fileInputRef = useRef(null);
  const { courseObject } = props;


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
        replies: [],
      };
      setComments([...comments, newComment]);
      setLikes({ ...likes, [comments.length]: 0 });
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

  const handleScroll = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // This makes the scrolling smooth
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index
        ? {
          ...comment,
          replies: [
            ...comment.replies,
            { text: replyText, time: new Date() },
          ],
        }
        : comment
    );
    setComments(updatedComments);
    setReplyText("");
    setReplyIndex(null);
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = comments.map((comment, i) =>
      i === commentIndex
        ? {
          ...comment,
          replies: comment.replies.filter(
            (_, rIndex) => rIndex !== replyIndex
          ),
        }
        : comment
    );
    setComments(updatedComments);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachedFiles(files);
  };

  const toggleModal = (content) => {
    setShowModal(!showModal);
    setModalContent(content);
  };

  const handlePopoverSubmit = () => {
    if (popoverInput.trim()) {
      setComments([
        ...comments,
        { text: popoverInput, time: new Date(), attachments: [], replies: [] },
      ]);
      setPopoverInput("");
    }
  };

  const handleLikeComment = (index) => {
    setLikes({ ...likes, [index]: (likes[index] || 0) + 1 });
  };

  const handleDislikeComment = (index) => {
    setDislikes({ ...dislikes, [index]: (dislikes[index] || 0) + 1 });
  };

  const RemoveCartItem = (course_id) => {
    try {
      CallAPI(endpoints.removeFromCart_v1, {
        user_id: userDetail.id,
        course_id: course_id
      }).then((res) => {
        if (res?.status?.code === 200) {
          toast.success("Removed from cart!")
          const newData = cartItems.filter((item) => item.id !== course_id)
          setCartItems(newData)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const AddCourseToCart = (course) => {
    const data = addCourseToCart(course)
  }

  return (
    <div
      className="col-md-3 col-3 fadeElement"
      style={{
        width: "320px",
        // height: "auto",
        position: "relative",
      }}
    >
      <div className={`card p-3 `}>
        {/* <NavLink
          to={`/course/${value?.uuid}`}
          onClick={() => {
            handleScroll();
          }}
        > */}
        <img
          src={!!thumbnail ? thumbnail : cardImg}
          // width="560px"
          // height="315px"
          controls
          className={`${Styles?.thumbImageCard} ${Styles?.textSelectedStop}`}
        />
        {/* </NavLink> */}

        {!!videoProgress && <progress className={Styles?.cardVideoProgress} value={!!isCompleted ? "100" : videoProgress} max={!!isCompleted ? "100" : totalVideoLength}></progress>}

        <div className={`card-body ps-1 ${Styles?.cardContainer} `}>
          <h6
            className={`card-title font-weight-bold ${Styles?.courseTitle} ${Styles?.textSelectedStop}`}
            style={{ color: "black" }}
          >
            {/* <NavLink
              to={`/course/${value?.uuid}`}
              onClick={() => {
                handleScroll();
              }}
            > */}
            {props.title}
            {/* </NavLink> */}

          </h6>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className={Styles?.profileContainer}>
              <img
                src={!!profile ? profile : placeHolderImage}
                alt=""
                width={35}
                style={{ marginRight: "10px" }}
              />

              <p className="text-start">{props.name}</p>
            </div>
            {isCart && <Button onClick={() => AddCourseToCart(course)}>
              <i className="fas fa-cart-shopping"></i>
            </Button>}

            {location.pathname === "/cart" &&
              <IoIosRemoveCircle size={30} cursor={"pointer"} onClick={() => RemoveCartItem(cartCourses.id)} />
            }
            {/* {isCompleted ? <Button>
              Get Certificate
            </Button> :

              <>
                {!isCart && !inProgress && <Button onClick={() => {
                  navigate(`/coursevideo/${value?.uuid}`)
                }}>
                  Visit Course
                </Button>}
              </>
            } */}
            {inProgress && <Button onClick={() => {
              navigate(`/coursevideo/${value?.uuid}`)
            }}>
              Visit Course
            </Button>}
            {/* {!isMyCourse ?
              <NavLink
                to={`/coursevideo/${courseObject?.uuid}`}
                className={`btn btn-outline-primary ${Styles?.buyButton}`}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <p> { ? "Get certificate" : `Buy $${value?.actual_price || "00.00"}`}</p>
              </NavLink> :
              <NavLink
                to={`${myCourse ? `/courseupload/${courseObject?.uuid}` : `/coursevideo/${courseObject?.uuid}`}`}
                className={`btn btn-outline-primary ${Styles?.buyButton}`}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              ><p>{isCompleted ? "Get certificate" : myCourse ? "Edit Course" : "Visit Course"}</p>
              </NavLink>} */}




            {isCart && !inProgress && <Button onClick={() => {
              navigate(`/coursevideo/${value?.uuid}`)
              handleScroll();
            }}>
              <i className="far fa-eye"></i>
            </Button>}

            {inProgress && !isCart && <Button onClick={() => {
              navigate(`/coursevideo/${value?.uuid}`)
              handleScroll();
            }}>
              <i className="far fa-eye"></i>
            </Button>

            }
            {isMyCourse && <Button onClick={() => {
              navigate(`/coursevideo/${value?.uuid}`)
              handleScroll();
            }}>
              <i className="far fa-eye"></i>
            </Button>}

            {uploadByMe && <Button onClick={() => {
              navigate(`/courseupload/${value?.uuid}`)
              handleScroll();
            }}>
              <i className="fas fa-pen"></i>
            </Button>}
          </div>
        </div>
      </div>
    </div>

  );
}; 

export default Card;
