import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Select,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ChakraProvider,
  DrawerOverlay,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  useMediaQuery,
  HStack,
} from '@chakra-ui/react';
import { openChatbot } from '../../Redux/chatBotSlice';
import styles from './ToDoForm.module.css';
import { BOLoading, TecButton } from '../elements/elements';
import messageService from '../MessageService/Index';
import { useEffect, useState, useContext } from 'react';
import { getID, setID } from '../../siteConfig';
import endpoints from '../../middleware/endpoint';
import { CallAPI } from '../../middleware/api';
import { COURSE_LINK } from '../Config';
import { toastError } from '../../util_helper';
import { toast } from 'react-toastify';
import { ShimmerSectionHeader, ShimmerTitle } from 'react-shimmer-effects';
import NoDataFound from '../NoDataFound/NoDataFound';
import CourseRecommendation from './CourseRecommendation';
import sendChatMessage from '../chatbot/ChatInput'
import { useDispatch } from 'react-redux';

import { ChatContext } from "../chatbot/ChatProvider";

const AddUpdateToDo = (props) => {
  const { sendMessage, chatHistory, setChatHistory, summarizeHistory } = useContext(ChatContext);
  const dispatch = useDispatch()
  const { showList, isAdding = false } = props;
  const [todoList, setTodoList] = useState([]);
  const userId = getID('userId');
  const [loading, setLoading] = useState('init');
  const [addEditForm, setAddEditForm] = useState('');
  const [todoLoading, setTodoLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todoData, setToDoData] = useState('');

  const [shouldFetchRecommendations, setShouldFetchRecommendations] = useState(false);
  const [activeRecommendations, setActiveRecommendations] = useState({});
  useEffect(() => {
    try {
      if (!!showList.show) {
        onOpen();
      } else {
        onClose();

      }
    } catch (error) {
      console.error(error);
    }
  }, [showList]);

  const fetchTodoList = () => {
    try {
      // setTodoLoading(true)
      CallAPI(endpoints?.getTodoList, { user_id: userId }).then((res) => {
        // setTodoLoading(false)
        if (res?.status?.code === 200) {
          setTodoList(res?.data);
          const todos = res?.data
          todos.forEach((todo) => {
            fetchCourseRecommendations(todo.uuid, todo.to_do_text);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourseDetails = async (courseIds) => {
    try {
      const response = await CallAPI(endpoints.fetchCourseList, {
        external: '1',
        id: courseIds,
      });
      if (response?.status?.code === 200) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching full course details:', error);
      return [];
    }
  };

  // Function to fetch course IDs and full course details for a specific to-do
  const fetchCourseRecommendations = async (todoId, todoText) => {
    try {

      // Initial call to get course IDs
      const response = await fetch(`https://xvxurdsm6h.execute-api.us-east-1.amazonaws.com/tecdemy-apis/`, {
        method: 'POST',
        body: JSON.stringify({
          service: 'course_search',
          body: { user_query: todoText },
        }),
      });
      const result = await response.json();
      const courseIds = result.answer?.courses?.response || [];

      if (courseIds.length > 0) {
        // Second API call to fetch full course details
        const fullCourseData = await fetchCourseDetails(courseIds.join('|'));
        setActiveRecommendations((prev) => ({
          ...prev,
          [todoId]: fullCourseData,
        }));
      } else {
        setActiveRecommendations((prev) => ({
          ...prev,
          [todoId]: [],
        }));
      }
    } catch (error) {
      console.error('Error fetching course recommendations:', error);
    }
  };

  useEffect(() => {
    if (!!isAdding) {
      setAddEditForm('add');
    }
  }, [isAdding]);

  useEffect(() => {
    try {
      if (showList?.show) {
        fetchTodoList();
      }
    } catch (error) {
      console.error(error);
    }
  }, [showList]);

  const handleUnChecked = (todo, todoIndex) => {
    try {
      const updatedList = todoList.map((items, idx) => {
        if (idx === todoIndex) {
          return { ...items, is_checked: todo?.is_checked === '1' ? '0' : '1' };
        }
        return items;
      });
      todo['is_checked'] = todo?.is_checked === '1' ? '0' : '1';
      handleUpdateTodo(todo);
      setTodoList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoListChange = (e, todoIndex) => {
    try {
      const { value } = e.target;
      const updatedList = todoList.map((items, idx) => {
        if (idx === todoIndex) {
          return { ...items, to_do_text: value };
        }
        return items;
      });
      setTodoList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodo = (todObject, isEdit, index) => {
    try {
      // return;
      if (isEdit) {
        setActiveRecommendations((prev) => ({
          ...prev,
          [index]: [],
        }));
      }
      const { to_do_text, uuid, is_checked, status, user_id } = todObject;
      if (!!to_do_text) {
        setAddEditForm('');
        CallAPI(endpoints?.AddUpdateToDo, {
          uuid,
          to_do_text,
          is_checked,
          status,
          user_id,
        }).then((res) => {
          if (res?.status?.code === 200) {


            fetchTodoList();

            return;
          }
          toastError(res?.status?.message);
        });
        return;
      }
      toastError('Field is required!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = (todo, index) => {
    try {
      setTodoList(todoList.filter((items, indx) => indx !== index));
      todo['status'] = todo?.status === '1' ? '0' : '1';
      handleUpdateTodo(todo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNewTodo = async (e) => {
    try {
      const newTodoObject = {};
      const inputElement = document.getElementById("addUpdateToDo");
      if (inputElement) {
        const inputValue = inputElement.value.trim().toLowerCase();

        if (!inputValue) {
          toastError("Field is required!");
          return;
        }


        const isDuplicate = todoList.some((todo) => {
          const existingKeyword = todo.to_do_text.trim().toLowerCase();
          return inputValue.includes(existingKeyword) || existingKeyword.includes(inputValue);
        });

        newTodoObject["to_do_text"] = inputElement.value;
        newTodoObject["is_checked"] = "0";
        newTodoObject["status"] = "1";
        newTodoObject["user_id"] = getID("userId");


        setTodoList((prev) => [newTodoObject, ...prev]);
        handleUpdateTodo(newTodoObject, false);


        if (!isDuplicate) {
          dispatch(openChatbot());
          await sendMessage(inputValue);
        }

        inputElement.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    try {
      messageService.sendMessage(
        'todoForm',
        { data: todoList },
        'dashboardTodWidget'
      );
    } catch (error) {
      console.error(error);
    }
  }, [todoList]);

  const handleKeyPress = (e) => {
    try {
      if (e.key === 'Enter') {
        handleAddNewTodo(e);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [isMobileOrTablet] = useMediaQuery("(max-width: 1024px)");

  return (
    <ChakraProvider>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={{ base: 'full', sm: 'xs', md: 'md' }}
        trapFocus={false}
        onClose={() => {
          messageService.sendMessage(
            'todoWidget',
            { show: false, isAdding: false },
            'popup'
          );
          onClose();
        }}
      >
        <DrawerOverlay />
        <DrawerContent className={styles?.drawerContainer}>
          <DrawerHeader
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <h5>To Do List</h5>

            <HStack>
              <TecButton
                title={`${addEditForm === 'add' ? 'Cancel' : 'Add'}`}
                className="tecPrimaryButton"
                onClick={() => {
                  if (addEditForm === 'add') {
                    setAddEditForm('');
                    return;
                  }
                  setAddEditForm('add');
                }}
                small
              />
              {isMobileOrTablet && (
                <TecButton
                  title="Close"
                  styling={{
                    width: '50px',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#8A0EE5',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                  }}

                  onClick={() => {
                    messageService.sendMessage(
                      'todoWidget',
                      { show: false, isAdding: false },
                      'popup'
                    );
                    setAddEditForm('');
                    onClose();
                  }}
                />
              )}
            </HStack>

          </DrawerHeader>
          <DrawerBody>
            {addEditForm === 'add' && (
              <Box
                className={`${styles?.linkWidget} fadeElement`}
                borderRadius="md"
              >
                <Box className={styles?.contentContainer} flex={'0 0 70%'}>
                  {/* {<img width={"35"} src={COURSE_LINK} />} */}
                  <Input
                    type="text"
                    fontSize={'12px'}
                    placeholder="Try typing 'Complete docker course today'"
                    background={'#ffffff'}
                    id="addUpdateToDo"
                    width={'100%'}
                    autoFocus

                    onKeyPress={handleKeyPress}
                  />
                </Box>

                <Box className={styles?.buttonContainer}>
                  <TecButton
                    title={<i className="fas fa-plus"></i>}
                    className="tecPrimaryButton"
                    onClick={(e) => {
                      handleAddNewTodo(e);
                    }}
                  />

                  <TecButton
                    title={<i className="fas fa-circle-xmark"></i>}
                    className="tecSecondaryButton"
                    onClick={() => {
                      setAddEditForm('');
                    }}
                  />
                </Box>
              </Box>
            )}
            {todoLoading ? (
              <>
                <ShimmerTitle line={1} variant="primary" />
                <ShimmerTitle line={1} variant="primary" />
                <ShimmerTitle line={1} variant="primary" />
                <ShimmerTitle line={1} variant="primary" />
              </>
            ) : todoList.length > 0 ? (
              todoList?.map((items, index) => {
                return addEditForm === index ? (
                  <Box
                    key={index}
                    className={`${styles?.linkWidget}`}
                    borderRadius="md"
                  >
                    <Box className={styles?.contentContainer} flex={'0 0 70%'}>
                      {/* {<img width={"35"} src={COURSE_LINK} />} */}
                      <Input
                        type="text"
                        autoFocus
                        fontSize={'12px'}
                        placeholder="Try typing 'Complete docker course today'"
                        background={'#ffffff'}
                        width={{
                          base: "100vw",
                          md: '100%'
                        }}
                        value={items?.to_do_text}
                        onChange={(e) => {
                          handleTodoListChange(e, index);

                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateTodo(items, true, items.uuid);
                          }
                        }}
                      />
                    </Box>

                    <Box className={styles?.buttonContainer}>
                      <TecButton
                        title={<i className="fas fa-check"></i>}
                        className="tecSecondaryButton"
                        onClick={() => {
                          handleUpdateTodo(items, true, items.uuid);
                        }}
                      />
                      {/* <Button title="Cancel" onClick={() => {
                                              setAddEditForm("")
                                          }}>
                                              <i className="fas fa-circle-xmark"></i>
                                          </Button> */}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box className={`${styles?.linkWidget} fadeElement`} key={index}>
                      <Box className={styles?.contentContainer}>
                        <input
                          type="checkbox"
                          checked={items?.is_checked === '1'}
                          id={items?.uuid}
                          onChange={() => handleUnChecked(items, index)}
                        />
                        <Text
                          cursor="pointer"
                          onClick={() => handleUnChecked(items, index)}
                          className={items?.is_checked === '1' ? styles?.strikeIfChecked : ''}
                          as="p"
                        >
                          {items?.to_do_text}
                        </Text>
                      </Box>

                      <Box className={styles?.buttonContainer}>
                        <TecButton
                          title={<i className="fas fa-pen"></i>}
                          className="tecPrimaryButton"
                          onClick={() => setAddEditForm(index)}
                        />
                        <TecButton
                          title={<i className="fas fa-trash"></i>}
                          className="tecDangerButton"
                          onClick={() => handleDeleteTodo(items, index)}
                        />
                      </Box>
                    </Box>


                    <CourseRecommendation
                      key={items.uuid}
                      todoData={items.to_do_text}
                      courseData={activeRecommendations[items.uuid] || []} // Pass full course data
                      userId={userId}
                      closeDrawer={onClose}
                    />
                  </Box>
                );
              })
            ) : (
              <NoDataFound title="No To-Dos yet!" />
            )}
            {/* <CourseRecommendation todoList={todoList} todoData={todoData} setToDoData={setToDoData}/> */}
          </DrawerBody>

          <DrawerFooter>
            <TecButton
              title="Close"
              className="tecSecondaryButton"
              onClick={() => {
                messageService.sendMessage(
                  'todoWidget',
                  { show: false, isAdding: false },
                  'popup'
                );
                setAddEditForm('');
                onClose();

              }}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default AddUpdateToDo;
