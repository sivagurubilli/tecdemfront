import React, { useContext, useEffect, useState } from 'react'
import styles from './ChatVideoView.module.css'
import ChatView from './ChatView/ChatView'
import IChatView from './IChatView/IChatView'
import FullScreenChat from './FullScreenChat/FullScreenChat'
import { ChatProvider } from '../chatbot/ChatProvider'
import MbotCard from '../MbotCard'
import CourseSearchandMentors from './CourseSearchandMentors/CourseSearchandMentors'
import IFlowNew from './IFlowNew/IFlowNew'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Menu, MenuButton, MenuItem, MenuList, Button, Box, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'
import { PurchasedListContext } from '../../Context/PurchasedListContext'
import messageService from '../MessageService/Index'
import { BucketListContext } from '../../Context/BucketListContext'
import MobileIBot from './MobileScreens/MobileIBot'


const ChatVideoView = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedOption, setSelectedOption] = useState("Master Bot");
  const navigate = useNavigate()
  const { setContext } = useContext(PurchasedListContext)
  const {setSelectedCourse,selectedCourse,selectedCourseLoading, selectedYouTube, setSelectedYouTubeVideo} = useContext(BucketListContext)

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleOpenMeeting = () => {
    try {
      // navigate('/tecmeet')
      // setContext((prev) => {
      //   return { ...prev, meetUser: selectedUser }
      // })
      messageService.sendMessage("chatVideoView", { show: true }, "popup")
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    try {
      messageService.onMessage().subscribe((m) => {
        if (m.senderId === "googleSearchPanel" && m.target === "rightPanelViewer") {
          const videoData = m?.text;
          const updatedData = {
            ...videoData,
            fullName: `${videoData?.userDetails?.first_name} ${videoData?.userDetails?.last_name}`
          }
          setSelectedCourse(updatedData)
          setSelectedYouTubeVideo(undefined)
        }
        if (m.senderId === "youTube" && m.target === "rightPanelVideo") {
          setSelectedYouTubeVideo(m?.text)
          setSelectedCourse(undefined)
        }


      })
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>


      <div className={styles.container}>
        <div className={styles.leftContainer} style={selectedOption !== "Master Bot" ? { justifyContent: 'center', alignItems: 'center' } : {}}
        >

          {
            !!selectedOption && selectedOption === "Master Bot" ? <CourseSearchandMentors /> : <div className={styles.ChatVideoViewChatContainer}>

              <ChatView setSelectedUser={setSelectedUser} />
              <ChatProvider >
                <IChatView />
              </ChatProvider>
            </div>
          }


        </div>

        <div className={styles.rightContainer}>

          {
            !!selectedOption && selectedOption === "Master Bot" ? <IFlowNew /> : <FullScreenChat selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          }



          <Box width="55%" overflow={'hidden'}>

            <Flex justify="flex-end" align="center" gap={2}>

              <Button
                onClick={handleOpenMeeting}
                fontWeight="600"
                size="md"
                colorScheme="purple"
                borderRadius="md"
                borderColor="#8A0EE5"
                _hover={{ backgroundColor: "#8A0EE5", color: "white" }}
              >
                Join Room
              </Button>


              <Menu>
                <MenuButton
                  as={Button}
                  size="md"
                  colorScheme="gray"
                  variant="outline"
                  rightIcon={<ChevronDownIcon />}
                  borderColor="#E2E8F0"
                  _hover={{ borderColor: "#8A0EE5" }}
                  fontWeight="500"
                >
                  {selectedOption}
                </MenuButton>
                <MenuList minWidth="180px" border="1px solid #E2E8F0" borderRadius="md" boxShadow="lg">
                  <MenuItem
                    onClick={() => handleOptionSelect("Master Bot")}
                    _hover={{ bg: "#f7f7f7", fontWeight: "500" }}
                    padding="8px 16px"
                  >
                    Master Bot
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleOptionSelect("Chat + Video View")}
                    _hover={{ bg: "#f7f7f7", fontWeight: "500" }}
                    padding="8px 16px"
                  >
                    Chat + Video View
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Box width="100%"
              mt={2}
              ml={2}
              padding={2}
              h="97%"
              borderBottom="1px solid #E2E8F0"
              borderLeft="1px solid #E2E8F0"
              borderRight="1px solid #E2E8F0"
              borderRadius="md"
              boxShadow="sm"
              bg="white" >
              <MbotCard selectedCourse={selectedCourse} selectedYouTube={selectedYouTube} selectedCourseLoading={selectedCourseLoading} />
            </Box>
          </Box>

        </div>
      </div>

      <div className={styles.mobileContainer}>
        <MobileIBot />
      </div>
    </DndProvider>
  )
}

export default ChatVideoView