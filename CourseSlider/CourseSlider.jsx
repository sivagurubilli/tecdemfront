import React, { useContext, useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_4 } from "../ApiData";
import CourseCard from "../CourseCard/CourseCard";
import MyCourseCard from "../MyCourseCard/MyCourseCard";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import Styles from './CourseSlider.module.css'; // Assuming you have a CSS module for styling
import { TecButton } from "../elements/elements";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
export const CourseSlider = (props) => {
    const { context, setContext } = useContext(PurchasedListContext);
    const sliderRef = useRef(null);
    const [isSliderReady, setIsSliderReady] = useState(false);
    const { courseList, myCourse = false, handleAddToCart, removeFromCart, removeFromWishList, courseLoading, wishLoading } = props;

    useEffect(() => {
        if (sliderRef.current) {
            setIsSliderReady(true);
        }
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows :false
    };

    const handleNext = () => {
        if (isSliderReady) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevious = () => {
        if (isSliderReady) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <div className={Styles?.courseSlider}>
            <TecButton className={Styles?.prevButton} onClick={handlePrevious} disabled={!isSliderReady}><FaAngleLeft/></TecButton>
            <Slider ref={sliderRef} {...settings} >
                {courseList.map((value, index) => {
                    const { userDetails } = value;
                    const videosTotalProgress = [];
                    const videoCurrentProgress = [];
                    const isAddedToCart = context?.cartItems?.includes(value.id);
                    const isAddedToWishlist = context?.wishListItems?.includes(value.id);
                    const isPurchased = context?.purchased?.includes(value.id);
                    
                    if (!!value.sections) {
                        const { sections } = value;
                        sections.forEach((secItems) => {
                            if (secItems?.courseSubSections) {
                                secItems?.courseSubSections.forEach((subSecItems) => {
                                    videosTotalProgress.push(subSecItems?.video_length);
                                    videoCurrentProgress.push(subSecItems?.progressData?.video_progress || "0");
                                });
                            }
                        });
                    }

                    let videoProgress = videoCurrentProgress.map(Number);
                    let videoProgressSum = videoProgress.reduce((acc, num) => acc + num, 0);

                    let totalVideoProgress = videosTotalProgress.map(Number);
                    let totalVideoProgressSum = totalVideoProgress.reduce((acc, num) => acc + num, 0);

                    return !myCourse ? (
                        <CourseCard
                            courseObject={value}
                            key={index}
                            imgsrc={IMAGE_4}
                            title={value?.course_title}
                            profile={userDetails?.profile_url}
                            name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`}
                            thumbnail={value?.thumbnail}
                            value={value}
                            isCart={true}
                            course={value}
                            courseLoading={value.id === courseLoading}
                            handleAddToCart={handleAddToCart}
                            isAddedToCart={isAddedToCart}
                            removeFromCart={removeFromCart}
                            isAddedToWishlist={isAddedToWishlist}
                            removeFromWishList={removeFromWishList}
                            wishLoading={value.id === wishLoading}
                            isPurchased={isPurchased}
                        />
                    ) : (
                        <MyCourseCard
                            courseObject={value}
                            key={index}
                            imgsrc={IMAGE_4}
                            title={value?.course_title}
                            profile={userDetails?.profile_url}
                            name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`}
                            thumbnail={value?.thumbnail}
                            value={value}
                            course={value}
                            handleAddToCart={handleAddToCart}
                            isAddedToCart={isAddedToCart}
                            removeFromCart={removeFromCart}
                            isAddedToWishlist={isAddedToWishlist}
                            removeFromWishList={removeFromWishList}
                            courseLoading={value.id === courseLoading}
                            wishLoading={value.id === wishLoading}
                            isPurchased={isPurchased}
                            videoProgress={videoProgressSum}
                            totalVideoLength={totalVideoProgressSum}
                        />
                    );
                })}
            </Slider>
            <TecButton className={`${Styles?.nextButton}`} onClick={handleNext} disabled={!isSliderReady}><FaAngleRight/></TecButton>
        </div>
    );
};
