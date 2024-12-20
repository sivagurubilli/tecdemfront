import React, { useEffect, useState, useContext } from 'react';
import { json, NavLink } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import {
  Box,
  Container,
  Flex,
  Text,
  Badge,
  Image,
  Button,
  Tooltip,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Spinner,
  TableContainer,
  useDisclosure,
  useToast,
  Input,
} from '@chakra-ui/react';
import { getUserData } from '../middleware/auth';
import { CallAPI } from '../middleware/api';
import endpoints from '../middleware/endpoint';
import { toastError } from '../util_helper';
import NoDataFound from '../components/NoDataFound/NoDataFound';
import { BOLoading, TecButton } from '../components/elements/elements';
import { FiMoreVertical } from 'react-icons/fi';
import { formatDateTimeWithTimezone } from './bucketList';
import { GoTasklist } from 'react-icons/go';
import { FaAngleDown } from 'react-icons/fa6';
import { PurchasedListContext } from '../Context/PurchasedListContext';
import YoutubeDrawer from './YoutubeDrawer';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// const steps = [
//   { title: 'Step 1', description: 'HTML', time: 1 },
//   { title: 'Step 2', description: 'CSS', time: 1 },
//   { title: 'Step 3', description: 'JAVASCRIPT', time: 1 },
//   { title: 'Step 4', description: 'React.js', time: 1 },
// ];

// const studentData = [
//   { id: 1, name: 'Mohit Sharma', completed: 2, total: steps.length },
//   { id: 2, name: 'Sreeni', completed: 1, total: steps.length },
// ];
export const shortenString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str; // If the string is already shorter than maxLength, return the string as is
};
const timePerStep = 2;
const userDetails = getUserData().userdata;
const ReportTracker = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { context, setContext } = useContext(PurchasedListContext);
  const [activeStep, setActiveStep] = useState(0);
  const [iFlowData, setIFlowData] = useState([]);
  const calculateProgress = (completed, total) => {
    const remaining = total - completed;
    const percentage = (completed / total) * 100;
    return { remaining, percentage };
  };
  const [editTitleIndex, setEditTitleIndex] = useState(null); // Track which iFlow is being edited
  const [tempTitle, setTempTitle] = useState(''); // Temporary title state for editing
  const toast = useToast();
  const [showTable, setShowTable] = useState({ 0: true });
  const [currentStep, setCurrentStep] = useState(null);
  const calculateEstimatedTime = (remaining) => {
    const estimatedHours = remaining * timePerStep;
    return estimatedHours;
  };
  const handleEditClick = (index, currentTitle) => {
    setEditTitleIndex(index); // Set the index of the iFlow being edited
    setTempTitle(currentTitle); // Set the current title in the temp state
  };
  const handleToggleTable = (index) => {
    setShowTable((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility for this table
    }));
  };

  const handleSaveTitle = async (index, id) => {
    try {
      // Make API call to update the title in the backend
      const response = await CallAPI(endpoints.updateIFlowTitle, {
        user_id: userDetails?.id,
        iFlowId: id,
        title: tempTitle,
      });

      if (response?.status?.code === 200) {
        // Successfully updated, now update the title in the state
        const updatedIFlowData = iFlowData.map((flow, idx) => {
          if (idx === index) {
            return { ...flow, title: tempTitle }; // Update the title
          }
          return flow;
        });
        setIFlowData(updatedIFlowData);
        setEditTitleIndex(null); // Exit edit mode
        toast({
          title: 'Title updated.',
          description: 'The iFlow title has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update title');
      }
    } catch (error) {
      console.error('Error updating title:', error);
      toast({
        title: 'Error updating title',
        description: 'There was an error updating the title. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditTitleIndex(null); // Cancel editing and reset edit mode
  };

  const handleDelete = async (id) => {
    // setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      // Send DELETE request to the server

      await CallAPI(endpoints.deleteIFlowData, {
        user_id: userDetails?.id,
        iFlowId: id,
      });
      setIFlowData(iFlowData.filter((item) => item.id !== id));

      // Update the local state to remove the deleted item
      // setBucketList(bucketList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting bucket list item:', error);
    }
    // setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };
  const handleBucketIFlowDelete = async (iFlowId, bucketItemId) => {
    try {
      // Send DELETE request to the server
      const response = await CallAPI(endpoints.deleteBucketItemFromFlow, {
        iFlowId,
        bucketItemId,
      });

      // Update the local state to remove the deleted bucket item from the iFlow data
      setIFlowData((prevIFlowData) =>
        prevIFlowData.map((flow) =>
          flow.id === iFlowId
            ? {
              ...flow,
              flow_data: flow.flow_data.filter(
                (item) => item.id !== bucketItemId
              ),
            }
            : flow
        )
      );
    } catch (error) {
      console.error('Error deleting bucket list item from iFlow:', error);
    }
  };
  const [openDrawerIndex, setOpenDrawerIndex] = useState(null); // Track which row opens the drawer

  const handleDrawerOpen = (index, step) => {
    setOpenDrawerIndex(index);
    setCurrentStep(step); // Set the index of the row to open the drawer
  };

  const handleDrawerClose = () => {
    setOpenDrawerIndex(null);
    setCurrentStep(null); // Close the drawer
  };

  const fetchIFlowData = () => {
    setLoading(true); // Set loading to true before starting the API call
    CallAPI(endpoints?.getIFlowData, { user_id: userDetails?.id })
      .then((res) => {
        const { status, data = [] } = res;
        const { code } = status;
        if (code === 200) {
          setIFlowData(data);
        } else {
          toastError('Failed to fetch IFlow Data');
        }
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading is set to false after the Promise is resolved or rejected
      });
  };

  const calculateAverageProgress = (flowData) => {
    let totalProgress = 0;
    let totalItems = 0;

    flowData.forEach((item) => {
      if (item.type === 'local') {
        let courseTotalProgress = 0;
        let courseTotalVideoLength = 0;

        // Calculate total video length and progress for the course
        item.sectionDataWithProgress.forEach((section) => {
          section.subSections.forEach((subSection) => {
            const videoLength = parseInt(subSection.totalVideoLength, 10) || 0;
            const progress = parseFloat(subSection.progress?.video_progress) || 0;

            courseTotalProgress += progress;
            courseTotalVideoLength += videoLength;
          });
        });

        // Calculate percentage for the course based on actual progress
        if (courseTotalVideoLength > 0) {
          const courseProgressPercentage = (courseTotalProgress / courseTotalVideoLength) * 100;
          totalProgress += courseProgressPercentage;


        } else {
          totalProgress += 0;
        }
        totalItems++;
        //  console.log("courseTotalProgress",courseTotalProgress)
        //  console.log("courselength",courseTotalVideoLength)
      } else if (item.type === 'videos') {
        // For YouTube videos, progress is either 100% or 0% based on progress_status
        totalProgress += item.progress_status ? 100 : 0;
        totalItems++;
      }
    });
    return totalItems > 0 ? Math.floor(totalProgress / totalItems) : 0;
  };

  const calculateCourseCompletion = (course) => {
    let courseTotalProgress = 0;
    let courseTotalVideoLength = 0;

    course.sectionDataWithProgress.forEach((section) => {
      section.subSections.forEach((subSection) => {
        const videoLength = parseInt(subSection.totalVideoLength, 10) || 0;
        const progress = subSection.progress?.video_progress || 0;

        courseTotalProgress += progress;
        courseTotalVideoLength += videoLength;
      });
    });

    return courseTotalVideoLength > 0 &&
      courseTotalProgress >= courseTotalVideoLength
      ? 'Completed'
      : 'In Progress';
  };
  const handleYoutubeProgressClick = (index, itemId, iFlowId, step) => {
    handleDrawerOpen(index, step);
    const updatedIFlowData = iFlowData.map((flow) => {
      return {
        ...flow,
        flow_data: flow.flow_data.map((item) => {
          if (item.id === itemId && item.type === 'videos' && !item.progress_status) {
            // Only update progress_status if it's not already true
            const newProgressStatus = true;

            // Update the backend with the new progress_status
            CallAPI('/api/updateProgressStatus', {
              iFlowId: flow.id,
              videoId: item.id,
              progress_status: newProgressStatus,
            });

            return { ...item, progress_status: newProgressStatus };
          }
          return item;
        }),
      };
    });
    setIFlowData(updatedIFlowData);

  };


  useEffect(() => {
    fetchIFlowData();
  }, []);

  return (
    <>
      <Container pl={0} maxW="100%">
        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <Box
            h="100%"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={20}
          >

           <BOLoading/>
          </Box>
        ) : iFlowData.length === 0 ? (
          // Show message if iFlowData is empty
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="100%"
            mt={20}
          >
            <Text fontSize="lg" fontWeight="bold">
              No iFlow data available.
            </Text>
          </Box>
        ) : (
          iFlowData.map((flow, idx) => {
            const { id, title, name, completed, total, flow_data } = flow;
            const jsonData =
              typeof flow_data === 'string' ? JSON.parse(flow_data) : flow_data;


            const { remaining, percentage } = calculateProgress(
              completed,
              total
            );
            const estimatedTime = calculateEstimatedTime(remaining);
            const averageProgress = calculateAverageProgress(jsonData);
            return (
              <Box ml={0} key={flow.id} mb={12} mt={0}>
                {/* Header with Title and Progress */}
                <Box mt={0} mb={1} w={'100%'}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom="20px"
                    padding="10px"
                    paddingY={4}
                    border="1px"
                    borderColor={'gray.200'}
                    borderRadius="lg"
                  >
                    <Flex w="50%" m={0} p={0} alignItems="center" gap={9}>
                      <Box w={'50%'}>
                        {editTitleIndex === idx ? (
                          <Flex alignItems="center">
                            <Input
                              value={tempTitle}
                              onChange={(e) => setTempTitle(e.target.value)}
                              size="sm"
                              maxWidth="300px"
                              mr={2}
                            />
                            <IconButton
                              aria-label="Save"
                              icon={<CheckIcon />}
                              onClick={() => handleSaveTitle(idx, flow.id)} // Save the updated title
                              colorScheme="green"
                              size="sm"
                              mr={2}
                            />
                            <IconButton
                              aria-label="Cancel"
                              icon={<CloseIcon />}
                              onClick={handleCancelEdit}
                              colorScheme="red"
                              size="sm"
                            />
                          </Flex>
                        ) : (
                          // Non-edit mode
                          <Flex alignItems="center" justifyContent={'start'}>
                            <Text
                              fontWeight="bold"
                              maxW="250px"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              m={0}
                              p={0}
                              onClick={() => handleEditClick(idx, title)}
                              cursor={"pointer"}
                            >
                              {title || "Create Title"}
                            </Text>
                            <Button
                              variant={'unstyle'}
                              onClick={() => handleEditClick(idx, title)}
                            >
                              <FiEdit />
                            </Button>
                          </Flex>
                        )}
                      </Box>

                      <Flex w="20%" gap={1} alignItems={'center'}>
                        <GoTasklist />
                        <Text
                          m={0}
                          p={0}
                          fontSize="lg"
                          fontWeight="bold"
                          marginRight="8px"
                        >
                          {`${jsonData.length <= 1 ? `${jsonData.length} Step` : `${jsonData.length} Steps`} `}
                        </Text>
                      </Flex>

                      <Badge
                        w="30%"

                        fontSize="lg"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontWeight="bold"
                        bg={`${averageProgress.toFixed() === '100' ? '#68D391' : '#D6BCFA'}`}

                      >
                        {averageProgress.toFixed()}% In Progress
                      </Badge>
                    </Flex>
                    <Flex alignItems={'center'} gap={2} mr={9}>
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant={'unstyled'}
                          rightIcon={<FiMoreVertical />}
                        ></MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleDelete(id)}>
                            Remove
                          </MenuItem>
                          {/* <MenuItem>Create a Copy</MenuItem>
                          <MenuItem>Mark as Draft</MenuItem>
                          <MenuItem>Delete</MenuItem>
                          <MenuItem>Attend a Workshop</MenuItem> */}
                        </MenuList>
                      </Menu>
                      <Button
                        variant={'unstyle'}
                        onClick={() => handleToggleTable(idx)}
                      >
                        {' '}
                        {showTable[idx] ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                    </Flex>
                  </Flex>
                </Box>

                {/* Table for steps */}
                {showTable[idx] && (
                  <Box maxHeight="250px" overflowY="scroll" borderRadius={'xl'}>
                    <Table
                      border="2px"
                      borderRadius={'lg'}
                      bg=" rgba(0, 0, 0, 0.04)"
                      variant="simple"
                      borderColor="gray.300"
                      size="md"
                    >
                      <Thead
                        borderBottom="2px solid"
                        borderColor="gray.300 !important"
                      >
                        <Tr
                          borderY="2px"
                          borderX="2px"
                          color={'gray.200'}
                          borderColor={'gray.200'}
                          fontWeight={'bold'}
                        >
                          <Th w={'10%'}>Step</Th>
                          <Th w={'10%'}>Category</Th>
                          <Th w={'10%'}>Thumbnail</Th>
                          <Th w={'30%'} >Name / Title</Th>
                          <Th w={'10%'}>Status</Th>
                          <Th w={'15%'}>Date Added</Th>
                          <Th w={'20%'}>Actions</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {jsonData.map((step, index) => {
                          const isPurchased = context?.purchased?.includes(
                            step.id
                          );
                          const courseCompletion =
                            calculateCourseCompletion(step);
                          return (
                            <Tr
                              borderBottom="2px"
                              borderX="2px"
                              borderColor={'gray.200'}
                              borderRadius="lg"
                              key={index}
                              fontWeight={'medium'}
                            >
                              <Td py={2} fontWeight={'bold'}>
                                {index + 1}
                              </Td>
                              <Td py={2} fontWeight={'bold'}>
                                {step.type == 'videos' ? (
                                  <Box m={0}
                                    p={0} fontWeight={'bold'}>
                                    Youtube

                                    <YoutubeDrawer
                                      step={currentStep}
                                      isOpen={openDrawerIndex === index} // Check if this drawer should be open
                                      onClose={handleDrawerClose}
                                    />
                                  </Box>
                                ) : (
                                  <Box fontWeight={'bold'} m={0}
                                    p={0}>Course</Box>

                                )}
                              </Td>
                              <Td py={2}>
                                {step.type == 'videos' ? (
                                  <Box cursor={'pointer'}
                                    onClick={() =>
                                      handleYoutubeProgressClick(
                                        index,
                                        step.id,
                                        flow.id,
                                        step
                                      )
                                    }
                                  >
                                    {' '}
                                    <Image
                                      src={step.thumbnail}
                                      alt="Thumbnail"
                                      w="70px"
                                      h="45px"
                                    />
                                  </Box>
                                ) : (
                                  <NavLink
                                    to={
                                      isPurchased
                                        ? `/coursevideo/${step?.fullData?.uuid}`
                                        : `/course/${step?.fullData?.uuid}`
                                    }
                                  >
                                    <Image
                                      src={step.thumbnail}
                                      alt="Thumbnail"
                                      w="70px"
                                      h="45px"
                                    />
                                  </NavLink>
                                )}
                              </Td>
                              <Td  >
                                {step.type == 'videos' ? (
                                  <Box cursor={'pointer'} onClick={() =>
                                    handleYoutubeProgressClick(
                                      index,
                                      step.id,
                                      flow.id,
                                      step
                                    )
                                  } maxW="340px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis"  >{step.title}</Box>
                                ) : (<Box>
                                  <NavLink
                                    maxW="340px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis"
                                    to={
                                      isPurchased
                                        ? `/coursevideo/${step?.fullData?.uuid}`
                                        : `/course/${step?.fullData?.uuid}`
                                    }
                                  >
                                    {step.title}
                                  </NavLink>
                                </Box>)}

                              </Td>
                              <Td py={2}>
                                {step.type == 'videos' ? (
                                  step.progress_status ? (
                                    'Completed'
                                  ) : (
                                    'In progress'
                                  )
                                ) : (
                                  <Box>{courseCompletion}</Box>
                                )}
                              </Td>
                              <Td py={2}>
                                {formatDateTimeWithTimezone(
                                  step?.fullData?.snippet?.publishTime
                                )}
                              </Td>
                              <Td py={2}>
                                <Tooltip
                                  label="More actions"
                                  aria-label="More actions"
                                >
                                  <Menu>
                                    <MenuButton
                                      as={Button}
                                      variant={'unstyled'}
                                      rightIcon={<FiMoreVertical />}
                                    ></MenuButton>
                                    <MenuList>
                                      <MenuItem
                                        onClick={() =>
                                          handleBucketIFlowDelete(id, step.id)
                                        }
                                      >
                                        Remove
                                      </MenuItem>
                                      {/* <MenuItem>Create a Copy</MenuItem>
                          <MenuItem>Mark as Draft</MenuItem>
                          <MenuItem>Delete</MenuItem>
                          <MenuItem>Attend a Workshop</MenuItem> */}
                                    </MenuList>
                                  </Menu>
                                </Tooltip>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </Box>
                )}
              </Box>
            );
          })
        )}
      </Container>
    </>
  );
};

export default ReportTracker;
