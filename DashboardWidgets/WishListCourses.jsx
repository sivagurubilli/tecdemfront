import React, { useEffect, useRef, useState, useContext } from "react";
import {
    Box,
    Heading,
    IconButton,
    Skeleton,
    Text,
    HStack,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { IMAGE_4 } from "../ApiData";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { getID } from "../../siteConfig";
import CourseCard from "../CourseCard/CourseCard";
import '../LandingPage/Popular.css'


const WishListCourses = () => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const scrollContainerRef = useRef();
    const [courseLoading, setCourseLoading] = useState("");
    const [isArrow, setIsArrow] = useState(false)
    const [courseList, setCourseList] = useState([]);

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



    const {
        context,
        setContext,
    } = useContext(PurchasedListContext);
    const [wishLoading, setWishLoading] = useState(false);


    const fetchWishListCourse = async () => {
        setLoading(true)
        try {
            await CallAPI(endpoints.getWishList_v1, {
                user_id: getID("userId")

            }).then((res) => {
                setError(false)
                setLoading(false);
                setCourseList(res?.session?.token?.data);
                if (res?.session?.token?.data?.length > 4) {
                    setIsArrow(true)
                } else {
                    setIsArrow(false)
                }
            });
        } catch (error) {
            setError(true)
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        try {
            setLoading(true)
            fetchWishListCourse();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleAddToCart = (course) => {
        try {
            setCourseLoading(course.id);
            CallAPI(endpoints?.addToCart_v1, {
                user_id: getID("userId"),
                course_id: course?.id,
                bought_price: course?.discounted_price,
                actual_price: course?.actual_price,
            }).then((res) => {
                if (res?.status?.code === 200) {
                    setContext((prev) => {
                        return { ...prev, cartItems: [...prev?.cartItems, course.id] };
                    });
                    setCourseLoading("");
                    //   toast.success(res?.status?.message);
                } else {
                    setCourseLoading("");
                    //   toast.error(res?.status?.message);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromWishList = async (course) => {
        try {
            setWishLoading(course.id);
            const res = await CallAPI(endpoints.removeFromWishlist_v1, {
                user_id: getID("userId"),
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
                const newData = courseList.filter((item) => item.id !== course?.id);
                setCourseList(newData);
                setWishLoading("");
                // toast.success(res?.status?.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setWishLoading("");
        }
    };

    const removeFromCart = (course) => {
        try {
            setCourseLoading(course?.id);
            CallAPI(endpoints.removeFromCart_v1, {
                user_id: getID("userId"),
                course_id: course?.id,
            }).then((res) => {
                setCourseLoading("");
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
    return (
        loading ? (
            <Skeleton height="200px" width="97%" mt={2} mx={'auto'} />
        ) : error ? (
            <Text color="red.500">Error loading courses. Please try again later.</Text>
        ) : courseList.length > 0 && <Box px={{ base: 2, md: 1 }} py={0} mx={'auto'} width={{ base: "100%", md: "98%" }} fontFamily="Manrope, sans-serif" id="popular-courses">
            <Heading fontSize={{ base: '20px', md: '26px' }}>
                My Wishlist
            </Heading>
            {(
                <Box
                    position="relative"
                    width={{ base: '100%', md: '97%' }}
                    m={'auto'}
                >
                    {isArrow && <IconButton
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

                    />}
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

                        {courseList.map((value, index) => {

                            const { userDetails } = value;
                            const isAddedToCart = context?.cartItems?.includes(value.id);
                            const isAddedToWishlist = context?.wishListItems?.includes(
                                value.id
                            );
                            const isPurchased = context?.purchased?.includes(value.id);


                            return <CourseCard
                                courseObject={value}
                                key={index}
                                imgsrc={IMAGE_4}
                                title={value?.course_title}
                                profile={userDetails?.profile_url}
                                name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""
                                    }`}
                                thumbnail={value?.thumbnail}
                                value={value}
                                isCart={true}
                                course={value}
                                handleAddToCart={handleAddToCart}
                                isAddedToCart={isAddedToCart}
                                removeFromCart={removeFromCart}
                                isAddedToWishlist={isAddedToWishlist}
                                removeFromWishList={removeFromWishList}
                                courseLoading={value.id == courseLoading}
                                wishLoading={value.id == wishLoading}
                                isPurchased={isPurchased}
                                showWishListIcon={false}
                            />

                        })}



                    </HStack>
                    {isArrow && <IconButton
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
                    />}
                </Box>
            )}
        </Box>
    );
};

export default WishListCourses;
