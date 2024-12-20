import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Select,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { messageConfig } from "../Config/messageConfig";


const EditLInk = (props) => {
    const { isOpen, onClose, link, handleUpdateUrl, handleUpdateExternalUrl, setLink, flag } = props;
    return <Modal isOpen={isOpen}>
        <ModalOverlay>
            <ModalContent>
                {flag !== 'editExternalVideos' ? (<ModalHeader>{!!link?.isEdit ? "Edit Resource Link" : "Add Resource Link"}</ModalHeader>) :
                    <ModalHeader>{!!link?.isEdit ? "Edit External Url Videos" : "Add External Url Videos"}</ModalHeader>}
                <ModalBody>
                    <Box
                        width="100%"
                        display="flex"
                        // flexDir="column"
                        // justifyContent="center"
                        alignItems="center"
                        mb={5}
                        gap={4}
                    >
                        <Text>Title: </Text>
                        <Input
                            type="text"
                            placeholder="Enter title"
                            width="95%"
                            // mt="15px"
                            // height="40px"
                            name="enter_title"
                            autoComplete="off"
                            value={link?.title}
                            onChange={(e) => setLink((prev) => {
                                return { ...prev, title: e.target.value }
                            })}
                        ></Input>
                    </Box>
                    <Box
                        width="100%"
                        display="flex"
                        alignItems="center "
                        gap={5}
                    >
                        <Text>Link: </Text>
                        <Input
                            type="text"
                            placeholder="Enter link"
                            width="95%"
                            // mt="15px"
                            // height="40px"
                            name="enter_link"
                            autoComplete="off"
                            value={link?.link}
                            onChange={(e) => setLink((prev) => {
                                return { ...prev, link: e.target.value }
                            })}
                        ></Input>
                    </Box>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Button
                            width="46%"
                            mt="15px"
                            height="40px"
                            onClick={() => {
                                onClose();
                                setLink((prev) => {
                                    return { ...prev, isEdit: false }
                                })
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            width="46%"
                            mt="15px"
                            height="40px"
                            color="white"
                            bgColor="#6e31ec"
                            onClick={() => {
                                if (!!link.link && !!link.title) {
                                    const titles = link?.allLinks?.map((items) => items.split("~")[0])
                                    if (titles.includes(link.title)) {
                                        return toast.error(messageConfig?.msg_link_already_exist, {
                                            pauseOnHover: false
                                        })
                                    }
                                    {
                                        flag !== 'editExternalVideos' ? handleUpdateUrl(link) :
                                            handleUpdateExternalUrl(link)
                                    }

                                    onClose();
                                    setLink((prev) => {
                                        return { ...prev, isEdit: false }
                                    })
                                } else {
                                    return toast.error("Field is required!", {
                                        pauseOnHover: false
                                    });
                                }
                            }}>
                            Save
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>

    </Modal>
}

export default EditLInk;