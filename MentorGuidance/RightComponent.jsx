import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import CardCourse from "../MbotCard";
import ApiData from "../ApiData";
import styles from "./RightComponent.module.css"

const RightComponent = ({ videoId , isLocal}) => {
  const marginLeft = useBreakpointValue({
    base: "1%", // Margin-left for smaller screens
    md: "1%",  // Margin-left for medium screens and above
  });



  console.log("Video Id is", videoId);

  return (
    <CardCourse
      URL={videoId}
    />
  );
};

export default RightComponent;
