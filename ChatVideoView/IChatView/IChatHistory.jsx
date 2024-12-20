import React, { useContext, useEffect, useRef } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { ChatContext } from "../../chatbot/ChatProvider";
import { placeHolderImage } from "../../Config";
import Robot from "../../../img/Robot.png";
import styles from './IChatHistory.module.css';

const IChatHistory = () => {
  const { chatHistory } = useContext(ChatContext);
  const scrollRef = useRef(null);

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
      />
    );
  };

  useEffect(() => {
    // Smoothly scroll to the bottom of the chat history within this component
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  return (
    <Box
      ref={scrollRef}
      className={styles.scrollable}
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="4"
      height="100%"
      width="100%"
    
    >
      <Image src={Robot} width="80px" height="80px" mb="4" />
      <Text mb="6">"Hello, I’m a bot. How can I assist you today?"</Text>
      <Box
        mt="5"
        width="100%"
        display="flex"
        flexDirection="column"
        gap="3"
      >
        {chatHistory.map((message, index) => (
          <React.Fragment key={index}>
            <Box display="flex" justifyContent="flex-start">
              <Box
                maxWidth="90%"
                bg="#efebfe"
                borderRadius="md"
                p="3"
                fontSize="lg"
                color="black"
              >
                <Box display="flex" alignItems="center" gap="2">
                  <Image
                    src={placeHolderImage}
                    alt="User Avatar"
                    width="30px"
                    height="30px"
                    borderRadius="full"
                  />
                  <Text>{message.userMessage}</Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-start" mt="2">
              <Box
                maxWidth="90%"
                bg="#8a0fe5"
                borderRadius="md"
                p="3"
                fontSize="lg"
                color="white"
              >
                <ReadmeRenderer readmeContent={message.modelResponse} />
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default IChatHistory;
