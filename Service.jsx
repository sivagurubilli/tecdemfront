import React, { lazy, useContext } from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import ApiData, { IMAGE_4, PROFILE_4 } from "./ApiData";
import Homepagefooter from "../Shared/Homepagefooter";
import { GrNext } from "react-icons/gr";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import YouTubeSearch from "./Youtube";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { CallAPI, post } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import { ShimmerPostList } from "react-shimmer-effects";
import Styles from "./Service.module.css";
// const Styles = lazy(()=> import('./Service.module.css'))
import NoDataFound from "./NoDataFound/NoDataFound";
import { NavLink } from "react-router-dom";
import { addCourseToCart, toastSuccess } from "../util_helper";
import CourseCard from "./CourseCard/CourseCard";
import { getID } from "../siteConfig";
import { PurchasedListContext } from "../Context/PurchasedListContext";
import Wishlist from "../bucketlist/Wishlist";
import { Suspense } from "react";

const Service = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState("");
  const [wishLoading, setWishLoading] = useState("");
  // Timer Functionality Code
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [processedCourseList, setProcessedCourseList] = useState([]);
  const { filteredPurchaseList, wishList, cart, WishListLoading, addWishListLoading, addCartLoading, removeCartLoading, context, setContext } = useContext(PurchasedListContext)



  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          if (newSeconds === 60) {
            const newMinutes = prevTime.minutes + 1;
            if (newMinutes === 60) {
              return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
            }
            return { hours: prevTime.hours, minutes: newMinutes, seconds: 0 };
          }
          return { ...prevTime, seconds: newSeconds };
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);



  const fetchCourseList = () => {
    try {
      CallAPI(endpoints.fetchCourseList).then((res) => {
        if (res?.status.code === 200) {
          const { data } = res;
          if (data) {

            setCourseList(data);
            setLoading(false);
          }
          return;
        }

        toast.error(res?.status?.message, {
          pauseOnHover: false,
        });
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchCourseList();
  }, []);


  // useEffect(() => {
  //   if (courseList || filteredPurchaseList || wishList || cart) {
  //     const coursesWithWishlistStatus = courseList.map((course) => ({
  //       ...course,
  //       isPurchased: filteredPurchaseList.some(
  //         (purchasedCourse) => purchasedCourse.id === course.id
  //       ),
  //       isWishListed: wishList.some(
  //         (wishlistedCourse) => wishlistedCourse.id === course.id
  //       ),
  //       isInCart: cart.some(
  //         (CartCourse) => CartCourse.id === course.id
  //       ),
  //     }));
  //     setProcessedCourseList(coursesWithWishlistStatus);
  //   } else {
  //     setProcessedCourseList(courseList);
  //   }
  // }, [filteredPurchaseList, courseList, wishList, cart]);






  useEffect(() => {
    console.log(processedCourseList)
  }, [processedCourseList])


  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const ResetTimer = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  // Set Subject Name for time

  const [courseName, setCourseName] = useState(
    "Schedule Timer to Achieve your Goals on Time"
  );

  const handleChange = (e) => {
    setCourseName(e.target.value);
  };

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
            return { ...prev, cartItems: [...prev?.cartItems, course.id] }
          })
          setCourseLoading("");
          // toast.success(res?.status?.message);
        } else {

          setCourseLoading("");
          // toast.error(res?.status?.message);
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
        user_id: getID("userId"),
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
        user_id: getID("userId"),
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
        user_id: getID("userId"),
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

  // const addToWishList = (course) => {

  //   try {
  //     setWishLoading(course.id);
  //     CallAPI(endpoints?.addToWishlist_v1, {
  //       user_id: getID("userId"),
  //       course_id: course?.id,
  //     }).then((res) => {

  //       if(res?.status?.message ===  "Course added to wishlist!") {

  //         setWishLoading("");
  //         toast.success(res?.status?.message);
  //       } else {

  //         setWishLoading("");
  //         toast.error(res?.status?.message);
  //       }
  //       // setWishLoading("");
  //       // toast.error(res?.status?.message);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
      <div className="p-0 mt-0 bg-grey">
        <div className="container-fluid">
          <div className="row p-0 m-0">
            <div className="col-15">
              <div
                className={Styles?.coursesContainer}
              // style={{ width: "100%", padding: "0px", margin: "0px", marginLeft: "20px" }}
              >
                {loading ? (
                  <div
                    style={{ alignItems: "center", width: "100%" }}
                    className="shimmerLoadingCourse"
                  >
                    <ShimmerPostList
                      postStyle="STYLE_FOUR"
                      col={4}
                      row={1}
                      gap={30}

                    />
                    <ShimmerPostList
                      postStyle="STYLE_FOUR"
                      col={4}
                      row={1}
                      gap={30}
                    />
                  </div>
                ) : courseList.length > 0 ? (
                  courseList.map((value, index) => {
                    const { userDetails } = value;
                    const isAddedToCart = context?.cartItems?.includes(value.id)
                    const isAddedToWishlist = context?.wishListItems?.includes(value.id)
                    const isPurchased = context?.purchased?.includes(value.id)
                    return (
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
                      />
                    );
                  })
                ) : (
                  <NoDataFound title="No Course found!" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Homepagefooter />
        </div>
      </div>
  );
};

export default Service;
