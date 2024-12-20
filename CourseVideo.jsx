import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Checkbox,
  Container,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "swiper/css/navigation";
import React, { useEffect, useRef, useState, useMemo, memo, useContext } from "react";
import { GrNext } from "react-icons/gr";
import Card from "./Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CallAPI } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import Styles from "./CourseVideo.module.css";
import {
  ShimmerTitle,
  ShimmerThumbnail,
  ShimmerSectionHeader,
} from "react-shimmer-effects";

import { decrypt, getUserData } from "../middleware/auth";
import { BOLoading } from "./elements/elements";
import CommentTab from "./CommentTab";
import Review from "./Reviews/Review";
import UserNotes from "./CourseVideoUserNotes/UserNotes";
import Content from "./CourseContent/Content";
import {
  COURSE_DOWNLOAD,
  COURSE_UPLOAD,
  ZIP_FILE_ICON,
  validExternalResources,
} from "./Config";
import { AddToTrash, FileIcon, createNotifications, formatTime, toastError, toastSuccess } from "../util_helper";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import EditLInk from "./EditResourceLink/EditLink";
import ResourceLinks from "./ResourceLinks/ResourceLinks";
import ResourceTools from "./NoDataFound/ResourceTools";
import messageService from "./MessageService/Index";
import { getID } from "../siteConfig";
import VideoPlayer from "./VideoPlayer/VideoPlayer"
import DraggableList from "./SortableList/SortableList";
import ToggleButton from "./ToggleButton/ToggleButton";
import CourseCard from "./CourseCard/CourseCard";
import { IMAGE_4 } from "./ApiData";
import { PurchasedListContext } from "../Context/PurchasedListContext";
import { AskQuestion } from "./AskQuestion/AskQuestion";


const video = () => {
  if (window.innerWidth > 320 && window.innerWidth <= 414) {
    return 1;
  } else if (window.innerWidth > 414 && window.innerWidth <= 768) {
    return 2;
  } else {
    return 3;
  }
};

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}



const CourseVideoComponent = () => {
  const { courseId } = useParams();
  const playerRef = useRef(null);
  const { context, setContext } = useContext(PurchasedListContext)
  const { purchased = [] } = context;
  let value = video();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const videoPlayerRef = useRef(null);
  const [courseLoading, setCourseLoading] = useState("");

  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = getID("userId") || "";
  const [uploadLoading, setUploading] = useState("");
  //For resources and tools
  const [resourceDetails, setResourceDetails] = useState({});

  const [selectedVideoDetails, setSelectedVideosDetails] = useState({});
  const [relatedCourses, setRelatedCourse] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [comment, setComment] = useState({
    course_id: courseId,
    comment: "",
    attachement: "",
  });

  const divRefs = useRef([]);
  const container = useRef(null);

  const [showDList, setShowDList] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [subItems1, setSubItems1] = useState([]);

  useEffect(() => {
    try {
      let everyCompleted = true;

      const totalSubsections = courseDetails.sections.reduce((acc, section) => {
        return acc + section.courseSubSections.length
      }, 0);
      const lecturesStatus = {
        totalLectureLength: totalSubsections,
        lectureStatusList: [],
      }
      const studentDetails = getUserData()?.userdata;
      if (courseDetails?.sections && !!!courseDetails?.certificate) {
        courseDetails.sections.forEach((section, index) => {
          section.courseSubSections.forEach((lecture) => {
            // lecturesStatus.totalLectureLength = section.courseSubSections.length
            if (lecture?.progressData?.is_completed === "1") {
              lecturesStatus.lectureStatusList?.push(lecture?.progressData?.is_completed)
            }
          })
        })
        //checking is all is completed
        if (lecturesStatus.totalLectureLength === lecturesStatus?.lectureStatusList.length) {
          const mentorDetails = courseDetails?.userDetails || {}
          const userId = getID('userId');
          //call api to create certificate
          CallAPI(endpoints?.createCertificate, {
            user_id: userId,
            course_id: courseDetails?.id,
            course_name: courseDetails?.course_title,
            student_name: `${studentDetails?.first_name || ""} ${studentDetails?.last_name || ""}`,
            mentor_name: `${mentorDetails?.first_name || ""} ${mentorDetails?.last_name || ""}`,
            type: "certificate"
          }).then((res) => {
            if (res?.status?.code === 200) {
              setCourseDetails((prev) => {
                return { ...prev, certificate: res?.data }
              })
              createNotifications(userId,
                `Congratulations on completing your course on <strong>${courseDetails?.course_title}</strong>.`,
                'tecdemy',
                'Download certificate',
                '/user-certificates',
                'achievement'
              )
              return
            }
            toastError("Something went wrong!")
          })
        }
      }
    } catch (error) {
      console.error(error);
    }

  }, [courseDetails]);
  const [wishLoading, setWishLoading] = useState("");

  const [VideoTimestamp, setVideoTimestamp] = useState(0.00)
  const [videoTitle, setVideoTitle] = useState('')
  const [videoSectionName, setVideoSectionName] = useState('')
  const [videoPause, setVideoPause] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoList, setListOfVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleAddToCart = (course) => {
    try {
      setCourseLoading(course.id);
      CallAPI(endpoints?.addToCart_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
        bought_price: course?.discounted_price,
        actual_price: course?.actual_price,
      }).then((res) => {
        if (res?.status?.code === 200) {
          setContext((prev) => {
            return { ...prev, cartItems: [...prev?.cartItems, course.id] }
          })
          setCourseLoading("");
          // toast.success(res?.status?.message);
        } else {

          setCourseLoading("");
          // toast.error(res?.status?.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishList = async (course) => {
    try {
      setWishLoading(course.id)
      const response = await CallAPI(endpoints?.addToWishlist_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
      });
      if (response?.status?.code === 200) {
        setContext((prev) => {
          return { ...prev, wishListItems: [...prev?.wishListItems, course.id] }
        })
        setWishLoading("");
        // toast.success(response?.status?.message);
      } else {
        // toast.error(response?.status?.message);
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    } finally {
      setWishLoading("")
    }
  };

  const removeFromWishList = async (course) => {
    try {
      setWishLoading(course.id)
      const res = await CallAPI(endpoints.removeFromWishlist_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
      })
      if (res?.status?.code === 200) {
        setContext((prev) => {
          return { ...prev, wishListItems: prev?.wishListItems?.filter((items) => items !== course?.id) }
        })
        setWishLoading("");
        // toast.success(res?.status?.message);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishLoading("")
    }
  };

  const removeFromCart = (course) => {
    try {
      setCourseLoading(course?.id);
      CallAPI(endpoints.removeFromCart_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
      }).then((res) => {
        setCourseLoading("");
        if (res?.status?.code === 200) {
          // toast.error("Removed from cart!");
          setContext((prev) => {
            return { ...prev, cartItems: prev?.cartItems?.filter((items) => items !== course?.id) }
          })
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourseDetails = (isRecall) => {
    try {
      if (!isRecall) {
        setLoading(true);
      }
      CallAPI(endpoints?.fetchCourseList, {
        uuid: courseId,
        user_id: userId
      }).then((res) => {
        if (res?.status?.code) {
          const { data } = res;
          const firstVideo = data[0]?.sections[0]?.courseSubSections[0] || {};
          const videoList = [];
          const sortedSections = data[0]?.sections?.sort((a, b) => a.sequence - b.sequence);
          const updatedSections = sortedSections.map((items, index) => {
            if (index === 0) {
              return { ...items, isExpand: true }
            }
            return { ...items, isExpand: false }

          })
          data[0]['sections'] = updatedSections
          const { id, uuid } = data[0];
          if (!purchased.includes(id)) {
            navigate(`/course/${uuid}`)
          }
          setCourseDetails(data[0]);
          sortedSections?.map((items) => {
            items?.courseSubSections?.map((subItemsList) => {
              videoList.push(subItemsList);
            });
          });
          setSelectedVideosDetails(videoList[0]);
          fetchRelatedCourse(data[0]?.related_vidoes_ids);
          setLoading(false);
          setVideoSectionName(data[0]?.sections[0]?.section_title)
          setVideoTitle(firstVideo.title)
          setListOfVideos(videoList);
          return;
        }
        toastError(res?.status?.message);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRelatedCourse = (videoIds) => {
    try {
      CallAPI(endpoints?.fetchRelatedCourseList, {
        related_ids: videoIds,
      }).then((res) => {
        if (res?.status?.code === 200) {
          setRelatedCourse(res?.data);
          return;
        }
        toast.error(res?.status?.message, {
          pauseOnHover: false
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideoNotes = () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const userDetail = JSON.parse(decrypt(localStorage.getItem("userData")));
      setUserDetails(userDetail);
      fetchCourseDetails();
      // fetchVideoNotes();
      // ReadComments()
      fetchCourseList();
    } catch (error) {
      console.error(error)
    }

  }, [courseId]);


  const fetchCourseList = () => {
    try {
      CallAPI(endpoints.fetchCourseList).then((res) => {
        if (res?.status.code === 200) {
          const { data } = res;
          if (data) {
            setLoading(false);
            setDiscountCourses(data);
          }
          return;
        }
        toast.error(res?.status?.message, {
          pauseOnHover: false
        });
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      handlePlayVideo();
    }, 1000);
  }, [selectedVideoDetails])


  const handleReady = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectVideo = (videoObject) => {
    try {
      setSelectedVideosDetails(videoObject);
      setVideoTitle(videoObject.title)
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnded = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };



  const handleOnDuration = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnStart = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentTime = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };


  const handleOnPrev = () => {
    try {
      const prevIndex = (selectedIndex - 1 + videoList.length) % videoList.length;
      setSelectedIndex(prevIndex);
      setSelectedVideosDetails(videoList[prevIndex]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnNext = () => {
    try {
      const nextIndex = (selectedIndex + 1) % videoList.length;
      setSelectedIndex(nextIndex);
      setSelectedVideosDetails(videoList[nextIndex]);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    try {
      let subscribe = messageService.onMessage().subscribe((m) => {
        if (m.senderId === "undoPopup" && m.target === "courseDetailPage") {
          const { idx, uuid, titleLink } = m.text;
          const [title, link] = titleLink?.split("~") || "";
          const reqData = {
            link: link,
            title: title,
            linkIndex: idx,
            uuid: uuid,
          };
          handleUpdateUrl(reqData, true);
        }
        if (m.senderId === "recycleBin" && m.target === "courseDetailsPage") {
          fetchCourseDetails(true);
        }
      });
      return () => {
        subscribe.unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  }, [courseDetails]);

  const handleChangeImage = (e, uuid, external_resources, secId) => {
    try {
      const formData = new FormData();
      const { files } = e.target;
      const _files = Array.from(files);


      if (_files.length === 0) {
        return toast.error("Please select any file!", {
          pauseOnHover: false
        })
      }


      _files.forEach((item) => {
        const fileSplited = item?.name?.split(".");
        const ext = fileSplited[fileSplited.length - 1];
        const isValidFile = validExternalResources.includes(ext);
        if (!isValidFile) {
          return toastError("This file is not supported!")
        } else {
          formData.append("extResources", item);
        }
      });
      setUploading(uuid);
      CallAPI(endpoints?.uploadExternalResources, formData).then((res) => {
        if (res?.length > 0) {
          const conbinedUrls = res.map(
            (items) => `${items?.fileName}~${items?.fileUrl}`
          );
          const concatedUrls = conbinedUrls.join("|");
          const updated = !!external_resources
            ? external_resources + "|" + concatedUrls
            : concatedUrls;
          CallAPI(endpoints?.updateCourseList, {
            uuid: uuid,
            external_resources: updated,
            section_id: secId,
          }).then((res) => {
            setUploading("");
            if (res?.status?.code === 200) {
              courseDetails.sections.length > 0 &&
                courseDetails.sections.map((secItems) => {
                  secItems.courseSubSections.map((subItems) => {
                    if (subItems?.uuid === uuid) {
                      subItems["external_resources"] = updated;
                    }
                  });
                });
              // setCourseDetails(updatedData);
              return;
            }
            return toast.error(res?.status?.message, {
              pauseOnHover: false
            });
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrollToWidget = () => {
    try {
      window.scrollTo({
        top: 200,
        behavior: "smooth", // This makes the scrolling smooth
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadFile = (
    url,
    allList,
    uuid,
    secId
  ) => {
    try {
      messageService.sendMessage('coursePage', {
        show: true,
        fileName: url,
        fileUrl: url,
        uuid: uuid,
        allList: allList,
        section_id: secId,
        handleDeleteExternalResource: handleDeleteExternalResource,
        isMyCourse: courseDetails?.user_id === getID("userId"),

      }, 'previewModal')
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExternalResource = (
    url,
    allList,
    uuid,
    section_id,
    fileUrl
  ) => {
    try {


      setUploading(url);
      const filterList = allList.filter((items) => items !== url).join("|");
      CallAPI(endpoints?.updateCourseList, {
        uuid: uuid,
        external_resources: filterList,
        section_id: section_id,
      }).then((res) => {
        setUploading("");
        if (res?.status?.code === 200) {
          AddToTrash(uuid, "resourceFiles", fileUrl, courseDetails?.id);
          courseDetails.sections.length > 0 &&
            courseDetails.sections.map((secItems) => {
              secItems.courseSubSections.map((subItems) => {
                if (subItems?.uuid === uuid) {
                  subItems["external_resources"] = filterList;
                }
              });
            });
          return;
        }
        setSelectedVideosDetails((prev) => {
          return { ...prev, external_resources: filterList }
        })
        messageService.sendMessage(
          "courseDetailPage",
          { show: true },
          "undoPopup"
        );
        toast.error(res?.status?.message, {
          pauseOnHover: false
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  // url,
  //   allList,
  //   uuid,
  //   section_id,
  //   fileUrl


  const handleDownloadAllFiles = async (allUrl) => {
    try {
      const urlsArray = allUrl.map((items) => items.split("~")[1]);
      const zip = new JSZip();
      const filePromises = urlsArray.map(async (url, index) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}`);
        }
        const blob = await response.blob();
        const fileName = url.split("/").pop();
        zip.file(fileName, blob);
      });
      try {
        await Promise.all(filePromises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "Resource files.zip");
      } catch (error) {
        console.error("Error creating zip file", error);
      }
      setShowDList("");
    } catch (error) {
      console.error(error);
    }
  };

  const [link, setLink] = useState({
    link: "",
    title: "",
    uuid: "",
  });

  const handleEditLink = (link, title, uuid, idx, allLinks, isEdit) => {
    try {
      onOpen();
      setLink((prev) => {
        return {
          ...prev,
          link: link,
          uuid: uuid,
          linkIndex: idx,
          title: title,
          allLinks,
          isEdit: isEdit,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUrl = (updateLInk, isUndo) => {
    try {
      // handleUpdateUrl({
      //   link: link,
      //   title: title,
      //   linkIndex: idx,
      //   uuid: uuid
      // })
      let linkIndex = 0;
      const uuid = isUndo ? updateLInk?.uuid : link.uuid;
      let updateResourceLInk = "";
      const sections = courseDetails?.sections;
      const updatedSections = sections.map((items) => {
        const updatedSubSection = items?.courseSubSections?.map((items) => {
          if (items.uuid === uuid) {
            const links = items?.resources_list.split("|");
            const _link = links.filter((items) => items !== "");
            linkIndex = isUndo ? _link.length : updateLInk?.linkIndex;
            _link[linkIndex] = `${updateLInk?.title}~${updateLInk?.link}`;
            updateResourceLInk = _link.join("|");
            return { ...items, resources_list: updateResourceLInk };
          }
          return items;
        });
        return { ...items, courseSubSections: updatedSubSection };
      });
      if (!!updateResourceLInk) {
        CallAPI(endpoints?.updateCourseList, {
          uuid: link?.uuid || updateLInk?.uuid,
          resources_list: updateResourceLInk,
        });
        setCourseDetails((prev) => {
          return { ...prev, sections: updatedSections };
        });
        setSelectedVideosDetails((prev) => {
          return { ...prev, resources_list: updateResourceLInk }
        })

      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLink = (linkTitle, uuid, idx) => {
    try {
      let updateResourceLInk = "";
      let recycleLink = "";
      const sections = courseDetails?.sections;
      const updatedSections = sections.map((items) => {
        const updatedSubSection = items?.courseSubSections?.map((items) => {
          if (items.uuid === uuid) {
            const links = items?.resources_list.split("|");
            recycleLink = links.join("|");
            links.splice(idx, 1);
            updateResourceLInk = links.join("|");
            return { ...items, resources_list: updateResourceLInk };
          }
          return items;
        });
        return { ...items, courseSubSections: updatedSubSection };
      });
      CallAPI(endpoints?.updateCourseList, {
        uuid: uuid,
        resources_list: updateResourceLInk,
      });
      setCourseDetails((prev) => {
        return { ...prev, sections: updatedSections };
      });
      setSelectedVideosDetails((prev) => ({
        ...prev, resources_list: updateResourceLInk
      }));
      messageService.sendMessage(
        "courseDetailPage",
        {
          show: true,
          data: {
            link: linkTitle,
            uuid: uuid,
            recycleKey: "resourceLinks",
          },
        },
        "undoPopup"
      );
      AddToTrash(uuid, "resourceLinks", linkTitle, courseDetails?.id);
      // AddToRecycleBin('resourceLinks', {
      //   titleLink: linkTitle,
      //   uuid: uuid,
      //   idx: idx
      // })   
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayVideo = () => {
    try {
      if (playerRef.current && playerRef.current.plyr) {
        // Accessing Plyr instance
        const player = playerRef.current.plyr;
        player.on('loadeddata', () => {
          player.currentTime = 60;
          player.play();
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  // const handleAddToCart = (course) => {
  //   try {
  //     setCourseLoading(course.id);
  //     CallAPI(endpoints?.addToCart_v1, {
  //       user_id: getID("userId"),
  //       course_id: course?.id,
  //       bought_price: course?.discounted_price,
  //       actual_price: course?.actual_price
  //     }).then((res) => {
  //       setCourseLoading("");
  //       toastSuccess(res?.status?.message)
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }




  const handlePause = (videoObject) => {
    try {
      // if (videoObject?.is_completed === "0") {
      // if (!!!courseDetails?.certificate) {
      CallAPI(endpoints?.saveUsersCourseProgress, {
        user_id: userId,
        course_id: courseDetails?.id,
        upload_id: selectedVideoDetails?.id,
        video_progress: videoObject?.video_progress
      })
        .then((res) => {
          if (res?.status?.code === 200) {
            courseDetails.sections.map((secItems) => {
              secItems.courseSubSections.map((subItems) => {
                if (subItems?.id === selectedVideoDetails?.id) {
                  subItems.progressData.video_progress = videoObject?.pauseTime;
                }
              });
            });
            return;
          }
          toast.error(res?.status?.message, {
            pauseOnHover: false
          })
        })
      setVideoTimestamp(videoObject.video_progress)
      // }

      // console.log(videoObject.video_progress)

      // }

    } catch (error) {
      console.error(error);
    }
  }

  const handleOnProgress = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnSeek = (e) => {
    try {
    } catch (error) {
      console.error(error);
    }
  }


  const handlePlayerReady = (e) => {
    try {
      const player = e;
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnEnd = (e, currentTime, videoId) => {
    try {
      if (!!e) {
        handleOnNext();
        const updatedSections = courseDetails.sections.map((secItems) => {
          const updatedSubSection = secItems.courseSubSections.map((subItems) => {
            if (subItems?.id === selectedVideoDetails?.id) {
              const updatedProgress = { ...subItems?.progressData, video_progress: currentTime, is_completed: "1" }
              return { ...subItems, progressData: updatedProgress }
            }
            return subItems;
          });
          return { ...secItems, courseSubSections: updatedSubSection };
        });
        setCourseDetails((prev) => {
          return { ...prev, sections: updatedSections }
        })
        // if (!!!courseDetails?.certificate) {
        CallAPI(endpoints?.saveUsersCourseProgress, {
          user_id: userId,
          course_id: courseDetails?.id,
          upload_id: selectedVideoDetails?.id,
          video_progress: currentTime,
          is_completed: "1",
        })
          .then((res) => {
            if (res?.status?.code === 200) {
              const updatedSections = courseDetails.sections.map((secItems) => {
                const updatedSubSection = secItems.courseSubSections.map((subItems) => {
                  if (subItems?.id === videoId) {
                    const updatedProgress = { ...subItems?.progressData, video_progress: currentTime, is_completed: "1" }
                    return { ...subItems, progressData: updatedProgress }
                  }
                  return subItems;
                });
                return { ...secItems, courseSubSections: updatedSubSection };
              });
              setCourseDetails((prev) => {
                return { ...prev, sections: updatedSections }
              })
              // fetchCourseDetails(true);
              return;
            }
            toastError(res?.status?.message)
          })
        // }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeVideoCheck = (e, secId, subId) => {
    try {
      const { checked } = e.target;
      const updatedSections = courseDetails.sections.map((secItems) => {
        if (secItems?.id === secId) {
          const updatedSubSection = secItems.courseSubSections.map((subItems) => {
            if (subItems?.id === subId) {
              const updatedProgress = { ...subItems?.progressData, is_completed: checked ? "1" : "0" }
              return { ...subItems, progressData: updatedProgress }
            }
            return subItems;
          });
          return { ...secItems, courseSubSections: updatedSubSection };
        } else {
          return secItems
        }
      });

      // if (!!!courseDetails?.certificate) {
      CallAPI(endpoints?.saveUsersCourseProgress, {
        user_id: userId,
        course_id: courseDetails?.id,
        upload_id: subId,
        is_completed: checked ? "1" : "0",
      })
        .then((res) => {
          if (res?.status?.code === 200) {
            return;
          }
          toast.error(res?.status?.message, {
            pauseOnHover: false
          })
        })
      // }
      setCourseDetails((prev) => {
        return { ...prev, sections: updatedSections }
      })

    } catch (error) {
      console.error(error);
    }
  }


  const handleOnDragEnd = (secId, updatedArray) => {
    try {
      const updatedSections = courseDetails?.sections?.map((secItems) => {
        if (secItems?.id === secId) {
          return { ...secItems, courseSubSections: updatedArray }
        }
        return secItems
      })
      setCourseDetails((prev) => {
        return { ...prev, sections: updatedSections }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnExpand = (isExpand) => {
    try {
      setIsExpanded(isExpand)
    } catch (error) {
      console.error(error);
    }
  }


  const handleCollapse = () => {
    try {
      setIsExpanded(false)
      messageService.sendMessage('video', {}, 'player')
    } catch (error) {
      console.error(error);
    }
  }

  const handleAutoPlay = (isChecked) => {
    try {
      setAutoPlay(isChecked)
      // handlePause({ is_autoplay: isChecked ? "1" : 0 })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      messageService.onMessage().subscribe((m) => {
        if (m.senderId === 'previewModal' && m.target === "courseVideo") {
          const payLoad = m.text;
          handleDeleteExternalResource(payLoad?.fileUrl, payLoad?.allList, payLoad?.uuid, payLoad?.section_id, payLoad?.url)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

  const handleExpandSections = (secItems) => {
    try {
      setVideoSectionName(secItems.section_title);
      let updateSections = courseDetails?.sections?.map((items) => {
        if (secItems?.id === items?.id) {
          return { ...items, isExpand: !!items?.isExpand ? false : true }
        }
        return items;
      })
      setCourseDetails((prev) => {
        return { ...prev, sections: updateSections }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Container
        maxW="100%"
        // height="100%"
        margin="0px 0px 0px 0px"
        bgColor="white"
        className="padding-0"
      >

        <Container
          bgColor="white"
          maxW="100%"
          // height="100%"
          margin="0px 0px 0px 0px"
          display="flex"
          // className="padding-0"
          justifyContent={"space-between"}
        >
          <Box
            className={`${Styles?.leftContainerDiv} ${isExpanded ? Styles?.expandLeftContainer : Styles?.collapseLeftContainer}`}
          // overflow="auto"
          >
            {loading ? (
              <>
                <ShimmerTitle line={1} gap={10} width={200} variant="primary" />
                <ShimmerThumbnail width={1000} height={500} rounded />
              </>
            ) : (
              <>
                <div className={Styles?.videoHeaderContainer}>
                  <h5 style={{ marginBottom: "10px" }}>
                    {selectedVideoDetails?.title}
                  </h5>
                </div>

                {isExpanded && <Box
                  onClick={handleCollapse}
                  className={`${Styles?.collapseButton} box-shadow`}>
                  <i className="fas fa-arrow-left-long"></i> <Text>Content</Text>
                </Box>}
                <VideoPlayer
                  onReady={handleReady}
                  onPause={handlePause}
                  onSeek={handleOnSeek}
                  onEnd={handleOnEnd}
                  seekTime={selectedVideoDetails?.progressData?.is_completed === "1" ? 0 : Number(selectedVideoDetails?.progressData?.video_progress)}
                  src={selectedVideoDetails?.course_video}
                  selectedVideoId={selectedVideoDetails?.id}
                  selectedVideoDetails={selectedVideoDetails}
                  getCurrentTime={getCurrentTime}
                  autoPlay={autoPlay}
                  onExpand={handleOnExpand}
                  expandClass={isExpanded ? Styles?.expandedPlayer : ""}
                  onPrev={handleOnPrev}
                  onNext={handleOnNext}
                />
              </>
            )}
          </Box>
          <Box className={`${Styles?.rightContainer} ${isExpanded ? Styles?.hideRightContainer : ""}`}>
            {loading ? (
              <ShimmerTitle line={1} variant="primary" />
            ) : (
              <Text
                display="flex"
                justifyContent="space-between"
                marginBottom="15px!important"

              >

                <Text fontSize="20px" fontWeight="700">
                  {courseDetails?.course_title}
                </Text>
                <Box>
                  <ToggleButton onToggle={handleAutoPlay} />
                </Box>
              </Text>
            )}
            <Box
            >
              <div
                className={`mainCollapseContainer ${Styles?.sectionContainer}`}
                defaultIndex={[0]}
                allowMultiple
              >
                {loading ? (
                  <>
                    <ShimmerSectionHeader />
                    <ShimmerSectionHeader />
                    <ShimmerSectionHeader />
                    <ShimmerSectionHeader />
                  </>
                ) : (
                  courseDetails?.sections?.sort((a, b) => a.sequence - b.sequence)?.map((secItems) => {
                    const isActiveSection = selectedVideoDetails.section_id == secItems?.id || false;
                    const completedCourseLength = secItems?.courseSubSections?.filter((items) => items?.progressData?.is_completed === "1");
                    const videoTimes = secItems?.courseSubSections.map((items) => { return items?.video_length });
                    const totalVideoLength = videoTimes.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                    return (
                      <div className={Styles?.accordionItem} overflow={"unset"}>
                        <h2
                          style={{
                            padding: "0px",
                            marginBottom: "0px",
                            textDecoration: "none",
                          }}
                        >
                          <div className={`${Styles?.accordionPanel} padding-2 tec-border-bottom`} onClick={() => {
                            handleExpandSections(secItems)
                          }}>
                            <Box className={`${Styles?.sectionHeaderContainer}  ${isActiveSection ? Styles?.activeCourseSectionParent : ""}`}>
                              <h6>
                                {isActiveSection && <i className="fas fa-circle-play" style={{ marginRight: "5px" }}></i>}
                                {secItems?.section_title} ({completedCourseLength?.length}/
                                {secItems?.courseSubSections?.length})
                              </h6>
                            </Box>
                            <div className={Styles?.rightSectionTitle}>
                              <p className={Styles?.videoLength}>{formatTime(totalVideoLength) + "min"}</p>
                              {!!!secItems?.isExpand ? <i className="fas fa-angle-right"></i> : <i className="fas fa-chevron-down"></i>}</div>
                            {/* <AccordionIcon className={`${isActiveSection ? Styles?.sectionDropIcons : ""} ${Styles.dropSection}`} /> */}
                          </div >
                        </h2>
                        <div className={Styles?.subListContainer}
                          overflow={"unset"}
                          p={0}
                        >
                          {!!secItems?.isExpand &&
                            <DraggableList
                              dataArray={secItems?.courseSubSections}
                              handleOnDragEnd={handleOnDragEnd}
                              secId={secItems?.id}
                              selectedVideoDetails={selectedVideoDetails}
                              handleSelectVideo={handleSelectVideo}
                              handleChangeVideoCheck={handleChangeVideoCheck}
                              courseDetails={courseDetails}
                              courseId={courseDetails?.id}
                              handleEditLink={handleEditLink}
                              handleDeleteLink={handleDeleteLink}
                              handleDownloadFile={handleDownloadFile}
                              uploadLoading={uploadLoading}
                              courseDetailsUserId={courseDetails?.user_id}
                              handleDownloadAllFiles={handleDownloadAllFiles}
                              handleDeleteExternalResource={handleDeleteExternalResource}
                              handleChangeImage={handleChangeImage}
                              setShowDList={setShowDList}
                              handleScrollToWidget={handleScrollToWidget}
                              isMyCourse={courseDetails?.user_id === getID("userId")}
                            />
                          }



                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Box>
          </Box>
        </Container>


        <Container maxW={"100%"}>
          <Tabs
            variant="enclosed"
            colorScheme="white"
            marginTop="55px"
            className={`${Styles?.leftContainerDiv} ${isExpanded ? Styles?.expandLeftContainer : Styles?.collapseLeftContainer} `}
            borderBottom={"none"}
          >
            <TabList borderBottom={"none"}>
              {(isExpanded === true) && (<Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}

              >
                Content
              </Tab>)}
              <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}

              >
                Related Videos
              </Tab>
              <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}
              >
                Notes
              </Tab>
              <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}
              >
                Comments
              </Tab>
              {/* <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                borderColor="white"
                borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}
              >
                Resources & Tools
              </Tab> */}
              <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}
              >
                Reviews
                {/* <span id="reviewCountId" style={{ marginLeft: '5px' }}></span> */}
              </Tab>
              <Tab
                _selected={{
                  borderBottom: "4px solid #6534e4",
                  color: "#6534e4",
                  fontWeight: "700",
                  borderRadius: "0px",
                }}
                _focus={{ boxShadow: "md" }}
                // borderColor="white"
                // borderTop="3px solid transparent"
                fontWeight="500"
                onClick={handleScrollToWidget}
              >
                Ask Questions
                {/* <span id="reviewCountId" style={{ marginLeft: '5px' }}></span> */}
              </Tab>
            </TabList>
            <TabPanels>
              {
                (isExpanded === true) &&
                (
                  <TabPanel >
                    <Content
                      courseDetails={courseDetails}
                      userId={userId}
                      // handleSelectVideo={handleSelectVideo}

                      loading={loading}
                      setLoading={setLoading}
                      VideoSectionName={videoSectionName}
                      setVideoSectionName={setVideoSectionName}
                      handleOnDragEnd={handleOnDragEnd}
                      selectedVideoDetails={selectedVideoDetails}
                      handleSelectVideo={handleSelectVideo}
                      handleChangeVideoCheck={handleChangeVideoCheck}
                      courseId={courseDetails?.id}
                      handleEditLink={handleEditLink}
                      handleDeleteLink={handleDeleteLink}
                      handleDownloadFile={handleDownloadFile}
                      uploadLoading={uploadLoading}
                      courseDetailsUserId={courseDetails?.user_id}
                      handleDownloadAllFiles={handleDownloadAllFiles}
                      handleDeleteExternalResource={handleDeleteExternalResource}
                      handleChangeImage={handleChangeImage}
                      setShowDList={setShowDList}
                      handleScrollToWidget={handleScrollToWidget}
                      divRefs={divRefs}
                      container={container}
                      isExpanded={isExpanded}
                    />
                  </TabPanel>
                )
              }


              <TabPanel className="padding-2">
                <div className={Styles?.relatedVideosParent}>
                  {relatedCourses.map((value, index) => {
                    const { userDetails } = value;
                    const isAddedToCart = context?.cartItems?.includes(value.id)
                    const isAddedToWishlist = context?.wishListItems?.includes(value.id)
                    const isPurchased = context?.purchased?.includes(value.id)
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
                        course={value}
                        handleAddToCart={handleAddToCart}
                        isAddedToCart={isAddedToCart}
                        removeFromCart={removeFromCart}
                        addToWishList={addToWishList}
                        isAddedToWishlist={isAddedToWishlist}
                        removeFromWishList={removeFromWishList}
                        courseLoading={value.id == courseLoading}
                        wishLoading={value.id == wishLoading}
                        isPurchased={isPurchased}
                      />
                    );
                  })}
                </div>


              </TabPanel>
              <TabPanel >
                <UserNotes handleScrollToWidget={handleScrollToWidget} VideoTimestamp={VideoTimestamp} title={videoTitle} section={videoSectionName} videoPause={videoPause} />
              </TabPanel>

              <TabPanel>
                <CommentTab handleScrollToWidget={handleScrollToWidget} />
              </TabPanel>

              {/* 
              <TabPanel >
                <ResourceTools
                  courseId={courseDetails?.id}
                  handleEditLink={handleEditLink}
                  handleDeleteExternalResource={handleDeleteExternalResource}
                  handleDeleteLink={handleDeleteLink}
                  courseDetails={courseDetails}
                  selectedVideoDetails={selectedVideoDetails}
                  setSelectedVideosDetails={setSelectedVideosDetails}
                  handleDownloadFile={handleDownloadFile}
                  setCourseDetails={setCourseDetails}
                  handleUpdateUrl={handleUpdateUrl}
                  handleScrollToWidget={handleScrollToWidget}
                />

              </TabPanel>  */}

              <TabPanel className={Styles?.widthFull}>
                <Review
                  courseId={courseDetails?.id}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                  handleScrollToWidget={handleScrollToWidget}
                />
              </TabPanel>
              <TabPanel className={Styles?.widthFull}>
                <AskQuestion selectedVideoDetails={selectedVideoDetails} />
              </TabPanel>

            </TabPanels >

          </Tabs >
        </Container >
        <EditLInk
          isOpen={isOpen}
          onClose={onClose}
          link={link}
          setLink={setLink}
          handleUpdateUrl={handleUpdateUrl}
        />
      </Container >
    </div >
  );
};
const CourseVideo = memo(CourseVideoComponent);

export default CourseVideo;
