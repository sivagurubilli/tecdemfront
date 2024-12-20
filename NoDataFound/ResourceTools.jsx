import { SimpleGrid, Box, Text, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FileIcon } from "../../util_helper";
import Styles from "./ResourceTools.module.css"
import { COURSE_LINK, COURSE_DOWNLOAD } from "../Config";
import NoDataFound from "./NoDataFound";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { AddToTrash } from "../../util_helper";
import messageService from "../MessageService/Index";
import { toast } from "react-toastify";
import EditLInk from "../EditResourceLink/EditLink";
import { getID } from "../../siteConfig";
import { decrypt } from "../../middleware/auth";

const ResourceTools = (props) => {

    const { selectedVideoDetails, handleDownloadFile, handleEditLink, handleUpdateUrl, handleDeleteLink, courseDetails, setSelectedVideosDetails, setCourseDetails, handleDeleteExternalResource, courseId } = props;
    const [imageUrls, setImageUrls] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    let flag = "editExternalVideos"

    const [videoExternalUrls, setVideoExternalUrls] = useState([]);
    const [linkUrls, setLinkUrls] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    const [uploadLoading, setUploading] = useState("");
    const [link, setLink] = useState({
        link: "",
        title: "",
        uuid: "",
    });

    const externalResource = selectedVideoDetails && selectedVideoDetails.external_resources;
    const externalVideos = selectedVideoDetails && selectedVideoDetails.external_urls_videos;
    const externalLinks = selectedVideoDetails && selectedVideoDetails.resources_list;

    const parseResource = selectedVideoDetails.external_resources
        ? selectedVideoDetails.external_resources.split("|")
        : [];
    const parseVideos = selectedVideoDetails.external_urls_videos
        ? selectedVideoDetails.external_urls_videos.split("|")
        : [];
    const parsedLinks = selectedVideoDetails.resources_list
        ? selectedVideoDetails.resources_list.split("|")
        : [];

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi'];
    const documentExtensions = ['.docx', '.pdf', '.txt', '.xlsx'];


    function isFileExtensionAcceptable(fileName, extensions) {
        const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
        return extensions.includes(extension);
    }
    const handleDeleteExternalUrlVideos = (
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
                external_urls_videos: filterList,
                section_id: section_id,
            })
                .then((res) => {
                    setUploading("");
                    if (res?.status?.code === 200) {
                        AddToTrash(uuid, "resourceExternalVideos", fileUrl, courseDetails?.id);
                        courseDetails.sections.length > 0 &&
                            courseDetails.sections.map((secItems) => {
                                secItems.courseSubSections.map((subItems) => {
                                    if (subItems?.uuid === uuid) {
                                        subItems["external_urls_videos"] = filterList;
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
                    toast.error(res?.status?.message);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateExternalUrl = (updateLInk, isUndo) => {
        try {
            let linkIndex = 0;
            let externalLinkIndex = 0;
            const uuid = isUndo ? updateLInk?.uuid : link.uuid;
            let updateExternalUrlVideos = "";

            const sections = courseDetails?.sections;
            const updatedSections = sections.map((section) => {
                const updatedSubSection = section?.courseSubSections?.map((subSection) => {
                    if (subSection.uuid === uuid) {
                        const externalUrl = subSection?.external_urls_videos.split("|");
                        const _externalUrl = externalUrl.filter((item) => item !== "");

                        if (_externalUrl.length > 0) {
                            externalLinkIndex = isUndo ? _externalUrl.length : updateLInk?.linkIndex;
                            _externalUrl[externalLinkIndex] = `${updateLInk?.title}~${updateLInk?.link}`;
                            updateExternalUrlVideos = _externalUrl.join("|");
                            return { ...subSection, external_urls_videos: updateExternalUrlVideos };
                        }
                    }
                    return subSection;
                });
                return { ...section, courseSubSections: updatedSubSection };
            });

            if (!!updateExternalUrlVideos) {
                CallAPI(endpoints?.updateCourseList, {
                    uuid: link?.uuid || updateLInk?.uuid,
                    external_urls_videos: updateExternalUrlVideos,
                });
                setCourseDetails((prev) => ({
                    ...prev,
                    sections: updatedSections
                }));
                setSelectedVideosDetails((prev) => ({
                    ...prev,
                    external_urls_videos: updateExternalUrlVideos
                }));
            }

        } catch (error) {
            console.error("Error updating URL:", error);
        }
    };
    const handleEditExternalVideos = (link, title, uuid, idx, allLinks, isEdit) => {
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

    useEffect(() => {
        const userDetails = JSON.parse(decrypt(localStorage.getItem('userData')));
        setUserDetails(userDetails)

        if (externalResource) {
            const parsedResource = externalResource.split("|");
            const imageResources = parsedResource.filter(resource => {
                const [name] = resource.split("~");
                return isFileExtensionAcceptable(name, imageExtensions);
            });
            setImageUrls(imageResources);
        }
        if (externalVideos) {
            const parsedVideos = externalVideos.split("|");
            setVideoExternalUrls(parsedVideos)
        }
        if (externalLinks) {
            const parsedLinks = externalLinks.split("|");
            setLinkUrls(parsedLinks);
        }
        console.log(courseDetails, "courseDetails")
    }, [selectedVideoDetails]);

    return (<>
        {selectedVideoDetails.external_resources?.length > 0 || selectedVideoDetails.external_urls_videos?.length > 0 || selectedVideoDetails.externalLinks?.length > 0 ?
            (<>
                <Grid templateColumns="repeat(3, 1fr)" gap={1}>

                    {externalResource ? <Box >
                        <h6>External Resources</h6>

                        {/* <GridItem key={index}> */}
                        {parseResource?.length > 0 && (

                            parseResource.map((resource, index) => {
                                const [name, url] = resource.split("~");
                                const isImage = isFileExtensionAcceptable(name, imageExtensions);
                                const isDocument = isFileExtensionAcceptable(name, documentExtensions);

                                return (
                                    <GridItem key={index} w="100%">
                                        {/* <Box display="flex" flexDirection="column" alignItems="center" overflow="hidden"> */}

                                        {isImage ? (
                                            <>
                                                <div style={{ display: "flex", alignItems: "center", gap: "2" }}>
                                                    <img
                                                        onClick={() => window.open(url, "_blank")}
                                                        src={url}
                                                        alt={`Resource ${index + 1}`}
                                                        style={{ height: "10%", width: "10%", objectFit: 'fill' }}
                                                    />
                                                    <p className={Styles?.FileTitle}>{name}</p>
                                                    {(userDetails.id == courseDetails.user_id) ? (
                                                        <Grid gap={2} display="flex" flexDirection="row" marginLeft="12px">
                                                            <Button style={{ marginRight: "2px" }} size="sm" title="download" onClick={() => handleDownloadFile(url, name)}>
                                                                <i className="fas fa-download"></i>
                                                            </Button>
                                                            <Button size="sm" title="delete" onClick={() => handleDeleteExternalResource(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                        </Grid>
                                                    ) : ""}</div>
                                            </>
                                        ) : isDocument ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                <FileIcon size="40px" fileName={name} />
                                                <p className={Styles?.FileTitle}>{name}</p>
                                                {userDetails.id == courseDetails.user_id
                                                    && (

                                                        <Grid gap={2} display="flex" flexDirection="row" marginLeft="12px">
                                                            <Button size="sm" title="download" onClick={() => handleDownloadFile(url, name)}>
                                                                <i className="fas fa-download"></i>
                                                            </Button>
                                                            <Button size="sm" title="delete" onClick={() => handleDeleteExternalResource(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                        </Grid>
                                                    )}
                                            </div>
                                        ) : ""}
                                        {/* </Box> */}
                                    </GridItem>
                                );
                            })
                        )}
                        {/* </GridItem> */}
                    </Box> : ""}

                    {externalLinks ?
                        <Box>
                            <h6>Resource Links</h6>
                            <Grid templateColumns="repeat(1, 1fr)" gap={1}>
                                {externalLinks && (
                                    <>
                                        {/* <Grid templateColumns="repeat(5, 1fr)" gap={8}> */}
                                        {parsedLinks?.length > 0 && (
                                            parsedLinks.map((resource, index) => {
                                                const [name, url] = resource.split("~");

                                                return (
                                                    <div style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                        <img onClick={() => window.open(url, "_blank")} src={COURSE_LINK} style={{ width: "40px" }} className={Styles?.parentLinkImage} />
                                                        <p onClick={() => window.open(url, "_blank")} className={Styles?.FileTitle}>{name}</p>
                                                        {userDetails.id == courseDetails.user_id ? (
                                                            <Grid gap={2} display="flex" flexDirection="row" marginLeft="12px">
                                                                <Button size="sm" title="Editlink" onClick={() => handleEditLink(url, name, selectedVideoDetails.uuid, index, parsedLinks, true)}>
                                                                    <i className={`fas fa-pen`}></i>
                                                                </Button>
                                                                <Button size="sm" title="Delete" onClick={() => handleDeleteLink(`${name}~${url}`, selectedVideoDetails.uuid, index)}>
                                                                    <i className="fas fa-trash"></i>
                                                                </Button>
                                                            </Grid>
                                                        )
                                                            : ""}

                                                    </div>
                                                );
                                            })
                                        )}
                                        {/* </Grid> */}
                                    </>
                                )}
                            </Grid>
                        </Box> : ""}
                    {externalVideos ?
                        <Box>
                            {externalVideos ? (
                                <>
                                    <h6>External URL Videos </h6>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                                        {parseVideos && parseVideos.length > 0 && parseVideos.map((resource, index) => {
                                            const [name, url] = resource.split("~");

                                            return (
                                                <div key={index} style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                    <img onClick={() => window.open(url, "_blank")} src={COURSE_LINK} style={{ width: "40px" }} className={Styles?.parentLinkImage} />
                                                    <p onClick={() => window.open(url, "_blank")} className={Styles?.FileTitle}>{name}</p>
                                                    {/* <Button style={{ marginLeft: "12px" }} size="sm" title="Open Link" onClick={() => window.open(url, "_blank")}>
                                                    <i className="fas fa-link"></i>
                                                </Button> */}
                                                    {userDetails.id == courseDetails.user_id && (
                                                        <Grid gap={2} display="flex" flexDirection="row" marginLeft="12px">
                                                            <Button size="sm" title="Edit External Video" onClick={() => {
                                                                handleEditExternalVideos(url, name, selectedVideoDetails.uuid, index, parseVideos, true);
                                                            }}>
                                                                <i className="fas fa-pen"></i>
                                                            </Button>
                                                            <Button size="sm" title="Delete" onClick={() => {
                                                                handleDeleteExternalUrlVideos(
                                                                    resource,
                                                                    parseVideos,
                                                                    selectedVideoDetails.uuid,
                                                                    selectedVideoDetails.section_id,
                                                                    resource
                                                                );
                                                            }}>
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </Grid>
                                </>
                            ) : ""}
                        </Box> : ""}
                </Grid >

                {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={1}>
                    <Box>
                        {externalResource ? <h6>External Resources</h6> : ""}
                        {parseResource?.length > 0 && (
                            parseResource.map((resource, index) => {
                                const [name, url] = resource.split("~");
                                const isImage = isFileExtensionAcceptable(name, imageExtensions);
                                const isDocument = isFileExtensionAcceptable(name, documentExtensions);

                                return (
                                    <GridItem key={index} w="100%">
                                        {isImage ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "2" }}>
                                                <img
                                                    onClick={() => window.open(url, "_blank")}
                                                    src={url}
                                                    alt={`Resource ${index + 1}`}
                                                    style={{ height: "10%", width: "10%", objectFit: 'fill' }}
                                                />
                                                <p className={Styles?.FileTitle}>{name}</p>
                                                {userDetails.id == courseDetails.user_id && (
                                                    <SimpleGrid columns={2} gap={2} marginLeft="12px">
                                                        <Button size="sm" title="download" onClick={() => handleDownloadFile(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                            <i className="fas fa-download"></i>
                                                        </Button>
                                                        <Button size="sm" title="delete" onClick={() => handleDeleteExternalResource(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>
                                                    </SimpleGrid>
                                                )}
                                            </div>
                                        ) : isDocument ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                <FileIcon size="40px" fileName={name} />
                                                <p className={Styles?.FileTitle}>{name}</p>
                                                {userDetails.id == courseDetails.user_id && (
                                                    <SimpleGrid columns={2} gap={2} marginLeft="12px">
                                                        <Button size="sm" title="download" onClick={() => handleDownloadFile(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                            <i className="fas fa-download"></i>
                                                        </Button>
                                                        <Button size="sm" title="delete" onClick={() => handleDeleteExternalResource(resource, parseResource, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>
                                                    </SimpleGrid>
                                                )}
                                            </div>
                                        ) : ""}
                                    </GridItem>
                                );
                            })
                        )}
                    </Box>

                    <Box>
                        {externalLinks ? <h6>Resource Links</h6> : ""}
                        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} gap={1}>
                            {externalLinks && (
                                parsedLinks?.length > 0 && (
                                    parsedLinks.map((resource, index) => {
                                        const [name, url] = resource.split("~");

                                        return (
                                            <div key={index} style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                <img onClick={() => window.open(url, "_blank")} src={COURSE_LINK} style={{ width: "40px" }} className={Styles?.parentLinkImage} />
                                                <p onClick={() => window.open(url, "_blank")} className={Styles?.FileTitle}>{name}</p>
                                                {userDetails.id == courseDetails.user_id && (
                                                    <SimpleGrid columns={2} gap={2} marginLeft="12px">
                                                        <Button size="sm" title="Editlink" onClick={() => handleEditLink(url, name, selectedVideoDetails.uuid, index, parsedLinks, true)}>
                                                            <i className={`fas fa-pen`}></i>
                                                        </Button>
                                                        <Button size="sm" title="Delete" onClick={() => handleDeleteLink(`${name}~${url}`, selectedVideoDetails.uuid, index)}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>
                                                    </SimpleGrid>
                                                )}
                                            </div>
                                        );
                                    })
                                )
                            )}
                        </SimpleGrid>
                    </Box>

                    <Box>
                        {externalVideos ? (
                            <>
                                <h6>External URL Videos</h6>
                                <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} gap={6}>
                                    {parseVideos?.length > 0 && parseVideos.map((resource, index) => {
                                        const [name, url] = resource.split("~");

                                        return (
                                            <div key={index} style={{ display: "flex", alignItems: "center", gap: "2", marginTop: "20px" }}>
                                                <img onClick={() => window.open(url, "_blank")} src={COURSE_LINK} style={{ width: "40px" }} className={Styles?.parentLinkImage} />
                                                <p onClick={() => window.open(url, "_blank")} className={Styles?.FileTitle}>{name}</p>
                                                {userDetails.id == courseDetails.user_id && (
                                                    <SimpleGrid columns={2} gap={2} marginLeft="12px">
                                                        <Button size="sm" title="Edit External Video" onClick={() => handleEditExternalVideos(url, name, selectedVideoDetails.uuid, index, parseVideos, true)}>
                                                            <i className="fas fa-pen"></i>
                                                        </Button>
                                                        <Button size="sm" title="Delete" onClick={() => handleDeleteExternalUrlVideos(resource, parseVideos, selectedVideoDetails.uuid, selectedVideoDetails.section_id, resource)}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>
                                                    </SimpleGrid>
                                                )}
                                            </div>
                                        );
                                    })}
                                </SimpleGrid>
                            </>
                        ) : ""}
                    </Box>
                </SimpleGrid> */}


                <EditLInk
                    flag={flag}
                    isOpen={isOpen}
                    onClose={onClose}
                    link={link}
                    setLink={setLink}
                    handleUpdateExternalUrl={handleUpdateExternalUrl}
                />
            </>
            )
            : <NoDataFound title="No Resources are available" />}

    </>);
}

export default ResourceTools;
