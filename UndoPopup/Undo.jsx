import { Box, Button, Text } from "@chakra-ui/react";
import Styles from "./Undo.module.css"
import { getID, setID } from "../../siteConfig";
import { decrypt, encrypt } from "../../middleware/auth";
import messageService from "../MessageService/Index";
import ResourceLinks from "../ResourceLinks/ResourceLinks";
import { TecButton } from "../elements/elements";


const UndoPopup = (props) => {
    const { setShowUndoPopup, showUndoPopup } = props;



    const handleUndoChanges = () => {
        try {
            messageService.sendMessage('dashboardHeader', { show: true }, 'popup');
        } catch (error) {
            console.error(error);
        }
    }


    return <Box
        className={`${Styles?.popupContainer} box-shadow ${!!showUndoPopup?.show ? Styles?.ContainerActive : ""}`}>
        <Box className={Styles?.popupContent}>
            <Box className={Styles?.popupHeader}>
                <Text>
                    Added to recycle bin. Open bin to restore!
                </Text>
            </Box>
            <Box className={Styles?.popupFooter}>
                <TecButton
                    title="Open"
                    className="tecPrimaryButton"
                    onClick={handleUndoChanges}
                />
                <TecButton
                    title="Cancel"
                    className="tecSecondaryButton"
                    onClick={() => { setShowUndoPopup(false) }}
                />
            </Box>

        </Box>
    </Box>
}

export default UndoPopup;