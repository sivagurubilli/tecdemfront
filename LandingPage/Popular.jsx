import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  IconButton,
  Skeleton,
  Text,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useInView } from 'react-intersection-observer'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CallAPI, get } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import "./Popular.css";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { APP_CURRENCY, getID } from "../../siteConfig";
import { BOLoading, TecButton } from "../elements/elements";
import { CART_ICON, WISHLIST_FILLED_ICON, WISHLIST_ICON } from "../Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index} className="star full-star">
          ★
        </span>
      ))}
      {halfStar && (
        <span className="star half-star" key="half-star">
          ★
        </span>
      )}
      {Array.from({ length: totalStars - fullStars - (halfStar ? 1 : 0) }).map(
        (_, index) => (
          <span key={index + fullStars + 1} className="star empty-star">
            ☆
          </span>
        )
      )}
    </>
  );
};

const Popular = () => {

  const navigation = useNavigate()

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const scrollContainerRef = useRef();
  const [courseLoading, setCourseLoading] = useState("");
  const [wishLoading, setWishLoading] = useState("");
  const [userId, setUserId] = useState('')
  const [isRedirecting, setIsRedirecting] = useState('');
  const { context, setContext } = useContext(PurchasedListContext)

  const fetchCourses = async (loadMore = false) => {
    // console.log('[fetchCourses]')
    if (!loadMore) setLoading(true);
    else setMoreLoading(true);

    try {
      const res = await get(
        `${endpoints.fetchPopularCourses}?offset=${offset}&limit=10`
      );
      // console.log('[fetchPopularCourses]', res.data)
      if (res.status === 200) {
        const newCourses = res.data.data || [];
        setCourses((prev) => (loadMore ? [...prev, ...newCourses] : newCourses));
        setOffset((prevOffset) => prevOffset + newCourses.length);
        setHasMore(newCourses.length === 10);
        setError(false);
        // console.log("Current Offset:", offset, "Courses Length:", courses.length);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setMoreLoading(false);
    }
  };


  const handleAddToCart = (course) => {
    try {
      setCourseLoading(course.id);
      CallAPI(endpoints?.addToCart_v1, {
        user_id: userId,
        course_id: course?.id,
        bought_price: course?.discounted_price,
        actual_price: course?.actual_price,
      }).then((res) => {
        if (res?.status?.code === 200) {
          setContext((prev) => {
            return { ...prev, cartItems: [...prev?.cartItems, course.id] }
          })
          setCourseLoading("");
          toast.success(res?.status?.message);
        } else {

          setCourseLoading("");
          toast.error(res?.status?.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  const addToWishList = async (course) => {
    try {
      setWishLoading(course.id)
      const response = await CallAPI(endpoints?.addToWishlist_v1, {
        user_id: userId,
        course_id: course?.id,
      });
      if (response?.status?.code === 200) {
        setContext((prev) => {
          return { ...prev, wishListItems: [...prev?.wishListItems, course.id] }
        })
        setWishLoading("");
        // toast.success(response?.status?.message);
      } else {
        // toast.error(response?.status?.message);
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    } finally {
      setWishLoading("")
    }
  };

  const removeFromWishList = async (course) => {
    try {
      setWishLoading(course.id)
      const res = await CallAPI(endpoints.removeFromWishlist_v1, {
        user_id: userId,
        course_id: course?.id,
      })
      if (res?.status?.code === 200) {
        setContext((prev) => {
          return { ...prev, wishListItems: prev?.wishListItems?.filter((items) => items !== course?.id) }
        })
        setWishLoading("");
        // toast.success(res?.status?.message);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishLoading("")
    }
  };

  const removeFromCart = (course) => {
    try {
      setCourseLoading(course?.id);
      CallAPI(endpoints.removeFromCart_v1, {
        user_id: userId,
        course_id: course?.id,
      }).then((res) => {
        setCourseLoading("");
        if (res?.status?.code === 200) {
          // toast.error("Removed from cart!");
          setContext((prev) => {
            return { ...prev, cartItems: prev?.cartItems?.filter((items) => items !== course?.id) }
          })
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserId(getID("userId"))
    fetchCourses();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading && !moreLoading) {
      // console.log('[InView]', moreLoading)
      fetchCourses(true);
    }
  }, [inView]);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 360;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

    }
  };

  // console.log('[Wishlist Login]',wishLoading)

  const handleLoginRedirect = (type) => {
    setIsRedirecting(type)
    setTimeout(() => {
      setIsRedirecting('');
      navigation('/login');
    }, 1000);
  };

  return (
    <Box px={{ base: 2, md: 1 }} py={0} mx={'auto'} width={{ base: "100%", md: "85%" }} fontFamily="Manrope, sans-serif" id="popular-courses">
      <Heading className="categories-heading">
        Popular Courses
      </Heading>
      {loading ? (
        <Skeleton height="200px" width="100%" mt={2} />
      ) : error ? (
        <Text color="red.500">Error loading courses. Please try again later.</Text>
      ) : courses.length === 0 ? (
        <Text pl={{ base: 4, md: 0 }}>No courses available.</Text>
      ) : (
        <Box position="relative">
          <IconButton
            aria-label="Scroll Left"
            icon={<FaArrowLeft />}
            position="absolute"
            top="50%"
            left="-20px"
            transform="translateY(-50%)"
            borderRadius="full"
            bg="purple.600"
            color="white"
            _hover={{ bg: "purple.800" }}
            onClick={() => scroll("left")}
            zIndex={10}
            display={{ base: "none", md: "flex" }}
          />
          <HStack
            spacing={5}
            overflowX="auto"
            ref={scrollContainerRef}
            p={2}
            css={{
              "::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >

            {courses.map((course, index) => {

              const isAddedToCart = context?.cartItems?.includes(course.id)
              const isAddedToWishlist = context?.wishListItems?.includes(course.id)
              const isPurchased = context?.purchased?.includes(course.id)
              const totalAverage = course.average_rating.toFixed(1);

              return <Box
                key={course.id}
                className="tec-border"
                flexShrink={0}
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                width="300px"
                height="420px"
                position='relative'
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                ref={index === courses?.length - 2 ? ref : undefined}
              >
                <Box height="180px" overflow="hidden" borderRadius="md" mb={4}>
                  <LazyLoadImage
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.course_title}
                    effect="blur"
                    placeholderSrc="/placeholder.png"
                    className="course-image"
                    threshold={100}
                    width="100%"
                    height="auto"
                  />
                </Box>
                {isPurchased ? "" : userId ? isAddedToWishlist ?
                  (
                    <span
                      className={'wishLIstIcon'}
                      onClick={() => {
                        removeFromWishList(course);
                      }}
                    >
                      {wishLoading === course?.id ? <BOLoading /> : WISHLIST_FILLED_ICON}
                    </span>
                  ) :
                  (
                    <span
                      className={'wishLIstIcon'}
                      onClick={() => {
                        addToWishList(course)
                      }}
                    >
                      {wishLoading === course?.id ? <BOLoading /> : WISHLIST_ICON}
                    </span>
                  ) : <span
                    className={'wishLIstIcon'}
                    onClick={() => {
                      handleLoginRedirect(`wishList${course?.id}`)
                    }}
                  >
                  {isRedirecting === `wishList${course?.id}` ? <BOLoading /> : WISHLIST_ICON}
                </span>}
                <VStack align="start" spacing={2} flexGrow={1} mb={1}>
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color="gray.700"
                    className="course-title"
                  >
                    {course.course_title}
                  </Text>
                  <HStack>
                    <Avatar
                      size="sm"
                      name={`${course.owner?.first_name || ""} ${course.owner?.last_name || ""
                        }`}
                      src={course.owner?.profile_url || "/placeholder-avatar.png"}
                    />
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      {course.owner?.first_name} {course.owner?.last_name}
                    </Text>
                  </HStack>
                  <HStack>

                    {renderStars(totalAverage)}
                    <Text fontSize="sm" color="gray.500">
                      ({totalAverage})
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    {course?.discounted_price ? (
                      <HStack>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="purple.600"
                        >
                          {APP_CURRENCY}{course.discounted_price}
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="gray.500"
                          textDecoration={"line-through"}
                        >
                          {APP_CURRENCY}{course.actual_price}
                        </Text>
                      </HStack>
                    ) : (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="purple.600"
                      >
                        {APP_CURRENCY}{course.actual_price}
                      </Text>
                    )}
                  </HStack>
                </VStack>
                {isPurchased ? ("") : userId ? isAddedToCart ? (
                  <TecButton
                    onClick={() => {
                      removeFromCart(course);
                    }}

                    className="tecPrimaryButton"
                  >
                    Remove
                    {courseLoading === course?.id ? <BOLoading /> : CART_ICON}
                  </TecButton>

                ) : (
                  <TecButton
                    onClick={() => {
                      handleAddToCart(course);
                    }}
                    // loading={loading}
                    className="tecPrimaryButton"
                  >

                    {courseLoading === course?.id ? <BOLoading /> : "Add to cart"}
                  </TecButton>

                ) : <TecButton
                  onClick={() => {
                    handleLoginRedirect(`addtocart${course?.id}`);
                  }}
                  className="tecPrimaryButton"
                >

                  {isRedirecting === `addtocart${course?.id}` ? <BOLoading /> : "Add to cart"}
                </TecButton>}
              </Box>

            })}


            {
              hasMore && (
                <Box
                  flexShrink={0}
                  bg="white"
                  borderRadius="md"
                  boxShadow="lg"
                  width="300px"
                  height="420px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Skeleton
                    height="100%"
                    width="100%"

                  />
                </Box>
              )
            }
          </HStack>
          <IconButton
            aria-label="Scroll Right"
            icon={<FaArrowRight />}
            position="absolute"
            top="50%"
            right="-20px"
            transform="translateY(-50%)"
            borderRadius="full"
            bg="purple.600"
            color="white"
            _hover={{ bg: "purple.800" }}
            onClick={() => scroll("right")}
            zIndex={10}
            display={{ base: "none", md: "flex" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Popular;
