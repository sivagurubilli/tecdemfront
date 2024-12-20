import React from "react";
import { Text, Avatar } from "@chakra-ui/react"; // Import Chakra UI components

const ChatMessage = ({ type, text }) => {
  return (
    <div>
      {type === "user" && <Avatar>U</Avatar>}
      <div>
        <Text fontSize="sm">{text}</Text> {/* Use Chakra UI's Text component */}
      </div>
      {type === "model" && <Avatar>M</Avatar>}
    </div>
  );
};

export default ChatMessage;
