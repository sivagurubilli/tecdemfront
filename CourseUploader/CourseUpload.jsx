import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CourseUploadSchema } from "../ValidationSchema";
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Textarea,
  Flex,
  Heading,
  Select,
  InputGroup,
  InputLeftAddon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import ThumbnailUploader from "./ThumbnailUploader";
import Styles from "./courseUploader.module.css";
import { toast } from "react-toastify";

import CourseSection from "./CourseSection";
import endpoints from "../../middleware/endpoint";
import { CallAPI, post } from "../../middleware/api";
import { APP_LOGO, SERVER_URL, getID } from "../../siteConfig";
import { decrypt } from "../../middleware/auth";
import { BOLoading, TecButton } from "../elements/elements";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "react-rte";
import { CloseIcon } from "@chakra-ui/icons";
import { COURSE_INCLUDES, validProfileExtension, videoValidation } from "../Config";
import { checkSubsectionTitles, stringToJSON, toastError, toastSuccess } from "../../util_helper";
import axios from "axios";
import SaveButton from "../SaveButton/SaveButton";

const CourseUpload = ({
  selectedForm,
  setSelectedForm,
  uploadCertificates,
  formValues,
  setFormValues,
  sectionDetails,
  setSectionsDetails,
  thumbnailFiles,
  setThumbnailFiles,
  image,
  setImage,
  // handleSubmit,
  loading,
  handleChangeCoursePreview,
  handleDeleteCoursePreview,
  coursePreviewFile,
  setCoursePreview
}) => {
  const navigate = useNavigate();
  const { courseUUID } = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formLoading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(RichTextEditor.createEmptyValue());
  const [courseRequirements, setCourseRequirements] = useState([""]);
  const [courseOffer, setCourseOffers] = useState([""]);
  const [courseIncludes, setCourseIncludes] = useState(COURSE_INCLUDES);
  const [showSaveWidget, setShowSaveWidget] = useState(false);
  const userId = getID('userId');
  const { values, errors, isValid, isSubmitting, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues: formValues,
    validationSchema: CourseUploadSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        uuid: courseUUID || undefined,
        sectionDetails: sectionDetails?.sections,
        id: sectionDetails?.id,
        user_id: userId,
      }
      // return;
      const isSectionsBlank = sectionDetails?.sections.some((section) => section?.section_title?.trim() === "")
      if (isSectionsBlank) {
        return toastError("Please check the section details!")
      }

      const isAllBlank = checkSubsectionTitles(sectionDetails?.sections);
      if (!isAllBlank?.isValid) {
        return toastError(isAllBlank?.message)
      }
      CallAPI(endpoints?.uploadCourse, newValues).then((res) => {
        if (res?.status?.code === 200) {
          if (showSaveWidget) {
            triggerSaveButton();
          }
          if (!!newValues?.uuid) {
            fetchCourseDetails();
            // return;
          }
          navigate("/Service");

          return toastSuccess(res?.status?.message);

        }
        return toastError("Something went wrong!");
      })
    },
  });



  useEffect(() => {
    try {
      if (!isValid && isSubmitting) {
        toastError("Please check course fields!")
      }
    } catch (error) {
      console.error(error);
    }

  }, [isValid, isSubmitting])

  const triggerSaveButton = () => {
    if (!!courseUUID) {
      setShowSaveWidget(!showSaveWidget);
    }
  }

  const fetchCourseDetails = () => {
    try {
      setLoading(true)
      CallAPI(endpoints?.fetchCourseList, {
        uuid: courseUUID,
      }).then((res) => {
        if (res?.status?.code === 200) {
          const courseDetails = res?.data[0] || {};
          setSectionsDetails(res?.data[0])
          setFieldValue("course_title", courseDetails?.course_title)
          setFieldValue("course_type", courseDetails?.course_type)
          setFieldValue("level", courseDetails?.level)
          setFieldValue("actual_price", courseDetails?.actual_price)
          setFieldValue("course_description", courseDetails?.course_description)
          setFieldValue("course_preview", courseDetails?.course_preview)
          setFieldValue("thumbnail", courseDetails?.thumbnail)
          setCourseOffers(courseDetails?.course_offers.split("~"));
          const initialEditorState = RichTextEditor.createValueFromString(courseDetails?.course_description, 'html');
          setCourseRequirements(courseDetails?.course_requirements.split("~"));
          setEditorState(initialEditorState);
          const jsonFeatures = stringToJSON(courseDetails?.course_features);//pending
          setCourseIncludes(!!jsonFeatures ? jsonFeatures : COURSE_INCLUDES)
          setLoading(false)
          return;
        }
        return toastError(res?.status?.message)
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      if (!!courseUUID) {
        fetchCourseDetails();
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, [courseUUID])


  useEffect(() => {
    try {
      setFieldValue("courseIncludes", JSON.stringify(courseIncludes));
    } catch (error) {
      console.error(error);
    }
  }, [courseIncludes]);

  const handleSectionChange = (index, event) => {
    try {
      const { name, value } = event.target;
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[index][name] = value;
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubsectionChange = (sectionIndex, subsectionIndex, event) => {
    try {
      const { name, value } = event.target;
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subsectionIndex][name] = value;
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSection = () => {
    try {
      const newSectionObject = {
        id: sectionDetails?.sections?.length + 1,
        section_title: "",
        isExpanded: false,
        courseSubSections: [
          {
            title: "",
            description: "",
            resource_list: "",
            resourceList: [{ title: "", link: "" }],
            external_urls_videos: "",
            externalUrls: [{ title: "", link: "" }],
            external_resources: "",
            externalResources: [],
            course_video: "",
            isExpand: false,
          },
        ],
      }
      setSectionsDetails((prevSections) => {
        return {
          ...prevSections,
          sections: [...prevSections?.sections, newSectionObject]
        }
      });
    } catch (error) {
      console.error(error);
    }

  };

  const deleteSection = (index, secUUID) => {
    try {
      if (!!secUUID) {
        CallAPI(endpoints?.updateCourseSection, { status: "0", uuid: secUUID })
          .then((res) => {
            setSectionsDetails((prevSections) => {
              return { ...prevSections, sections: prevSections?.sections.filter((_, i) => i !== index) }
            });
          })

        return;
      }
      setSectionsDetails((prevSections) => {
        return { ...prevSections, sections: prevSections?.sections.filter((_, i) => i !== index) }
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  const addSubsection = (sectionIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections?.sections];
        newSections[sectionIndex].courseSubSections.push({
          id: newSections[sectionIndex].courseSubSections.length,
          title: "",
          description: "",
          resource_list: "",
          external_urls_videos: "",
          externalResources: [],
          externalUrls: [{ title: "", link: "" }],
          course_video: "",
          resourceList: [{ title: "", link: "" }],

        });
        return { ...prevSections, sections: newSections };
      });
    } catch (error) {
      console.error(error);
    }

  };

  const deleteSubsection = (sectionIndex, subsectionIndex, subSecUUId) => {
    try {
      if (!!subSecUUId) {
        CallAPI(endpoints?.updateSubsection, { status: "0", uuid: subSecUUId })
          .then((res) => {
            setSectionsDetails((prevSections) => {
              const newSections = [...prevSections.sections];
              newSections[sectionIndex].courseSubSections = newSections[sectionIndex].courseSubSections.filter((_, i) => i !== subsectionIndex);
              return { ...prevSections, sections: newSections };
            });
          })
        return;
      }
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections = newSections[sectionIndex].courseSubSections.filter((_, i) => i !== subsectionIndex);
        return { ...prevSections, sections: newSections };
      });

    } catch (error) {
      console.error(error);
    }

  };

  const addResourceLink = (sectionIndex, subsectionIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subsectionIndex].resourceList.push({
          title: "",
          link: "",
        });
        return { ...prevSections, sections: newSections };
      });
    } catch (error) {
      console.error(error);
    }

  };

  const deleteResourceLink = (sectionIndex, subsectionIndex, resIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections?.sections];
        newSections[sectionIndex].courseSubSections[
          subsectionIndex
        ].resourceList.splice(resIndex, 1);
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  // const onResourceTitleChange = (
  //   sectionIndex,
  //   subsectionIndex,
  //   resIndex,
  //   event
  // ) => {
  //   const { value } = event.target;
  //   setSectionsDetails((prevSections) => {
  //     const newSections = [...prevSections];
  //     const resourceArray =
  //       newSections[sectionIndex].courseList[
  //         subsectionIndex
  //       ].resource_list.split(",");
  //     resourceArray[resIndex] = value;
  //     // newSections[sectionIndex].courseList[subsectionIndex].resource_list =
  //       resourceArray.join(",");
  //     return newSections;
  //   });
  // };

  const addExternalUrl = (sectionIndex, subsectionIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subsectionIndex].externalUrls.push({ title: "", link: "" });
        return { ...prevSections, sections: newSections };
      });
    } catch (error) {
      console.error(error);
    }

  };

  const deleteExternalUrl = (sectionIndex, subsectionIndex, urlIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[
          subsectionIndex
        ].externalUrls.splice(urlIndex, 1);
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  const handleResourceLinkChange = (
    sectionIndex,
    subsectionIndex,
    resIndex,
    event
  ) => {
    try {
      const { name, value } = event.target;
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subsectionIndex].resourceList[resIndex][name] = value;
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  const handleExternalUrlChange = (sectionIndex, subsectionIndex, urlIndex, event) => {
    try {
      const { name, value } = event.target;
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subsectionIndex].externalUrls[urlIndex][name] = value;
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  const handleChangeThumbnail = async (e) => {

    try {
      const _files = Array.from(e.target.files);
      const ext = _files[0].name.split('.').pop();


      const isValidFile = validProfileExtension.includes(ext);
      if (!isValidFile) {
        return toastError('This file is not supported!');
      }

      const thumbnailFormData = new FormData();
      thumbnailFormData.append('thumbImage', _files[0]);
      // Debug FormData


      // const thumbnailResponse = await axios.post(
      //   SERVER_URL + endpoints.uploadCourseThumbnail,
      //   thumbnailFormData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     // onUploadProgress: (progressEvent) => {
      //     //   const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //     //   const progressBar = document.getElementById('progress-bar-thumbnail');
      //     //   if (progressBar) {
      //     //     progressBar.style.display = progress > 0 ? 'block' : 'none';
      //     //     progressBar.value = progress;
      //     //   }
      //     // },
      //   }
      // );
      const thumbnailResponse=await CallAPI(endpoints.uploadCourseThumbnail,thumbnailFormData)

      const { data } = thumbnailResponse;

      if (thumbnailResponse) {
        setFieldValue('thumbnail', thumbnailResponse?.filename);
        if (!showSaveWidget) {
          triggerSaveButton();
        }
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      toastError('File upload failed. Please try again.');
    }
  };





  const handleChangeVideoPreview = async (e) => {
    try {
      const _files = Array.from(e.target.files);
      const fileSplit = _files[0].name.split(".")
      const fileExt = fileSplit[fileSplit.length - 1]
      const isValidFile = videoValidation.includes(fileExt);
      if (!isValidFile) {
        return toastError("This file is not supported!")
      }
      const formData = new FormData();
      formData.append("course_preview", _files[0]);

      // const videoResponse = await axios.post(SERVER_URL + endpoints.uploadCourseVideos, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //     const progressBar = document.getElementById('progress-bar-previewVideo');
      //     if (progressBar) {
      //       if (progress > 0) {
      //         progressBar.style.display = `block`;
      //         progressBar.value = progress;
      //         progressBar.style.transition = `${progressBar.value} 0.3s ease-in-out`;
      //       }
      //       if (progress === 99 || progress === 100) {
      //         progressBar.style.display = `none`;
      //         progressBar.value = 0;
      //       }
      //     }
      //   }
      // })
      const videoResponse = await CallAPI(endpoints.uploadCourseVideos, formData);
      const { data } = videoResponse;

      if (videoResponse) {
        setFieldValue("course_preview", videoResponse[0]?.filename)
        if (!showSaveWidget) {
          triggerSaveButton();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteFile = (file) => {
    try {
      setFieldValue("thumbnail", "")
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
    //add try catch
  };

  const handleDeletePeview = () => {
    try {
      setFieldValue("course_preview", "")
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  }





  const handleChangeRichEditor = (value) => {
    try {
      setEditorState(value);
      setFieldValue('course_description', value.toString('html'))
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  }


  const handleAddOffer = () => {
    try {
      setCourseOffers((prev) => [...prev, ""])
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddRequirement = () => {
    try {
      setCourseRequirements((prev) => [...prev, ""])
    } catch (error) {
      console.error(error);
    }
  }


  const handleOfferChange = (e) => {
    try {
      const { name, value } = e.target;
      setCourseOffers((prev) => {
        const updated = [...prev]
        updated[name] = value;
        return updated;
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeRequirements = (e) => {
    try {
      const { name, value } = e.target;
      setCourseRequirements((prev) => {
        const updated = [...prev]
        updated[name] = value;
        return updated;
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectIncludes = (_name) => {
    try {
      if (courseIncludes.length > 0) {
        const updatedCourseIncludes = courseIncludes.map((items) => {
          if (items?.name === _name) {
            return { ...items, checked: !items?.checked }
          }
          return items;
        })
        setCourseIncludes(updatedCourseIncludes);
      }
      if (!showSaveWidget) {
        triggerSaveButton();
      }
      // setCourseIncludes
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  //    values.thumbnail=''
  //    console.log('values.thumbnail :>> ', values.thumbnail);
  //   return () => {

  //   };
  // }, [values.thumbnail]);


  useEffect(() => {
    try {
      setFieldValue("courseOffer", courseOffer?.join("~"));
    } catch (error) {
      console.error(error);
    }
  }, [courseOffer])

  useEffect(() => {
    try {
      setFieldValue("courseRequirements", courseRequirements?.join("~"))
    } catch (error) {
      console.error(error);
    }
  }, [courseRequirements])

  return (
    <form onSubmit={handleSubmit} id="courseUploadFormId">
      <Container
        maxW="100%"
        className={`${Styles?.mainContainer}`}
        padding="0px 0px"
      >
        {showSaveWidget && <SaveButton onSave={(e) => {
          e.preventDefault();
          handleSubmit();
        }} onCancel={() => {
          triggerSaveButton();
        }} />}
        {formLoading && <div className={`${Styles?.loadingForm} fadeElement`}>

        </div>}
        <Tabs>
          <TabList>
            <Tab
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
              marginRight={{ base: "10px", md: "20px" }}
            >
              Course Details
            </Tab>
            <Tab
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
              marginRight={{ base: "10px", md: "20px" }}
            >
              Course Content
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel padding="0px" margin={"10px"}>
              <Box className={Styles?.addProfileBody}>

                <Box
                  // flex="1"
                  className={Styles?.fieldContainer}
                >
                  <div className={Styles?.leftField}>
                    <Text width="40%" display="flex" alignItems="center">
                      Title
                    </Text>
                    <div className={Styles?.fieldWrapper}>
                      <Input
                        name="course_title"
                        value={values.course_title}
                        placeholder="Title"
                        onChange={(e) => {
                          handleChange(e)
                          if (!showSaveWidget) {
                            triggerSaveButton();
                          }
                        }}
                        onBlur={handleBlur}
                        width="100%"
                      />
                      {errors.course_title && touched.course_title ? (
                        <Text className="errorFieldLogin">
                          {errors.course_title}
                        </Text>
                      ) : (
                        ""
                      )}
                    </div>

                  </div>

                  <div className={Styles?.rightField}>
                    <Text width="40%" display="flex" alignItems="center">
                      Course Type
                    </Text>
                    <div className={Styles?.fieldWrapper}>
                      <Select
                        name="course_type"
                        value={values.course_type}
                        placeholder="Select Course Type"
                        onChange={(e) => {
                          handleChange(e);
                          if (!showSaveWidget) {
                            triggerSaveButton();
                          }
                        }}
                        onBlur={handleBlur}
                        width="100%"
                      >
                        <option value="IT and Consultancy">
                          IT and Consultancy
                        </option>
                        <option value="Software Engineering">
                          Software Engineering
                        </option>
                        <option value="Finance and Business">
                          Finance and Business
                        </option>
                        <option value="metaverse">Metaverse</option>
                      </Select>
                      {errors.course_type && touched.course_type ? (
                        <Text className="errorFieldLogin">
                          {errors.course_type}
                        </Text>
                      ) : (
                        ""
                      )}
                    </div>

                  </div>

                </Box>
                {/* <Flex> */}
                <Box className={Styles?.fieldContainer}>

                  <div className={Styles?.leftField}>
                    <Text display="flex" >
                      Level
                    </Text>
                    <div className={Styles?.fieldWrapper}>
                      <Select
                        name="level"
                        value={values.level}
                        placeholder="Level"
                        onChange={(e) => {
                          handleChange(e)
                          if (!showSaveWidget) {
                            triggerSaveButton();
                          }
                        }}
                        onBlur={handleBlur}
                        width="100%"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Professional</option>
                      </Select>
                      {errors.level && touched.level ? (
                        <Text className="errorFieldLogin">
                          {errors.level}
                        </Text>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className={Styles?.rightField}>
                    <Text display="flex" >
                      Price (USD)
                    </Text>
                    <div className={Styles?.fieldWrapper}>
                      <Input
                        type="number"
                        name="actual_price"
                        value={values.actual_price}
                        placeholder="Price"
                        onChange={(e) => {
                          handleChange(e)
                          if (!showSaveWidget) {
                            triggerSaveButton();
                          }
                        }}
                        onBlur={handleBlur}
                      />


                      {errors.actual_price && touched.actual_price ? (
                        <Text className={`errorFieldLogin`}>
                          {errors.actual_price}
                        </Text>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Box>


                <Box className={Styles?.fullContainer}>
                  <Text display={"flex"} >
                    Course Description
                  </Text>
                  <Flex
                    flexDirection="column"
                    padding="0px"
                    // width="70%"
                    margin="0px"
                  >
                    <RichTextEditor
                      value={editorState}
                      className={Styles?.formDescription}
                      onChange={handleChangeRichEditor}
                      placeholder="Enter description"
                    />
                    {errors.course_description && touched.course_description ? (
                      <Text className="errorFieldLogin">
                        {errors.course_description}
                      </Text>
                    ) : (
                      ""
                    )}
                  </Flex>
                </Box>
                <Box className={Styles?.offerRequirementContainer}>
                  <Box className={`${Styles?.fullContainer} ${Styles?.fullFlex}`}>
                    <Text display={"flex"} >
                      What does this course offer
                    </Text>
                    <Flex
                      flexDirection="column"
                      padding="0px"
                      // width="70%"
                      margin="0px"
                    >
                      <input type="hidden" value={values?.courseOffer} />
                      {courseOffer.map((items, index) => {
                        return (
                          <div className={`${Styles?.offerField} fadeIn`}>
                            <Input placeholder={`Offer ${index + 1}`} value={items} onChange={handleOfferChange} type="text" pr={"28px"} name={`${index}`} />
                            {courseOffer.length > 1 && < CloseIcon className={Styles?.closeIcon} onClick={() => { setCourseOffers(courseOffer.filter((items, idx) => idx !== index)) }} />}
                          </div>

                        )

                      })}
                      <Button onClick={handleAddOffer} size="sm">
                        Add offer
                      </Button>


                    </Flex>
                  </Box>

                  <Box className={`${Styles?.fullContainer} ${Styles?.fullFlex}`}>
                    <Text display={"flex"} >
                      Requirements
                    </Text>
                    <Flex
                      flexDirection="column"
                      padding="0px"
                      // width="70%"
                      margin="0px"
                    >
                      <input type="hidden" id="courseRequirements" value={values?.courseRequirements} />
                      {courseRequirements.map((items, index) => {
                        return (
                          <div className={Styles?.offerField}>
                            <Input type="text" placeholder={`Requirement ${index + 1}`} value={items} pr={"28px"} name={`${index}`} onChange={handleChangeRequirements} />
                            {courseRequirements.length > 1 && <CloseIcon className={Styles?.closeIcon} onClick={() => { setCourseRequirements(courseRequirements.filter((items, idx) => idx !== index)) }} />}
                          </div>

                        )
                      })}
                      <Button onClick={handleAddRequirement} size="sm">
                        Add Requirement
                      </Button>


                    </Flex>
                  </Box>

                </Box>




                <Box className={Styles?.fullContainer}>
                  <Text display={"flex"} >
                    Course features
                  </Text>
                  <Box
                    padding="0px"
                    margin="0px"
                    className={Styles?.courseIncludeContainer}
                  >
                    <input type="hidden" name="courseIncludes" value={values?.courseIncludes} />
                    {courseIncludes?.map((items, index) => {
                      return (
                        items?.status && <div className={Styles?.courseIncludeField}>
                          <TecButton className={`${items?.checked ? Styles?.activeUploadButton : ""}`}
                            onClick={() => { handleSelectIncludes(items?.name) }}
                          >
                            <p> {items?.name}</p>
                          </TecButton>
                        </div>

                      )
                    })}
                  </Box>
                </Box>

                <Box className={Styles?.offerRequirementContainer}>
                  <Box className={`${Styles?.fullContainer} ${Styles?.fullFlex}`}>
                    <Text display={"flex"} >
                      Thumbnail
                    </Text>
                    <Flex
                      flexDirection="column"
                      padding="0px"

                      // width="70%"
                      margin="0px"
                    >

                      <ThumbnailUploader
                        accept=".jpeg,.png,.jpg"
                        isThumbnail={true}
                        handleChangeUploader={handleChangeThumbnail}
                        name={"thumbnail"}
                        files={thumbnailFiles}
                        setFiles={setThumbnailFiles}
                        handleDeleteFile={handleDeleteFile}
                        fileUrls={[values['thumbnail']]}
                      />
                      {<progress id="progress-bar-thumbnail" style={{ display: "none", height: '7px' }} value="0" max="100" />}

                      {errors.thumbnail && touched.thumbnail ? (
                        <Text className="errorFieldLogin">
                          {errors.thumbnail}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Box>

                  <Box className={`${Styles?.fullContainer} ${Styles?.fullFlex}`}>
                    <Text display={"flex"} >
                      Course Preview
                    </Text>
                    <Flex
                      flexDirection="column"
                      padding="0px"
                      // width="70%"
                      margin="0px"
                    >
                      <ThumbnailUploader
                        accept=".mp4"
                        isThumbnail={false}
                        handleChangeUploader={handleChangeVideoPreview}
                        name={"course_preview"}
                        handleDeleteFile={handleDeletePeview}
                        fileUrls={[values['course_preview']]}

                      />
                      {<progress id="progress-bar-previewVideo" style={{ display: "none", height: '7px' }} value="0" max="100" />}

                      {errors.course_preview && touched.course_preview ? (
                        <Text className="errorFieldLogin">
                          {errors.course_preview}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Box>
                </Box>



              </Box>
            </TabPanel>
            <TabPanel padding="0px">
              <CourseSection
                showSaveWidget={showSaveWidget}
                triggerSaveButton={triggerSaveButton}
                sectionDetails={sectionDetails?.sections?.sort((a, b) => a.sequence - b.sequence)}
                onSectionChange={handleSectionChange}
                onAddSection={addSection}
                onDeleteSection={deleteSection}
                onSubsectionChange={handleSubsectionChange}
                onAddSubsection={addSubsection}
                onDeleteSubsection={deleteSubsection}
                onAddResourceLink={addResourceLink}
                onDeleteResourceLink={deleteResourceLink}
                onResourceLinkChange={handleResourceLinkChange}
                onAddExternalUrl={addExternalUrl}
                onDeleteExternalUrl={deleteExternalUrl}
                onExternalUrlChange={handleExternalUrlChange}
                setSectionsDetails={setSectionsDetails}

              />
              {/* <Button
                isDisabled={loading}
                bg="#6d31ed"
                color="white"
                colorScheme="purple"
                mt="20px"
                width="100%"
                type="submit"
              >
                {loading ? <BOLoading /> : "Submit"}
              </Button> */}
              <TecButton
                title="Submit"
                type="submit"
                className={`tecPrimaryButton ${Styles?.marginAutoLeft} marginTop-3`}

              />

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </form >
  );
};

export default CourseUpload;
