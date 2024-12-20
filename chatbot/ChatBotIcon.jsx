import {
  Box,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState,useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeChatbot, toggleChatbot } from '../../Redux/chatBotSlice';
import { IoIosExpand } from 'react-icons/io';
import { BiCollapse } from 'react-icons/bi';
import Draggable from 'react-draggable';
import { ChatProvider } from './ChatProvider';
import ChatBot from './ChatBot';
import Image1 from '../../img/bot.png';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

const ChatBotIcon = () => {
  const isOpen = useSelector((store) => store.chatbot.isOpen);
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isExpanded, setIsExpanded] = useState(false);


  const toggleExpand = () => setIsExpanded(!isExpanded);


  const handleClose = () => {
    dispatch(closeChatbot());
  };

  return (
    <Box bgColor="transparent">
      <Popover
        placement="right"
        closeOnBlur={false}
         isOpen={isOpen}
         // Use Redux state
      >
        <Draggable>
          <div>
            <PopoverTrigger>
              <WrapItem>
                <Tooltip
                  label="Ask me a tough question, I promise I won't cry!"
                  placement="top"
                  arrowSize="15px"
                  bgColor="#8a0fe5"
                >
                  <Image
                    src={Image1}
                    width="80px"
                    height="50px"
                    cursor="pointer"
                    onClick={() => dispatch(toggleChatbot())}
                  />
                </Tooltip>
              </WrapItem>
            </PopoverTrigger>
          </div>
        </Draggable>
        <Portal>
          <PopoverContent
            height={isExpanded ? '620px' : '450px'}
            width={isMobile ? '95vw' : isExpanded ? '750px' : '550px'}
            display="flex"
            justifyContent="flex-start"
            bgColor="white"

          >
            <PopoverArrow />
            <PopoverHeader
              width="60%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box cursor="pointer" onClick={toggleExpand}>
                {isExpanded ? <BiCollapse /> : <IoIosExpand />}
              </Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                className="textStyle"
                color="#8a0fe5"
                height="30px"
                paddingLeft={isExpanded ? '100px' : '0px'}
              >
                Tecdemy
              </Text>
            </PopoverHeader>
            <Box onClick={handleClose}> <PopoverCloseButton  /> </Box>
           {/* Dispatch close */}
            <PopoverBody>
              {/* <ChatProvider> */}

                <ChatBot isExpanded={isExpanded} />
              {/* </ChatProvider> */}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default ChatBotIcon;
