import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { ShimmerPostList } from "react-shimmer-effects";
import CardCourse from "../Card.js";
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import { toast } from 'react-toastify';
import Style from './cart.module.css'
import Carousel from '../Carousel/Carousel.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function RecommendedCourse(props) {
  const [loading, setLoading] = useState(false)
  const [recommendedCourses, setRecommendedCourse] = useState([])
  const hideRemoveBtn = true

  const fetchCourseList = () => {
    setLoading(true)
    try {
      CallAPI(endpoints.fetchCourseList)
        .then((res) => {
          if (res?.status.code === 200) {
            const { data } = res;
            if (data) {
              setLoading(false);
              setRecommendedCourse(data)
            }
            return;
          }
          toast.error(res?.status?.message, {
            pauseOnHover: false
          })
          setLoading(false);
        })
    } catch (error) {
      console.error(error);
    }
  }

  const Items = [
    {
      "title": "Docker Container"
    },
    {
      "title": "Docker Container"
    },
    {
      "title": "Docker Container"
    },
    {
      "title": "Docker Container"
    },
    {
      "title": "Docker Container"
    },
    {
      "title": "Docker Container"
    },
  ]

  console.log(window.innerWidth)

  useEffect(() => {
    fetchCourseList()
  }, [])

  return (
    <Box className={Style?.cartItemCardBox} maxWidth={"100%"} h={"auto"} display={"flex"} overflowX={"auto"} ml={"1rem"} pb={"10px"}>
      <Carousel Items = {recommendedCourses}/>
    </Box>
  )
}