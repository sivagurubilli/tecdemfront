import React, { useContext, useState } from 'react';
import { Flex, Box, Text, Card, IconButton, useToast, Avatar, TabList, Tabs, Tab, TabPanels, TabPanel, } from '@chakra-ui/react';
import useStore from '../../store';
import { useDrop } from 'react-dnd';
import { CloseIcon } from '@chakra-ui/icons';
import { TecButton } from '../elements/elements';
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import NoDataFound from '../NoDataFound/NoDataFound';
import { getID } from '../../siteConfig';
import { toastError, toastSuccess } from '../../util_helper';
import { useNavigate } from 'react-router-dom';
import { IBotIflowContext } from '../../Context/iBotIflowContext';


const IFlowFullScreen = ({ setVisibleCards, visibleCards }) => {
  // const [visibleCards, setVisibleCards] = useState("bucketList");
  const [bucketListVideos, setBucketListVideos] = useState([
    { id: 'ysz5S6PUM-U', title: 'Frontend' },
    { id: 'xzbHtTKjP7o', title: 'Backend' },
    { id: 'kxPXvT3k1WM', title: 'Full Stack' },
  ]);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedVideo, setHighlightedVideo] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const {setFlowVideos,flowVideos} = useContext(IBotIflowContext)
  

  const [flowMentors, setFlowMentors] = useState([]);
  const [titles, setTitles] = useState([]);
  const addVideosToCourse = useStore((state) => state.addVideosToCourse);
  const toast = useToast();

  // Drop target setup
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['RESULT', 'MENTOR'],
    drop: (item) => {
      if (item.selectedResult && item.selectedResult.title) {
        const newResult = {
          title: item.selectedResult.title,
        };
        // setFlowVideos((prevVideos) => [...prevVideos, newResult]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleIBucketListClick = () => {
    setVisibleCards('bucketList');
  };

  const handleAddToFlowClick = () => {
    setVisibleCards('flow');
  };

  const getThumbnailUrl = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/0.jpg`;

  const getVideoUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchVideo = () => {
    const foundVideo = bucketListVideos.find(
      (video) => video.title.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundVideo) {
      setHighlightedVideo(foundVideo);
    } else {
      setHighlightedVideo(null);
    }
  };

  const handleSaveVideo = () => {
    if (highlightedVideo) {
      setFlowVideos([...flowVideos, highlightedVideo]);
      setSaveSuccess(true);
    }
  };

  const closePopover = () => {
    setSaveSuccess(false);
  };

  const handleVideoClick = (videoId) => {
    window.open(getVideoUrl(videoId), '_blank');
  };

  // Drag source setup
  const handleDragStart = (event, video) => {
    event.dataTransfer.setData('video', JSON.stringify(video));
  };

  const handleDragOver = (event) => {
    // event.preventDefault();
  };

  const handleDrop = (event) => {
    try {
      // event.preventDefault();
      const videoData = event.dataTransfer.getData('video');
      if (videoData) {
        try {
          const video = JSON.parse(videoData);
          const founded = flowVideos?.find((items) => items?.id === video?.id);
          if (!!!founded) {
            if (visibleCards === 'flow') {
              setFlowVideos((prev) => {
                return { ...prev, iFlowItems: [...prev.iFlowItems, video] };
              });
            } else {
              setFlowVideos((prev) => {
                return {
                  ...prev,
                  buckListItems: [...prev.buckListItems, video],
                };
              });
            }
            // setFlowVideos((prevVideos) => [...prevVideos, video]);
          }
        } catch (error) {
          console.error('Error parsing video data:', error);
        }
      } else {
        console.error('No video data found in drop event');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropBucketList = (event) => {
    try {
      const videoData = event.dataTransfer.getData('video');
      const video = JSON.parse(videoData);
      // console.log(video);
      const founded = flowVideos?.buckListItems?.find(
        (items) => items?.id === video?.id
      );
      if (!!!founded) {
        setFlowVideos((prev) => {
          return { ...prev, buckListItems: [...prev.buckListItems, video] };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropIFlow = (event) => {
    try {
      const videoData = event.dataTransfer.getData('video');
      const video = JSON.parse(videoData);
      const founded = flowVideos?.iFlowItems?.find(
        (items) => items?.id === video?.id
      );
      if (!!!founded) {
        setFlowVideos((prev) => {
          return { ...prev, iFlowItems: [...prev.iFlowItems, video] };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function sendDataToAPI(data) {
    // console.log(data.buckListItems);
    try {
      for (const item of data.buckListItems) {
        let formattedItem;
        // console.log(item);
        if (item.type === 'videos') {
          const category = isNaN(Number(item.id)) ? 'youtube' : 'local';
          formattedItem = {
            uuid: '',
            youtube_id: category === 'youtube' ? item.id : '',
            course_id: category === 'local' ? item.id : '',
            mentor_id: '',
            category: category,
            title: item.title || '',
            thumbnail: item.thumbnail || '',
            status: true,
            user_id: getID('userId'),
            flow_data: item.fullData,
          };
        } else if (item.type === 'mentors') {
          formattedItem = {
            uuid: item.uuid || '',
            youtube_id: '',
            course_id: '',
            mentor_id: item.id || '',
            category: 'mentor',
            title: item.name || '',
            thumbnail: item.profile_url || '',
            status: true,
            user_id: getID('userId'),
            flow_data: item.fullData,
          };
        }

        if (formattedItem) {
          const response = await CallAPI(
            endpoints.createBucketList,
            formattedItem
          );
        }
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const handleAddVideosToTarget = () => {
    // addVideosToCourse(flowVideos);
    sendDataToAPI(flowVideos);
    setFlowVideos((prev) => ({ ...prev, buckListItems: [] }));
  };

  const showNotification = () => {
    toast({
      title: `${flowVideos.length} videos added to the bucket list.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  const handleRemoveVideo = (video) => {
    try {
      if (!video) return;
      if (visibleCards === 'flow') {
        setFlowVideos((prev) => {
          return {
            ...prev,
            iFlowItems: prev?.iFlowItems?.filter((item) => {
              if (video.id) {
                return item.id !== video.id;
              }
              return item.title !== video.title;
            }),
          };
        });
      } else {
        setFlowVideos((prev) => {
          return {
            ...prev,
            buckListItems: prev?.buckListItems?.filter((item) => {
              if (video.id) {
                return item.id !== video.id;
              }
              return item.title !== video.title;
            }),
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (type) => {
    //flow  /bucketList
    try {
      if (type === 'flow') {
        // console.log("iflow items are",flowVideos.iFlowItems)

        if (flowVideos?.iFlowItems.length > 0) {
          const response = await CallAPI(endpoints?.addToIFlow, {
            data: flowVideos.iFlowItems,
            user_id: getID('userId'),
          });
          const { status } = response;
          const { code } = status;
          if (code === 200) {
            setFlowVideos((prev) => ({ ...prev, iFlowItems: [] }));
            toastSuccess(status?.message);
            return;
          }
          toastError('Failed to create IFlow');
        }
      } else {
        handleAddVideosToTarget();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <Flex className="tec-border" gap={4} mt={1} overflow={'hidden'} height={'85%'}>
        <Tabs width={'100%'} borderBottom={'none'} >
          <TabList borderBottom={'none'} gap={'5px'} justifyContent={'center'}>
            <Tab
              fontWeight={700}
              _selected={{
                color: '#8A0EE5',
                borderBottom: '2px solid #8A0EE5',
              }}
              onClick={() => setVisibleCards('bucketList')}
            >
              iBucketList
            </Tab>
            <Tab
              fontWeight={700}
              onClick={() => setVisibleCards('flow')}
              _selected={{
                color: '#8A0EE5',
                borderBottom: '2px solid #8A0EE5',
              }}
            >
              Add To iFlow
            </Tab>

          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>
                {visibleCards === 'bucketList' && (
                  <>
                    <Flex
                      height="full"
                      direction={{ base: 'column', md: 'row' }}
                      gap={6}
                    >
                      {/* Drag and Drop Card */}
                      <Card
  color="#6D31ED"
  width={{ base: '100%', sm: '50%', md: '20%' }} // Adjust width responsively
  height={{ base: '100px', sm: '150px', md: '250px' }} // Set responsive height for each breakpoint
  display="flex"
  alignItems="center"
  justifyContent="center"
  border="1px dotted gray"
  position="relative"
  backgroundColor="#FFFFFF"
  onDragOver={handleDragOver}
  onDrop={handleDropBucketList}
  ref={drop}
>
  <Text
    fontSize={{ base: '2xl', md: '3xl' }} // Font size adjusts with screen size
    mb={1}
    cursor="pointer"
    _hover={{
      color: '#7D7D7D',
      transform: 'scale(1.2)',
      transition: 'all 0.2s ease-in-out',
    }}
  >
    <i className="fas fa-cart-plus"></i>
  </Text>
  <span style={{ color: 'gray', fontSize: '12px', textAlign: 'center' }}>
    Drag and Drop Here
  </span>
</Card>


                      {/* Video List Container */}
                      <Flex
                        direction="column"
                        flex="1"
                        height="full"
                        overflowY="auto"
                      >
                        <Flex
                          direction="row"
                          overflowY="auto"
                          flexWrap="wrap"
                          gap={6}
                          mt={1}
                          height="250px"
                          sx={{

                            '&::-webkit-scrollbar': {
                              width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                              background: '#E2E8F0',
                              borderRadius: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#A0AEC0',
                              borderRadius: '8px',
                              border: '2px solid #F7FAFC',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                              backgroundColor: '#718096',
                            },

                            // For Firefox
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#A0AEC0 #E2E8F0',
                          }}
                        >
                          {flowVideos?.buckListItems?.map((video, index) => {
                            return (
                              <Card
                                key={index}
                                color="black"
                                height="90px"
                                width={'40%'}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid #E2E8F0"
                                borderRadius="md"
                                backgroundColor="white"
                                boxShadow="sm"
                                transition="transform 0.2s ease-in-out"
                                _hover={{ transform: 'scale(1.05)' }}
                              >
                                <IconButton
                                  icon={<CloseIcon />}
                                  aria-label="Remove video"
                                  position="absolute"
                                  top={1}
                                  right={1}
                                  size="xs"
                                  onClick={() => handleRemoveVideo(video)}
                                />
                                {video.videoId ? (
                                  <a
                                    href={getVideoUrl(video.videoId)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img
                                      width="50px"
                                      src={video?.thumbnail}
                                      alt={video.title}
                                      style={{ borderRadius: '4px', marginBottom: '6px' }}
                                    />
                                  </a>
                                ) : (
                                  <>
                                    {video?.type === 'mentors' ? (
                                      <Flex align="center" gap={2}>
                                        <Avatar
                                          size="sm"
                                          name={video.name}
                                          src={video.profile_url || video.avatar}
                                        />
                                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                                          {video?.name}
                                        </Text>
                                      </Flex>
                                    ) : (
                                      <img
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                          borderRadius: '4px',
                                        }}
                                        src={video?.thumbnail}
                                        alt={video.title}
                                      />
                                    )}
                                  </>
                                )}
                              </Card>
                            );
                          })}

                          {/* Summary Card - Added as the last item in the same Flex */}
                          <Card
                            height="90px"
                            width={'40%'}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="1px solid #E2E8F0"
                            borderRadius="md"
                            backgroundColor={flowVideos?.buckListItems?.length > 0 ? '#E2E8F0' : 'gray.300'}
                            color="gray.700"
                            _hover={{ color: 'black', backgroundColor: '#CBD5E0', cursor: 'pointer' }}
                            onClick={() => {
                              // handleAddVideosToTarget();
                              // showNotification();
                            }}
                          >
                            <Text
                              fontSize={12}
                              fontWeight={700}
                              cursor={'pointer'}
                              color={'gray'}
                            >
                              {flowVideos?.buckListItems?.length > 0 ? (
                                `Add More Items`
                              ) : (
                                <NoDataFound title="No items yet!" />
                              )}
                            </Text>
                          </Card>
                        </Flex>
                      </Flex>
                    </Flex>
                  </>
                )}

              </Box>
            </TabPanel>
            {
              <TabPanel>
                <Box>
                  {visibleCards === 'flow' && (
                    <>
                      <Flex
                        height="full"
                        direction={{ base: 'column', md: 'row' }}
                        gap={6}
                      >
                        <Card
                          color="#6D31ED"
                          width="20%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="1px dotted gray"
                          position="relative"
                          backgroundColor="#FFFFFF"
                          ref={drop}
                          onDragOver={handleDragOver}
                          onDrop={handleDropIFlow}
                        // ref={drop} // Attach the drop ref to the Card
                        >
                          <Text
                            fontSize="3xl"
                            mb={1}
                            cursor="pointer"
                            _hover={{
                              color: '#7D7D7D',
                              transform: 'scale(1.2)',
                              transition: 'all 0.2s ease-in-out',
                            }}
                          >
                            <i className="fas fa-cart-plus"></i>
                          </Text>
                          <span style={{ color: 'gray', fontSize: "12px", textAlign: 'center' }}>
                            Drag and Drop Here
                          </span>
                        </Card>
                        <Flex
                          direction="column"
                          flex="1"
                          height="full"
                          overflowY="auto"
                        >
                          <Flex
                            direction="row"
                            overflowY="auto"
                            flexWrap="wrap"
                            gap={6}
                            mt={1}
                            height="250px"
                            sx={{

                              '&::-webkit-scrollbar': {
                                width: '8px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: '#E2E8F0',
                                borderRadius: '8px',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#A0AEC0',
                                borderRadius: '8px',
                                border: '2px solid #F7FAFC',
                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#718096',
                              },

                              // For Firefox
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#A0AEC0 #E2E8F0',
                            }}
                          >
                            {flowVideos?.iFlowItems
                              ?.map((video, index) => {
                                return (
                                  <Card
                                    key={index}
                                    color="black"
                                    height="90px"
                                    width={'40%'}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="1px solid #E2E8F0"
                                    borderRadius="md"
                                    backgroundColor="white"
                                    boxShadow="sm"
                                    transition="transform 0.2s ease-in-out"
                                    _hover={{ transform: 'scale(1.05)' }}
                                  >
                                    <IconButton
                                      icon={<CloseIcon />}
                                      aria-label="Remove video"
                                      position="absolute"
                                      top={1}
                                      right={1}
                                      size="xs"
                                      onClick={() => handleRemoveVideo(video)}
                                    />
                                    {video.videoId ? (
                                      <a
                                        href={getVideoUrl(video.videoId)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          width="50px"
                                          src={video?.thumbnail}
                                          alt={video.title}
                                          style={{ borderRadius: '4px', marginBottom: '6px' }}
                                        />
                                        {false && (
                                          <Text
                                            mt={2}
                                            fontSize="sm"
                                            textAlign="center"
                                          >
                                            {video.title}
                                          </Text>
                                        )}
                                      </a>
                                    ) : (
                                      <>
                                        {video?.type === 'mentors' ? (
                                          <Flex align="center" gap={2}>
                                            <Avatar
                                              size="sm"
                                              name={video.name}
                                              src={video.profile_url || video.avatar}
                                            />
                                            <Text fontSize="sm" fontWeight="medium" color="gray.700">
                                              {video?.name}
                                            </Text>
                                          </Flex>
                                        ) : (
                                          <img
                                            style={{
                                              width: '100%',
                                              height: '100%',
                                              objectFit: 'cover',
                                              borderRadius: '4px',
                                            }}
                                            src={video?.thumbnail}
                                            alt={video.title}
                                          />
                                        )}
                                        {false && <Text>{video.title}</Text>}
                                      </>
                                    )}
                                  </Card>
                                );
                              })}
                            <Card

                              height="90px"
                              width={'40%'}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="1px solid #E2E8F0"
                              borderRadius="md"
                              color="gray.700"
                              _hover={{ color: 'black', backgroundColor: '#CBD5E0', cursor: 'pointer' }}
                              onClick={() => {
                                // handleAddVideosToTarget();
                                // showNotification();
                              }}
                              backgroundColor={
                                flowVideos?.iFlowItems?.length > 0
                                  ? '#E2E8F0' : 'gray.300'
                              }
                            >
                              <Text
                                fontSize={12}
                                fontWeight={700}
                                cursor={'pointer'}
                                color={'gray'}
                              >
                                {flowVideos?.iFlowItems?.length > 0 ? (
                                  `${flowVideos?.iFlowItems?.length} Items`
                                ) : (
                                  <NoDataFound title="No items yet!" />
                                )}
                              </Text>
                            </Card>
                          </Flex>
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Box>
              </TabPanel>
            }
          </TabPanels>
        </Tabs>

        {/* <TecButton
          title="Add to Bucket List"
          className="thirdButtonPrimary"
        />

        <TecButton
          title="Add to Flow"
          className="thirdButtonPrimary"
        /> */}
      </Flex>
      <Box
        className={` marginTopBottom-3`}
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
      >
        {
          <TecButton
            title={`${visibleCards === 'flow' ? 'Create IFlow' : 'Add to Bucket List'
              }`}
            className=" w-100 color-white"
            onClick={() => {
              handleCreate(visibleCards === 'flow' ? 'flow' : 'bucketList');
            }}
            styling={{ backgroundColor: '#8A0EE5', color: 'white' }}
          />

        }
        {visibleCards === 'flow' && (
          <TecButton
            title={`Go to IFlow`}
            className=" w-100"
            onClick={() => {
              navigate('/bucketlist');
            }}
            styling={{ backgroundColor: 'white', color: '#8A0EE5' }}
          />
        )}
        {visibleCards === 'bucketList' && (
          <TecButton
            title={`Go to Bucket List`}
            className=" w-100"
            onClick={() => {
              navigate('/bucketlist');
            }}
            styling={{
              backgroundColor: 'white',
              color: '#8A0EE5',
              boxShadow: '0 4px 10px rgba(138, 14, 229, 0.1)',
            }}
          />
        )}
      </Box>
    </>
  );
};

export default IFlowFullScreen;
