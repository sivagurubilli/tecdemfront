import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import styles from './FullScreenChat.module.css';
import { CallAPI } from '../../../middleware/api';
import { getID } from '../../../siteConfig';
import NoDataFound from '../../NoDataFound/NoDataFound';
import moment from 'moment';
import { Avatar, Box, Input, InputGroup, Stack, Spinner, Text, VStack, HStack } from '@chakra-ui/react';
import { TecButton } from '../../elements/elements';
import endpoints from '../../../middleware/endpoint';
import { PurchasedListContext } from '../../../Context/PurchasedListContext';

const FullScreenChat = ({ selectedUser }) => {
  const [chatLoading, setChatLoading] = useState(true);
  const { context, setContext, onlineUsers } = useContext(PurchasedListContext)
  const [error, setError] = useState(null);
  const [userChat, setUserChat] = useState({ groupChat: [], userChat: [] });
  const scrollableDivRef = useRef(null);

  const scrollToBottom = () => {
    scrollableDivRef.current?.scrollTo({ top: scrollableDivRef.current.scrollHeight, behavior: 'smooth' });
  };

  const fetchUserChat = useCallback(async () => {
    setChatLoading(true);
    setError(null);
    try {
      if (selectedUser) {
        const res = await CallAPI(endpoints.getUserChat, {
          user_id: getID('userId'),
          selectMentorId: selectedUser?.id || selectedUser,
        });
        setChatLoading(false);
        if (res?.status?.code === 200) {
          setUserChat((prev) => ({
            ...prev,
            [selectedUser === 'all' ? 'groupChat' : 'userChat']: res.data,
          }));
          scrollToBottom();
        } else {
          setError(res?.status?.message || 'Failed to load chat.');
        }
      }
    } catch (error) {
      setChatLoading(false);
      setError('An error occurred while loading chat.');
      console.error(error);
    }
  }, [selectedUser]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const messageText = e.target.elements.userChat.value.trim();
    if (!messageText) return;

 
    const newMessage = {
      id: Date.now(), // Temporary ID for rendering
      from_user_id: getID('userId'),
      message_text: messageText,
      createdAt: new Date(),
      userDetails: { first_name: 'You' },
    };

    setUserChat((prev) => {
      const newChat = selectedUser === 'all'
        ? { groupChat: [...prev.groupChat, newMessage] }
        : { userChat: [...prev.userChat, newMessage] };
      return { ...prev, ...newChat };
    });
    scrollToBottom();
    e.target.reset();

    try {
      const payload = {
        to_user_id: selectedUser?.id || '',
        from_user_id: getID('userId'),
        message_text: messageText,
        attachments: '',
        is_group_chat: selectedUser === 'all' ? '1' : '0',
      };
      const createdChat = await CallAPI(endpoints.createChat, payload);

      if (createdChat?.data) {
      
        setUserChat((prev) => {
          const updatedChat = selectedUser === 'all'
            ? { groupChat: prev.groupChat.map((msg) => msg.id === newMessage.id ? createdChat.data : msg) }
            : { userChat: prev.userChat.map((msg) => msg.id === newMessage.id ? createdChat.data : msg) };
          return { ...prev, ...updatedChat };
        });
      } else {
        throw new Error('Message not sent');
      }
    } catch (error) {
      setError('Failed to send message.');
      console.error(error);
     
    }
  };

  useEffect(() => {
    fetchUserChat();
  }, [fetchUserChat]);
  const isOnline = onlineUsers.includes(selectedUser?.id?.toString());
  return (
    <div className={styles.chatFullContainer}>
      {/* Header */}
      <HStack className={styles.chatHeader} spacing={3} alignItems="center">
    

<Box bg="#8A0EE5" borderRadius="full" p={0}>
  <Avatar
    size="md"
    name={selectedUser?.name}
    src={selectedUser?.profile_url}
    alt={selectedUser?.name || 'User Avatar'}
   
  />
</Box>
<Box>
        <Text fontSize="lg" fontWeight="bold">
          {selectedUser?.name || 'Group Chat'}
        </Text>
        <Text fontSize="sm" color={isOnline ? 'green.500' : 'red.500'}>
          {isOnline ? "Online" : "Offline"}
        </Text>
      </Box>
    </HStack>

    
      <div className={styles.chatContent} ref={scrollableDivRef}>
        {chatLoading ? (
          <Spinner className={styles.loadingSpinner} size="xl" color="teal.500" />
        ) : error ? (
          <Text className={styles.errorText}>{error}</Text>
        ) : (userChat.userChat.length === 0 && userChat.groupChat.length === 0) ? (
          <NoDataFound title="No conversation started!" />
        ) : (
          <VStack spacing={4} className={styles.messageList}>
            {(selectedUser === 'all' ? userChat.groupChat : userChat.userChat).map((item, idx) => {
              const formattedDate = moment(item.createdAt || moment.now()).fromNow();
              const { userDetails = {} } = item;
              const fullName = `${userDetails.first_name || ''} ${userDetails.last_name || ''}`;
              const isSender = item.from_user_id === getID('userId');
              return (
                <Box key={item.id || idx} className={isSender ? styles.sendingChat : styles.receivedChat}>
                  <div className={styles.messageTextContainer}>
                    {selectedUser === 'all' && !isSender && (
                      
                      <Text className={styles.profileName}>{fullName} ({userDetails.roles})</Text>
                      
                    )}
                    <Text className={styles.messageText}>{item.message_text}</Text>
                    <Text className={styles.messageTimestamp}>{formattedDate}</Text>
                  </div>
                </Box>
              );
            })}
          </VStack>
        )}
      </div>

    
      <div className={styles.inputContainer}>
        <form onSubmit={handleChatSubmit}>
          <Stack direction="row" spacing={2} align="flex-end">
            <Input name="userChat" placeholder="Type a message"  width='full' backgroundColor={'#dbf3ff66'}/>
            <TecButton type="submit">
              <Text>Send</Text>
              <i className="fas fa-location-arrow"></i>
            </TecButton>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default FullScreenChat;
