import React from "react";
import {
    Box,
    Button
  } from "@chakra-ui/react";

import { IMAGE_4 } from '../ApiData.jsx';
import { getID } from '../../siteConfig.js';
import endpoints from '../../middleware/endpoint.js';
import { CallAPI } from '../../middleware/api.js';
import { toastSuccess } from '../../util_helper.jsx';
import { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard.jsx';
import { IoChevronBack } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";

import Style from './Carousel.module.css';



export default function Carousel(props) {

    const { Items } = props
    const [courseLoading, setCourseLoading] = useState(false);

    const handleAddToCart = (course) => {
        try {
            setCourseLoading(course.id);
            CallAPI(endpoints?.addToCart_v1, {
                user_id: getID("userId"),
                course_id: course?.id,
                bought_price: course?.discounted_price,
                actual_price: course?.actual_price
            }).then((res) => {
                setCourseLoading("");
                toastSuccess(res?.status?.message)
            });
        } catch (error) {
            console.error(error);
        }
    }

    const HandlePreButton = (e)=>{
        e.preventDefault()
        const scrollingDiv = document.querySelector("#item-div")
        scrollingDiv.scrollLeft-="900"
    }
    const HandleNextButton = (e)=>{
        e.preventDefault()
        const scrollingDiv = document.querySelector("#item-div")
        scrollingDiv.scrollLeft+="900"
    }

    return (
        <>
            {/* *******************************Custom Slider************************************** */}
            
            <Box width={"100%"} height={"auto"}>
            <Box className={Style?.itemDiv} id="item-div" >
            {
                    Items.map((value, index) => {
                        const { userDetails } = value;
                        return (
                            <Box >
                            <CourseCard
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
                                course={
                                    value
                                }
                                loading={value.id == courseLoading}
                                handleAddToCart={handleAddToCart}
                            /></Box>)
                    })
                    
                }
            </Box>
                <Box className={Style?.buttonDiv}>
                    <button className={Style?.preBtn}  onClick={(e)=>HandlePreButton(e)}>
                        <IoChevronBack size={20} />
                    </button>
                    <button className={Style?.nextBtn}  onClick={(e)=>HandleNextButton(e)}>
                        <GrFormNext size={25}/>
                    </button>
                </Box>
            </Box>
        </>
    )
}