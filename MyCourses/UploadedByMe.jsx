import React, { useEffect, useState } from "react";
import { Container, Box, Grid, GridItem, Text } from "@chakra-ui/react";

import Card from "../Card";
import Arrow from "../arrow";
import { CallAPI, post } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";
import { decrypt } from "../../middleware/auth";
import Styles from "./MyCourse.module.css"
import { getID } from "../../siteConfig";
import { IMAGE_4 } from "../ApiData";
import MyCourseCard from "../MyCourseCard/MyCourseCard";
import NoDataFound from "../NoDataFound/NoDataFound";

// import { CallAPI, post } from "../../middleware/api.js";

const UploadedByMe = () => {
    const [courseList, setCourseList] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [courseId, setCourseId] = useState([])
    const userId = getID('userId');
    const flag = "UploadedByme"
    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                const userDetail = JSON.parse(decrypt(localStorage.getItem('userData')));
                setUserDetails(userDetail);
                const res = await CallAPI(endpoints.fetchCourseList, {
                    user_id: userId
                });
                if (res?.status.code === 200) {
                    const { data } = res;
                    setCourseList(data);
                    const CourseLinkId = data.map(item => item.uuid)
                    setCourseId(CourseLinkId)
                } else {
                    toast.error(res?.status?.message, {
                        pauseOnHover: false
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch course list', {
                    pauseOnHover: false
                });
            }
        };

        fetchCourseList();
    }, []);

    return (
        <Container maxW="100%"  marginLeft="0px">
            <Grid className={Styles?.courseContainer} display={"flex"} >
                {courseList.length > 0 ?
                    courseList.map((value, index) => {
                        const { userDetails } = value;
                        return (
                            <GridItem key={index} marginBottom="10px">
                                <MyCourseCard
                                    key={index}
                                    flag={flag}
                                    courseObject={value}
                                    imgsrc={IMAGE_4}
                                    title={value?.course_title}
                                    profile={value?.profile_url}
                                    thumbnail={value?.thumbnail}
                                    name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""
                                        }`}
                                    course={value}
                                    uploadByMe={true}

                                />
                            </GridItem>
                        );
                    }) : <NoDataFound title ="No course uploaded!" />
                }
            </Grid>
        </Container>
    );
};

export default UploadedByMe;
