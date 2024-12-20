import React, {  useEffect, useRef, useState } from "react";
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
import '../LandingPage/Popular.css'


import { classifyCourses, toastError } from "../../util_helper";
import MyCourseCard from "../MyCourseCard/MyCourseCard";
import { IMAGE_4 } from "../ApiData";
import { getID } from "../../siteConfig";



const EnrolledCourse = () => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const scrollContainerRef = useRef();
    const [courseLoading, setCourseLoading] = useState("");
    const [userId, setUserId] = useState('')
    const [isArrow,setIsArrow] = useState(false)
    const [inProgressCourse, setInProgressCourse] = useState([]);
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




    const fetchUserProgressCourses = () => {
        setLoading(true)
     
        try {
            CallAPI(endpoints?.getUserProgress, {
                user_id: getID("userId"),
            }).then((res) => {
                setError(false)
                if (res?.status?.code === 200) {
                    const { data } = res;
                    setCourseList(data?.data);
                }

                toastError(res?.status?.message);
            });
        } catch (error) {
            setLoading(false)
            setError(true)
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            fetchUserProgressCourses();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setLoading(true)
        try {
            if (courseList.length > 0) {
                const { allCourses } = classifyCourses(courseList);
                setInProgressCourse(allCourses);
                if(courseList?.length>4){
                    setIsArrow(true)
                } else{
                    setIsArrow(false)
                }
            }
        } catch (error) {
            setError(true)
            console.error(error);
        } finally{
            setLoading(false)
        }
    }, [courseList]);

    const handleAddToCart = () => { };

    const addToWishList = () => { };

    return (
        loading ? (
            <Skeleton height="200px" width="100%" mt={2} />
        ) : error ? (
            <Text color="red.500">Error loading courses. Please try again later.</Text>
        ) : inProgressCourse.length > 0 && <Box px={{ base: 2, md: 1 }} py={0} mx={'auto'} width={{ base: "100%", md: "98%" }} fontFamily="Manrope, sans-serif" id="popular-courses">
            <Heading fontSize={{ base: '20px', md: '26px' }}>
                Enrolled Courses
            </Heading>
            {(
                <Box 
                position="relative"
                width={{ base: '100%', md: '97%' }}
                m={'auto'}
                >
                  {isArrow &&  <IconButton
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

                        {inProgressCourse.map((value, index) => {

                            const { userDetails } = value;
                            const videosTotalProgress = [];
                            const videoCurrentProgress = [];
                            //getting video length & progress length
                            if (!!value.sections) {
                                const { sections } = value;
                                sections.map((secItems) => {
                                    if (secItems?.courseSubSections) {
                                        secItems?.courseSubSections.map((subSecItems) => {
                                            videosTotalProgress.push(subSecItems?.video_length);
                                            videoCurrentProgress.push(
                                                subSecItems?.progressData?.video_progress || "0"
                                            );
                                        });
                                    }
                                });
                            }
                            //calculating video progress
                            let videoProgress = videoCurrentProgress.map(Number);
                            let videoProgressSum = videoProgress.reduce(
                                (acc, num) => acc + num,
                                0
                            );

                            //calculating total video progress
                            let totalVideoProgress = videosTotalProgress.map(Number);
                            let totalVideoProgressSum = totalVideoProgress.reduce(
                                (acc, num) => acc + num,
                                0);

                            return <MyCourseCard
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
                                loading={value.id == courseLoading}
                                handleAddToCart={handleAddToCart}
                                addToWishList={addToWishList}
                                videoProgress={videoProgressSum}
                                totalVideoLength={totalVideoProgressSum}
                            />

                        })}


                      
                    </HStack>
                  {isArrow &&  <IconButton
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

export default EnrolledCourse;
