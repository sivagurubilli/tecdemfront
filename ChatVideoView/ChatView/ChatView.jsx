import React, { useContext, useEffect, useState } from 'react';
import styles from './ChatView.module.css';
import { useParams } from 'react-router-dom';
import { CallAPI } from '../../../middleware/api';
import endpoints from '../../../middleware/endpoint';
import { getUserData } from '../../../middleware/auth';
import { PurchasedListContext } from '../../../Context/PurchasedListContext';
import moment from 'moment';
import debounce from 'debounce';
import { ShimmerTable } from 'react-shimmer-effects';
import { toastError } from '../../../util_helper';
import { getID } from '../../../siteConfig';
import { Avatar, Box } from '@chakra-ui/react';

const ChatView = ({ setSelectedUser }) => {

  const { context, setContext, onlineUsers } = useContext(PurchasedListContext)
  const { chatStatus } = context;
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mentorLoading, setMentorLoading] = useState(true);
  const { mentorUuid } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [mentors, setMentors] = useState([]);
  const [chatLoading, setChatLoading] = useState(true)
  const [searchUsers, setSearchUsers] = useState("");
  const [page, setPage] = useState(1);



  const userRole = getUserData().userdata?.roles || ''
  const fetchMentors = (isExternal) => {
    try {
      CallAPI(endpoints?.fetchByRole, { fetch: "business", role: `${userRole === 'mentor' ? "student" : 'mentor'}`, pageSize: page })
        .then((res) => {
          setMentorLoading(false);
          if (res?.status?.code === 200) {

            const updatedMentors = res?.data?.map((items) => {
              const fetchedStatus = chatStatus.filter((chat) => Number(chat?.sender_id) === items?.id);
              return {
                ...items,
                name: `${items?.first_name || ''} ${items?.last_name || ''}`,
                fetchedStatus: fetchedStatus,
                messageCount: fetchedStatus.length
              }
            })
            if (isExternal) {
              setMentors(updatedMentors);
            } else {

              setMentors(updatedMentors);
            }
            if (!!mentorUuid && updatedMentors.length > 0 && page === 1) {
              setSelectedUser(updatedMentors?.find((mentor) => mentor?.uuid === mentorUuid) || {});
            } else {
              setSelectedUser(updatedMentors[0] || {})
            }

            if (updatedMentors.length === 0) {
              setHasMore(false);
            }
            return;
          }
          toastError("Something went wrong!")
        })
        .catch((error) => {
          console.error("Error fetching mentors:", error);
          setMentors([]);
        });
    } catch (error) {
      console.error(error);
    }
  }


  const handleSelectMentor = (mentor, index) => {
    try {
      setSelectedUser(mentor)
      setSelectedIndex(index)
      CallAPI(endpoints?.markAsReadMessage, {
        user_id: getID('userId'),
        selectedUserId: mentor?.id,
        is_read: "1"
      }).then((res) => {
        if (res?.status?.code === 200) {
          setMentors((prev) => {
            return prev.map((item) => item.id === mentor.id ? {
              ...item,
              fetchedStatus: [],
              messageCount: 0
            } : item)
          })
          // messageService.sendMessage("chat", {}, 'context')
          return;
        }
        toastError(res?.status?.message)
      })
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchMentors()
  }, [])



  const handleSearchUsers = debounce(async (e) => {
    try {
      const { value } = e.target;
      if (!!value?.trim()) {
        setMentorLoading(true);
        const response = await CallAPI(endpoints?.searchUsers, { search_text: value, role: userRole === "mentor" ? 'student' : 'mentor' })
        if (response?.status?.code === 200) {
          setMentorLoading(false);

          const updatedMentors = response?.data?.map((items) => {
            return { ...items, name: `${items?.first_name || ''} ${items?.last_name || ''}` }
          })
          setSelectedIndex(0)
          setMentors(updatedMentors);
          setSelectedUser(updatedMentors[0] || {});
          return
        }
        toastError(response?.status?.message)
        return;
      }
      fetchMentors(true);
      setMentorLoading(true);

    } catch (error) {
      console.error(error);
    }
  }, 800)
  return (
    <div className={styles.chatViewContainer}>
      <input type="text" onChange={handleSearchUsers} placeholder={`Search by ${userRole === 'mentor' ? "student" : "mentor"} name.`} className={styles.searchInput} />

      {mentorLoading ?
        <div style={{ width: "100%" }} >
          <ShimmerTable row={5} col={1} />
        </div> :
        <div className={styles.chatContainer}>
          {mentors && mentors?.length > 0 && mentors?.map((user, index) => {
            const { messageCount = 0, lastMessageCreateAt = 0 } = user;
            const messageTime = moment(lastMessageCreateAt).format("HH:MM")

            const isEven = index % 2 === 0;

            return <div key={user.id} className={`${styles.chatItem} ${selectedIndex === index ? styles.activeChat : ''}`} onClick={() => {
              handleSelectMentor(user, index);
            }}>



              <Box position="relative" bg="#8A0EE5" borderRadius="full" p={0}>
                <Avatar
                  size="md"
                  name={user?.first_name}
                  src={user?.profile_url}
                  alt={user?.first_name || 'User Avatar'}
                />

                {onlineUsers?.includes(user?.id?.toString()) && (
                  <Box
                    position="absolute"
                    bottom={0}
                    right={0}
                    bg="green.400"
                    border="2px solid white"
                    width="12px"
                    height="12px"
                    borderRadius="full"
                  />
                )}
              </Box>

              <div className={styles.chatDetails}>
                <div className={styles.userName}>{user?.first_name} {user?.last_name}  </div>
                <div className={styles.status}>{user.status}</div>
              </div>
              <div className={styles.messageInfo}>
                <div>{messageTime}</div>
                <div className={styles.unreadCountContainer}>
                  {messageCount > 0 && <div className={styles.messageCount}>2</div>}

                  {lastMessageCreateAt > 0 && <div className={styles.unreadCount}>{lastMessageCreateAt}</div>}
                </div>
              </div>
            </div>
          })}

        </div>


      }
    </div>

  );
};

export default ChatView;
