import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Heading,
  IconButton,
  Flex,
  Textarea,
  Card,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import ThumbnailUploader from "./ThumbnailUploader";
import Styles from "./courseUploader.module.css";
import { FaDrumSteelpan } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toastError } from "../../util_helper";
import { validExternalResources, videoValidation } from "../Config";
import endpoints from "../../middleware/endpoint";
import { CallAPI } from "../../middleware/api";
import { SERVER_URL } from "../../siteConfig";
import axios from "axios";




const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


const CourseSubsection = ({
  subsections,
  onSubsectionChange,
  onAddSubsection,
  onDeleteSubsection,
  onAddResourceLink,
  onDeleteResourceLink,
  onResourceLinkChange,
  onAddExternalUrl,
  onDeleteExternalUrl,
  onExternalUrlChange,
  setSectionsDetails,
  sectionIndex,
  onResourceTitleChange,
  section,
  className,
  showSaveWidget,
  triggerSaveButton

  // handleExpandSubSection
}) => {
  const [extfile, setExtFile] = useState({});
  const [externalResourceUrl, setExternalResourceUrl] = useState("");
  const [videofile, setVideoFile] = useState("");
  const [video, setVideo] = useState("");

  const handleUploadResources = (e, secIndex, subIndex) => {
    try {
      const { name, files } = e.target;
      const _files = Array.from(files);
      const newImages = []
      _files.map(async (file) => {
        const fileSplited = file?.name?.split(".");
        const ext = fileSplited[fileSplited.length - 1];
        const isValidFile = validExternalResources.includes(ext);
        if (!isValidFile) {
          return toastError(`${file.name} is not supported!`)
        } else {
          const resourcesFormData = new FormData();
          resourcesFormData.append("extResources", file);
          const resourcesResponse = await CallAPI(endpoints.uploadExternalResources, resourcesFormData);
          setSectionsDetails((prevSections) => {
            const newSections = [...prevSections?.sections];
            newSections[secIndex].courseSubSections[subIndex].externalResources =
              [...newSections[secIndex]?.courseSubSections[subIndex].externalResources, ...resourcesResponse];
            return { ...prevSections, sections: newSections };
          });
          if (!showSaveWidget) {
            triggerSaveButton();
          }
        }
      });

    } catch (error) {
      console.error(error);
    }

  };

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      const url = URL.createObjectURL(file);

      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(url); // Release memory
        resolve(video.duration);
      };

      video.src = url;
    });
  };

  const handleUploadVideos = async (secIndex, subIndex, e) => {
    try {
      const { name, files } = e.target;
      const _files = Array.from(files);
      const fileSplited = _files[0]?.name?.split(".");
      const ext = fileSplited[fileSplited.length - 1];
      const isValidFile = videoValidation.includes(ext);
      if (!isValidFile) {
        return toastError(`This file is not supported!`)
      }

      const filesWithDuration = await Promise.all(
        _files.map(async (file) => {
          const duration = await getVideoDuration(file);
          return {
            url: URL.createObjectURL(file),
            name: file.name,
            duration: Math.floor(duration),
          };
        })
      );

      const newImages = filesWithDuration.map(({ url, name, duration }) => ({
        url,
        name,
        duration,
      }));
      const videoFormData = new FormData();
      videoFormData.append("course_preview", files[0]);
      const progressBar = document.getElementById(`progress-bar-courseVideo${subIndex}`);
      const videoResponse = await axios.post(SERVER_URL + endpoints.uploadCourseVideos, videoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (progressBar) {
            if (progress > 0) {
              progressBar.style.display = `block`;
              progressBar.value = progress;
              progressBar.style.transition = `${progressBar.value} 0.3s ease-in-out`;
            }
            if (progress === 99 || progress === 100) {
              progressBar.style.display = `none`;
              progressBar.value = 0;
            }
          }
        }
      })
      const { data } = videoResponse;



      // const videoResponse = await CallAPI(endpoints.uploadCourseVideos, videoFormData);
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[secIndex].courseSubSections[subIndex].course_video = data[0]?.filename;
        newSections[secIndex].courseSubSections[subIndex].video_length = newImages[0].duration;
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
      progressBar.style.display = `none`;

    } catch (error) {
      console.error(error);
    }

  };


  const handleExpandSubSection = (sectionIndex, subIndex, expand) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[sectionIndex].courseSubSections[subIndex].isExpand = expand;
        return { ...prevSections, sections: newSections };
      });
    } catch (error) {
      console.error(error);
    }

  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      subsections,
      result.source.index,
      result.destination.index
    );
  };


  const handleDeleteFileResources = (url, secIndex, subIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[secIndex].courseSubSections[subIndex].externalResources =
          newSections[secIndex].courseSubSections[subIndex].externalResources.filter((items) => (items.fileUrl !== url))
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteCourseVideo = (url, secIndex, subIndex) => {
    try {
      setSectionsDetails((prevSections) => {
        const newSections = [...prevSections.sections];
        newSections[secIndex].courseSubSections[subIndex].course_video = "";
        return { ...prevSections, sections: newSections };
      });
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Container

      maxW="100%"
      className={`${Styles?.mainContainer} ${className}`}
      marginBottom="10px"
    >

      {subsections?.map((subsection, index) => {
        let externalUrls = [];
        let resourceLinks = [];
        return <Box marginBottom="10px" className="fadeElement" key={index}>
          <Box marginTop="10px">
            <Box className={`${Styles?.lectureHeadings} ${Styles?.sectionTitleContainer}`}>
              <Text fontWeight={"300"} size="md" paddingLeft="10px" w={"100%"} textAlign={"left"} fontSize={"14px"} cursor={"pointer"}
                onClick={() => handleExpandSubSection(sectionIndex, index, !!!subsection?.isExpand)}
              >
                Lecture {index + 1}{!!subsection.title ? `: ${subsection?.title}` : ""}
              </Text>
              <div className={Styles?.rightSectionActions}>
                {subsection?.isExpand ?
                  <i onClick={() => handleExpandSubSection(sectionIndex, index, !!!subsection?.isExpand)} className="fas fa-angle-down"></i> :
                  <i onClick={() => handleExpandSubSection(sectionIndex, index, !!!subsection?.isExpand)} className="fas fa-angle-right"></i>}
                {<i
                  onClick={() => onDeleteSubsection(sectionIndex, index, subsection?.uuid)}
                  className="fas fa-circle-xmark"></i>}
                <i className={`fas fa-grip-lines ${Styles?.grapIcons}`}></i>
              </div>
            </Box>

            {subsection?.isExpand && <div className={`${Styles?.lectureContent} fadeElement`} >

              <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  Title
                </Text>
                <Input
                  width="80%"
                  name="title"
                  value={subsection?.title}
                  placeholder="Title"
                  onChange={(event) => onSubsectionChange(index, event)}
                />
              </Box>

              <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  Description
                </Text>
                <Textarea
                  width="80%"
                  name="description"
                  value={subsection.description}
                  placeholder="Description"
                  onChange={(event) => onSubsectionChange(index, event)}
                />
              </Box>

              <Box className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  Resource Link
                </Text>
                <Box width="80%">
                  {subsection?.resourceList?.map((resource, resIndex) => (
                    <Flex
                      key={resIndex}
                      alignItems="center"
                      mb={2}
                      flexDirection="row"
                    >
                      <Input
                        marginRight="10px"
                        name={`title`}
                        value={resource.title}
                        placeholder="Resource Title"
                        onChange={(event) =>
                          onResourceLinkChange(index, resIndex, event)
                        }
                        mb={2}
                      />
                      <Input
                        name={`link`}
                        value={resource.link}
                        placeholder="Resource Link"
                        onChange={(event) =>
                          onResourceLinkChange(index, resIndex, event)
                        }
                        mb={2}
                      />
                      {resIndex === 0 ? (
                        // Disable delete button for the first item
                        <IconButton
                          icon={<i className="fas fa-trash"></i>}
                          aria-label="Delete External URL"
                          size="sm"
                          ml={2}
                          disabled
                          opacity="0.5"
                        />
                      ) : (
                        // Enable delete button for other items
                        <IconButton
                          icon={<i className="fas fa-trash"></i>}
                          onClick={() => onDeleteResourceLink(index, resIndex)}
                          aria-label="Delete External URL"
                          size="sm"
                          ml={2}
                        />
                      )}
                      {/* <IconButton
                      icon={<i class="fas fa-trash"></i>}
                      onClick={() => onDeleteResourceLink(index, resIndex)}
                      aria-label="Delete Resource Link"
                      size="sm"
                      ml={2}
                    /> */}
                    </Flex>
                  ))}
                  <IconButton
                    width="100%"
                    icon={<AddIcon />}
                    onClick={() => onAddResourceLink(sectionIndex, index)}
                    aria-label="Add Resource Link"
                  />
                </Box>
              </Box>

              {false && <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  External URLs
                </Text>
                <Box width="80%">
                  {subsection?.externalUrls?.map((url, urlIndex) => (
                    <Flex key={urlIndex} alignItems="center" mb={2}>
                      <Input
                        marginRight="10px"
                        name={`title`}
                        value={url.title}
                        placeholder="External url Title"
                        onChange={(event) =>
                          onExternalUrlChange(index, urlIndex, event)
                        }
                        mb={2}
                      />
                      <Input
                        name={`link`}
                        value={url.link}
                        placeholder="External url/Video"
                        onChange={(event) =>
                          onExternalUrlChange(index, urlIndex, event)
                        }
                        mb={2}
                      />
                      {urlIndex === 0 ? (
                        // Disable delete button for the first item
                        <IconButton
                          icon={<i className="fas fa-trash"></i>}
                          aria-label="Delete External URL"
                          size="sm"
                          ml={2}
                          disabled
                          opacity="0.5"
                        />
                      ) : (
                        // Enable delete button for other items
                        <IconButton
                          icon={<i className="fas fa-trash"></i>}
                          onClick={() => onDeleteExternalUrl(index, urlIndex)}
                          aria-label="Delete External URL"
                          size="sm"
                          ml={2}
                        />
                      )}
                    </Flex>
                  ))}
                  <IconButton
                    width="100%"
                    icon={<AddIcon />}
                    onClick={() => onAddExternalUrl(sectionIndex, index)}
                    aria-label="Add External URL"
                  />
                </Box>
              </Box>}

              <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  External Resources
                </Text>
                <ThumbnailUploader
                  accept=".jpeg,.png,.jpg,.pdf,.txt"
                  isThumbnail={false}
                  name={`external_resources${index}`}
                  handleChangeUploader={(e) => {
                    handleUploadResources(e, sectionIndex, index);
                  }}
                  // fileUrls={subsection?.externalResources}
                  subIndex={index}
                  fileUrlsArrayObject={subsection?.externalResources}
                  handleDeleteFile={(url) => {
                    handleDeleteFileResources(url, sectionIndex, index)
                  }}
                />
              </Box>

              <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                <Text width="30%" display="flex">
                  Add Video
                </Text>
                <div className={Styles?.thumbContainer}>
                  <ThumbnailUploader
                    accept=".mp4"
                    isThumbnail={true}
                    name={`course_video${index}`}
                    handleChangeUploader={(e) =>
                      handleUploadVideos(sectionIndex, index, e)
                    }
                    fileUrls={[subsection?.course_video]}
                    subIndex={index}
                    handleDeleteFile={(url) => {
                      handleDeleteCourseVideo(url, sectionIndex, index)
                    }}
                  />
                  {<progress id={`progress-bar-courseVideo${index}EE${sectionIndex}`} style={{ display: "none", height: '7px' }} value="0" max="100" />}
                </div>


              </Box>
            </div>}

          </Box>
        </Box>
      })}

      <Box className={Styles?.addProfileFooter} width="100%">
        <Button onClick={() => onAddSubsection(sectionIndex)} mt="10px" width="100%">
          Add Lecture
        </Button>
      </Box>
    </Container>
  );
};

export default memo(CourseSubsection);
