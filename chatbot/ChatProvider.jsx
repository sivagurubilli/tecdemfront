import React, { useState, useEffect, createContext, useRef } from 'react';
import Showdown, { Converter } from 'showdown';
import { CHATBOT_API_KEY } from "../../siteConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";
const ChatContext = createContext();
const sendChatsMessage = async (message) => {

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
const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [latestMessageFromApiForReadme, setLatestMessageFromApiForReadme] = useState(''); // For README update
  const [isLoading, setIsLoading] = useState(false); // For API call state
  const latestMessageRef = useRef(null); // Track the latest message for summarization

  const converter = new Showdown.Converter();

  const convertReadmeToText = (readmeContent) => {
    return converter.makeMarkdown(readmeContent);
  };

  // Simulate an API call by adding artificial delay
  const sendChatMessage = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Replace with your actual Gemini API call and response extraction
        const modelResponse = `Simulated response for: ${message}`;
        resolve(modelResponse);
      }, 1500); // Introduce a 1.5-second delay to simulate network time
    });
  };

  // Simple summary mechanism (replace with more intelligent techniques)
  const summarizeHistory = () => {
    const maxSummaryLength = 10; // Keep the last 5 messages (adjust as needed)

    const summary = chatHistory
      .slice(Math.max(0, chatHistory.length - maxSummaryLength))
      .map((item) => `User: ${item.userMessage} Model: ${item.modelResponse}`)
      .join('\n'); // Clearer formatting

    return summary;
  };

  useEffect(() => {

    const element = latestMessageRef.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);



  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;

    try {
      const summarizedHistory = summarizeHistory();
      const newMessage = {
        userMessage: messageText,
        modelResponse: "Loading...",
      };


      setChatHistory((prevHistory) => [...prevHistory, newMessage]);



      const modelResponse = await sendChatsMessage(
        `You have to respond to Latest Prompt and previous Prompts are for References:

         Latest Prompt -> ${messageText}
         Previous Prompts -> ${convertReadmeToText(summarizedHistory)}`
      );




      setChatHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.userMessage === messageText ? { ...item, modelResponse } : item
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);

      setChatHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.userMessage === messageText
            ? { ...item, modelResponse: "Failed to fetch response." }
            : item
        )
      );
    }
  };



  const contextValue = {
    chatHistory,
    latestMessageFromApiForReadme,
    sendMessage,
    setChatHistory,
    summarizeHistory,

    isLoading, // Add isLoading to expose loading state
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
