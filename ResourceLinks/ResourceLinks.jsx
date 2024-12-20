import { Box, Text } from "@chakra-ui/react";
import Styles from "./Resource.module.css"
import { COURSE_LINK } from "../Config";
import { getID } from "../../siteConfig";



const ResourceLinks = (props) => {
    const { resourceLinks, uuid, index, handleEditLink, handleDeleteLink, courseId } = props;
    const resourceLink = !!resourceLinks ? resourceLinks?.split("|") : [];
    const userId = getID("userId") || "";

    return <Box
        padding="5px"
        borderRadius="50%"
        // border="1px solid black"
        cursor="pointer"
        position={"relative"}
        // _hover={{ bgColor: "#afafaf" }}
        className={Styles?.linksContainer}
    >
        <img src={COURSE_LINK} width="35" className={Styles?.parentLinkImage} />

        {/* <i class="fas fa-caret-down"></i> */}
        <Box
            className={`${Styles?.resourcesList} box-shadow`}>
            {courseId === userId && <div className={Styles?.resourceContainer} onClick={() => {
                handleEditLink('', '', uuid, resourceLink?.length, resourceLink, false);
            }}>
                <i className="fas fa-plus"></i>
                <Text >{"Add"}</Text>
            </div>}
            {resourceLink?.map((items, idx) => {
                const [title, link] = items?.split("~")
                return !!items && <div key={idx} className={Styles?.resourceContainer}>
                    <img
                        onClick={() => {
                            window.open(link, "_blank");
                        }}
                        src={COURSE_LINK} width="25" className={Styles?.childImage} />
                    <Text className={Styles?.textLink} onClick={() => {
                        window.open(link, "_blank");
                    }}>{title}</Text>
                    {courseId === userId && <i onClick={() => {
                        handleEditLink(link, title, uuid, idx, resourceLink, true)
                    }} style={{ right: "22px" }} className={`fas fa-pen ${Styles?.editLink}`}></i>}
                    {courseId === userId && <i
                        onClick={() => {
                            handleDeleteLink(`${title}~${link}`, uuid, idx)
                        }}
                        style={{ right: "5px" }} className={`far fa-trash-can ${Styles?.editLink}`}></i>}
                </div>
            })}
        </Box>
        {/* <i className={`fas fa-pen ${Styles?.editLink}`}></i> */}

    </Box >
}

export default ResourceLinks;