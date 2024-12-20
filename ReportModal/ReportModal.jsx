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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
    ButtonGroup,
} from "@chakra-ui/react";
import Styles from "./Report.module.css"
import messageService from "../MessageService/Index";
import { useState } from "react";
import { getID } from "../../siteConfig";
import { toast } from "react-toastify";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { BOLoading, TecButton } from "../elements/elements";
import labelConfig from "../Config/labelConfig";


const ReportModal = (props) => {
    const { showReportPopup } = props;
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        try {
            const { value, name } = e.target;
            setFormData((prev) => {
                return { ...prev, [name]: value }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmitReport = () => {
        try {
            if (!!!formData?.issue || !!!formData?.reportReason) {
                return toast.error("All fields are required!"), {
                    pauseOnHover: false
                }
            }
            const reqData = {
                ...formData,
                review_id: showReportPopup?.reviewObject?.id,
                user_id: getID('userId')
            }
            setLoading(true)
            CallAPI(endpoints?.commentReport, reqData).then((res) => {
                setLoading(false)
                if (res?.status?.code === 200) {
                    toast.success(res?.status?.message, {
                        pauseOnHover: false
                    })
                    messageService.sendMessage('review', { show: false }, 'reportModal')
                    return;
                }
                toast.error(res?.status?.message, {
                    pauseOnHover: false
                })
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal isOpen={true} style={{ boxShadow: "white" }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{labelConfig?.lbl_report_header}</ModalHeader>
                <ModalBody>
                    <Text textAlign="left">
                        {labelConfig?.lbl_report_body}
                    </Text>
                    <Text fontWeight="bold" pt="5px">
                        {labelConfig?.lbl_report_reason}
                    </Text>
                    <select
                        name="reportReason"
                        className={Styles?.selectInput}
                        onChange={handleChange}
                        value={formData?.reportReason}
                    >
                        <option value="">Select reason</option>
                        <option>Inappropriate Comment</option>
                        <option>Inappropriate Behavior</option>
                        <option>Spam Content</option>
                        <option>Abusive Content</option>
                        <option>Other</option>
                    </select>

                    <Text fontWeight="bold" pt="5px">
                        {labelConfig?.lbl_report_issue}
                    </Text>
                    <Input
                        name="issue"
                        value={formData?.issue}
                        onChange={handleChange}
                    >
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <TecButton
                        onClick={() => {
                            messageService.sendMessage('review', { show: false }, 'reportModal')
                        }}
                        title="Cancel"
                        className="tecSecondaryButton marginRight-2"
                    />

                    <TecButton
                        onClick={handleSubmitReport}
                        className="tecPrimaryButton"
                    >
                        Submit
                        {loading &&
                            <BOLoading style={{ marginLeft: "10px" }} />}
                    </TecButton>
                </ModalFooter>
            </ModalContent >
        </Modal>

    )
}
export default ReportModal;