import React, { useEffect, useState } from 'react';
import Styles from './bucketList.module.css';
import { CallAPI } from '../middleware/api';
import endpoints from '../middleware/endpoint';
import { getID } from '../siteConfig';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaStackOverflow } from 'react-icons/fa';
import { BOLoading, TecButton } from '../components/elements/elements';

import { shortenString } from './IFlow';
import {
  Table,
  TableContainer,
  Thead,
  Th,
  Input,
  Tr,
  Td,
  Tbody,
  Image,
  Text,
  TableCaption,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  Link,
  Spinner,
  Checkbox,
  Portal,
} from '@chakra-ui/react';
import { Placeholder } from 'react-bootstrap';
import moment from 'moment-timezone';
import { getUserData } from '../middleware/auth';
import { useToast } from '@chakra-ui/react';
import { MdOutlineVideoCameraFront } from 'react-icons/md';
import NoDataFound from '../components/NoDataFound/NoDataFound';
import { Descriptions } from 'antd';
export const formatDateTimeWithTimezone = (date) => {
  const storedDateFormat =
    localStorage.getItem('storedDateFormat') || 'MM/DD/YYYY';
  const storedTimeFormat =
    localStorage.getItem('storedTimeFormat') || 'HH:mm:ss';
  const storedTimeZone =
    localStorage.getItem('storedTimeZone') || moment.tz.guess(); // Fallback to local timezone

  const format = `${storedDateFormat} `;

  return moment(date).tz(storedTimeZone).format(format);
};
const MainBucketList = () => {
  const toast = useToast();
  const userDetails = getUserData().userdata;
  const [bucketList, setBucketList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingStates, setLoadingStates] = useState({});
  const [iFlow, setIflow] = useState(null); // State for API data in modal
  const [modalLoading, setModalLoading] = useState(false); // State to track modal data loading
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkedIflows, setCheckedIflows] = useState([]);
  const [showCreateIFlowInput, setShowCreateIFlowInput] = useState(false);
  const [newIFlowTitle, setNewIFlowTitle] = useState('');
  const [loading ,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
    CallAPI(endpoints.getBucketList, {user_id : getID('userId')})
      .then((response) => {
        if (response.success) {
          setBucketList(response.data);
        }
      })
      .catch((error) => {
     console.log("error while fetching bucketlist",error)
      }).finally(()=>{
        setLoading(false)
      }

      )
  }, []);
  // function Spinner() {
  //   return <div className="spinner"></div>;
  // }
  const fetchModalData = async (item) => {
    setModalLoading(true);
    try {
      const response = await CallAPI(endpoints?.getIFlowData, {
        user_id: item.user_id,
      });

      if (response.status.code == 200) {
        const { data } = response;

        // Find which iFlows already contain the bucket list item
        const iFlowsContainingItem = data
          .filter((flow) => {
            try {

              const flowData = flow.flow_data;
              let ID;
              if (item.category == 'youtube') {
                ID = item.youtube_id;
              } else {
                ID = item.course_id;
              }
              // const catagoryID=`${item.category}_id`

              // Check if the bucket list item is already present in the flow
              return flowData.some((flowItem) => flowItem.id === ID);
            } catch (error) {

              return false;
            }
          })
          .map((flow) => flow.id); // Get the IDs of iFlows that contain the item

        setIflow(data); // Set the fetched iFlow data
        setCheckedIflows(iFlowsContainingItem); // Automatically check the iFlows where the item is present

      }
    } catch (error) {

    } finally {
      setModalLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedIflows((prev) =>
      prev.includes(id)
        ? prev.filter((iFlowId) => iFlowId !== id)
        : [...prev, id]
    );
  };
  const handleCreateNewIFlow = async () => {
    if (!newIFlowTitle) {
      toast({
        title: 'Please provide title.',
        description: 'Please provide a title for the new iFlow. .',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const transformedData = filterItems(selectedItem);
    try {
      const response = await CallAPI(endpoints.addToIFlow, {
        title: newIFlowTitle,
        user_id: getID('userId'),
        data: [transformedData], // Initially empty flow data
      });

      if (response.status.code == 200) {
        // toast({
        //   title: 'Iflow created.',
        //   description: 'New IFlow is created .',
        //   status: 'success',
        //   duration: 2000,
        //   isClosable: true,
        // });
        setShowCreateIFlowInput(false); // Hide input after creation
        setNewIFlowTitle(''); // Reset input field
        fetchModalData(selectedItem); // Refresh the modal data
      } else {
        toast({
          title: 'Failed To Create IFlow.',
          description: 'Iflow can not be Created.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed To Create IFlow.',
        description: 'Iflow can not be Created.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const filterItems = (item) => {
    let fullData = null;

    // Parse flow_data if it's valid JSON
    try {
      fullData = item.flow_data ? JSON.parse(item.flow_data) : null;
    } catch (error) {
      console.error('Error parsing flow_data for item:', item.id, error);
    }

    // Return the transformed object
    return {
      id: item.youtube_id || item.course_id || item.mentor_id || item.id, // Fallback if no youtube_id, course_id, mentor_id is present
      title: item.title,
      thumbnail: item.thumbnail,
      type: item.category === 'youtube' ? 'videos' : item.category, // Map category to type
      fullData: fullData,
      user_id: item.user_id || getID('userId'), // Assuming you have userId available via getID
    };
  };
  const handleAddToIflow = async () => {
    if (newIFlowTitle) {
      handleCreateNewIFlow();
    }

    if (!checkedIflows.length && !newIFlowTitle) {
      toast({
        title: 'Please select at least one iFlow',
        description: 'Please select at least one iFlow',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (selectedItem.category === 'mentor') {
      toast({
        title: 'Failed To Add.',
        description: 'mentor can not be added.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      // Transform the selected item
      const transformedData = filterItems(selectedItem);

      // Pass the transformed data to the API
      const response = await CallAPI(endpoints.updateIFlow, {
        user_id: userDetails?.id,
        data: [transformedData], // Single item to be sent as an array
        iFlowIds: checkedIflows, // Send selected iFlows
      });

      toast({
        title: 'Added to IFlow.',
        description: 'successfully added to iflow .',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose(); // Close the modal after successful API call
    } catch (error) {
      console.error('Error updating iFlow:', error);
      toast({
        title: 'Failed To Add.',
        description: 'Iflow can not be added.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const openModal = (item) => {

    setSelectedItem(item); // Set the selected item
    onOpen(); // Open modal
    fetchModalData(item); // Fetch data for the modal
  };
  const handleOnClose = () => {
    setShowCreateIFlowInput(false);
    setNewIFlowTitle('');
    onClose(); // Close the modal
  };
  const filteredItems = bucketList.filter(
    (item) => item.user_id === getID('userId')
  );
  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      // Send DELETE request to the server

      await CallAPI(endpoints.deleteBucketListItem, { id });

      // Update the local state to remove the deleted item
      setBucketList(bucketList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting bucket list item:', error);
    }
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const formateSentance = (item) => {
    const words = item.split(' ').slice(0, 5);
    item = words.join(' ') + (words.length === 5 ? '...' : '');
    return item;
  };
  return (
    <>
      <Box w={'100%'} h={'full'}>
        <TableContainer
          overflowY={'scroll'}
          h={'50vh'}
          border={'1px'}
          borderColor={'grey'}
          borderRadius={'9px '}
          w={'100%'}
          px={'0px'}
        >
          <Table w={'100%'} size={'sm'} variant="striped">
            <Thead>
              <Tr h={10}>
                <Th w="25%">Title</Th>
                <Th w="30%">Description</Th>
                <Th>Category</Th>

                <Th>Date</Th>

                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody w={'100%'}>
              {loading?(<>
                <Tr >
                 <Td colSpan={5} className={Styles?.bgNodatafound}>
                   <Box
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     h="100px"

                   >
                    <BOLoading/>
                   </Box>
                 </Td>
               </Tr>
              </>):(
                <>
                 {filteredItems.length===0 ?(
                 <Tr >
                 <Td colSpan={5} className={Styles?.bgNodatafound}>
                   <Box
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     h="100px"

                   >
                     <NoDataFound title="Bucket list is empty" />
                   </Box>
                 </Td>
               </Tr>
              ):(<>
                {filteredItems.map((item, index) => {
                // Ensure that flow_data exists and is a valid JSON string
                let description = '';
                const parsedFlowData = JSON.parse(item.flow_data) || '';

                let descriptions = parsedFlowData?.snippet?.description || '';

                // let title = '';
                // let formattedDate=''
                try {
                  // const date = new Date(item.createdAt);
                  // title=item.title.slice(0,50)
                  //  formattedDate = date.toLocaleDateString();
                  // console.log(formattedDate);
                  // const words = item.title.trim().split(' ').slice(0, 5);
                  // title =
                  //   words.join(' ') + (words.length === 5 ? '...' : '');
                  //   console.log(title)
                } catch (error) {
                  console.error(
                    `Error parsing flow_data for item ${index}:`,
                    error
                  );
                }

                return (
                  <Tr key={index} p={0}>
                    <Td>
                      <Flex alignItems={'center'} gap={2}>
                        <Image
                          w={'60px'}
                          h={'40px'}
                          src={item.thumbnail}
                          alt={item.title}
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                        <Text
                          maxW="250px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis"
                          m={0}
                          p={0}
                        >
                          {item.title}
                        </Text>
                      </Flex>
                    </Td>
                    <Td maxW="200px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{descriptions}</Td>
                    <Td>
                      {item.category === 'youtube'
                        ? 'Youtube'
                        : item.category === 'local'
                          ? 'Course'
                          : 'Mentor'}
                    </Td>

                    <Td>{formatDateTimeWithTimezone(item.createdAt)}</Td>

                    <Td>
                      <Flex
                        alignItems="center"
                        gap={3}
                        justifyContent={'start'}
                      >
                        <Box m={0} w={4}>
                          {item.category == 'mentor' ? (
                            <Button
                              variant={'unstyled'}
                              m={0}
                              title="Request to Session"
                            >
                              <MdOutlineVideoCameraFront />
                            </Button>
                          ) : (
                            <Button
                              variant={'unstyled'}
                              m={0}
                              title="Add to IFlow"
                              onClick={() => openModal(item)}
                            >
                              <FaStackOverflow />
                            </Button>
                          )}
                        </Box>

                        <Button
                          w={4}
                          title="Remove"
                          variant="unstyled"
                          onClick={() => handleDelete(item.id)}
                          disabled={loadingStates[item.id]}
                        >
                          {loadingStates[item.id] ? (
                            <Spinner m={0} size="sm" />
                          ) : (
                            <Box>
                              <AiOutlineDelete />
                            </Box>
                          )}
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
              </>)}
                </>

              )}


            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Modal
          isOpen={isOpen}
          onClose={handleOnClose}
          isCentered
          size="lg"
          zIndex={1000}
        >
          <ModalOverlay />
          <ModalContent display="block">
            <ModalHeader ml={1}>Add To IFlow</ModalHeader>
            <ModalCloseButton />
            <ModalBody ml={1}>
              {modalLoading ? (
                <Box display={'flex'} justifyContent={'center'}>
                  <Spinner />
                </Box>
              ) : iFlow ? (
                <Box
                  maxH="250px" // Restrict height to 250px
                  overflowY="auto"
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'stretch'}
                  justifyContent={'start'}
                  alignContent={'center'}
                >
                  {iFlow.map((data, idx) => (
                    <Box gap={10}>
                      <Checkbox
                        display={'flex'}
                        gap={3}
                        key={idx}
                        onChange={() => handleCheckboxChange(data.id)}
                        isChecked={checkedIflows.includes(data.id)}
                        colorScheme="green"
                      >
                        <Text>{data.title}</Text>
                      </Checkbox>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Text>No data found</Text>
              )}
              <Box mt={4}>
                <Button
                  colorScheme="blue"
                  variant="link"
                  onClick={() => setShowCreateIFlowInput((prev) => !prev)}
                >
                  {showCreateIFlowInput
                    ? '- create New iFlow'
                    : '+ Create New iFlow'}
                </Button>

                {showCreateIFlowInput && (
                  <Box mr={20} mt={2}>
                    <Input
                      size="md"
                      placeholder="Enter iFlow title"
                      value={newIFlowTitle}
                      onChange={(e) => setNewIFlowTitle(e.target.value)}
                    />
                    {/* <Button
                    size='sm'
                      colorScheme="gray"
                      mt={2}
                      onClick={handleCreateNewIFlow}
                    >
                      Create
                    </Button> */}
                  </Box>
                )}
              </Box>
            </ModalBody>

            <ModalFooter display={'flex'} gap={2}>
              <TecButton className="tecSecondaryButton" onClick={handleOnClose}>
                Cancel
              </TecButton>
              <TecButton
                className="tecPrimaryButton"
                onClick={handleAddToIflow}
              >
                Add to IFlow
              </TecButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default MainBucketList;
