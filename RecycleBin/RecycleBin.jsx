import Styles from "./Recycle.module.css";
import {
    ChakraProvider,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box,
    Divider,
    Grid,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getID, setID } from "../../siteConfig";
import { decrypt, encrypt } from "../../middleware/auth";
import { COURSE_LINK } from "../Config";
import NoDataFound from "../NoDataFound/NoDataFound";
import { FileIcon, isObjectAllKeysBlank, toastError } from "../../util_helper";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";
import { BOLoading, TecButton } from "../elements/elements";
import { ShimmerSectionHeader } from "react-shimmer-effects";
import messageService from "../MessageService/Index";
import ToggleButton from "../ToggleButton/ToggleButton";

const RecycleBin = (props) => {
    const { setShowRecycleBin, showRecycleBin } = props;
    const [selected, setSelected] = useState([]);
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [recycleData, setRecycleData] = useState({});
    const userId = getID('userId') || "";
    const [loading, setLoading] = useState('');
    const [totalLength, setTotalLength] = useState([]);
    const [loadingAll, setLoadingAll] = useState(false);
    const fetchRecycleBinData = () => {
        try {
            CallAPI(endpoints?.getTrashData, {
                user_id: userId
            }).then((res) => {
                setLoading('')
                const { status, data } = res;
                if (status?.code === 200) {
                    setRecycleData(data);
                    const ArrayData = Object.entries(data);
                    const uuids = []
                    ArrayData.map(([keys, value]) => {
                        value.map((items) => {
                            uuids.push(items?.uuid)
                        })
                    })
                    setTotalLength(uuids.length);
                    return;
                }
                toastError(status?.message);
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        try {
            if (showRecycleBin) {
                fetchRecycleBinData();
                onOpen();
            } else {
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    }, [showRecycleBin])


    const handleDelete = (uuid) => {
        try {
            if (!!uuid) {
                setLoading({ delId: uuid })
                CallAPI(endpoints?.updateTrashData, {
                    uuid: uuid,
                    status: '0',
                }).then((res) => {
                    // toast.success(res?.status?.message)
                    setLoading('')
                    setLoadingAll(false);
                    fetchRecycleBinData();
                    setSelected([])
                })
            }
            // if (getID('recycleBin')) {
            //     const recycleBin = JSON.parse(decrypt(getID('recycleBin')));
            //     const resourceLinks = recycleBin?.resourceLinks;
            //     const updateLink = resourceLinks.filter((items, idx) => idx !== indx)
            //     const updatedForSession = { ...recycleBin, resourceLinks: updateLink }
            //     setID('recycleBin', encrypt(JSON.stringify(updatedForSession)))
            //     setRecycleData((prev) => {
            //         return { ...prev, resourceLinks: updateLink }
            //     })
            // }
        } catch (error) {
            console.error(error);
        }
    }



    const handleRestoreData = (type, data) => {
        try {
            setLoading({ restoreId: data?.uuid })
            CallAPI(endpoints?.restoreData, data)
                .then((res) => {
                    setLoading('')
                    toast.success(res?.status?.message, {
                        pauseOnHover: false
                    })
                    fetchRecycleBinData();
                    messageService.sendMessage("recycleBin", {}, "courseDetailsPage")
                    messageService.sendMessage("recycleBin", {}, "restoreData")

                })
        } catch (error) {
            console.error(error);
        }
    }



    const handleCheckList = (e) => {
        try {
            const { id } = e.target;
            if (selected.includes(id)) {
                setSelected(selected.filter((item) => item !== id));
                return;
            }
            setSelected((prev) => [...prev, id])
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectAll = (isChecked) => {
        try {
            if (!!isChecked) {
                const ArrayData = Object.entries(recycleData);
                const uuids = []
                ArrayData.map(([keys, value]) => {
                    value.map((items) => {
                        uuids.push(items?.uuid)
                    })
                })
                setSelected(uuids);
                return;
            }
            setSelected([]);
        } catch (error) {
            console.error(error);
        }
    }


    const handleDeleteAll = () => {
        try {
            setLoading('')
            setLoadingAll(true)
            handleDelete(selected.join("~"))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ChakraProvider>
            <Drawer
                isOpen={isOpen}
                placement="right"
                size={"lg"}
                onClose={()=> {
                    setShowRecycleBin(false)
                    onClose();
                }}
            >
                <DrawerOverlay />
                <DrawerContent className={Styles?.drawerContainer}>
                    <DrawerHeader>
                        <h5>Recycle Bin {totalLength > 0 && `(${totalLength})`}</h5>
                        <Text className={Styles?.noteLabel}>Recycle Bin data will be permanently deleted in 48 hours!</Text>
                    </DrawerHeader>
                    {/* <Divider /> */}

                    {loading == 'init' ?
                        <Box padding={7} w={"100%"}>
                            <ShimmerSectionHeader />
                            <ShimmerSectionHeader />
                            <ShimmerSectionHeader />
                            <ShimmerSectionHeader />

                        </Box>

                        : <DrawerBody>
                            <Box display={"flex"} justifyContent={"flex-start"}>
                                {totalLength > 0 && <ToggleButton selectedAll={selected.length > 0 ? selected.length === totalLength : false} label="Selected All" onToggle={handleSelectAll} />}
                            </Box>
                            {/* {isObjectAllKeysBlank(recycleData) && <NoDataFound title="No data to restore!" />} */}
                            {recycleData?.resourceLinks?.length > 0 && <Box className={Styles?.sectionContainer}>
                                <Divider />
                                <h6>
                                    Resource Links:
                                </h6>
                                <Box>
                                    <Grid
                                        // templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                                        gap={3}
                                        display={"flex"}
                                        flexDirection={"column"}

                                    >
                                        {recycleData?.resourceLinks?.map((items, index) => {
                                            const [title, link] = items?.recycle_data.split("~");
                                            return (<Box className={Styles?.linkWidget} key={index} borderRadius="md">
                                                <Box className={Styles?.contentContainer}>
                                                    {<input type="checkbox" checked={selected.includes(items?.uuid)} id={items?.uuid} onChange={handleCheckList} />}
                                                    {<img width={"35"} src={COURSE_LINK} />}
                                                    <Text>{title}</Text>
                                                </Box>


                                                <Box className={Styles?.buttonContainer}>
                                                    <TecButton
                                                        title={loading?.restoreId === items?.uuid ? <BOLoading /> : <i class="fas fa-window-restore"></i>}
                                                        className="tecPrimaryButton"
                                                        onClick={() => {
                                                            handleRestoreData('resourceLinks', items)
                                                        }}
                                                    />
                                                    <TecButton
                                                        title={loading?.delId === items?.uuid ? <BOLoading /> : <i class="fas fa-trash"></i>}
                                                        className="tecDangerButton"
                                                        onClick={() => {
                                                            handleDelete(items?.uuid);
                                                        }}
                                                    />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Grid>



                                </Box>

                            </Box>}

                            {recycleData?.comments?.length > 0 && <Box className={Styles?.sectionContainer}>
                                <Divider />
                                <h6>
                                    Comments:
                                </h6>

                                <Box>
                                    <Grid

                                        gap={3}
                                        display={"flex"}
                                        flexDirection={"column"}

                                    >
                                        {recycleData?.comments?.map((items, index) => {
                                            const [title, link] = items?.recycle_data.split("~");

                                            return (<Box className={Styles?.linkWidget} borderRadius="md">
                                                <Box className={Styles?.contentContainer}>
                                                    {<input type="checkbox" checked={selected.includes(items?.uuid)} id={items?.uuid} onChange={handleCheckList} />}
                                                    <i class="fas fa-comment-dots"></i>
                                                    <Text>{title}</Text>
                                                </Box>


                                                <Box className={Styles?.buttonContainer}>
                                                    <TecButton
                                                        title={loading?.restoreId === items?.uuid ? <BOLoading /> : <i class="fas fa-window-restore"></i>}
                                                        className="tecPrimaryButton"
                                                        onClick={() => {
                                                            handleRestoreData('comments', items)
                                                        }}
                                                    />

                                                    <TecButton
                                                        title={loading?.delId === items?.uuid ? <BOLoading /> : <i class="fas fa-trash"></i>}
                                                        className="tecDangerButton"
                                                        onClick={() => {
                                                            handleDelete(items?.uuid);
                                                        }}
                                                    />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Grid>



                                </Box>

                            </Box>}
                            {recycleData?.resourceFiles?.length > 0 && <Box className={Styles?.sectionContainer}>
                                <Divider />
                                <h6>
                                    Resource Files:
                                </h6>

                                <Box>
                                    <Grid

                                        gap={3}
                                        display={"flex"}
                                        flexDirection={"column"}
                                    >
                                        {recycleData?.resourceFiles?.map((items, index) => {
                                            // const [title, link] = items?.recycle_data.split("~");
                                            const [fileName, url] = items?.recycle_data?.split("~");
                                            return (<Box className={Styles?.linkWidget} borderRadius="md">
                                                <Box className={Styles?.contentContainer}>
                                                    {<input type="checkbox" checked={selected.includes(items?.uuid)} id={items?.uuid} onChange={handleCheckList} />}
                                                    <FileIcon fileName={fileName} size="35px" />
                                                    <Text>{fileName}</Text>
                                                </Box>


                                                <Box className={Styles?.buttonContainer}>
                                                    <TecButton
                                                        title={loading?.restoreId === items?.uuid ? <BOLoading /> : <i class="fas fa-window-restore"></i>}
                                                        onClick={() => {
                                                            handleRestoreData('resourceFiles', items)
                                                        }}
                                                        className="tecPrimaryButton"
                                                    />

                                                    <TecButton
                                                        title={loading?.delId === items?.uuid ? <BOLoading /> : <i class="fas fa-trash"></i>}
                                                        className="tecDangerButton"
                                                        onClick={() => {
                                                            handleDelete(items?.uuid);
                                                        }}
                                                    />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Grid>



                                </Box>

                            </Box>}

                            {recycleData?.reviewList?.length > 0 && <Box className={Styles?.sectionContainer}>
                                <Divider />
                                <h6>
                                    Reviews:
                                </h6>

                                <Box>
                                    <Grid

                                        gap={3}
                                        display={"flex"}
                                        flexDirection={"column"}
                                    >
                                        {recycleData?.reviewList?.map((items, index) => {
                                            // const [title, link] = items?.recycle_data.split("~");
                                            const [fileName, url] = items?.recycle_data?.split("~");
                                            return (<Box className={Styles?.linkWidget} borderRadius="md">
                                                <Box className={Styles?.contentContainer}>
                                                    {<input type="checkbox" checked={selected.includes(items?.uuid)} id={items?.uuid} onChange={handleCheckList} />}
                                                    <i className="fas fa-star"></i>
                                                    <Text>{fileName}</Text>
                                                </Box>


                                                <Box className={Styles?.buttonContainer}>
                                                    <TecButton
                                                        title={loading?.restoreId === items?.uuid ? <BOLoading /> : <i class="fas fa-window-restore"></i>}
                                                        onClick={() => {
                                                            handleRestoreData('reviewList', items)
                                                        }}
                                                        className="tecPrimaryButton"
                                                    />

                                                    <TecButton
                                                        title={loading?.delId === items?.uuid ? <BOLoading /> : <i class="fas fa-trash"></i>}
                                                        className="tecDangerButton"
                                                        onClick={() => {
                                                            handleDelete(items?.uuid);
                                                        }}
                                                    />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Grid>



                                </Box>

                            </Box>}

                            {recycleData?.notes?.length > 0 && <Box className={Styles?.sectionContainer}>
                                <Divider />
                                <h6>
                                    Notes:
                                </h6>

                                <Box>
                                    <Grid

                                        gap={3}
                                        display={"flex"}
                                        flexDirection={"column"}
                                    >
                                        {recycleData?.notes?.map((items, index) => {
                                            // const [title, link] = items?.recycle_data.split("~");
                                            const [fileName, url] = items?.recycle_data?.split("~");
                                            return (<Box className={Styles?.linkWidget} borderRadius="md">
                                                <Box className={Styles?.contentContainer}>
                                                    {<input type="checkbox" checked={selected.includes(items?.uuid)} id={items?.uuid} onChange={handleCheckList} />}
                                                    <i className="fas fa-pencil"></i>
                                                    <Text>{fileName}</Text>
                                                </Box>


                                                <Box className={Styles?.buttonContainer}>
                                                    <TecButton
                                                        title={loading?.restoreId === items?.uuid ? <BOLoading /> : <i class="fas fa-window-restore"></i>}
                                                        onClick={() => {
                                                            handleRestoreData('notes', items)
                                                        }}
                                                        className="tecPrimaryButton"
                                                    />

                                                    <TecButton
                                                        title={loading?.delId === items?.uuid ? <BOLoading /> : <i class="fas fa-trash"></i>}
                                                        className="tecDangerButton"
                                                        onClick={() => {
                                                            handleDelete(items?.uuid);
                                                        }}
                                                    />
                                                </Box>
                                            </Box>)
                                        })}
                                    </Grid>



                                </Box>

                            </Box>}
                        </DrawerBody>}

                    <DrawerFooter>
                        {selected.length > 0 &&
                            <TecButton
                                className="tecDangerButton marginLeft-2"
                                onClick={handleDeleteAll}
                            >
                                {selected.length === 1 ? "Delete" : "Delete All"}
                                {loadingAll && <BOLoading style={{ marginLeft: "5px" }} />}

                            </TecButton>

                        }
                        {loading === 'init' ? "" :
                            <TecButton
                                title="Close"
                                className="tecSecondaryButton marginLeft-2"
                                onClick={() => {
                                    onClose();
                                    setShowRecycleBin(false)
                                    setSelected([]);
                                }}
                            />
                        }

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </ChakraProvider >

    )

}

export default RecycleBin;