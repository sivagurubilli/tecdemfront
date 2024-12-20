import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react"; // Import Chakra UI components
import { GoogleGenerativeAI } from "@google/generative-ai";
import Showdown from "showdown";
import { ChatContext } from "./ChatProvider";
import { IoSend } from "react-icons/io5";
import { TecButton } from "../elements/elements";
import { CHATBOT_API_KEY } from "../../siteConfig";

// Placeholder API interaction, to be replaced
const sendChatMessage = async (message) => {

  const genAI = new GoogleGenerativeAI(CHATBOT_API_KEY );

  // Use 'gemini-pro' for text-only input as the appropriate model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(message); // Send the message to Gemini API
    const response = await result.response;
    return response.text(); // Extract the model's text response
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Gemini API Error"); // Rethrow for handling by the caller
  }
};

const ChatInput = ({isExpanded}) => {
  const [messageText, setMessageText] = useState("");
  const { chatHistory, setChatHistory, summarizeHistory } =
    useContext(ChatContext);

  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const converter = new Showdown.Converter({ simplifiedAutoLink: true });

  const convertReadmeToText = (readmeContent) => {
    return converter.makeMarkdown(readmeContent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (messageText.trim() === "") return; // Skip empty messages

    // Handle sending the message
    try {
      const summarizedHistory = summarizeHistory(); // Summarize existing history
      const newMessage = {
        userMessage: messageText,
        modelResponse: "Loading...",
      };

      setChatHistory([...chatHistory, newMessage]); // Optimistically update chat

      // Simulate API call and process response
      console.log(
        `You have to respond to Latest Prompt and previous Prompts are for References`
      );
      const temp = convertReadmeToText(summarizedHistory);
      const modelResponse = await sendChatMessage(
        `You have to respond to Latest Prompt and previous Prompts are for References

         Latest Prompt -> ${messageText}
            Previous Prompts ->  ${convertReadmeToText(summarizedHistory)}`
      );

      // Update chat history with the model's response
      setChatHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.userMessage === messageText ? { ...item, modelResponse } : item
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Update newMessage in chatHistory to signal an error to the user
    } finally {
      setMessageText(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex",gap: "20px", padding: "0px", height: "40px", justifyContent:"center", alignItems:"center", marginTop: "20px", width: isExpanded ? "120%" : "100%" }}>
      <FormControl bgColor="white" height="40px">
        <Input
          placeholder="Enter your message"
          variant="outline"
          color="black"
          bgColor="#efebfe"
          borderColor="white"
          borderRadius="5"
          value={messageText}
          onChange={handleInputChange}
        />
      </FormControl>
      <TecButton
          className="tecPrimaryButton "
          type="submit"
      >
          Send <IoSend />
      </TecButton>
      {/* <Button
        type="submit"
        bgColor="white"
        color="#8a0fe5"
        border="1px solid #8a0fe5"
        colorScheme="white"
        rightIcon={<IoSend />}
        borderRadius="0 2px 2px 0"
        marginTop="6"
      >
        Send
      </Button> */}
    </form>
  );
};

export default ChatInput;
