import React, { useContext, useEffect, useRef, useState } from 'react';
import { getUserData } from '../../middleware/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  Stack,
  Button,
  Box,
  useDisclosure,
  Container,
  Flex,
  Input,
  Avatar,
  Wrap,
  WrapItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';

import { TbPhoneCall } from 'react-icons/tb';
import Men1 from '../../img/Male 1 G.svg';
import Men2 from '../../img/Male 2 E.svg';
import Men3 from '../../img/Male 3 E.svg';
import Men4 from '../../img/Male 4 E.svg';
import Men5 from '../../img/Male 5 E.svg';
import Men6 from '../../img/Male 6 G.svg';
import Men7 from '../../img/Male 7 G.svg';
import Female1 from '../../img/Female 1 E.svg';
import Female2 from '../../img/Female 2 G.svg';
import Female3 from '../../img/Female 3 G.svg';
import Female4 from '../../img/Female 4 G.svg';
import UserRatings from './userRatings';
import { useNavigate, useParams } from 'react-router-dom';
import { placeHolderImage } from '../Config';
import { BucketListContext } from '../../Context/BucketListContext';
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import { toastError } from '../../util_helper';
import styles from './Mentors.module.css';
import { BOLoading, TecButton } from '../elements/elements';
import io from 'socket.io-client';
import { SERVER_URL, getID } from '../../siteConfig';
import moment from 'moment';
import NoDataFound from '../NoDataFound/NoDataFound';
import {
  ShimmerCategoryItem,
  ShimmerSectionHeader,
  ShimmerTable,
} from 'react-shimmer-effects';
import InfiniteScroll from 'react-infinite-scroll-component';
import ToggleButton from '../ToggleButton/ToggleButton';
import debounce from 'debounce';
import { PurchasedListContext } from '../../Context/PurchasedListContext';
import messageService from '../MessageService/Index';
import RightSideModal from './RightSideModal';
import CustomCalendar from './CustomCalendar';

// Ensure this function gets the user ID appropriately

const Mentors = () => {
  const dispatch = useDispatch();
  const userId = getID('userId');

  const socket = io(SERVER_URL, {
    query: { userId },
  });
  // const userData = userDetails;
  // const userDataStringified = JSON.parse(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mentorUuid } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [mentors, setMentors] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [chatLoading, setChatLoading] = useState(true);
  const [searchUsers, setSearchUsers] = useState('');
  const {
    addToBucketList,
    fetchGoogleSearchResults,
    fetchCourseSearchResults,
    filteredResults,
    setFilteredResults,
    selectedResult,
    courseLoading,
  } = useContext(BucketListContext);
  const [mentorLoading, setMentorLoading] = useState(true);
  const scrollableDivRef = useRef(null);
  const [userChat, setUserChat] = useState({
    groupChat: [],
    userChat: [],
  });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { context, setContext, onlineUsers } = useContext(PurchasedListContext);
  const { chatStatus } = context;
  //fetch mentors from course list
  const searchedCoursesMentors = [];
  if (filteredResults.length > 0) {
    filteredResults?.map((items) => {
      if (items?.userDetails?.roles === 'mentor') {
        searchedCoursesMentors.push(items?.userDetails?.id);
      }
    });
  }
  const userRole = getUserData().userdata?.roles || '';
  useEffect(() => {
    try {
      const updatedMentors = mentors?.map((items) => {
        const fetchedStatus = chatStatus.filter(
          (chat) => Number(chat?.sender_id) === items?.id
        );
        return {
          ...items,
          fetchedStatus: fetchedStatus,
          messageCount: fetchedStatus.length,
        };
      });
      setMentors(updatedMentors);
    } catch (error) {
      console.error(error);
    }
  }, [chatStatus]);

  useEffect(() => {
    try {
      setUserDetails(getUserData().userdata);
      fetchMentors();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedUser) {
        fetchUserChat();
      }
    } catch (error) {}
  }, [selectedUser]);

  const markAsReadMessage = () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMentors = (isExternal) => {
    try {
      CallAPI(endpoints?.fetchbyroleMessage, {
        fetch: 'business',
        logedInuserId: userId,
        role: `${userRole === 'mentor' ? 'student' : 'mentor'}`,
        pageSize: page,
      })
        .then((res) => {
          setMentorLoading(false);
          if (res?.status?.code === 200) {
            const updatedMentors = res?.data?.map((items) => {
              const fetchedStatus = chatStatus.filter(
                (chat) => Number(chat?.sender_id) === items?.id
              );
              return {
                ...items,
                name: `${items?.first_name || ''} ${items?.last_name || ''}`,
                fetchedStatus: fetchedStatus,
                messageCount: fetchedStatus.length,
              };
            });
            if (isExternal) {
              setMentors(updatedMentors);
            } else {
              // setMentors((prevItems) => [...prevItems, ...updatedMentors]);
              setMentors(updatedMentors);
            }
            if (!!mentorUuid && updatedMentors.length > 0 && page === 1) {
              setSelectedUser(
                updatedMentors?.find((mentor) => mentor?.uuid === mentorUuid) ||
                  {}
              );
            } else {
              setSelectedUser(updatedMentors[0] || {});
            }
            // setPage(page + 1);
            // Check if more data is available (depends on your API response)
            if (updatedMentors.length === 0) {
              setHasMore(false);
            }
            return;
          }
          toastError('Something went wrong!');
        })
        .catch((error) => {
          console.error('Error fetching mentors:', error);
          setMentors([]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserChat = () => {
    try {
      setChatLoading(true);
      if (selectedUser) {
        CallAPI(endpoints?.getUserChat, {
          user_id: getID('userId'),
          selectMentorId: selectedUser?.id || selectedUser,
        }).then((res) => {
          setChatLoading(false);
          if (res?.status?.code === 200) {
            if (selectedUser === 'all') {
              setUserChat((prev) => ({
                ...prev,
                groupChat: res?.data,
                userChat: [],
              }));
            } else {
              setUserChat((prev) => ({
                ...prev,
                userChat: res?.data,
                groupChat: [],
              }));
            }
            scrollToBottom();
            return;
          }
          toastError(res?.status?.message);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectMentor = (mentor) => {
    try {
      setSelectedUser(mentor);
      CallAPI(endpoints?.markAsReadMessage, {
        user_id: getID('userId'),
        selectedUserId: mentor?.id,
        is_read: '1',
      }).then((res) => {
        if (res?.status?.code === 200) {
          setMentors((prev) => {
            return prev.map((item) =>
              item.id === mentor.id
                ? {
                    ...item,
                    fetchedStatus: [],
                    messageCount: 0,
                  }
                : item
            );
          });
          // messageService.sendMessage("chat", {}, 'context')
          return;
        }
        toastError(res?.status?.message);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      makeMessageFieldBlank();
      socket.on('updateUserChat', (data) => {
        const { newChat, lastMessageCreateAt } = data;
        scrollToBottom();
        setMentors((prevMentors) =>
          prevMentors.map((mentor) => {
            // Update lastMessageCreateAt only for the relevant mentor
            if (
              mentor.id == newChat?.from_user_id ||
              mentor.id == newChat?.to_user_id
            ) {
              return { ...mentor, lastMessageCreateAt };
            }
            return mentor;
          })
        );
        if (selectedUser?.id == Number(newChat?.from_user_id)) {
          setUserChat((prev) => {
            return { ...prev, userChat: [...prev?.userChat, newChat] };
          });
        }
      });

      socket.on('updateGroupChat', (data) => {
        const { newChat } = data;
        scrollToBottom();
        if (selectedUser == 'all') {
          setUserChat((prev) => {
            return { ...prev, groupChat: [...prev?.groupChat, newChat] };
          });
        }
      });
      return () => {
        socket.off('updateUserChat');

        socket.off('updateGroupChat');
      };
    } catch (error) {
      console.error(error);
    }
  }, [socket, selectedUser]);
  useEffect(() => {
    socket.on('updateMessageCount', (data) => {
      const { userId, messageCountIncrement } = data;

      setMentors((prevMentors) =>
        prevMentors.map((mentor) => {
          if (mentor?.id == userId && mentor?.id !== selectedUser?.id) {
            return {
              ...mentor,
              messageCount: (mentor.messageCount || 0) + messageCountIncrement,
            };
          }
          return mentor;
        })
      );
    });
    return () => {
      socket.off('updateMessageCount');
    };
  }, [socket]);
  const scrollToBottom = () => {
    try {
      const scrollableDiv = document.getElementById('scrollableDiv');
      if (!!scrollableDiv) {
        setTimeout(() => {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
          scrollableDiv.animate(
            { scrollTop: scrollableDiv.scrollHeight },
            1000
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeMessageFieldBlank = () => {
    try {
      const inputElement = document.getElementById('messageSenderInput');
      if (!!inputElement) {
        inputElement.value = '';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChatSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const messageText = form.elements['userChat'].value;
      let payload = {
        to_user_id: selectedUser?.id || '',
        from_user_id: getID('userId'),
        message_text: messageText,
        attachments: '',
        is_group_chat: selectedUser === 'all' ? '1' : '0',
      };
      makeMessageFieldBlank();
      const createdChat = await CallAPI(endpoints?.createChat, payload);

      if (!!createdChat?.data) {
        const now = new Date().toISOString();
        setMentors((prevMentors) =>
          prevMentors.map((mentor) =>
            mentor.id == selectedUser.id
              ? {
                  ...mentor,

                  lastMessageCreateAt: now,
                }
              : mentor
          )
        );
        if (selectedUser === 'all') {
          const existChat = userChat?.groupChat;
          // setUserChat([...userChat, createdChat?.data])
          // setUserChat((prev) => {
          //   return { ...prev, groupChat: [...existChat, createdChat?.data] };
          // });
        } else {
          const existChat = userChat?.userChat;
          // setUserChat([...userChat, createdChat?.data])
          setUserChat((prev) => {
            return { ...prev, userChat: [...existChat, createdChat?.data] };
          });
        }
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchUsers = debounce(async (e) => {
    try {
      const { value } = e.target;
      if (!!value?.trim()) {
        setMentorLoading(true);
        const response = await CallAPI(endpoints?.searchUsers, {
          search_text: value,
          role: userRole === 'mentor' ? 'student' : 'mentor',
        });
        if (response?.status?.code === 200) {
          setMentorLoading(false);

          const updatedMentors = response?.data?.map((items) => {
            return {
              ...items,
              name: `${items?.first_name || ''} ${items?.last_name || ''}`,
            };
          });
          setMentors(updatedMentors);
          setSelectedUser(updatedMentors[0] || {});
          return;
        }
        toastError(response?.status?.message);
        return;
      }
      fetchMentors(true);
      setMentorLoading(true);
    } catch (error) {
      console.error(error);
    }
  }, 800);

  const handleOnChatToAll = (isChecked) => {
    try {
      if (!!isChecked) {
        setSelectedUser('all');
        return;
      }
      setSelectedUser(mentors[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenMeeting = () => {
    try {
      messageService.sendMessage('chatVideoView', { show: true }, 'popup');
      // navigate("/tecmeet");
      // setContext((prev) => {
      //   return { ...prev, meetUser: selectedUser };
      // });
      // messageService.sendMessage("mentors", { show: true, selectedUser: selectedUser }, "popup")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container padding={1} maxW="100%" bgColor="white">
      {false && (
        <a
          style={{ marginTop: '10px' }}
          className="nav-link hide-arrow user-dropdown d-flex"
          href=".."
        >
          <div className="avatar">
            <Avatar
              src={!!userDetails?.profile_url || placeHolderImage}
              className="w-px-50 rounded-circle"
              // style={{ height: "60px", marginLeft: "20px", marginBottom: "15px" }}
            />
          </div>

          <div
            className="user-details"
            style={{ marginTop: '12px', marginLeft: '20px' }}
          >
            <p className="user-name">
              {userDetails.first_name + ' ' + userDetails.last_name}
            </p>
            <span className="user-role">
              {/* {userDetails.roles} */}
              <p style={{ color: 'blueviolet', textTransform: 'capitalize' }}>
                {userDetails?.roles}
              </p>
            </span>
          </div>
        </a>
      )}
      <div className={`Header ${styles?.discoRoomContainer}`}>
        <div className={`${styles?.conversationContainer} tec-border-left`}>
          <Wrap w="100%" className={styles?.wrap1}>
            {/* //Content in First Box */}
            <Flex w="100%" className={styles?.wrap2}>
              <WrapItem w="100%" className={styles?.wrap3}>
                <Box
                  w="100%"
                  flexDirection="column"
                  bg="white"
                  className={styles?.wrap4}
                >
                  {/* //This Flex box for request the Mentors */}
                  <div
                    className={`${styles?.chatContainer} padding-1 tec-border-radius`}
                  >
                    <Flex
                      className={` ${styles?.chatHeader} tec-shadow-bottom padding-1`}
                    >
                      <Box
                        display="flex"
                        width="100%"
                        alignItems="center"
                        justifyContent={'space-between'}
                      >
                        <Flex className={styles?.profileContainer}>
                          {
                            <>
                              <Avatar
                                name={
                                  mentorLoading
                                    ? 'Loading...'
                                    : selectedUser === 'all'
                                    ? 'Global Chat'
                                    : selectedUser?.name
                                }
                                className={`${styles?.selectedUser} fadeElement`}
                                src={selectedUser?.profile_url}
                              />
                              <div className={`${styles?.selectedUserDetails}`}>
                                {mentorLoading ? (
                                  'Loading...'
                                ) : (
                                  <>
                                    <p className="user-name">
                                      {selectedUser === 'all'
                                        ? 'Global Chat'
                                        : selectedUser?.name}
                                    </p>
                                    <p className={`user-status`}>
                                      {onlineUsers.includes(
                                        selectedUser?.id?.toString()
                                      )
                                        ? 'Online'
                                        : 'Offline'}
                                    </p>
                                  </>
                                )}
                              </div>
                            </>
                          }
                        </Flex>
                        {
                          <div className={styles?.profileActionContainer}>
                            {selectedUser !== 'all' &&
                              userRole === 'student' && (
                                <TecButton
                                  title="Request"
                                  small
                                  className="tecSecondaryButton"
                                  onClick={openModal}
                                  disabled={!selectedUser.name}
                                />
                              )}
                            <TecButton
                              title="Join Room"
                              small
                              className="tecSecondaryButton"
                              onClick={handleOpenMeeting}
                              disabled={!selectedUser.name}
                            />
                          </div>
                        }
                      </Box>
                    </Flex>
                    <RightSideModal isOpen={isModalOpen} onClose={closeModal}>
                      <h4>
                        {' '}
                        Timings available for session with {selectedUser.name}
                      </h4>
                      <CustomCalendar />
                    </RightSideModal>
                    <div
                      ref={scrollableDivRef}
                      id="scrollableDiv"
                      className={`${styles?.chatBody} marginTop-2`}
                    >
                      {chatLoading ? (
                        <>
                          <ShimmerSectionHeader />
                          <ShimmerSectionHeader />
                          <ShimmerSectionHeader />
                        </>
                      ) : userChat.length === 0 ? (
                        <NoDataFound title="No conversation started!" />
                      ) : (
                        (selectedUser === 'all'
                          ? userChat?.groupChat
                          : userChat?.userChat
                        )?.map((items, idx) => {
                          const { userDetails = {}, createdAt } = items;
                          const fullName = `${userDetails?.first_name || ''} ${
                            userDetails?.last_name || ''
                          }`;

                          const date = new Date(createdAt);

                          const hoursAgo =
                            (new Date() - date) / (1000 * 60 * 60);

                          const storedTimeZone =
                            localStorage.getItem('storedTimeZone') || 'UTC';
                          const storedTimeFormat =
                            localStorage.getItem('storedTimeFormat') ||
                            'hh:mm A';
                          const storedDateFormat =
                            localStorage.getItem('storedDateFormat') ||
                            'MM/DD/YYYY';

                          let displayTime;
                          let formattedTime = '';
                          let formattedDate = '';
                          if (hoursAgo < 24) {
                            displayTime = moment(date).fromNow();
                          } else {
                            formattedDate = moment(date)
                              .tz(storedTimeZone)
                              .format(
                                storedDateFormat === 'DD/MM/YY'
                                  ? 'DD/MM/YY'
                                  : storedDateFormat === 'MM/DD/YYYY'
                                  ? 'MM/DD/YYYY'
                                  : storedDateFormat === 'MM-DD-YYYY'
                                  ? 'MM-DD-YYYY'
                                  : 'DD-MM-YYYY'
                              );

                            formattedTime = moment(date)
                              .tz(storedTimeZone)
                              .format(storedTimeFormat);

                            displayTime = `${formattedDate}, ${formattedTime}`;
                          }

                          return (
                            <Box
                              display="flex"
                              key={idx}
                              className={`fadeElement ${
                                items?.from_user_id === getID('userId')
                                  ? styles?.sendingChat
                                  : styles?.receivedChat
                              } padding-2 tec-border-radius marginBottom-1`}
                            >
                              <div className={styles?.messageTextContainer}>
                                {selectedUser === 'all' &&
                                  items?.from_user_id !== getID('userId') && (
                                    <div className={styles?.profileContainer}>
                                      <h6>
                                        {fullName}
                                        <span>({userDetails?.roles})</span>
                                      </h6>
                                    </div>
                                  )}
                                <div className={styles?.messageContainer}>
                                  <span>{items?.message_text}</span>
                                </div>
                                <div className={styles?.timeOfChat}>
                                  <span>{displayTime}</span>
                                </div>
                              </div>
                            </Box>
                          );
                        })
                      )}
                    </div>

                    <div className={`${styles?.chatFooter} marginTop-2`}>
                      <Stack>
                        <form onSubmit={handleChatSubmit}>
                          <InputGroup size="md">
                            <Input
                              bg="#ffffff"
                              name="userChat"
                              id="messageSenderInput"
                              placeholder="Type a message"
                            />
                            <TecButton
                              className="thirdButtonPrimary"
                              type="submit"
                            >
                              <i class="fas fa-location-arrow"></i>
                            </TecButton>
                          </InputGroup>
                        </form>
                      </Stack>
                    </div>
                  </div>
                </Box>
              </WrapItem>
            </Flex>
          </Wrap>
        </div>
        <div className={`${styles?.leftContainer}`}>
          <div className={styles?.leftContainerWrapper}>
            <Tabs className={`${styles?.leftContainer} tec-border-right`}>
              <TabList border={'none'}>
                {userDetails?.roles === 'mentor' && (
                  <Tab
                    _selected={{
                      borderBottom: '4px solid #6534e4',
                      color: '#6534e4',
                      fontWeight: '700',
                      borderRadius: '0px',
                    }}
                    _focus={{ boxShadow: 'md' }}
                    borderColor="white"
                    borderTop="3px solid transparent"
                    fontWeight="500"
                  >
                    Students
                  </Tab>
                )}
                {userDetails?.roles === 'student' && (
                  <Tab
                    _selected={{
                      borderBottom: '4px solid #6534e4',
                      color: '#6534e4',
                      fontWeight: '700',
                      borderRadius: '0px',
                    }}
                    _focus={{ boxShadow: 'md' }}
                    borderColor="white"
                    borderTop="3px solid transparent"
                    fontWeight="500"
                  >
                    Mentors
                  </Tab>
                )}
                {false && userDetails?.roles === 'mentor' && (
                  <Tab
                    _selected={{
                      borderBottom: '4px solid #6534e4',
                      color: '#6534e4',
                      fontWeight: '700',
                      borderRadius: '0px',
                    }}
                    _focus={{ boxShadow: 'md' }}
                    borderColor="white"
                    borderTop="3px solid transparent"
                    fontWeight="500"
                  >
                    Groups
                  </Tab>
                )}
              </TabList>
              <TabPanels>
                <TabPanel className="padding-1">
                  <div className={`${styles?.searchUser} marginTop-2`}>
                    <InputGroup>
                      <Input
                        bg="#ffffff"
                        name="searchUser"
                        id="searchUserInput"
                        value={searchUsers} // Bind the input value to state
                        onChange={(e) => {
                          setSearchUsers(e.target.value); // Update state on change
                          handleSearchUsers(e); // Call search handler
                        }}
                        placeholder={`Search by ${
                          userRole === 'mentor' ? 'student' : 'mentor'
                        } name.`}
                      />
                      {searchUsers && ( // Show clear button only if input has value
                        <InputRightAddon
                          as="button"
                          onClick={() => {
                            setSearchUsers(''); // Clear the input field
                            fetchMentors(true); // Optionally refresh the mentor list
                          }}
                          cursor="pointer"
                          background="transparent"
                          border="none"
                        >
                          <i className="fas fa-times" />{' '}
                          {/* Font Awesome 'times' icon */}
                        </InputRightAddon>
                      )}
                    </InputGroup>
                  </div>

                  <Wrap
                    align="start"
                    className={`marginTopBottom-2 ${styles?.userListContainer}`}
                  >
                    {mentorLoading ? (
                      <div style={{ width: '100%' }}>
                        <ShimmerTable row={5} col={1} />
                      </div>
                    ) : (
                      mentors?.map((mentor, indx) => {
                        const { messageCount = 0, lastMessageCreateAt = 0 } =
                          mentor;

                        // Extract timezone from local storage or use UTC as default
                        const storedTimeZone =
                          localStorage.getItem('storedTimeZone') || 'UTC';
                        const storedTimeFormat =
                          localStorage.getItem('storedTimeFormat') || 'hh:mm A';
                        const storedDateFormat =
                          localStorage.getItem('storedDateFormat') ||
                          'MM/DD/YYYY';

                        // Format the last message time
                        let displayTime = 'No messages yet';
                        let displayDate = '';
                        if (lastMessageCreateAt) {
                          const messageMoment = moment.tz(
                            lastMessageCreateAt,
                            storedTimeZone
                          );
                          const now = moment();

                          if (now.diff(messageMoment, 'days') === 0) {
                            // Show time only if it's today
                            displayTime =
                              messageMoment.format(storedTimeFormat);
                          } else if (now.diff(messageMoment, 'days') === 1) {
                            // Show "Yesterday" if it's one day old
                            displayTime = 'Yesterday';
                          } else {
                            // Show full date and time for older messages
                            const dateFormat =
                              storedDateFormat === 'DD/MM/YYYY'
                                ? 'DD/MM/YYYY'
                                : storedDateFormat === 'MM/DD/YYYY'
                                ? 'MM/DD/YYYY'
                                : storedDateFormat === 'MM-DD-YYYY'
                                ? 'MM-DD-YYYY'
                                : 'DD-MM-YYYY';
                            displayDate = `${messageMoment.format(
                              dateFormat
                            )} `;
                            displayTime = `${messageMoment.format(
                              storedTimeFormat
                            )}`;
                          }
                        }

                        const isUserOnline = onlineUsers.includes(
                          mentor?.id?.toString()
                        );
                        const isEven = indx % 2 === 0;

                        return (
                          <WrapItem
                            key={indx}
                            className={`${styles?.mentorContainer} ${
                              isEven ? styles?.evenUser : ''
                            } padding-1 tec-border-radius ${
                              selectedUser?.id === mentor?.id
                                ? styles?.selectedUserFromList
                                : ''
                            }`}
                            onClick={() => {
                              handleSelectMentor(mentor);
                            }}
                          >
                            <div
                              className={`${styles?.userProfileContainer} avatar-online`}
                            >
                              <Avatar
                                size="sm"
                                title={mentor?.name}
                                name={mentor?.name}
                                src={mentor?.profile_url}
                              >
                                {isUserOnline && (
                                  <span className={styles?.userStatus}></span>
                                )}
                              </Avatar>
                              <Text>{mentor?.name}</Text>
                            </div>
                            <div
                              className={`${styles?.userMessageStatusContainer} fadeElement`}
                            >
                              {!!lastMessageCreateAt && (
                                <span
                                  className={styles?.lastMessageCreateAtStamp}
                                >
                                  <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                  ></Box>
                                  {!displayDate &&(
                                          <Box> {displayTime}</Box>
                                  )}

                                  <Box> {displayDate}</Box>
                                </span>
                              )}
                              {!!messageCount &&
                                selectedUser?.id !== mentor?.id && (
                                  <span className={styles?.messageCount}>
                                    {messageCount}
                                  </span>
                                )}
                            </div>
                          </WrapItem>
                        );
                      })
                    )}
                  </Wrap>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <div
              className={`${styles?.leftContainerRightWrapper} paddingLeftRight-2`}
            >
              <ToggleButton
                label="Global Chat"
                onToggle={handleOnChatToAll}
                selectedAll={selectedUser === 'all'}
              />
            </div>
          </div>
        </div>
        {false && (
          <div className={`${styles?.selectUserProfileContainer} padding-1`}>
            <div className={styles?.selectedUserHeader}>
              <div className={styles?.selectedUserProfileContainer}>
                <Avatar
                  name={selectedUser?.name}
                  className={styles?.selectedUser}
                  src={selectedUser?.profile_url}
                />
              </div>
              <div className={styles?.selectedUserInfoContainer}>
                <Text className={styles?.selectedUserHeaderText}>
                  {selectedUser?.name}
                </Text>
                <Text className={styles?.selectedUserEmail}>
                  {selectedUser?.bus_email}
                </Text>
              </div>
            </div>
            <div className={`${styles?.selectedUserBody} marginTop-2`}>
              {userRole === 'mentor' && (
                <>
                  <Text>Certificates : {selectedUser?.userCertificates}</Text>
                  <Text>
                    Purchased Courses : {selectedUser?.userPurchasedCourses}
                  </Text>
                </>
              )}
            </div>
            <div className={styles?.selectedUserFooter}></div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Mentors;
