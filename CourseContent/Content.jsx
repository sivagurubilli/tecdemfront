import React from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";
import Styles from "../CourseVideo.module.css";
import {
  ShimmerTitle,
  ShimmerThumbnail,
  ShimmerSectionHeader,
} from "react-shimmer-effects";

import DraggableList from "../SortableList/SortableList";
import ResourceLinks from "../ResourceLinks/ResourceLinks";
import { FileIcon, formatTime } from "../../util_helper";
import { BOLoading } from "../elements/elements";
import {
  COURSE_DOWNLOAD,
  COURSE_UPLOAD,
  ZIP_FILE_ICON,
} from "../Config";


export default function Content({ ...props }) {
  const {
    courseDetails,
    handleSelectVideo,
    userId,
    loading,
    setLoading,
    handleOnDragEnd,
    videoSectionName,
    setVideoSectionName,
    selectedVideoDetails,
    handleChangeVideoCheck,
    handleEditLink,
    handleDeleteLink,
    handleDownloadFile,
    uploadLoading,
    handleDownloadAllFiles,
    handleDeleteExternalResource,
    handleChangeImage,
    setShowDList,
    handleScrollToWidget,
    container,
    divRefs,
    isExpanded,
  } = props

  // const sections = courseDetails.sections
  return (
    <>
      <Box display="flex" flexDir={"column"} height="auto" width="100%">
        {/* <Accordion allowToggle width="100%">
              {
                (sections)?
                sections.map((data=>{
                  return(
                    <>
                      <AccordionItem >
                        <h2>
                          <AccordionButton bg="#FAFAFA">
                            <Box as='span' flex='1' textAlign='left' fontWeight="bold" >
                              {data.section_title} 
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {
                            data.courseSubSections.map((item)=>{
                              return(
                                <>
                                <Box width="100%" height="auto" bg="#FAFAFA" borderRadius="5px" border="1px solid darkgray" padding="10px" mt="5px" cursor="pointer" onClick={()=>handleSelectVideo(item)}>
                                  <Text fontWeight="bold">{item.title}</Text>
                                </Box>                                  
                                </>
                              )
                            })
                          }
                        </AccordionPanel>
                      </AccordionItem>
                    </>
                  )
                }))
                :
                "No data !"
              }
                
              </Accordion> */}
        <Box m="10px 0px">
          <Text fontSize="20px" fontWeight="700">
            {courseDetails?.course_title}
          </Text>
        </Box>


        <Accordion
          // className={`mainCollapseContainer ${Styles?.sectionContainer}`}
          width={"100%"}
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
            courseDetails?.sections?.map((secItems) => {
              const completedCourseLength = secItems?.courseSubSections?.filter((items) => items?.progressData?.is_completed === "1");
              const isActiveSection = selectedVideoDetails.section_id == secItems?.id || false;
              const videoTimes = secItems?.courseSubSections.map((items) => { return items?.video_length });
              const totalVideoLength = videoTimes.reduce((a, b) => parseInt(a) + parseInt(b), 0)

              return (
                <AccordionItem overflow={"unset"}>
                  <h2
                    style={{
                      padding: "0px",
                      marginBottom: "0px",
                      textDecoration: "none",
                    }}
                  >
                    <AccordionButton bg={"rgba(0, 0, 0, 0.04)"} onClick={() => setVideoSectionName(secItems.section_title)}>
                      <Box as="span" flex="1" textAlign="left" className={`${isActiveSection ? Styles?.activeCourseSectionParent : ""}`}>
                        <h6>
                          {isActiveSection && <i className="fas fa-circle-play" style={{ marginRight: "5px" }}></i>}
                          {secItems?.section_title} ({completedCourseLength?.length}/
                          {secItems?.courseSubSections?.length})
                        </h6>
                      </Box>
                      <p className={Styles?.videoLength}>{formatTime(totalVideoLength) + "min"}</p>
                      <AccordionIcon className={`${isActiveSection ? Styles?.sectionDropIcons : ""} ${Styles.dropSection}`} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    className={Styles?.subListContainer}
                    overflow={"unset"}
                    p={0}
                  >
                    <DraggableList
                      dataArray={secItems?.courseSubSections}
                      handleOnDragEnd={handleOnDragEnd}
                      secId={secItems?.id}
                      VideoSectionName={videoSectionName}
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
                    />
                    {false && secItems?.courseSubSections?.map((subItem, i) => {
                      const resourceList = !!subItem?.resources_list
                        ? subItem?.resources_list.split("~")
                        : [];
                      const externalResource =
                        !!subItem?.external_resources
                          ? subItem?.external_resources.split("|")
                          : [];
                      return (
                        <div
                          key={i}
                          className={`${Styles?.parentSubSectionList} ${Styles?.parentSubSectionListOwner} ${subItem?.id === selectedVideoDetails?.id
                            ? `${Styles?.activeCourseSection} box-border ${Styles?.parentSubSectionListActive}`
                            : Styles?.parentSubSectionListInactive
                            }`}
                        >

                          <Text
                            marginBottom="5px"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap={"10px"}
                            // paddingLeft="20px"
                            textAlign={"left"}
                            cursor={"pointer"}
                            className={Styles?.labelOfVideo}
                          >

                            {/* <Checkbox
                                    colorScheme="green"
                                    fontWeight="400"
                                    isChecked={subItem?.progressData?.is_completed === "1"}

                                  ></Checkbox> */}
                            <input type="checkbox" checked={subItem?.progressData?.is_completed == "1"} onChange={(e) => handleChangeVideoCheck(e, secItems?.id, subItem?.id)} />
                            <label
                              onClick={() => {
                                handleSelectVideo(subItem);
                              }}
                              className={`${Styles?.videoTitle} ${subItem?.id === selectedVideoDetails?.id ? Styles.activePlayIcon : ""}`}>{subItem?.title}</label>
                          </Text>


                          {(
                            <Box
                              display="flex"
                              // justifyContent={"space-between"}
                              alignItems={"flex-start"}
                              // paddingLeft="20px"
                              marginBottom={"5px"}
                              gap="10px"
                              className={`${Styles?.resourcesBox} ${subItem?.id === selectedVideoDetails?.id ? Styles?.resourcesBoxActive : ""}`}
                            >
                              <div
                                className={Styles?.listOfLinks}
                                style={{
                                  justifyContent: "flex-start",
                                  flex: "0 0 75%",
                                }}
                              >
                                <ResourceLinks
                                  resourceLinks={subItem?.resources_list}
                                  uuid={subItem?.uuid}
                                  index={i}
                                  handleEditLink={handleEditLink}
                                  handleDeleteLink={handleDeleteLink}
                                  courseId={courseDetails?.user_id}
                                />
                                {externalResource.length > 0 &&
                                  externalResource.map((items, index) => {
                                    const [name, url] = items?.split("~");

                                    return (
                                      <Box
                                        padding="5px"
                                        key={index}
                                        borderRadius="50%"
                                        // border="1px solid black"
                                        cursor="pointer"
                                      >
                                        <a
                                          target="_blank"
                                          onClick={() => {
                                            handleDownloadFile(url, name);
                                          }}
                                        >
                                          <FileIcon
                                            size="35px"
                                            fileName={name}
                                          />
                                        </a>
                                      </Box>
                                    );
                                  })}
                              </div>

                              <div
                                className={Styles?.listOfLinks}
                                style={{ justifyContent: "flex-end" }}
                              >
                                <Box
                                  padding="5px"
                                  borderRadius="50%"
                                  // border="1px solid black"
                                  cursor="pointer"
                                >
                                  {uploadLoading === subItem?.uuid ? (
                                    <BOLoading />
                                  ) : (
                                    userId === courseDetails?.user_id && <img
                                      src={COURSE_UPLOAD}
                                      width="35"
                                      onClick={() => {
                                        const element =
                                          document.getElementById(
                                            `uploadFileId${subItem?.uuid}`
                                          );
                                        element.click();
                                      }}
                                    />
                                  )}
                                </Box>
                                {externalResource.length > 0 && (
                                  <Box
                                    padding="5px"
                                    borderRadius="50%"
                                    cursor="pointer"
                                    position={"relative"}
                                    onClick={() => {
                                      setShowDList(subItem?.uuid);
                                    }}
                                    className={Styles?.downloadContainer}
                                    ref={container}
                                  >
                                    <img
                                      src={COURSE_DOWNLOAD}
                                      width="35"
                                    />
                                    {
                                      <div
                                        ref={divRefs}
                                        className={`${Styles?.externalResourceListContainer} box-shadow`}
                                      >
                                        <div
                                          className={Styles?.externalList}
                                        >
                                          <Box
                                            padding="5px"
                                            cursor="pointer"
                                            _hover={{
                                              bgColor: "#afafaf",
                                            }}
                                          >
                                            <a
                                              className={
                                                Styles?.externalListLinks
                                              }
                                              onClick={() => {
                                                handleDownloadAllFiles(
                                                  externalResource
                                                );
                                              }}
                                              download={`External Resource`}
                                            >
                                              <img
                                                src={ZIP_FILE_ICON}
                                                width="25"
                                              />

                                              <Text
                                                className={
                                                  Styles?.externalFilesText
                                                }
                                              >
                                                {"Download All"}
                                              </Text>
                                            </a>
                                          </Box>
                                          {externalResource.length > 0 &&
                                            externalResource.map(
                                              (items, idx) => {
                                                const [name, url] =
                                                  items?.split("~");
                                                return (
                                                  <Box
                                                    key={idx}
                                                    padding="5px"
                                                    cursor="pointer"
                                                    _hover={{
                                                      bgColor: "#afafaf",
                                                    }}
                                                  >
                                                    <div
                                                      className={
                                                        Styles?.externalListLinks
                                                      }
                                                    >
                                                      <FileIcon
                                                        fileName={name}
                                                      />
                                                      <Text
                                                        className={
                                                          Styles?.externalFilesText
                                                        }
                                                        onClick={() => {
                                                          handleDownloadFile(
                                                            url,
                                                            name
                                                          );
                                                        }}
                                                        w={"100%"}
                                                      >
                                                        {name}
                                                      </Text>
                                                      {uploadLoading ===
                                                        items ? (
                                                        <BOLoading />
                                                      ) : (
                                                        userId === courseDetails?.user_id && <i
                                                          onClick={() => {
                                                            handleDeleteExternalResource(
                                                              items,
                                                              externalResource,
                                                              subItem?.uuid,
                                                              secItems?.id,
                                                              items
                                                            );
                                                          }}
                                                          className="far fa-trash-can"
                                                        ></i>
                                                      )}
                                                    </div>
                                                  </Box>
                                                );
                                              }
                                            )}
                                        </div>
                                      </div>
                                    }
                                  </Box>
                                )}

                                <Input
                                  opacity={0}
                                  multiple
                                  type="file"
                                  display={"none"}
                                  accept=".jpg, .png, .jpeg, .pdf, .txt, .xlsx, .docx"
                                  name="uploadFile"
                                  id={`uploadFileId${subItem?.uuid}`}
                                  w={0}
                                  h={"0px"}
                                  onChange={(e) => {
                                    handleChangeImage(
                                      e,
                                      subItem?.uuid,
                                      subItem?.external_resources,
                                      secItems?.id
                                    );
                                  }}
                                />
                              </div>
                            </Box>
                          )}

                        </div>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })
          )}
        </Accordion>

      </Box>
    </>
  )
}
