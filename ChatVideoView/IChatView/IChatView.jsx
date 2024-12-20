import { Box, Container, Heading } from "@chakra-ui/react";
import ChatHistory from "../../chatbot/ChatHistory";
import ChatInput from "../../chatbot/ChatInput";
import IChatHistory from "./IChatHistory";
import IChatInput from "./IChatInput";


const IChatView = () => {
  return (
    <Container
      margin={'0px'}
      pt={3}
      onClick={(event) => event.stopPropagation()}
      height={"45%"}
      width={"100%"}
      borderRadius="md"
      backgroundColor="white"
      padding={"0px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={'space-between'}
      alignItems={'center'}
      textAlign="center"
      position={"relative"}
      pb={5}
    >

      <Box width="100%" textAlign="left"  position="sticky" top="-5" bg="white"  pl="4" zIndex="1" py="2" borderBottom={'1px solid #e2e8f0'}>
        <Heading fontSize="xl" marginLeft={'10px'}>iChat</Heading>
      </Box>
      <Box overflow="auto" height="80%" width={"100%"} >
        <IChatHistory />
      </Box>
      <IChatInput isExpanded={false} />
    </Container>
  );
};

export default IChatView;
