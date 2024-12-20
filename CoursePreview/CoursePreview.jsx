import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  ListItem,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import { toast } from 'react-toastify';
import Styles from './CoursePreview.module.css';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { GoGift } from 'react-icons/go';
import { GrNext } from 'react-icons/gr';
import { CiHeart } from 'react-icons/ci';
import { AiOutlineTrophy } from 'react-icons/ai';
import { LiaCalendarCheck } from 'react-icons/lia';
import { CiClock2 } from 'react-icons/ci';
import { RiPagesLine } from 'react-icons/ri';
import { FiDownload } from 'react-icons/fi';
import { FaLaptopFile } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Men from '../../img/Male 1 G.svg';
import { RiMedalFill } from 'react-icons/ri';
import { RiFolderVideoLine } from 'react-icons/ri';
import { FaRegStar } from 'react-icons/fa6';
import { RiShieldUserLine } from 'react-icons/ri';
import CourseCard from '../CourseCard/CourseCard';
import { PurchasedListContext } from '../../Context/PurchasedListContext';
import { getID } from '../../siteConfig';
import StarRating from '../StarRating.js/StarRating';
import { BOLoading, TecButton } from '../elements/elements';
import { CART_ICON, WISHLIST_FILLED_ICON, WISHLIST_ICON } from '../Config';
import PreviewReviews from './PreviewReviews';
import ReactPlayer from 'react-player';
import {
  ShimmerPostList,
  ShimmerTitle,
  ShimmerText,
  ShimmerThumbnail,
} from 'react-shimmer-effects';

const CoursePreview = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState('');
  const [wishLoading, setWishLoading] = useState('');
  const {
    filteredPurchaseList,
    wishList,
    cart,
    WishListLoading,
    addWishListLoading,
    addCartLoading,
    removeCartLoading,
    context,
    setContext,
  } = useContext(PurchasedListContext);
  // const allRatingStars = courseDetails.reviews?.map((items) => Number(items?.stars));
  // const sum = allRatingStars.reduce((total, rating) => total + rating, 0);
  // const averageRating = sum / allRatingStars.length;
  // const totalAverage = averageRating.toFixed(1);

  const fetchCourseDetails = (isRecall) => {
    try {
      if (!isRecall) {
        setLoading(true);
      }
      setLoading(true);
      CallAPI(endpoints?.fetchCourseList, {
        uuid: courseId,
      }).then((res) => {
        console.log(res);
        if (res?.status?.code) {
          const { data } = res;
          console.log(data);
          setCourseDetails(data[0]);
          const { userDetails } = data[0];
          setUserDetails(userDetails);
          fetchRelatedCourse(data[0]?.related_vidoes_ids);
          const firstVideo = data[0]?.sections[0]?.courseSubSections[0] || {};
          const videoList = [];
          data[0]?.sections?.map((items) => {
            items?.courseSubSections?.map((subItemsList) => {
              videoList.push(subItemsList);
            });
          });
          setLoading(false);
          return;
        }
        toast.error(res?.status?.message);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (course) => {
    try {
      setCourseLoading(course.id);
      CallAPI(endpoints?.addToCart_v1, {
        user_id: getID('userId'),
        course_id: course?.id,
        bought_price: course?.discounted_price,
        actual_price: course?.actual_price,
      }).then((res) => {
        if (res?.status?.code === 200) {
          setContext((prev) => {
            return { ...prev, cartItems: [...prev?.cartItems, course.id] };
          });
          setCourseLoading('');
          // toast.success(res?.status?.message);
        } else {
          setCourseLoading('');
          // toast.error(res?.status?.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishList = async (course) => {
    try {
      setWishLoading(course.id);
      const response = await CallAPI(endpoints?.addToWishlist_v1, {
        user_id: getID('userId'),
        course_id: course?.id,
      });
      if (response?.status?.code === 200) {
        setContext((prev) => {
          return {
            ...prev,
            wishListItems: [...prev?.wishListItems, course.id],
          };
        });
        setWishLoading('');
        // toast.success(response?.status?.message);
      } else {
        // toast.error(response?.status?.message);
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    } finally {
      setWishLoading('');
    }
  };

  const removeFromWishList = async (course) => {
    try {
      setWishLoading(course.id);
      const res = await CallAPI(endpoints.removeFromWishlist_v1, {
        user_id: getID('userId'),
        course_id: course?.id,
      });
      if (res?.status?.code === 200) {
        setContext((prev) => {
          return {
            ...prev,
            wishListItems: prev?.wishListItems?.filter(
              (items) => items !== course?.id
            ),
          };
        });
        setWishLoading('');
        // toast.success(res?.status?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishLoading('');
    }
  };

  const removeFromCart = (course) => {
    try {
      setCourseLoading(course?.id);
      CallAPI(endpoints.removeFromCart_v1, {
        user_id: getID('userId'),
        course_id: course?.id,
      }).then((res) => {
        setCourseLoading('');
        if (res?.status?.code === 200) {
          // toast.error("Removed from cart!");
          setContext((prev) => {
            return {
              ...prev,
              cartItems: prev?.cartItems?.filter(
                (items) => items !== course?.id
              ),
            };
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const isAddedToCart = context?.cartItems?.includes(courseDetails.id);
  const isAddedToWishlist = context?.wishListItems?.includes(courseDetails.id);
  const isPurchased = context?.purchased?.includes(courseDetails.id);

  const fetchRelatedCourse = (videoIds) => {
    try {
      CallAPI(endpoints?.fetchRelatedCourseList, {
        related_ids: videoIds,
      }).then((res) => {
        if (res?.status?.code === 200) {
          setRelatedCourses(res?.data);
          return;
        }
        toast.error(res?.status?.message, {
          pauseOnHover: false,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const navigate = useNavigate();

  return (
    <Container maxW="100vw" padding="0px 100px" backgroundColor="#fff">
      <Flex
        flexDirection={'column'}
        gap={'6'}
        backgroundColor="#fff"
        // divider={<StackDivider borderColor="gray.200" />}
        h={{ base: '100vh', md: '100vh', lg: '700px' }}
        spacing="5px"
        align="stretch"
        marginBottom="10px"
      >
        <Flex
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          padding="0px"
          h={{ base: 'auto', md: '200px' }}
          bg="#fff"
        >
          <Box
            width={{ base: '100%', md: '100%', lg: '70%' }}
            // className={Styles?.Container}
            borderRight="2px dashed #d6d6d6"
            marginTop={"10px"}
          >
            {loading ? (
              <ShimmerTitle line={2} gap={10} variant="primary" />
            ) : (
              <Text fontSize="30px" fontWeight="700">
                {courseDetails.course_title}
              </Text>
            )}

            <Text
              display="flex"
              alignItems="center"
              gap="15px"
              paddingTop="10px"
              paddingBottom="10px"
            >
              <IoInformationCircleOutline />
              <Text>Last Updated on 2024/6</Text>
              <Text>
                language: <b>English</b>
              </Text>
            </Text>
            <Text paddingBottom="10px">
              Created by{' '}
              <b>{userDetails.first_name + ' ' + userDetails.last_name}</b>
            </Text>
            <Text fontSize="20px" fontWeight="700" paddingBottom="10px">
              &#x24;{Number(courseDetails.actual_price).toFixed(2)} / Only
            </Text>
            <Text display="flex" gap="20px">
              {isPurchased ? (
                <TecButton
                  onClick={() => {
                    navigate(`/courseVideo/${courseDetails?.uuid}`);
                  }}
                  // loading={loading}
                  className="tecPrimaryButton"
                >
                  {' '}
                  View
                  <i className="far fa-eye"></i>
                </TecButton>
              ) : isAddedToCart ? (
                <TecButton
                  onClick={() => {
                    removeFromCart(courseDetails);
                  }}
                  // loading={loading}
                  className="tecPrimaryButton"
                >
                  Remove
                  {courseLoading ? <BOLoading /> : CART_ICON}
                </TecButton>
              ) : (
                <TecButton
                  onClick={() => {
                    handleAddToCart(courseDetails);
                  }}
                  // loading={loading}
                  className="tecPrimaryButton"
                >
                  Add to Cart
                  {courseLoading ? <BOLoading /> : CART_ICON}
                </TecButton>
              )}
              {/* <TecButton
              // loading={loading}
              className="tecSecondaryButton">
              Gift Course&nbsp; <GoGift />
            </TecButton> */}
            </Text>
          </Box>
          <Box
            width={{ base: '100%', md: '100%', lg: '30%' }}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Text
              display="flex"
              justifyContent="space-between"
              paddingBottom="10px"
            >
              <Tag bg="#e7d886" borderRadius="0px">
                Bestseller
              </Tag>
              {isPurchased ? (
                ''
              ) : isAddedToWishlist ? (
                <span
                  className={Styles?.wishLIstIcon}
                  onClick={() => {
                    removeFromWishList(courseDetails);
                  }}
                >
                  {wishLoading ? <BOLoading /> : WISHLIST_FILLED_ICON}
                </span>
              ) : (
                <span
                  className={Styles?.wishLIstIcon}
                  onClick={() => {
                    addToWishList(courseDetails);
                  }}
                >
                  {wishLoading ? <BOLoading /> : WISHLIST_ICON}
                </span>
              )}
            </Text>
            {loading ? (
              <ShimmerThumbnail   height={'90%'} rounded />
            ) : (
              <ReactPlayer
                url={courseDetails?.course_preview}
                width="100%"
                height={'90%'}
                controls
                className="tec-border-radius"
              />
            )}
            <Text>
              {/* <div className={Styles?.reviewBlock}>
              {<>
                <span>{courseDetails.reviews.length > 0 ? totalAverage : 0}</span>
                <StarRating average={courseDetails.reviews.length > 0 ? totalAverage : 0} />
              </>}
            </div> */}
            </Text>
            {/* <InputGroup size="md">
              <Input placeholder="Enter Coupon" bg="white" />
              <InputRightAddon
                bg="#7e1edc"
                color="white"
                borderRadius="0px"
                _hover={{}}
              >
                Apply
              </InputRightAddon>
            </InputGroup> */}
          </Box>
        </Flex>
        <Flex width={'100%'}>
          <Tabs width={'100%' } variant="enclosed" colorScheme="white" isLazy>
            <TabList
              display="flex"
              flexWrap="wrap"
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <Tab
                _selected={{
                  borderBottom: '4px solid #7e1edc',
                  color: '#7e1edc',
                  fontWeight: '700',
                  borderRadius: '0px',
                }}
                _focus={{ boxShadow: 'md' }}
                borderColor="white"
                borderTop="3px solid transparent"
                fontWeight="500"
                marginRight={{ base: '10px', md: '20px' }}
              >
                Description
              </Tab>

              <Tab
                _selected={{
                  borderBottom: '4px solid #7e1edc',
                  color: '#7e1edc',
                  fontWeight: '700',
                  borderRadius: '0px',
                }}
                _focus={{ boxShadow: 'md' }}
                borderColor="white"
                borderTop="3px solid transparent"
                fontWeight="500"
                marginRight={{ base: '10px', md: '20px' }}
              >
                Mentor
              </Tab>
              <Tab
                _selected={{
                  borderBottom: '4px solid #7e1edc',
                  color: '#7e1edc',
                  fontWeight: '700',
                  borderRadius: '0px',
                }}
                _focus={{ boxShadow: 'md' }}
                borderColor="white"
                borderTop="3px solid transparent"
                fontWeight="500"
                marginRight={{ base: '10px', md: '20px' }}
              >
                Reviews
              </Tab>
              <Tab
                _selected={{
                  borderBottom: '4px solid #7e1edc',
                  color: '#7e1edc',
                  fontWeight: '700',
                  borderRadius: '0px',
                }}
                _focus={{ boxShadow: 'md' }}
                borderColor="white"
                borderTop="3px solid transparent"
                fontWeight="500"
                marginRight={{ base: '10px', md: '20px' }}
              >
                Related Courses
              </Tab>
            </TabList>
            <TabPanels width={'100%'}>

                    <TabPanel>
                    <Flex
                      width={'100%'}
                      direction={{ base: 'column', md: 'row' }}
                      h={{ base: 'auto', md: '55%' }}
                      justifyContent={'space-between'}
                      bg="white"
                    >
                      <Box
                        width={{ base: '100%', md: '70%' }}
                        // border="1px solid grey"
                        height="300px"
                        padding="10px 10px"
                        margin="0px 10px 0px 0px"
                        overflowY="scroll"
                      >
                        {loading ? (
                          <ShimmerText line={5} gap={10} width={'100%'} />
                        ) : (
                          <Text fontSize="18px">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: courseDetails.course_description,
                              }}
                              className={Styles?.list}
                            ></div>
                          </Text>
                        )}
                      </Box>
                      <Box
                        width={{ base: '100%', md: '30%' }}
                        // border="1px solid grey"
                        borderRadius="20px"
                        padding="10px"
                        height="100%"
                        backgroundColor="#fafafb"
                      >
                        <Text
                          fontSize="20px"
                          fontWeight="700"
                          textAlign="center"
                          paddingBottom="10px"
                        >
                          Subscribe to Premium Courses
                        </Text>
                        <Text
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          padding="10px 20px"
                          paddingBottom="10px"
                        >
                          <AiOutlineTrophy size="40px" color="#7e1edc" />
                          <Box marginLeft="10px">
                            <Text fontWeight="700">Access Top Courses</Text>
                            <Text>
                              Get this <b>course plus 11000 </b> highly-rated
                              courses with our Personal plan{' '}
                            </Text>
                          </Box>
                        </Text>
                        <Text
                          display="flex"
                          alignItems="center"
                          padding="10px 20px"
                        >
                          <LiaCalendarCheck size="25px" color="#7e1edc" />
                          <Box marginLeft="10px">
                            <Text fontWeight="700">Flexible Subscription</Text>
                            <Text>cancel anytime without hassle</Text>
                          </Box>
                        </Text>
                        <Text
                          fontSize="20px"
                          fontWeight="700"
                          paddingBottom="20px"
                          textAlign="center"
                        >
                          &#x24;999 / Only
                        </Text>
                        <Box width="100%" display="grid" placeItems="center">
                          <TecButton className={`thirdButtonPrimary`}>
                            Get Subscription
                          </TecButton>
                        </Box>
                      </Box>
                    </Flex>
                  </TabPanel>



              <TabPanel>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  h={{ base: 'auto', md: '45%' }}
                  bg="white"
                >
                  <Box
                    width={{ base: '100%', md: '70%' }}
                    // border="1px solid grey"
                    height="300px"
                    padding="10px 10px"
                    margin="0px 10px 0px 0px"
                    overflowY="scroll"
                  >
                    <Text fontSize="18px">
                      <Text fontWeight="700">About Mentor</Text>
                      <Text>
                        1) I am committed to teaching with both passion and
                        purpose, ensuring that each course is designed with the
                        success of my students in mind.
                      </Text>
                      <Text>
                        2) My courses are structured to deliver tangible
                        results, empowering you to make significant changes in
                        your life.
                      </Text>
                      <Text>
                        3) Recognized as a top instructor on Udemy, my
                        dedication to online teaching is unwavering.
                      </Text>
                    </Text>
                  </Box>
                  <Box
                    width={{ base: '100%', md: '45%' }}
                    // border="1px solid grey"
                    borderRadius="20px"
                    padding="10px"
                    height="100%"
                    backgroundColor="#fafafb"
                  >
                    <Text
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      padding="10px 20px"
                      paddingBottom="10px"
                    >
                      <Avatar size="lg" name="Prosper Otemuyiwa" src={Men} />
                      <Box marginLeft="10px">
                        <Text fontWeight="700">
                          {userDetails.first_name + ' ' + userDetails.last_name}
                        </Text>
                        <Text>Software Business and Development</Text>
                      </Box>
                    </Text>
                    <Text display="flex" width="100%">
                      <Text
                        display="flex"
                        alignItems="center"
                        padding="10px 20px"
                        width="45%"
                      >
                        <RiMedalFill size="25px" />
                        <Box marginLeft="10px">
                          <Text fontWeight="700">Reviews</Text>
                        </Box>
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        padding="10px 20px"
                      >
                        <RiFolderVideoLine size="25px" />
                        <Box marginLeft="10px">
                          <Text fontWeight="700">22 Courses</Text>
                        </Box>
                      </Text>
                    </Text>
                    <Text display="flex" width="100%">
                      <Text
                        display="flex"
                        alignItems="center"
                        padding="10px 20px"
                        width="45%"
                      >
                        <FaRegStar size="25px" />
                        <Box marginLeft="10px">
                          <Text fontWeight="700">4.6 Rating</Text>
                        </Box>
                      </Text>
                      <Text
                        display="flex"
                        alignItems="center"
                        padding="10px 20px"
                      >
                        <RiShieldUserLine size="25px" />
                        <Box marginLeft="10px">
                          <Text fontWeight="700">10 Years Experience</Text>
                        </Box>
                      </Text>
                    </Text>
                  </Box>
                </Flex>
              </TabPanel>
              <TabPanel>
                <PreviewReviews course={courseDetails} />
                {/* <Flex
          direction={{ base: "column", md: "row" }}
          h={{ base: "auto", md: "45%" }}
          bg="white"
         >
          <Box
            width={{ base: "100%", md: "70%" }}
            // border="1px solid grey"
            height="300px"
            padding="10px 10px"
            margin="0px 10px 0px 0px"
            overflowY="scroll"
          >
            <Text fontSize="18px" display="flex" gap="20px">
            <Avatar
                  size='lg'
                  name='Prosper Otemuyiwa'
                  src={Men}
              />
              <Box>

              <Text fontWeight="700">Reviews</Text>
              {courseDetails.reviews && courseDetails.reviews.length > 0 ? (
                courseDetails.reviews.map(review => (
                  <div key={review.id} style={{ marginBottom: '10px' }}>
                            <Text fontWeight="500">Rating: {review.stars} stars</Text>
                            <Text>{review.comment}</Text>
                        </div>
                    ))
                  ) : (
                    <Text>No reviews available</Text>
                  )}
                  </Box>

            </Text>
          </Box>
         </Flex> */}
              </TabPanel>
              <TabPanel>
                <div className={Styles?.relatedVideosParent}>
                  {relatedCourses.map((value, index) => {
                    const { userDetails } = value;
                    const isAddedToCart = context?.cartItems?.includes(
                      value.id
                    );
                    const isAddedToWishlist = context?.wishListItems?.includes(
                      value.id
                    );
                    const isPurchased = context?.purchased?.includes(value.id);
                    return (
                      <CourseCard
                        courseObject={value}
                        key={index}
                        // imgsrc={IMAGE_4}
                        title={value?.course_title}
                        profile={userDetails?.profile_url}
                        name={`${userDetails?.first_name || ''} ${
                          userDetails?.last_name || ''
                        }`}
                        thumbnail={value?.thumbnail}
                        value={value}
                        isCart={true}
                        course={value}
                        handleAddToCart={handleAddToCart}
                        isAddedToCart={isAddedToCart}
                        removeFromCart={removeFromCart}
                        addToWishList={addToWishList}
                        isAddedToWishlist={isAddedToWishlist}
                        removeFromWishList={removeFromWishList}
                        courseLoading={value.id == courseLoading}
                        wishLoading={value.id == wishLoading}
                        isPurchased={isPurchased}
                        // loading={value.id == courseLoading}
                        // handleAddToCart={handleAddToCart}
                      />
                    );
                  })}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      {/* What this course offers */}
      {/* <VStack
        h={{ base: "100vh", md: "100vh", lg: "700px" }}
        spacing={4}
        align="stretch"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          h={{ base: "auto", md: "40%" }}
        >
          <Box
            width={{ base: "100%", md: "70%" }}
            border="1px solid grey"
            padding="10px 0px"
            margin="0px 10px 0px 0px"
          >
            <Text
              fontSize="20px"
              fontWeight="700"
              textAlign="center"
              paddingBottom="10px"
            >
              What This Course Offers
            </Text>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="20px"
                justifyContent="center"
              >
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Create 16 Web Development Projects</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Build Any Website</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Freelance Opportunities</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Freelance Opportunities</Text>
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="20px"
                justifyContent="center"
              >
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Backend Mastery with Node.js</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Cutting-Edge Technologies</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Launch Your Business Ideas</Text>
                </Text>
                <Text
                  display="flex"
                  marginBottom="20px"
                  gap="10px"
                  alignItems="center"
                >
                  <IoIosCheckmarkCircleOutline />
                  <Text>Freelance Opportunities</Text>
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            width={{ base: "100%", md: "30%" }}
            border="1px solid grey"
            padding="10px"
            height="100%"
          >
            <Text
              fontSize="20px"
              fontWeight="700"
              textAlign="center"
              paddingBottom="10px"
            >
              What This Course Offers
            </Text>
            <Text
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="0px 20px"
              paddingBottom="20px"
            >
              <CiClock2 size="20px" />
              <Box marginLeft="10px">
                <Text>6 Hours of On-Demand Video Content</Text>
              </Box>
            </Text>
            <Text
              display="flex"
              alignItems="center"
              padding="0px 20px"
              paddingBottom="20px"
            >
              <RiPagesLine size="25px" />
              <Box marginLeft="10px">
                <Text>1 Informative Article</Text>
              </Box>
            </Text>
            <Text
              display="flex"
              alignItems="center"
              padding="0px 20px"
              paddingBottom="20px"
            >
              <FiDownload size="25px" />
              <Box marginLeft="10px">
                <Text>2 Downloadable Resources</Text>
              </Box>
            </Text>
            <Text
              display="flex"
              alignItems="center"
              padding="0px 20px"
              paddingBottom="20px"
            >
              <FaLaptopFile size="25px" />
              <Box marginLeft="10px">
                <Text>Access on Mobile and TV</Text>
              </Box>
            </Text>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          h={{ base: "auto", md: "60%" }}
        >
          <Box
            width={{ base: "100%", md: "100%" }}
            border="1px solid grey"
            padding="30px 30px"
          >
            <Text textAlign="center" fontSize="30px" fontWeight="700">
              Course Requirements
            </Text>
            <Box display="flex" width="100%" marginTop="20px">
              <Box width="50%">
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Fundamental Skills Needed
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      Basic understanding of JavaScript, HTML, and CSS is
                      required.
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Internet Access
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      You will need an Internet connection at least once to
                      download jQuery and access APIs like Flickr.
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Internet Access
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      You will need an Internet connection at least once to
                      download jQuery and access APIs like Flickr.
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
              <Box width="50%">
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Coding Tools
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      A text editor of your choice is needed for writing code,
                      We'll guide you through the installation process for one
                      such editor. No
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Internet Access
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      You will need an Internet connection at least once to
                      download jQuery and access APIs like Flickr.
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box>
                  <Text fontWeight="700" fontSize="20px">
                    Fundamental Skills Needed
                  </Text>
                  <UnorderedList>
                    <ListItem fontSize="18px">
                      Basic understanding of JavaScript, HTML, and CSS is
                      required.
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </VStack>
      <Box
        width="100%"
        border="1px solid black"
        marginTop="10px"
        padding="30px"
      >
        <Text fontSize="30px" fontWeight="700">
          Description
        </Text>
      </Box>
      <Box
        width="100%"
        border="1px solid black"
        marginTop="10px"
        padding="30px"
      >
        <Text fontSize="30px" fontWeight="700">
          Course Content
        </Text>
      </Box> */}
    </Container>
  );
};

export default CoursePreview;
