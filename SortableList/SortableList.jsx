import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from "./Sortable.module.css"
import { Box, Input, Text } from '@chakra-ui/react';
import ResourceLinks from '../ResourceLinks/ResourceLinks';
import { BOLoading } from '../elements/elements';
import { COURSE_DOWNLOAD, COURSE_UPLOAD, ZIP_FILE_ICON } from '../Config';
import { FileIcon, formatTime } from '../../util_helper';
import { getID } from '../../siteConfig';
// Reorder the list array after drag
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const DraggableList = (props) => {
    const {
        dataArray,
        handleOnDragEnd,
        secId,
        selectedVideoDetails,
        handleSelectVideo,
        handleChangeVideoCheck,
        courseId,
        handleEditLink,
        handleDeleteLink,
        handleDownloadFile,
        uploadLoading,
        courseDetailsUserId,
        handleDownloadAllFiles,
        handleDeleteExternalResource,
        handleChangeImage,
        setShowDList
    } = props;
    const userId = getID("userId") || "";
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            dataArray,
            result.source.index,
            result.destination.index
        );
        // setItems(reorderedItems);
        handleOnDragEnd(secId, reorderedItems)

    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ listStyleType: 'none', padding: 0 }}
                        className='fadeElement'
                    >
                        {dataArray.map((item, index) => {
                            const _items = item;
                            const resourceList = !!item?.resources_list
                                ? item?.resources_list.split("~")
                                : [];
                            const externalResource =
                                !!item?.external_resources
                                    ? item?.external_resources.split("|")
                                    : [];
                            return <Draggable key={item.id} draggableId={item?.uuid} index={index}>
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
                                        className={`${styles?.parentSubSectionList} ${styles?.parentSubSectionListOwner} ${item?.id === selectedVideoDetails?.id
                                            ? `${styles?.activeCourseSection} box-border ${styles?.parentSubSectionListActive}`
                                            : styles?.parentSubSectionListInactive
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
                                            className={styles?.labelOfVideo}
                                        >
                                            <input type="checkbox" className="margin-0" checked={item?.progressData?.is_completed == "1"} onChange={(e) => handleChangeVideoCheck(e, secId, item?.id)} />
                                            <label
                                                onClick={() => {
                                                    handleSelectVideo(item);
                                                }}
                                                className={`${styles?.videoTitle} ${item?.id === selectedVideoDetails?.id ? styles.activePlayIcon : ""}`}>{item?.title}</label>
                                            <p className={styles?.videoLength}>{formatTime(item?.video_length) + "min"}</p>
                                            <i className={`fas fa-grip-lines ${styles?.dragIcon}`}></i>
                                        </Text>
                                        <Box
                                            display="flex"
                                            // justifyContent={"space-between"}
                                            alignItems={"flex-start"}
                                            // paddingLeft="20px"
                                            marginBottom={"5px"}
                                            gap="10px"
                                            className={`${styles?.resourcesBox} ${item?.id === selectedVideoDetails?.id ? styles?.resourcesBoxActive : ""}`}
                                        >
                                            <div
                                                className={styles?.listOfLinks}
                                                style={{
                                                    justifyContent: "flex-start",
                                                    flex: "0 0 75%",
                                                }}
                                            >

                                                <ResourceLinks
                                                    resourceLinks={item?.resources_list}
                                                    uuid={item?.uuid}
                                                    index={index}
                                                    courseId={courseDetailsUserId}
                                                    handleEditLink={handleEditLink}
                                                    handleDeleteLink={handleDeleteLink}
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
                                                                        handleDownloadFile(
                                                                            items,
                                                                            externalResource,
                                                                            _items?.uuid,
                                                                            secId,
                                                                            items
                                                                        );
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
                                                className={styles?.listOfLinks}
                                                style={{ justifyContent: "flex-end" }}
                                            >
                                                <Box
                                                    padding="5px"
                                                    borderRadius="50%"
                                                    // border="1px solid black"
                                                    cursor="pointer"
                                                >
                                                    {uploadLoading === item?.uuid ? (
                                                        <BOLoading />
                                                    ) : (
                                                        userId === courseDetailsUserId && <img
                                                            src={COURSE_UPLOAD}
                                                            width="35"
                                                            onClick={() => {
                                                                const element =
                                                                    document.getElementById(
                                                                        `uploadFileId${item?.uuid}`
                                                                    );
                                                                if (!!element) {
                                                                    element.click();
                                                                }
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
                                                            setShowDList(_items?.uuid);
                                                        }}
                                                        className={styles?.downloadContainer}
                                                    // ref={container}
                                                    >
                                                        <img
                                                            src={COURSE_DOWNLOAD}
                                                            width="35"
                                                        />
                                                        {
                                                            <div

                                                                className={`${styles?.externalResourceListContainer} box-shadow`}
                                                            >
                                                                <div
                                                                    className={styles?.externalList}
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
                                                                                styles?.externalListLinks
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
                                                                                    styles?.externalFilesText
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
                                                                                                styles?.externalListLinks
                                                                                            }
                                                                                        >
                                                                                            <FileIcon
                                                                                                fileName={name}
                                                                                            />
                                                                                            <Text
                                                                                                className={
                                                                                                    styles?.externalFilesText
                                                                                                }
                                                                                                onClick={() => {
                                                                                                    handleDownloadFile(
                                                                                                        items,
                                                                                                        externalResource,
                                                                                                        _items?.uuid,
                                                                                                        secId,
                                                                                                        items
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
                                                                                                userId === courseDetailsUserId && <i
                                                                                                    onClick={() => {
                                                                                                        handleDeleteExternalResource(
                                                                                                            items,
                                                                                                            externalResource,
                                                                                                            _items?.uuid,
                                                                                                            secId,
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
                                                    id={`uploadFileId${_items?.uuid}`}
                                                    w={0}
                                                    h={"0px"}
                                                    onChange={(e) => {
                                                        handleChangeImage(
                                                            e,
                                                            _items?.uuid,
                                                            _items?.external_resources,
                                                            secId
                                                        );
                                                    }}
                                                />
                                            </div>

                                        </Box>
                                    </li>
                                )}
                            </Draggable>
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
