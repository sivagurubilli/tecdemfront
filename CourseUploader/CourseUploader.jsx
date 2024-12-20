import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Text,
  Flex,
  List,
  ListItem,
  ListIcon,
  Heading,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { GrNext } from "react-icons/gr";
import UploadHeader from "./uploadHeader.jsx";
import FileUploader from "./FileUplaoder.jsx";
import AddResources from "./AddResources.jsx";
import Card from "../Card";
import ApiData from "../ApiData.jsx";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { RolesList, formList, validProfileExtension, videoValidation } from "../Config.jsx";
import Styles from "./courseUploader.module.css";
import AddProfile from "./AddProfile.jsx";
import AddExperience from "./AddExperience.jsx";
import { CiEraser } from "react-icons/ci";
import ProfileWidget from "../Profile.jsx";
import CourseUpload from "./CourseUpload.jsx";
import { decrypt } from "../../middleware/auth.js";
import { getID } from "../../siteConfig.js";
import { toast } from "react-toastify";
import { CallAPI, post } from "../../middleware/api.js";
import endpoints from "../../middleware/endpoint.js";
import { toastError, toastSuccess } from "../../util_helper.jsx";

const CourseUploader = () => {
  const navigate = useNavigate();
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [coursePreviewFile, setCoursePreview] = useState({
    file: [],
    fileObject: []
  });
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState(3);
  const [fullName, setFullName] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [sectionDetails, setSectionsDetails] = useState(
    {
      course_title: "",
      sections: [
        {
          id: 0,
          section_title: "",
          isExpanded: true,
          courseSubSections: [
            {
              id: 0,
              title: "",
              description: "",
              resourceList: [{ title: "", link: "" }],
              externalUrls: [{ title: "", link: "" }],
              resource_list: [{ title: "", link: "" }],
              external_urls_videos: [{ title: "", link: "" }],
              external_resources: "",
              externalResources: [],
              course_video: "",
              isExpand: false,
            },
          ],
        },
      ]
    }
  );



  const [profileValues, setProfileValues] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    profileSummary: "",
    certificates: "",
  });

  const [formValues, setFormValues] = useState({
    course_title: "",
    course_type: "",
    level: "",
    actual_price: "",
    discounted_price: "",
    course_description: "",
    thumbnail: "",
    courseIncludes: "",
    courseRequirements: "",
    courseOffer: "",
    course_preview: "",
  });

  const handleSelectForm = (id) => {
    try {
      setSelectedForm(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectRole = (e) => {
    try {
      const { checked, value, name } = e.target;
      console.log(checked, value, name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextForm = () => {
    try {
      setSelectedForm((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };



  const handleChangeCoursePreview = (e) => {
    try {
      const _files = Array.from(e.target.files);
      const fileSplit = _files[0].name.split(".")
      const fileExt = fileSplit[fileSplit.length - 1]
      const isValidFile = videoValidation.includes(fileExt);
      if (!isValidFile) {
        return toastError("This file is not supported!")
      }


    } catch (error) {
      console.error(error);
    }
  }


  const handleUploadCertificates = (e) => {
    try {
      const _files = Array.from(e.target.files);
      const newImages = []
      _files.map((file) => {
        const fileSplit = file?.name?.split(".");
        const ext = fileSplit[fileSplit.length - 1];
        const isValidFile = videoValidation.includes(ext);
        if (!isValidFile) {
          return toastError(`${file.name} is not supported file!`)
        }
        newImages.push({
          fileUrl: URL.createObjectURL(file),
          name: file?.name,
        })
      });
      setFiles([...files, ...newImages]);
      setUploadingFiles([...uploadingFiles, ...newImages]);

      // handleChange(newImages.join(","));
    } catch (error) {
      console.error(error);
    }
  };

  const uploadCertificates = () => {
    const formData = new FormData();
    for (const file of uploadingFiles) {
      formData.append("files", file);
    }

    if (formData.has("files") == true) {
      post(endpoints.uploadSessions, formData)
        .then((res) => {
          toastSuccess("Sessions uploaded")
        })
        .catch((error) => {
          toast.error("Failed to upload", {
            pauseOnHover: false
          });
        });
    } else {
      toast.error("No File Selected", {
        pauseOnHover: false
      });
    }

    setUploadingFiles([]);
  };

  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);




  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      // uploadCertificates();

      const sections = sectionDetails?.sections.map(async (section, sectionIndex) => {
        const courseList = section.courseList.map(
          async (subsection, subsectionIndex) => {
            const videoFormData = new FormData();
            let VideoUrls = "";
            if (!!subsection.course_video[0]) {
              videoFormData.append("courseVideos", subsection.course_video[0]);

              const videoResponse = await CallAPI(
                endpoints.uploadCourseVideos,
                videoFormData
              );

              VideoUrls = videoResponse[0].filename;

            }

            const resourcesFormData = new FormData();

            if (Array.isArray(subsection.external_resources)) {
              subsection.external_resources.forEach((file) => {
                resourcesFormData.append("extResources", file);
              });
            }
            const resourcesResponse = await CallAPI(
              endpoints.uploadExternalResources,
              resourcesFormData
            );

            const resourceUrls =
              resourcesResponse
                ?.map((item) => `${item.fileName}~${item.fileUrl}`)
                .join("|") || "";

            const formattedResourceList = subsection.resource_list
              .map((item) => `${item.title}~${item.link}`)
              .join("|");

            const formattedExternalUrls = subsection.external_urls_videos
              .map((item) => `${item.title}~${item.link}`)
              .join("|");
            const updatedCourseList = {
              ...subsection,
              sequence: subsectionIndex,
              external_resources: resourceUrls,
              course_video: VideoUrls,
              resources_list: formattedResourceList,
              external_urls_videos: formattedExternalUrls,
            };

            return updatedCourseList;
          }
        );

        return {
          ...section,
          sequence: sectionIndex,
          courseList: await Promise.all(courseList),
        };
      });

      const updatedSections = await Promise.all(sections);

      const thumbnailFormData = new FormData();
      thumbnailFormData.append("thumbImage", image[0]);
      const thumbnailResponse = await post(
        endpoints.uploadCourseThumbnail,
        thumbnailFormData
      );

      uploadCourseData(thumbnailResponse, updatedSections);
      return;
    } catch (error) {
      toast.error("Failed to upload course data", {
        pauseOnHover: false
      });
      console.error("Error in handleSubmit: ", error);
    } finally {
      setLoading(false);
    }
  };



  const uploadCourseData = (thumbnailUrl, updatedSections) => {
    try {
      const courseData = {
        ...formValues,
        sectionDetails: updatedSections,
        thumbnail: thumbnailUrl.data.filename,
        user_id: userDetails.id,
      };
      post(endpoints.uploadCourse, courseData)
        .then((res) => {
          toastSuccess("Course Added Successfully")
          navigate("/Service");
        })
        .catch((error) => {
          toastError("Failed to Add");
        });
    } catch (error) {
      toast.error("Failed to Add Course", {
        pauseOnHover: false
      });
      console.error("Error in uploadCourseData: ", error);
    }
  };

  const handleDeleteCoursePreview = (file) => {
    try {
      setCoursePreview((prev) => {
        return { ...prev, fileObject: prev.fileObject.filter((items) => items !== file) }
      })
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <Container
      maxW="100%"
      bgColor="white"
      maxH="100%"
      padding="0px 0px 0px 0px"
    >
      <Flex>
        <Box className={Styles?.leftPanelCourseUpload}>
          {/* form menu */}
          <List spacing={3} p={5}>
            {formList.map((items, idx) => {
              return (
                <ListItem
                  mt={5}
                  key={idx}
                  className={`${Styles?.formMenuList} ${selectedForm === items?.id ? Styles?.activeForm : ""
                    }`}
                // onClick={() => {
                //   handleSelectForm(items?.id);
                // }}
                >
                  <ListIcon
                    className={`${selectedForm === items?.id ? Styles?.activeForm : ""
                      }`}
                    as={MdCheckCircle}
                    color="green.500"
                  />
                  {items?.name}
                </ListItem>
              );
            })}
          </List>
          <Box p="3">
            <ProfileWidget fullName={fullName} userData={userDetails} />
          </Box>
        </Box>
        <Box className={Styles?.rightPanelCourseUpload}>
          {/* forms */}
          {selectedForm === 1 && (
            <AddProfile
              profileValues={profileValues}
              setProfileValues={setProfileValues}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              setFullName={setFullName}
              handleNextForm={handleNextForm}
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
              files={files}
              handleUploadCertificates={handleUploadCertificates}
              uploadCertificates={uploadCertificates}
              uploadingFiles={uploadingFiles}
              setUploadingFiles={setUploadingFiles}
              setFiles={setFiles}

            />
          )}
          {selectedForm === 2 && (
            <>
              <AddExperience
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
              />
            </>
          )}
          {selectedForm === 3 && (
            <>
              <CourseUpload
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
                uploadCertificates={uploadCertificates}
                formValues={formValues}
                setFormValues={setFormValues}
                sectionDetails={sectionDetails}
                setSectionsDetails={setSectionsDetails}
                thumbnailFiles={thumbnailFiles}
                setThumbnailFiles={setThumbnailFiles}
                image={image}
                setImage={setImage}
                // handleSubmit={handleSubmit}
                loading={loading}
                handleChangeCoursePreview={handleChangeCoursePreview}
                handleDeleteCoursePreview={handleDeleteCoursePreview}
                coursePreviewFile={coursePreviewFile}
                setCoursePreview={setCoursePreview}

              />
            </>
          )}
        </Box>
        {false && <Box flex="2" className={Styles?.parentRolesDiv}>
          {/* role area */}
          <Box className={Styles?.rolesDiv}>
            <Box p="3">
              <Heading as={"h6"}>Select your role in Tecdemy</Heading>
            </Box>
            <Box p="3">
              <Text>Select Plans</Text>
              <Select placeholder="Select option">
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="learner">Learner</option>
                <option value="university">University</option>
                <option value="mentor">Mentor</option>
                <option value="department">Department</option>
              </Select>
              <Text className={Styles?.dropDownCaption} mt={1}>
                This below results are displayed based on the plan selected
              </Text>
            </Box>
            <Box p="3">
              <Heading
                className={Styles?.selectChannelTitle}
                textAlign={"left"}
                as={"h6"}
              >
                Select Channels & Apps
              </Heading>
            </Box>
            <Box p="3">
              <List spacing={3}>
                {RolesList.map((items, indx) => {
                  return (
                    <ListItem mb={1} key={indx}>
                      <Checkbox
                        colorScheme="purple"
                        defaultChecked
                        value={items?.name}
                        onChange={handleSelectRole}
                      >
                        {items?.name}
                      </Checkbox>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            <Box className={Styles?.rightDivFooter}>
              <i class="fas fa-calendar"></i>
              <Text className={Styles?.dropDownCaption}>
                Schedule availability
              </Text>
            </Box>
          </Box>
        </Box>}
      </Flex>
    </Container>
  );
};

export default CourseUploader;
