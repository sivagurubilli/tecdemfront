import React from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  Heading,
  IconButton,
  Card,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import Styles from "./courseUploader.module.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CourseSubsection from "./CourseSubsection";


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CourseSection = ({
  sectionDetails,
  onSectionChange,
  onAddSection,
  onDeleteSection,
  onSubsectionChange,
  onAddSubsection,
  onDeleteSubsection,
  onAddResourceLink,
  onDeleteResourceLink,
  onResourceLinkChange,
  onAddExternalUrl,
  onDeleteExternalUrl,
  onExternalUrlChange,
  onExternalResource,
  onhandleChangeVideos,
  setSectionsDetails,
  onResourceTitleChange,
  files,
  setFiles,
  showSaveWidget,
  triggerSaveButton
}) => {



  const handleExpandSection = (section) => {
    try {
      const updatedSection = sectionDetails?.map((items) => {
        if (items?.id === section?.id) {
          return { ...items, isExpanded: !items?.isExpanded }
        }
        return items;
      })
      setSectionsDetails((prev) => ({ ...prev, sections: updatedSection }));
    } catch (error) {
      console.error(error);
    }
  }


  const handleExpandSubSection = (secIndex, subIndex, expand) => {
    try {

      const updatedSection = sectionDetails?.map((items, idx) => {
        if (idx === secIndex) {
          items.courseSubSections[subIndex].isExpand = expand
          return { ...items, courseSubSections: items?.courseSubSections }
        }
        return items;
      })
      setSectionsDetails((prev) => ({ ...prev, sections: updatedSection }));
    } catch (error) {
      console.error(error);
    }
  }


  const onDragEnd = (result) => {
    try {
      if (!result.destination) {
        return;
      }
      const reorderedItems = reorder(
        sectionDetails,
        result.source.index,
        result.destination.index
      );
      const updatedSections = reorderedItems.map((items, index) => ({ ...items, sequence: index }))
      setSectionsDetails((prev) => ({ ...prev, sections: updatedSections }))
      if (!showSaveWidget) {
        triggerSaveButton();
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <Container maxW="100%" className={`${Styles?.mainContainer} `} padding="0px">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable11">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: 'none', padding: 0 }}

            >

              {sectionDetails?.map((section, sectionIndex) => {
                return (
                  <Draggable
                    // isDragDisabled={true}
                    key={section.id} draggableId={`${section.id}`} index={sectionIndex}>

                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          // userSelect: 'none',
                          // padding: '16px',
                          // margin: '4px 0',
                          // background: '#f3f3f3',
                          ...provided.draggableProps.style
                        }}
                      >
                        <Box
                          // padding="10px"
                          // paddingTop="0px"
                          // boxShadow="lg"
                          mt="10px"
                          className="fadeElement"
                        >
                          <Box
                            className={Styles?.addProfileBody}
                            // marginTop="20px"
                            key={sectionIndex}
                          >
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              // p={3}
                              bg={"#f2f2f2"}
                              borderRadius={"4px"}
                              className={Styles?.sectionTitleContainer}

                            >
                              <Heading as="h5" size="md" w={"100%"} textAlign={"left"} cursor={"pointer"} fontSize={"18px"} height={"100%"} p={3}
                                onClick={() => handleExpandSection(section)}
                              >
                                Section {sectionIndex + 1}{!!section?.section_title ? `: ${section?.section_title}` : ""}
                              </Heading>
                              <div className={Styles?.rightSectionActions}>
                                {section?.isExpanded ?
                                  <i onClick={() => handleExpandSection(section)} className="fas fa-angle-down"></i> :
                                  <i onClick={() => handleExpandSection(section)} className="fas fa-angle-right"></i>}
                                {<i
                                  onClick={() => onDeleteSection(sectionIndex, section?.uuid)}
                                  className="fas fa-circle-xmark"></i>}
                                <i className={`fas fa-grip-lines ${Styles?.grapIcons}`}></i>

                              </div>

                            </Box>

                            {section?.isExpanded && <Box flex="1" mt={2} className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
                              <Text width="30%" display="flex" alignItems="center">
                                Title
                              </Text>
                              <Input
                                width="80%"
                                name="section_title"
                                value={section.section_title}
                                placeholder="Title"
                                onChange={(event) => onSectionChange(sectionIndex, event)}
                              />
                            </Box>
                            }
                            {<CourseSubsection className={`${section?.isExpanded ? `${Styles?.visibleSubsection} fadeElement` : Styles?.hiddenSections}`}
                              sectionIndex={sectionIndex}
                              showSaveWidget={showSaveWidget}
                              triggerSaveButton={triggerSaveButton}
                              section={section}
                              subsections={section.courseSubSections}
                              onSubsectionChange={(subsectionIndex, event) =>
                                onSubsectionChange(sectionIndex, subsectionIndex, event)
                              }
                              onAddSubsection={() => onAddSubsection(sectionIndex)}
                              onDeleteSubsection={(subsectionIndex, subIndex, uuid) =>
                                onDeleteSubsection(subsectionIndex, subIndex, uuid)
                              }
                              onAddResourceLink={(sectionIndex, subsectionIndex) =>
                                onAddResourceLink(sectionIndex, subsectionIndex)
                              }
                              onDeleteResourceLink={(subsectionIndex, resIndex) =>
                                onDeleteResourceLink(sectionIndex, subsectionIndex, resIndex)
                              }
                              onResourceLinkChange={(subsectionIndex, resIndex, event) =>
                                onResourceLinkChange(
                                  sectionIndex,
                                  subsectionIndex,
                                  resIndex,
                                  event
                                )
                              }
                              handleExpandSubSection={handleExpandSubSection}
                              // onResourceTitleChange={(subsectionIndex, resIndex, event) =>
                              //   onResourceTitleChange(
                              //     sectionIndex,
                              //     subsectionIndex,
                              //     resIndex,
                              //     event
                              //   )
                              // }
                              onAddExternalUrl={(secIndex, index) =>
                                onAddExternalUrl(secIndex, index)
                              }
                              onDeleteExternalUrl={(subsectionIndex, urlIndex) =>
                                onDeleteExternalUrl(sectionIndex, subsectionIndex, urlIndex)
                              }
                              onExternalUrlChange={(subsectionIndex, urlIndex, event) =>
                                onExternalUrlChange(
                                  sectionIndex,
                                  subsectionIndex,
                                  urlIndex,
                                  event
                                )
                              }
                              setSectionsDetails={setSectionsDetails}

                            // onExternalResource={(subsectionIndex, event) =>
                            //   onExternalResource(subsectionIndex, event)
                            // }
                            // onhandleChangeVideos={(subsectionIndex, event) =>
                            //   onhandleChangeVideos(subsectionIndex, event)
                            // }
                            // onExternalResource={onExternalResource}
                            // onhandleChangeVideos={onhandleChangeVideos}
                            />}
                          </Box>
                          <Divider className={Styles?.sectionDivider} />
                        </Box>
                      </li>
                    )}

                  </Draggable>
                )
              })}

            </ul>)}
        </Droppable>
      </DragDropContext>
      <Button onClick={onAddSection} mt={4} size="sm">
        Add Section
      </Button>
    </Container >
  );
};

export default CourseSection;
