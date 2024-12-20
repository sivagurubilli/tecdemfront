import React, { useDebugValue, useEffect, useState } from "react";
import img1 from "../img/Ellipse 121.png";
// import img2 from '../img/Ellipse 122.png'
import img3 from "../img/user-image-table.png";
import img4 from "../img/Edit.png";
import img5 from "../img/Vector 108.png";
import img6 from "../img/YouTube.png";
import img7 from "../img/Twitter.png";
import img8 from "../img/Arrow 1.png";
import img9 from "../img/Group 207.png";
import img10 from "../img/Rectangle 35.png";
import img11 from "../img/Vector 12.png";
import img12 from "../img/Group 221.png";
import img13 from "../img/Group 222.png";
import img14 from "../img/Group 225.png";
import img15 from "../img/Group 211.png";
import img16 from "../img/Group 212.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";

import { getID, setID } from "../siteConfig";
import { decrypt, encrypt } from "../middleware/auth";

import {
  Container,
  Image,
  Box,
  Center,
  HStack,
  Button,
  Text,
  Input,
  Textarea,
  Link,
  Badge,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import CanvasJSReact from "@canvasjs/react-charts";
import {
  FACEBOOK_ICON,
  INSTAGRAM_ICON,
  LINKEDIN_ICON,
  TWIITTERX_ICON,
  YOUTUBE_ICON,
} from "./Config";
import Styles from "./EditProfile.module.css";
import TextArea from "antd/es/input/TextArea";
import { CallAPI, post } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import { BOLoading } from "./elements/elements";
import messageService from "./MessageService/Index";
import { messageConfig } from "./Config/messageConfig";
// import AddExperience from "./CourseUploader/AddExperience";
import { classifyCourses, getFileUrlFromS3, toastError } from "../util_helper";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function Editprofile2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [readOnly, setReadOnly] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [files, setFiles] = useState([]);
  const formData = new FormData();
  const [showForm, setShowForm] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [loading, setLoading] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [sendotpLoading, setSendotpLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [timer, setTimer] = useState(0);
  const [courseList, setCourseList] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userId = getID('userId')
  const [userPhoto, setUserPhoto] = useState(img3)
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewEmail(value);
  };

  const handleOTPChange = (e) => {
    const { value } = e.target;

    setOtp(value);
  };


  const fetchUserProgressCourses = () => {
    try {
      CallAPI(endpoints?.getUserProgress, {
        user_id: userId
      }).then((res) => {
        if (res?.status?.code === 200) {
          const { data } = res;
          if (data?.data?.length > 0) {
            const { completedCourses, inProgressCourses, totalHours, completedCoursePercentage, pendingCoursePercentage } = classifyCourses(data?.data);
            setCourseList((prev) => {
              return {
                ...prev, completed: Number(completedCoursePercentage), inProgress: Number(pendingCoursePercentage),
                completedData: completedCourses,
                inProgressData: inProgressCourses,
                totalHours: totalHours
              }
            })

          }
        }
        toastError(res?.status?.message)
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();

    if (newEmail === "") {
      return toastError("Email is required!", {
        pauseOnHover: false,
      });
    }
    if (!emailRegex.test(newEmail)) {
      return toastError("Invalid email format!", {
        pauseOnHover: false,
      });
    }
    if (otp === "") {
      return toastError("OTP is required!", {
        pauseOnHover: false,
      });
    }

    try {
      setVerifyLoading(true);

      const response = await post(endpoints.emailupdate, {
        email: newEmail,
        oldEmail: userDetails.bus_email,
        otp: otp,
        user_id: getID('userId'),
      });

      if (response.status === 200) {
        // toast.success(response.data.status.message, {
        //   pauseOnHover: false,
        // });
        onClose();
        setNewEmail("");
        setOtp("");
        setTimer(0);

        if (getID("userData")) {
          const userDetails = JSON.parse(decrypt(getID("userData")));
          const updatedUserDetails = {
            ...userDetails,
            bus_email: newEmail,
          };
          setUserDetails(updatedUserDetails);
          // const link = await getFileUrlFromS3(updatedUserDetails?.profile_url)
          // setUserPhoto(link)
          const userData = encrypt(JSON.stringify(updatedUserDetails));
          setID("userData", userData);
        }
      } else {
        toastError(response.data.status.message);
      }
    } catch (error) {
      if (error.response) {
        // Handle errors from the response
        toastError(error.response.data.status.message || "An error occurred");
      } else {
        // Handle other errors
        toastError("An unexpected error occurred");
      }
      console.error("Error updating email:", error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSentOtp = (e) => {
    try {
      e.preventDefault();
      if (newEmail === "") {
        return toastError("Email is required!", {
          pauseOnHover: false,
        });
      }
      if (!emailRegex.test(newEmail)) {
        return toastError("Invalid email format", {
          pauseOnHover: false,
        });
      }
      if (newEmail == userDetails.bus_email) {
        return toastError("Please give new email!", {
          pauseOnHover: false,
        });
      } else {
        setSendotpLoading(true);
        post(endpoints.emailotp, {
          oldEmail: userDetails.bus_email,
          email: newEmail,
        }).then((response) => {
          console.log("dasd");
          setTimer(120);
          setSendotpLoading(false);
          // toast.success(response.data.status.message);
          setVerify(true);
        });
      }
    } catch (error) {
      toastError(error.response.data.status.message, {
        pauseOnHover: false,
      });
      setSendotpLoading(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    handleSubmitUserDetail("bus_email", newEmail)
      .then((res) => {
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating email:", error);
      });
  };


  const functionforremoveasync=async()=>{
    try {
      fetchUserProgressCourses();
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        setUserDetails(userDetails);
        const link = await getFileUrlFromS3(userDetails?.profile_url)
        setUserPhoto(link)
        setSocialLinks(userDetails?.socialMediaLinks);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect( () => {
    functionforremoveasync()
  }, []);

  useEffect(() => {
    // Get today's date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${day}`;

    // Set the max date
    setMaxDate(todayDate);
  }, []);

  const handleActiveEditField = (field, fieldId) => {
    try {
      setReadOnly((prev) => {
        return { ...prev, [field]: !prev[field] };
      });
      const inputField = document.getElementById(fieldId);
      if (inputField) {
        inputField.focus();
        inputField.select();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUserDetail = (name, value) => {
    try {
      if (value === "" && name !== "profile_url") {
        if (name === "first_name") {
          return toastError(messageConfig?.required_first_name, {
            pauseOnHover: false,
          });
        }
        if (name === "bus_email") {
          return toastError(messageConfig?.required_email, {
            pauseOnHover: false,
          });
        }
      }

      // if (name === "dob") {
      //     const dateRegex = new RegExp('^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$')
      //     if (!dateRegex.test(value.dob)) {
      //         return toastError(`Please a valid date of birth!`)
      //     }
      // }
      setReadOnly((prev) => {
        return { ...prev, [name]: false };
      });
      setLoading((prev) => {
        return { ...prev, [name]: true };
      });
      post(endpoints?.updateBussUserProfile, {
        uuid: userDetails?.uuid,
        [name]: value,
      })
        .then((res) => {
          if (name !== "profile_url") {
            if (name === "first_name") {
              // toast.success(messageConfig?.msg_first_name_updated, {
              //   pauseOnHover: false,
              // });
            }
            if (name === "last_name") {
              // toast.success(messageConfig?.msg_last_name_updated, {
              //   pauseOnHover: false,
              // });
            }
            if (name === "dob") {
              // toast.success(messageConfig?.msg_dob_updated, {
              //   pauseOnHover: false,
              // });
            }
            if (name === "bus_email") {
              // toast.success(messageConfig?.msg_email_updated, {
              //   pauseOnHover: false,
              // });
            }
            if (name === "description") {
              // toast.success(messageConfig?.msg_bio_updated, {
              //   pauseOnHover: false,
              // });
            }
          }
          if (getID("userData")) {
            const userDetails = JSON.parse(decrypt(getID("userData")));
            const updatedUserDetails = { ...userDetails, [name]: value };
            const userData = encrypt(JSON.stringify(updatedUserDetails));
            setID("userData", userData);
          }
          messageService.sendMessage(
            "editProfile",
            { [name]: value },
            "profileHeader"
          );

          setLoading((prev) => {
            return { ...prev, [name]: false };
          });
          if (name === "profile_url") {
            setUserDetails((prev) => {
              return { ...prev, profile_url: "" };
            });
            setUserPhoto(img3)
          }
          const { data } = res;
        })
        .catch(function (error) {
          toastError(error.res.data.status.message, {
            pauseOnHover: false,
          });
          setLoading((prev) => {
            return { ...prev, [name]: false };
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setUserDetails((prev) => {
        return { ...prev, [name]: value };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeImage = async (e) => {
    try {
      const { files } = e.target;

      const _files = Array.from(files);
      const profileImage = _files.map((file) => URL.createObjectURL(file));
      formData.append("files", _files[0], _files[0]?.name);
      formData.append("uuid", userDetails?.uuid);
      setLoading((prev) => {
        return { ...prev, profileImage: true };
      });
      CallAPI(endpoints?.updateProfilePicture, formData)
        .then(async (res) => {
          setLoading((prev) => {
            return { ...prev, profileImage: false };
          });
          if (res?.status?.code === 200) {
            if (getID("userData")) {
              const userDetails = JSON.parse(decrypt(getID("userData")));
              const updatedUserDetails = {
                ...userDetails,
                profile_url: res?.data?.profile_url,
              };
              const userData = encrypt(JSON.stringify(updatedUserDetails));
              setID("userData", userData);
              setUserDetails((prev) => {
                return { ...prev, profile_url: res?.data?.profile_url };
              });
              const link = await getFileUrlFromS3(res?.data?.profile_url)
              setUserPhoto(link)
              messageService.sendMessage(
                "editProfile",
                { profile_url: link },
                "profileHeader"
              );
            }
            return;
          }
          toastError(res?.status?.message, {
            pauseOnHover: false,
          });
          // toast.success(res.data.status.message);
          // setLoading((prev) => {
          //     return { ...prev, profileImage: false }
          // })
          // if (getID('userData')) {
          //     const userDetails = JSON.parse(decrypt(getID('userData')));
          //     const updatedUserDetails = { ...userDetails, profile_url: res?.data?.profile_url }
          //     const userData = encrypt(JSON.stringify(updatedUserDetails));
          //     setID('userData', userData);
          //     setUserDetails((prev) => {
          //         return { ...prev, profile_url: res?.data?.profile_url }
          //     })
          // }
          // setFiles(profileImage);
        })
        .catch(function (error) {
          toastError(error.res.data.status.message, {
            pauseOnHover: false,
          });
          setLoading((prev) => {
            return { ...prev, profileImage: false };
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyClipBoard = (link) => {
    try {
      navigator.clipboard.writeText(link).then(() => {
        // toast.success("Link copied to clipboard!", {
        //   pauseOnHover: false,
        // });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenForm = (socialType, fieldId) => {
    try {
      setShowForm((prev) => {
        return { [socialType]: !prev[socialType] };
      });
      const userDetails = JSON.parse(decrypt(getID("userData")));
      const { socialMediaLinks } = userDetails;
      const socialLink = socialMediaLinks[socialType];
      setSocialLinks((prev) => {
        return { ...prev, [socialType]: socialLink };
      });
      if (fieldId) {
        setTimeout(() => {
          const inputField = document.getElementById(fieldId);
          if (inputField) {
            inputField.focus();
            inputField.select();
          }
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateLink = (key, socialLink) => {
    try {
      const reqData = {
        user_id: userDetails?.uuid,
        [key]: socialLink,
      };
      setLoading((prev) => {
        return { ...prev, [key]: true };
      });
      post(endpoints?.addUpdateSocialLinks, reqData)
        .then((res) => {
          // toast.success(res.data.status.message, {
          //   pauseOnHover: false,
          // });
          setLoading((prev) => {
            return { ...prev, [key]: false };
          });
          setShowForm((prev) => {
            return { ...prev, [key]: false };
          });
          setUserDetails((prev) => {
            return {
              ...prev,
              socialMediaLinks: { ...prev.socialMediaLinks, [key]: socialLink },
            };
          });
          if (getID("userData")) {
            const userDetails = JSON.parse(decrypt(getID("userData")));
            const updatedUserDetails = {
              ...userDetails,
              socialMediaLinks: {
                ...userDetails?.socialMediaLinks,
                [key]: socialLink,
              },
            };
            const userData = encrypt(JSON.stringify(updatedUserDetails));
            setID("userData", userData);
          }
        })
        .catch(function (error) {
          toastError(error.response.data.status.message, {
            pauseOnHover: false,
          });
          setLoading((prev) => {
            return { ...prev, [key]: false };
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeLink = (e) => {
    try {
      const { name, value } = e.target;
      setSocialLinks((prev) => {
        return { ...prev, [name]: value };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const getProfilePicUrl = async () => {
  //   try {
  //     const link = await getFileUrlFromS3(userDetails?.profile_url)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  return (
    <>
      <Container
        maxW="100%"
        h="100%"
        bg="#f7f7f7"
        display="flex"
        justifyContent="center"
        gap={5}
      >
        <Box
          w="35%"
          h="85vh"
          border="1px solid #ADADAD"
          borderRadius="10px"
          marginTop={5}
          padding={"30px"}
          bgColor={"white"}
        >
          <Box
            w="100%"
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            alignItems={"flex-start"}
            borderRadius="10px 10px 0px 0px"
            className={Styles?.profileImage}
          >
            {/* <Image
              src={img1}
              alt=""
              w="100%"
              h="60%"
              borderRadius="10px 10px 0px 0px"
              // position="sticky"
              top="0px"
            /> */}
            <Text position={"relative"} top={"0px"} fontSize={"24px"} fontWeight={"500"}>Edit profile</Text>
            <Text>Profile Photo</Text>
            <Flex width={"100%"} height={"150px"}>
              <Text width={"40%"}>
                {files.length > 0 ? (
                  files.map((image) => {
                    return (
                      <Image
                        src={image}
                        alt=""
                        w="150px"
                        h="150px"
                        position="relative"
                        borderRadius={"50%"}
                        top="20px"
                      />
                    );
                  })
                ) : (
                  <Image
                    // src={
                    //   !!userDetails?.profile_url ? userDetails?.profile_url : img3
                    // }
                    src={userPhoto}
                    alt=""
                    w="150px"
                    h="150px"
                    borderRadius={"50%"}
                  // borderRadius={"50%"}
                  // position="relative"
                  // top="10px"
                  // left={"10px"}
                  />
                )}

                {!!loading?.profileImage ? (
                  <Button
                    height="25px"
                    bg="white"
                    className={Styles?.actionButtons}
                    border="none"
                    position="relative"
                    top="-80px"
                    left="30px"
                  >
                    <BOLoading />
                  </Button>
                ) : !!userDetails?.profile_url ? (
                  <Button
                    height="25px"
                    bg="white"
                    className={Styles?.actionButtons}
                    border="none"
                    position="relative"
                    top="-80px"
                    left="30px"
                    onClick={() => {
                      const element = document.getElementById("profileInput");
                      element.click();
                    }}
                  >
                    <i class="fas fa-pen" ></i>
                  </Button>
                ) : (
                  <Button
                    height="25px"
                    bg="white"
                    className={Styles?.actionButtons}
                    border="none"
                    position="relative"
                    top="-80px"
                    left="55px"
                    onClick={() => {
                      const element = document.getElementById("profileInput");
                      element.click();
                    }}
                  >
                    <i class="fas fa-camera"></i>
                  </Button>
                )}
                {!!userDetails?.profile_url && (
                  <Button
                    className={Styles?.actionButtons}
                    height="25px"
                    marginLeft={2}
                    bg="white"
                    position="relative"
                    top="-105px"
                    left="80px"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail("profile_url", "");
                    }}
                  >
                    {!!loading?.profile_url ? (
                      <BOLoading />
                    ) : (
                      <i class="fas fa-trash"></i>
                    )}
                  </Button>
                )}
              </Text>
              <Text width={"60%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} >
                <Text fontSize={"18px"}>Upload your photo</Text>
                <Text fontSize={"14px"}>Your photo should be in PNG or JPG format</Text>
              </Text>
            </Flex>
            <Input
              opacity={0}
              type="file"
              accept=".jpg, .png, .jpeg"
              name="profilePicutre"
              id="profileInput"
              w={0}
              h={"0px"}
              onChange={handleChangeImage}
            />
          </Box>
          <Box
            w="100%"
            height="50%"
            borderRadius="10px 10px 0px 0px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <HStack
              w="100%"
              height="auto"
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="space-between"
            >
              {/* <Button
                border="1px solid #ADADAD"
                height="30px"
                borderRadius="5px"
                bg="white"
              > */}
              <Text fontFamily="Manrope" height={"20px"} fontWeight="600" color="#000000">
                First name
              </Text>
              {/* </Button> */}
              <Box
                w="100%"
                height="30px"
                display="flex"
                borderRadius="5px"
                border="1px solid #ADADAD"
                justifyContent="space-between"
                alignItems="center"
              >
                <Input
                  value={userDetails?.first_name}
                  name="first_name"
                  readOnly={!!!readOnly["first_name"]}
                  height="30px"
                  w="95%"
                  border="none"
                  color="#000000"
                  outline="none"
                  fontFamily="Manrope"
                  fontWeight="400"
                  onChange={handleChange}
                  id="firstNameId"
                />

                {loading["first_name"] ? (
                  <Button height="25px" bg="white" border="none">
                    <BOLoading />
                  </Button>
                ) : !!!readOnly["first_name"] ? (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleActiveEditField("first_name", "firstNameId");
                    }}
                  >
                    <i class="fas fa-pen"></i>
                  </Button>
                ) : (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail(
                        "first_name",
                        userDetails?.first_name
                      );
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </Button>
                )}
              </Box>
            </HStack>
            <HStack
              w="100%"
              height="auto"
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="space-between"
            >
              {/* <Button
                border="1px solid #ADADAD"
                height="30px"
                borderRadius="5px"
                bg="white"
              > */}
              <Text fontFamily="Manrope" height={"20px"} fontWeight="600" color="#000000">
                Last name
              </Text>
              {/* </Button> */}
              <Box
                w="100%"
                height="30px"
                display="flex"
                borderRadius="5px"
                border="1px solid #ADADAD"
                justifyContent="space-between"
                alignItems="center"
              >
                <Input
                  value={userDetails?.last_name}
                  readOnly={!!!readOnly["last_name"]}
                  id="lastNameId"
                  height="30px"
                  w="95%"
                  border="none"
                  name="last_name"
                  color="#000000"
                  outline="none"
                  fontFamily="Manrope"
                  fontWeight="400"
                  onChange={handleChange}
                />

                {loading["last_name"] ? (
                  <Button height="25px" bg="white" border="none">
                    <BOLoading />
                  </Button>
                ) : !!!readOnly["last_name"] ? (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleActiveEditField("last_name", "lastNameId");
                    }}
                  >
                    <i class="fas fa-pen"></i>
                  </Button>
                ) : (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail(
                        "last_name",
                        userDetails?.last_name
                      );
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </Button>
                )}
              </Box>
            </HStack>
            <HStack
              w="100%"
              height="auto"
              display="flex"
              alignItems={"flex-start"}
              flexDirection={"column"}
              justifyContent="space-between"
            >
              {/* <Button
                border="1px solid #ADADAD"
                height="30px"
                borderRadius="5px"
                bg="white"
              > */}
              <Text fontFamily="Manrope" height={"20px"} fontWeight="600" color="#000000">
                Date of Birth
              </Text>
              {/* </Button> */}
              <Box
                w="100%"
                height="30px"
                display="flex"
                borderRadius="5px"
                border="1px solid #ADADAD"
                justifyContent="space-between"
                alignItems="center"
              >
                <Input
                  value={userDetails?.dob}
                  readOnly={!!!readOnly["dob"]}
                  type="date"
                  height="30px"
                  w="95%"
                  border="none"
                  name="dob"
                  color="#000000"
                  outline="none"
                  fontFamily="Manrope"
                  fontWeight="400"
                  onChange={handleChange}
                  id="userDobId"
                  max={maxDate}
                />

                {loading["dob"] ? (
                  <Button height="25px" bg="white" border="none">
                    <BOLoading />
                  </Button>
                ) : !!!readOnly["dob"] ? (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleActiveEditField("dob", "userDobId");
                    }}
                  >
                    <i class="fas fa-pen"></i>
                  </Button>
                ) : (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail("dob", userDetails?.dob);
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </Button>
                )}
              </Box>
            </HStack>
            <HStack
              w="100%"
              height="auto"
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="space-between"
            >
              {/* <Button
                border="1px solid #ADADAD"
                height="30px"
                borderRadius="5px"
                bg="white"
              > */}
              <Text fontFamily="Manrope" height={"20px"} fontWeight="600" color="#000000">
                Email
              </Text>
              {/* </Button> */}
              <Box
                w="100%"
                height="30px"
                display="flex"
                borderRadius="5px"
                border="1px solid #ADADAD"
                justifyContent="space-between"
                alignItems="center"
              >
                <Input
                  value={userDetails?.bus_email}
                  readOnly={!!!readOnly["bus_email"]}
                  height="30px"
                  w="95%"
                  border="none"
                  name="bus_email"
                  color="#000000"
                  outline="none"
                  fontFamily="Manrope"
                  fontWeight="400"
                  onChange={handleChange}
                  id="userEmailId"
                />

                {loading["bus_email"] ? (
                  <Button height="25px" bg="white" border="none">
                    <BOLoading />
                  </Button>
                ) : !!readOnly["bus_email"] ? (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail(
                        "bus_email",
                        userDetails?.bus_email
                      );
                    }}
                  >
                    <i className="fas fa-check"></i>
                  </Button>
                ) : (
                  userDetails.login_type !== "google" && (
                    <Button
                      height="25px"
                      bg="white"
                      border="none"
                      onClick={onOpen}
                    >
                      <i className="fas fa-pen"></i>
                    </Button>
                  )
                )}
              </Box>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    marginBottom="10px"
                    value={newEmail}
                    onChange={handleEmailChange}
                    placeholder="Enter new email"
                    isRequired
                  />
                  <Input
                    type="number"
                    value={otp}
                    onChange={handleOTPChange}
                    placeholder="Enter OTP"
                  />
                  {!emailRegex.test}
                </ModalBody>
                <ModalFooter>
                  {verify ? (
                    <Button
                      bg="#6b62dd"
                      color="white"
                      mr={3}
                      onClick={handleEmailUpdate}
                      isDisabled={verifyLoading}
                    >
                      {verifyLoading ? <BOLoading /> : "Verify"}
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button
                    onClick={handleSentOtp}
                    isDisabled={sendotpLoading || timer > 0}
                  >
                    {sendotpLoading ? (
                      <BOLoading />
                    ) : timer > 0 ? (
                      `Resend OTP (${timer}s)`
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <HStack
              w="100%"
              height="auto"
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="space-between"
            >
              {/* <Button
                border="1px solid #ADADAD"
                height="30px"
                borderRadius="5px"
                bg="white"
              > */}
              <Text fontFamily="Manrope" height={"20px"} fontWeight="600" color="#000000">
                Bio
              </Text>
              {/* </Button> */}
              <Box
                w="100%"
                height="auto"
                display="flex"
                borderRadius="5px"
                border="1px solid #ADADAD"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextArea
                  value={userDetails?.description}
                  readOnly={!!!readOnly["description"]}
                  height="30px"
                  w="95%"
                  border="none"
                  name="description"
                  color="#000000"
                  outline="none"
                  fontFamily="Manrope"
                  fontWeight="400"
                  onChange={handleChange}
                  id="descriptionId"
                />

                {loading["description"] ? (
                  <Button height="25px" bg="white" border="none">
                    <BOLoading />
                  </Button>
                ) : !!!readOnly["description"] ? (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleActiveEditField("description", "descriptionId");
                    }}
                  >
                    <i class="fas fa-pen"></i>
                  </Button>
                ) : (
                  <Button
                    height="25px"
                    bg="white"
                    border="none"
                    onClick={() => {
                      handleSubmitUserDetail(
                        "description",
                        userDetails?.description
                      );
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </Button>
                )}
              </Box>
            </HStack>
          </Box>
        </Box>
        <Box w="65%" h="85vh" borderRadius="10px" marginTop={5} paddingBottom={2} overflowY={"scroll"} overflowX={"hidden"}>
          {/* <HStack
            w="100%"
            height="auto"
            display="flex"
            justifyContent="space-between"
          >
            <Text
              fontFamily="Manrope"
              fontWeight="700"
              color="#000000"
              fontSize="35px"
              paddingLeft="10px"
            >
              Profile
            </Text>
          </HStack> */}
          <HStack
            w="100%"
            height="auto"
            display="flex"
            justifyContent="space-between"
            mt="15px"
          >
            <Box
              w="33%"
              height="180px"
              // border="1px solid #ADADAD"
              // borderRadius="5px"
              marginRight="10px"
            >
              <Image src={img9} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} />
              <Text
                fontFamily="Manrope"
                fontWeight="700"
                color="BLACK"
                fontSize="20px"
                padding="10px"
                position={"relative"}
                top={"-45%"}
                left={"5%"}
              >
                Learning Hours
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                fontSize="17px"
                padding="10px"
                position={"relative"}
                top={"-60%"}
                left={"5%"}
              >
                "Keep Learning"
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                fontSize="17px"
                padding="10px"
                position={"relative"}
                top={"-145%"}
                left={"65%"}
                display={"flex"}
                alignItems={"center"}
              >
                week <MdKeyboardArrowDown />
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                fontWeight={"700"}
                fontSize="25px"
                padding="10px"
                position={"relative"}
                top={"-150%"}
                left={"65%"}
              >
                65 Hrs
              </Text>
              <Text height={"50px"} width={"50px"} bgColor={"white"} fontSize={"30px"} color={"#890fe4"} position={"relative"} top={"-195%"} borderRadius={"50%"}
                left={"10%"} display={"grid"} placeItems={"center"}>
                <PiClockCounterClockwiseBold />
              </Text>
              {/* <Box
                display="flex"
                alignContent="center"
                width="100%"
                height="auto"
              >
                <Box
                  width="auto"
                  height="auto"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  marginLeft="10px"
                >
                  <Center
                    width="40px"
                    height="40px"
                    bg="#6D62E5"
                    borderRadius="50%"
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontFamily="Manrope"
                      fontWeight="700"
                      color="#FFFFFF"
                      fontSize="20px"
                    >
                      {courseList?.completedData?.length}
                    </Text>
                  </Center>
                  <Text
                    fontFamily="Manrope"
                    fontWeight="600"
                    color="#000000"
                    fontSize="16px"
                    textAlign="center"
                  >
                    Completed
                  </Text>
                </Box>
                <Box
                  width="auto"
                  height="auto"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  marginLeft="10px"
                >
                  <Center
                    width="40px"
                    height="40px"
                    bg="#6D62E5"
                    borderRadius="50%"
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontFamily="Manrope"
                      fontWeight="700"
                      color="#FFFFFF"
                      fontSize="20px"
                    >
                      {courseList.inProgressData?.length}
                    </Text>
                  </Center>
                  <Text
                    fontFamily="Manrope"
                    fontWeight="600"
                    color="#000000"
                    fontSize="16px"
                    textAlign="center"
                  >
                    In Progress
                  </Text>
                </Box>
              </Box> */}
            </Box>
            <Box
              w="33%"
              height="180px"
              // border="1px solid #ADADAD"
              // borderRadius="5px"
              marginRight="10px"
            >
              <Image src={img9} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} />
              <Text
                fontFamily="Manrope"
                fontWeight="700"
                color="BLACK"
                fontSize="20px"
                padding="10px"
                position={"relative"}
                top={"-45%"}
                left={"5%"}
              >
                $900
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                fontSize="17px"
                padding="10px"
                position={"relative"}
                top={"-60%"}
                left={"5%"}
              >
                Standard
              </Text>
              <Text
                fontFamily="Manrope"
                width={"100px"}
                height={"30px"}
                bgColor={"white"}
                border={"1px solid grey"}
                color="#890fe4"
                fontSize="17px"
                padding="10px"
                position={"relative"}
                borderRadius={"20px"}
                justifyContent={"center"}

                top={"-140%"}
                left={"60%"}
                display={"flex"}
                alignItems={"center"}
              >
                Active
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                padding="10px"
                position={"relative"}
                top={"-110%"}
                left={"60%"}
              >
                02-03-2024
              </Text>
              <Text
                fontFamily="Manrope"
                color="BLACK"
                padding="10px"
                position={"relative"}
                top={"-125%"}
                left={"60%"}
              >
                06-04-2024
              </Text>
              <Text fontWeight={"700"} fontSize={"20px"} color={"black"} position={"relative"} top={"-205%"}
                left={"8%"}>
                Subscription
              </Text>
            </Box>
            <Box
              w="33%"
              height="180px"
              // border="1px solid #ADADAD"
              // borderRadius="5px"
              marginRight="10px"
            >
              <Image src={img9} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} />
              <Text
                fontFamily="Manrope"
                color="BLACK"
                fontSize="17px"
                height={"40px"}
                width={"150px"}
                bgColor={"white"}
                padding="10px"
                position={"relative"}
                top={"-100%"}
                left={"30%"}
                display={"flex"}
                alignItems={"center"}
                zIndex={"1"}
              >
                University <MdKeyboardArrowDown />
              </Text>
              <Image src={img15} zIndex={"1"} position={"relative"} top={"-100%"} left={"35%"} />
              <Text
                fontFamily="Manrope"
                fontWeight="700"
                color="BLACK"
                fontSize="20px"
                padding="10px"
                position={"relative"}
                top={"-110%"}
                left={"35%"}
                zIndex={"1"}
              >
                Student
              </Text>

            </Box>

          </HStack>

          <HStack
            w="100%"
            height="auto"
            display="flex"
            justifyContent="space-between"
            mt="15px"
          >
            <Box
              w="60%"
              height="180px"
              // border="1px solid #ADADAD"
              // borderRadius="5px"
              marginRight="10px"
            >
              <Image src={img11} zIndex={"1"} width={"100%"} height={"100%"} position={"relative"} />
              <Image src={img10} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} top={"-100%"} />
              <Image src={img12} zIndex={"2"} position={"relative"} top={"-180%"} left={"33%"} />
              <Image src={img13} zIndex={"2"} position={"relative"} top={"-245%"} left={"60%"} />
              <Image src={img14} zIndex={"2"} position={"relative"} top={"-310%"} left={"10%"} />
              {/* <Image src={img12} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} top={"-100%"}/>
              <Image src={img13} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} top={"-100%"}/> */}
              <Text position={"relative"} zIndex={"2"} top={"-395%"} left={"10px"} fontSize={"20px"} fontWeight={"700"}>Achievements and Goals</Text>
            </Box>
            <Box
              w="40%"
              height="180px"
              // border="1px solid #ADADAD"
              // borderRadius="5px"
              marginRight="10px"
            >
              <Image src={img9} zIndex={"0"} width={"100%"} height={"100%"} position={"relative"} />
              <Box position={"relative"} top={"-80%"} left={"20px"}>
                <Text display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Box height={"10px"} width={"10px"} borderRadius={"50%"} bgColor={"red"}></Box>
                  <Text>APKs</Text>
                </Text>
                <Text display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Box height={"10px"} width={"10px"} borderRadius={"50%"} bgColor={"orange"}></Box>
                  <Text>Video</Text>
                </Text>
                <Text display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Box height={"10px"} width={"10px"} borderRadius={"50%"} bgColor={"green"}></Box>
                  <Text>Pictures</Text>
                </Text>
                <Text display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Box height={"10px"} width={"10px"} borderRadius={"50%"} bgColor={"yellow"}></Box>
                  <Text>Audio</Text>
                </Text>
                <Text display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Box height={"10px"} width={"10px"} borderRadius={"50%"} bgColor={"pink"}></Box>
                  <Text>Documents</Text>
                </Text>
              </Box>
              <Box position={"relative"} top={"-160%"} left={"50%"}>
                <Image src={img16} zIndex={"1"} position={"relative"} />
                <Text position={"relative"} top={"-100px"} left={"15%"}>120 MB</Text>
                <Text position={"relative"} top={"-100px"} left={"14%"}>Available</Text>
              </Box>
            </Box>

          </HStack>
          {/* Here Work */}


          <Box
            w="98.9%"
            height="auto"
            mt="15px"
            border="1px solid #ADADAD"
            borderRadius="5px"
            marginRight="10px"
            bgColor={"#fff"}
          >
            <Text
              fontFamily="Manrope"
              fontWeight="700"
              color="black"
              fontSize="20px"
              padding="10px"
            >
              Social Connection
            </Text>
            <HStack w="98%" mb="10px" className={Styles?.socialIconWrapper}>
              {
                <Box className={Styles?.socialLinkWrapper}>
                  <Image
                    src={FACEBOOK_ICON}
                    alt=""
                    w="120px"
                    h="120px"
                    borderRadius="10px 10px 0px 0px"
                    position="sticky"
                    top="0px"
                  />
                  {!!!showForm?.facebook && (
                    <Box className={Styles?.socialActionWrapper}>
                      {!!userDetails?.socialMediaLinks?.facebook && (
                        <a
                          href={userDetails?.socialMediaLinks?.facebook}
                          target="_blank"
                        >
                          <i class="fas fa-link"></i>
                        </a>
                      )}
                      <i
                        onClick={() => {
                          handleOpenForm("facebook", "facebookLink");
                        }}
                        class="fas fa-pencil"
                      ></i>
                      {!!userDetails?.socialMediaLinks?.facebook && (
                        <i
                          onClick={() => {
                            handleCopyClipBoard(
                              userDetails?.socialMediaLinks?.facebook
                            );
                          }}
                          class="far fa-clipboard"
                        ></i>
                      )}
                    </Box>
                  )}
                  {!!showForm?.facebook && (
                    <Input
                      type="text"
                      id="facebookLink"
                      onChange={handleChangeLink}
                      value={socialLinks?.facebook}
                      name="facebook"
                      placeholder="Facebook link"
                    />
                  )}
                  {loading?.facebook ? (
                    <BOLoading />
                  ) : (
                    !!showForm?.facebook && (
                      <i
                        onClick={() => {
                          handleUpdateLink("facebook", socialLinks?.facebook);
                        }}
                        class="fas fa-check"
                      ></i>
                    )
                  )}
                  {!!showForm?.facebook && (
                    <i
                      onClick={() => {
                        handleOpenForm("facebook");
                      }}
                      class="fas fa-close"
                    ></i>
                  )}
                </Box>
              }

              {
                <Box className={Styles?.socialLinkWrapper}>
                  <Image
                    src={YOUTUBE_ICON}
                    alt=""
                    w="120px"
                    h="120px"
                    borderRadius="10px 10px 0px 0px"
                    position="sticky"
                    top="0px"
                  />
                  {!!!showForm?.youtube && (
                    <Box className={Styles?.socialActionWrapper}>
                      {!!userDetails?.socialMediaLinks?.youtube && (
                        <a
                          href={userDetails?.socialMediaLinks?.youtube}
                          target="_blank"
                        >
                          <i class="fas fa-link"></i>
                        </a>
                      )}
                      <i
                        onClick={() => {
                          handleOpenForm("youtube", "youtubeLink");
                        }}
                        class="fas fa-pencil"
                      ></i>
                      {!!userDetails?.socialMediaLinks?.youtube && (
                        <i
                          onClick={() => {
                            handleCopyClipBoard(
                              userDetails?.socialMediaLinks?.youtube
                            );
                          }}
                          class="far fa-clipboard"
                        ></i>
                      )}
                    </Box>
                  )}
                  {!!showForm?.youtube && (
                    <Input
                      type="text"
                      id="youtubeLink"
                      onChange={handleChangeLink}
                      value={socialLinks?.youtube}
                      name="youtube"
                      placeholder="YouTube link"
                    />
                  )}
                  {loading?.youtube ? (
                    <BOLoading />
                  ) : (
                    !!showForm?.youtube && (
                      <i
                        onClick={() => {
                          handleUpdateLink("youtube", socialLinks?.youtube);
                        }}
                        class="fas fa-check"
                      ></i>
                    )
                  )}
                  {!!showForm?.youtube && (
                    <i
                      onClick={() => {
                        handleOpenForm("youtube");
                      }}
                      class="fas fa-close"
                    ></i>
                  )}
                </Box>
              }

              {
                <Box className={Styles?.socialLinkWrapper}>
                  <Image
                    src={TWIITTERX_ICON}
                    alt=""
                    w="120px"
                    h="120px"
                    borderRadius="10px 10px 0px 0px"
                    position="sticky"
                    top="0px"
                  />
                  {!!!showForm?.twitterX && (
                    <Box className={Styles?.socialActionWrapper}>
                      {!!userDetails?.socialMediaLinks?.twitterX && (
                        <a
                          href={userDetails?.socialMediaLinks?.twitterX}
                          target="_blank"
                        >
                          <i class="fas fa-link"></i>
                        </a>
                      )}
                      <i
                        onClick={() => {
                          handleOpenForm("twitterX", "twitterXLink");
                        }}
                        class="fas fa-pencil"
                      ></i>
                      {!!userDetails?.socialMediaLinks?.twitterX && (
                        <i
                          onClick={() => {
                            handleCopyClipBoard(
                              userDetails?.socialMediaLinks?.twitterX
                            );
                          }}
                          class="far fa-clipboard"
                        ></i>
                      )}
                    </Box>
                  )}
                  {!!showForm?.twitterX && (
                    <Input
                      type="text"
                      id="twitterXLink"
                      onChange={handleChangeLink}
                      value={socialLinks?.twitterX}
                      name="twitterX"
                      placeholder="TwitterX link"
                    />
                  )}
                  {loading?.twitterX ? (
                    <BOLoading />
                  ) : (
                    !!showForm?.twitterX && (
                      <i
                        onClick={() => {
                          handleUpdateLink("twitterX", socialLinks?.twitterX);
                        }}
                        class="fas fa-check"
                      ></i>
                    )
                  )}
                  {!!showForm?.twitterX && (
                    <i
                      onClick={() => {
                        handleOpenForm("twitterX");
                      }}
                      class="fas fa-close"
                    ></i>
                  )}
                </Box>
              }

              {
                <Box className={Styles?.socialLinkWrapper}>
                  <Image
                    src={LINKEDIN_ICON}
                    alt=""
                    w="120px"
                    h="120px"
                    borderRadius="10px 10px 0px 0px"
                    position="sticky"
                    top="0px"
                  />
                  {!!!showForm?.linkedin && (
                    <Box className={Styles?.socialActionWrapper}>
                      {!!userDetails?.socialMediaLinks?.linkedin && (
                        <a
                          href={userDetails?.socialMediaLinks?.linkedin}
                          target="_blank"
                        >
                          <i class="fas fa-link"></i>
                        </a>
                      )}
                      <i
                        onClick={() => {
                          handleOpenForm("linkedin", "linkedinLink");
                        }}
                        class="fas fa-pencil"
                      ></i>
                      {!!userDetails?.socialMediaLinks?.linkedin && (
                        <i
                          onClick={() => {
                            handleCopyClipBoard(
                              userDetails?.socialMediaLinks?.linkedin
                            );
                          }}
                          class="far fa-clipboard"
                        ></i>
                      )}
                    </Box>
                  )}
                  {!!showForm?.linkedin && (
                    <Input
                      type="text"
                      id="linkedinLink"
                      onChange={handleChangeLink}
                      value={socialLinks?.linkedin}
                      name="linkedin"
                      placeholder="LinkedIn link"
                    />
                  )}
                  {loading?.linkedin ? (
                    <BOLoading />
                  ) : (
                    !!showForm?.linkedin && (
                      <i
                        onClick={() => {
                          handleUpdateLink("linkedin", socialLinks?.linkedin);
                        }}
                        class="fas fa-check"
                      ></i>
                    )
                  )}
                  {!!showForm?.linkedin && (
                    <i
                      onClick={() => {
                        handleOpenForm("linkedin");
                      }}
                      class="fas fa-close"
                    ></i>
                  )}
                </Box>
              }

              <Box className={Styles?.socialLinkWrapper}>
                <Image
                  src={INSTAGRAM_ICON}
                  alt=""
                  w="120px"
                  h="120px"
                  borderRadius="10px 10px 0px 0px"
                  position="sticky"
                  top="0px"
                />
                {!!!showForm?.instagram && (
                  <Box className={Styles?.socialActionWrapper}>
                    {!!userDetails?.socialMediaLinks?.instagram && (
                      <a
                        href={userDetails?.socialMediaLinks?.instagram}
                        target="_blank"
                      >
                        <i class="fas fa-link"></i>
                      </a>
                    )}
                    <i
                      onClick={() => {
                        handleOpenForm("instagram", "instagramLink");
                      }}
                      class="fas fa-pencil"
                    ></i>
                    {!!userDetails?.socialMediaLinks?.instagram && (
                      <i
                        onClick={() => {
                          handleCopyClipBoard(
                            userDetails?.socialMediaLinks?.instagram
                          );
                        }}
                        class="far fa-clipboard"
                      ></i>
                    )}
                  </Box>
                )}
                {!!showForm?.instagram && (
                  <Input
                    type="text"
                    id="instagramLink"
                    onChange={handleChangeLink}
                    value={socialLinks?.instagram}
                    name="instagram"
                    placeholder="Instagram link"
                  />
                )}
                {loading?.instagram ? (
                  <BOLoading />
                ) : (
                  !!showForm?.instagram && (
                    <i
                      onClick={() => {
                        handleUpdateLink("instagram", socialLinks?.instagram);
                      }}
                      class="fas fa-check"
                    ></i>
                  )
                )}
                {!!showForm?.instagram && (
                  <i
                    onClick={() => {
                      handleOpenForm("instagram");
                    }}
                    class="fas fa-close"
                  ></i>
                )}
              </Box>
            </HStack>
          </Box>
          <Box
            w="99%"
            height="auto"
            mt="15px"
            border="1px solid #ADADAD"
            borderRadius="5px"
            marginRight="10px"
          >
            {/* <Text
              fontFamily="Manrope"
              fontWeight="700"
              color="#6D31ED"
              fontSize="20px"
              padding="10px"
            >
              Experience
            </Text> */}
            {/* <AddExperience /> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
