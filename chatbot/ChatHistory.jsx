import React, { useContext, useEffect, useRef } from "react";
import { Box, Text, Image } from "@chakra-ui/react"; // Import Chakra UI components
import profile from "../../img/unnamed.jpg";
import star from "../../img/star.svg";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { ChatContext } from "./ChatProvider";
import { placeHolderImage } from "../Config";
import Robot from "../../img/Robot.png"

const ChatHistory = () => {
  const { chatHistory } = useContext(ChatContext);

  const endOfMessagesRef = useRef(null);

  // Scroll to the bottom when chatHistory changes
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  
  const ReadmeRenderer = ({ readmeContent }) => {
    const processedContent = remark()
      .use(remarkHtml)
      .processSync(readmeContent)
      .toString();

    return (
      <Box
        dangerouslySetInnerHTML={{ __html: processedContent }}
        mt="20px"
        fontSize="16px"
        // pl="14px" // Add spacing
      />
    );
  };

  return (
    <Box
      height="auto"
      minHeight="400px"
      width={"100%"}
      overflowY="auto"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      ref={React.useRef(null)}
    >   
      <Image src={Robot} width={"200px"} height={"200px"} marginBottom={"20px"}></Image>
      <Text>"Hello, I’m a bot. How can I assist you today?"</Text>
      <Box
        w="100%"
        justifyContent="normal"
        mt="5"
        display="flex"
        flexDirection="column"
        gap="3"
      >
        {chatHistory.map((message, index) => (
          <React.Fragment key={index}>
            <Box w="100%" justifyContent="flex-end" alignItems="center">
              <Box
                w="100%"
                justifyContent="flex-start"
                alignItems="center"
                rounded="md"
                px="3"
                py="4"
                fontSize="xl"
                color="white"
                bg="#efebfe"
              >
                <Box
                  w="100%"
                  justifyContent="flex-start"
                  gap="2"
                  alignItems="flex-start"
                  display="flex"
                  textAlign={"start"}
                >
                  <Image
                    src={placeHolderImage}
                    alt="profile"
                    w="8"
                    h="8"
                    mt="1"
                    rounded="full"
                  />

                  <Text fontSize="16px" pl="2" color={"black"}>
                    {message.userMessage}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box w="100%" justifyContent="normal" alignItems="flex-start">
              <Box
                w="100%"
                justifyContent="flex-start"
                alignItems="center"
                rounded="md"
                px="3"
                pb="4"
                fontSize="xl"
                color="white"
                bg="#8a0fe5"
              >
                <Box overflow="auto" gap="2" alignItems="flex-start" display="flex" justifyContent={"flex-start"} textAlign={"start"}>
                  {/* <Image
                    src={star}
                    alt="profile"
                    w="8"
                    h="8"
                    mt="5"
                    rounded="full"
                  /> */}

                  <ReadmeRenderer readmeContent={message.modelResponse} />
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        ))}
        <div ref={endOfMessagesRef} />
      </Box>
    </Box>
  );
};

export default ChatHistory;
