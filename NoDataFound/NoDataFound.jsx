import { Box } from "@chakra-ui/react";
import Styles from "./NoDataFound.module.css"
const NoDataFound = (props) => {
    const { title = "No data found!", className = "" } = props;
    return <Box className={`${Styles?.noDataFoundContainer} ${className}`}>
        <h5>{title}</h5>
    </Box>
}

export default NoDataFound;