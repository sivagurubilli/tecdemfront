import { Box, Container, Text, useMediaQuery } from "@chakra-ui/react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import Draggable from "react-draggable";

export default function ChatBot({isExpanded}) {

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (

      <Container
        onClick={(event) => event.stopPropagation()}
        height={isExpanded ? "600px" : "400px"}
      width={isExpanded ? "700px" : "500px"}
        borderRadius="md"
        backgroundColor="transparent"
        padding={"0px"}
        margin={"0px"}
        display={"flex"}
        flexDirection={"column"}
        // justifyContent={"center"}
        textAlign="center"
        position={isMobile?'absolute':'relative'}
        left={0}

      >
        {/* <Text
          fontSize="2xl"
          fontWeight="bold"
          className="textStyle"
          // marginBottom="1"
          color="#8a0fe5"
          height="40px"
          paddingLeft={isExpanded ? "100px" : "0px"}
        >
          Tecdemy
        </Text> */}
        <Box overflow="auto" height="75%" width={isExpanded ? "125%" : "105%"} borderRadius={"10px"}>
          <ChatHistory />
        </Box>
        <ChatInput isExpanded={isExpanded}/>
      </Container>

  );
}
