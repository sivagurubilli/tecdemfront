import React from "react";

import { NavLink } from "react-router-dom";
import cardImg from "../../img/img5.jpg";
import Styles from "./CourseCard.module.css";
import { CART_ICON, WISHLIST_FILLED_ICON, WISHLIST_ICON, placeHolderImage } from "../Config";
import { APP_CURRENCY } from "../../siteConfig";
import { BOLoading, TecButton } from "../elements/elements";
import StarRating from "../StarRating.js/StarRating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CourseCard = (props) => {


  const {
    className = "",
    thumbnail = "",
    profile = "",
    value = {},
    flag,
    isMyCourse = false,
    // videoProgress = 0,
    videoProgress = "0",
    totalVideoLength = "0",
    isCompleted = false,
    myCourse = false,
    isCart = false,
    inProgress = false,
    course,
    cartCourses,
    getCartItems,
    cartItems,
    setCartItems,
    uploadByMe = false,
    handleAddToCart = null,
    addToWishList = null,
    isAddedToCart,
    removeFromCart,
    isAddedToWishlist,
    removeFromWishList,
    courseLoading,
    wishLoading,
    isPurchased
  } = props;

  const { discounted_price = "", actual_price = "", reviews = [] } = course;
  const discountedPrice = Number(discounted_price).toFixed(2);
  const actualPrice = Number(actual_price).toFixed(2);
  const isPriceEqual =
    discountedPrice === actualPrice || discountedPrice === "0.00";
  const allRatingStars = reviews?.map((items) => Number(items?.stars));
  const sum = allRatingStars.reduce((total, rating) => total + rating, 0);
  const averageRating = sum / allRatingStars.length;
  const totalAverage = averageRating.toFixed(1);

  const handleScroll = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleRemoveFromCart = (course) => {
    removeFromCart(course)
  }

  const handleAddToWishlist = (course) => {
    addToWishList(course)
  }

  try {
    const element = document.getElementById(`navigationLink${course?.id}`);
    if (!!element) {
      element.classList.remove('active');
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div
      className={`${Styles?.Container} padding-3 shadowOnHover course##${value?.id}`}
   
    >
      <div className={``}>
        <div className={Styles?.courseImageWrapper}>
          <NavLink
            to={isPurchased ? `/coursevideo/${value?.uuid}` : `/course/${value?.uuid}`}
            onClick={() => {
              handleScroll();
            }}
          >

            <LazyLoadImage
               src={!!thumbnail ? thumbnail : cardImg}
              alt={course.course_title}
              effect="blur"
              placeholderSrc="/placeholder.png"
              className={`${Styles?.thumbImageCard} ${Styles?.textSelectedStop}`}
              threshold={100}
              width="100%"
              height="auto"
            />

          </NavLink>
          {isPurchased ? "" : isAddedToWishlist ?
            (
              <span
                className={Styles?.wishLIstIcon}
                onClick={() => {
                  removeFromWishList(course);
                }}
              >
                {wishLoading ? <BOLoading /> : WISHLIST_FILLED_ICON}
              </span>
            ) :
            (
              <span
                className={Styles?.wishLIstIcon}
                onClick={() => {
                  handleAddToWishlist(course);
                }}
              >
                {wishLoading ? <BOLoading /> : WISHLIST_ICON}
              </span>
            )}
        </div>

        <div className={`card-body ps-1 ${Styles?.cardContainer} `}>
          <NavLink
            to={isPurchased ? `/coursevideo/${value?.uuid}` : `/course/${value?.uuid}`}
            onClick={() => {
              handleScroll();
            }}
            id={`navigationLink${course?.id}`}
          >
            <h6
              className={`${Styles?.courseTitle} ${Styles?.textSelectedStop}`}
            >
              {props.title}
            </h6>
          </NavLink>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className={Styles?.profileContainer}>
              <img
                src={!!profile ? profile : placeHolderImage}
                alt=""
                width={35}
                style={{ marginRight: "10px" }}
              />

              <p className="text-start">{props.name}</p>
            </div>
            <div className={Styles?.priceContainer}>
              <div className={Styles?.actualPrice}>
                <span
                  className={`${Styles?.actualPriceText} ${!isPriceEqual
                    ? `${Styles?.lineThrough} ${Styles?.greyText}`
                    : ""
                    }`}
                >
                  {APP_CURRENCY}
                  {actualPrice}
                </span>
              </div>
              {!isPriceEqual && (
                <div className={Styles?.discountedPrice}>
                  <span className={Styles?.discountedPriceText}>
                    {APP_CURRENCY}
                    {discountedPrice}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={Styles?.buttonContainer}>
            <div className={Styles?.reviewBlock}>
              {<>
                <span>{reviews.length > 0 ? totalAverage : 0}</span>
                <StarRating average={reviews.length > 0 ? totalAverage : 0} />
              </>}
            </div>

            {isPurchased ? (""
            ) : isAddedToCart ? (
              <TecButton
                onClick={() => {
                  handleRemoveFromCart(course);
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
                  handleAddToCart(course);
                }}
                // loading={loading}
                className="tecPrimaryButton"
              >

                {courseLoading ? <BOLoading /> : "Add to cart"}
              </TecButton>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
