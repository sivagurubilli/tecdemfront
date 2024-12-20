import { Box, Container, Text, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { createRef, useContext, useEffect, useState } from "react";
import { GrNext } from "react-icons/gr";
import ApiData, { IMAGE_4 } from "../ApiData.jsx";
import axios from "axios";
import profile1 from "../../img/profile1.jpg";
import { CallAPI } from "../../middleware/api.js";
import endpoints from "../../middleware/endpoint.js";
import { toast } from "react-toastify";
import { decrypt } from "../../middleware/auth.js";
import { ShimmerPostList } from "react-shimmer-effects";
import { APP_CURRENCY, getID } from "../../siteConfig.js";
import { FaCartShopping } from "react-icons/fa6";
import CourseCard from "../CourseCard/CourseCard.jsx";
import styles from "./cart.module.css";
import { toastSuccess } from "../../util_helper.jsx";
import { BOLoading, TecButton } from "../elements/elements.jsx";
import Carousel from "../Carousel/Carousel.jsx";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { APP_CURRENCY_CODE } from "../Config.jsx";
import { PurchasedListContext } from "../../Context/PurchasedListContext";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([])
  const [cartItems2, setCartItems2] = useState([])
  const [loading, setLoading] = useState(true);
  const [totalItem, setTotalItem] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  // const [discount, setDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(20);
  // const [couponCode, setCouponCode] = useState("");
  const [showCouponBox, setShowCouponBox] = useState(true);
  const [strikeActualPrice, setStrikeActualPrice] = useState(false);
  const [courseLoading, setCourseLoading] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [removeCouponLoading, setRemoveCouponLoading] = useState(false);
  // const [processedCourseList, setProcessedCourseList] = useState([]);
  const [prices, setPrices] = useState({
    totalPrice: 0,
    discount: 0,
    discountAmount: 0
  });
  const userDetail = JSON.parse(decrypt(localStorage.getItem('userData')));

  const { filteredPurchaseList, wishList, cart, WishListLoading, addWishListLoading, addCartLoading, removeCartLoading, fetchPurchasedCourses, fetchWishlistItems, fetchCartItems, context, setContext
  } = useContext(PurchasedListContext)



  const GetCartItems = async () => {
    try {
      await CallAPI(endpoints.getCartItems_v1, {
        user_id: getID("userId"),
      }).then((res) => {
        setCartItems(res?.session?.token?.data);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };



  const calculateDiscountedAmount = (totalSellingPrice, percentage) => {
    return (totalSellingPrice * (percentage / 100));
  };

  const HandleCouponApply = async () => {
    try {
      setCouponLoading(true)
      const response = await CallAPI(endpoints.applyCoupon, {
        "org": "tecdemy",
        "coupon": couponCode
      });
      setCouponLoading(false)
      if (couponCode === response.data.coupon) {
        const discount_amount = parseFloat(response.data.discount_percentage);


        const totalActualPrice = cartItems?.reduce(
          (acc, course) => acc + parseFloat(course.actual_price),
          0
        );

        const totalDiscountedPrice = cartItems?.reduce(
          (acc, item) => acc + parseFloat(item.discounted_price || item.actual_price),
          0
        );

        if (totalDiscountedPrice <= 50) {
          setDiscount(0);
          setError(false)
          setCouponError(true)
          setCouponApplied(false);
          setShowCouponBox(false);
          return;
        }

        const perItemDiscount = discount_amount / cartItems?.length;

        const updatedCartItemsWithDiscount = cartItems?.map((item) => {
          const originalPrice = parseFloat(item.discounted_price || item.actual_price);
          const newDiscountedPrice = originalPrice - perItemDiscount;
          return {
            ...item,
            discounted_price: newDiscountedPrice.toFixed(2),
          };
        });

        const totalDiscount = updatedCartItemsWithDiscount.reduce(
          (acc, course) => acc + parseFloat(course.discounted_price),
          0
        );

        setPrices((prev) => ({
          ...prev,
          totalPrice: totalActualPrice,
          discount: totalDiscount,
          discountAmount: discount_amount,
        }));

        setCartItems2(updatedCartItemsWithDiscount);
        setDiscount((discount_amount / totalDiscountedPrice) * 100); // Calculate discount percentage for reference
        setError(false);
        setCouponApplied(true);
        setShowCouponBox(true);

      } else {
        setDiscount(0);
        setCouponError(false)
        setError(true);
        setCouponApplied(false);
        setShowCouponBox(false);
      }
    } catch (error) {
      // toast.error("Invalid Coupon!");
      setDiscount(0);
      setCouponError(false)
      setError(true);
      setCouponApplied(false);
      setShowCouponBox(false);
    }
  };

  const HandleRemoveCoupon = async () => {
    try {
      setRemoveCouponLoading(true);
      const response = await GetCartItems();
      setRemoveCouponLoading(false);
      setCartItems2([]);
      setDiscount(0);
      setCouponCode("");
      setError(false);
      setCouponError(false);
      setCouponApplied(false);
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    try {
      if (cartItems?.length > 0) {
        const totalActualPrice = cartItems?.reduce(
          (acc, course) => acc + parseFloat(course.actual_price),
          0
        );
        const totalDiscountedPrice = cartItems?.reduce((acc, course) =>
          acc + (course.discounted_price ? parseFloat(course.discounted_price) : parseFloat(course.actual_price)), 0);

        const totalSellingPrice = totalDiscountedPrice;

        // const discountedAmount = calculateDiscountedAmount(totalSellingPrice, discount);
        const finalTotalPrice = Math.max(
          0,
          (totalSellingPrice).toFixed(2)
        );
        //calculate totalsellingPrice & discount price
        setPrices((prev) => {
          return { ...prev, totalPrice: totalActualPrice, discount: finalTotalPrice, }
        })
      }

    } catch (error) {
      console.error(error);
    }
  }, [cartItems])



  // const HandleCouponApply = () => {
  //   if (couponCode === "TECDEMY20USD") {
  //     const minTotalPrice = 20; // Minimum total price after coupon application
  //     const discountToApply = Math.min(totalPrice, couponDiscount);

  //     setCouponDiscount(discountToApply);
  //     setShowCouponBox(false);

  //     if (totalPrice > minTotalPrice) {
  //       setTotalPrice(Math.max(totalPrice - discountToApply, minTotalPrice));
  //     } else {
  //       setTotalPrice(minTotalPrice);
  //     }

  //     toast.success("Coupon Applied!");
  //   } else {
  //     toast.error("Invalid Coupon!");
  //     setCouponDiscount(0);
  //   }
  // };

  // const HandleRemoveCoupon = () => {
  //   setShowCouponBox(true);
  //   setCouponDiscount(0);
  //   setCouponCode("");
  //   // CountTotalPrice(); // Recalculate total price after removing coupon
  // };






  useEffect(() => {
    const userDetail = JSON.parse(decrypt(localStorage.getItem("userData")));
    GetCartItems(userDetail.id);
  }, []);

  // useEffect(() => {
  //   CountTotalItmes();
  //   CountItemPrice();
  //   CountTotalPrice();
  // }, [cartItems, itemPrice, discount, couponDiscount]);
  // useEffect(() => {
  //   console.log(totalPrice);
  // }, [cartItems, itemPrice, discount, couponDiscount]);

  // useEffect(() => {
  //   CountTotalItmes();
  //   CountItemPrice();
  //   CountTotalPrice();
  // }, []);

  // const removeFromCart = (course) => {
  //   try {
  //     setCourseLoading(course?.id);
  //     CallAPI(endpoints.removeFromCart_v1, {
  //       user_id: getID("userId"),
  //       course_id: course?.id,
  //     }).then((res) => {
  //       setCourseLoading("");
  //       if (res?.status?.code === 200) {
  //         toast.error("Removed from cart!");
  //         const newData = cartItems?.filter((item) => item.id !== course?.id);
  //         setCartItems(newData);
  //         HandleRemoveCoupon()
  //       }
  //       // window.location.reload();
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
          const newData = cartItems?.filter((item) => item.id !== course?.id);
          setCartItems(newData);
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (couponApplied) {
      HandleCouponApply();
    }
  }, [cartItems]);


  const createOrder = async (data, actions) => {
    try {
      console.log("prices", prices);
      console.log("cartitems", cartItems);
      console.log("cartitems2", cartItems2)
      let totalDiscount = 0
      let items = [];
      if (Array.isArray(cartItems2) && cartItems2.length > 0) {
        totalDiscount = cartItems2.reduce(
          (acc, course) => acc + parseFloat(course.discounted_price),
          0
        );

        items = cartItems2.map((course) => ({
          name: course.course_title,
          unit_amount: {
            currency_code: APP_CURRENCY_CODE,
            value: parseFloat(course.discounted_price || course.actual_price),
          },
          quantity: "1",
        }));
      } else if (Array.isArray(cartItems) && cartItems?.length > 0) {
        totalDiscount = cartItems?.reduce(
          (acc, course) => acc + parseFloat(course.discounted_price || course.actual_price),
          0
        );
        items = cartItems?.map((course) => ({
          name: course.course_title,
          unit_amount: {
            currency_code: APP_CURRENCY_CODE,
            value: parseFloat(course.discounted_price || course.actual_price),
          },
          quantity: "1",
        }));
      }

      const response = await CallAPI(
        endpoints.createOrder,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: APP_CURRENCY_CODE,
                value: parseFloat(totalDiscount.toFixed(2)),
                breakdown: {
                  item_total: {
                    currency_code: APP_CURRENCY_CODE,
                    value: parseFloat(totalDiscount.toFixed(2)),
                  },
                },
              },
              items,
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const { id } = response;
      console.log(id);

      if (response.status === "CREATED") {
        console.log("success");
      }
      return response.id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };



  const onApprove = async (data, actions) => {
    try {
      setLoading(true)
      const details = await actions.order.capture();
      console.log(details)
      if (details.status === "COMPLETED") {
        await CallAPI(endpoints.Notifywhenpurchased, {
          order_id: details.id,
          user_name: userDetail.first_name,
          user_email: userDetail.bus_email,
          items: details.purchase_units[0].items,
          total_amount: details.purchase_units[0].amount.value
        })
        for (const course of cartItems) {
          try {
            const addCourseResponse = await CallAPI(endpoints.addToPurchase, {
              user_id: getID("userId"),
              course_id: course.id,
              actual_price: course.actual_price,
              bought_price: course.discounted_price,
              order_id: details.id,
              course_title: course?.course_title,
              course_uuid: course?.uuid,
            });


            if (addCourseResponse.status.code === 200) {

              console.log(`Course ${course.id} added successfully.`);
              {
                cartItems?.map((value, index) => {
                  removeFromCart(value);
                  if (context?.wishListItems?.includes(value.id)) {
                    removeFromWishList(value);
                  }
                });
              }
              setContext((prev) => {
                return { ...prev, purchased: [...prev?.purchased, course.id] }
              })
            } else {
              console.error(
                `Failed to add course ${course.id}:`,
                addCourseResponse
              );
            }

            const mentorNotification = await CallAPI(endpoints.mentorNotification, {
              course_title: course?.course_title,
              mentor_email: course.userDetails.bus_email,
              mentor_name: course.userDetails.first_name
            })

            if (mentorNotification.status.code === 200) {

              console.log(`Notification sent to mentor successfully`)
            } else {
              console.error(
                `failed to send the notification to mentor`,
                addCourseResponse
              );
            }


          } catch (courseError) {
            console.error(`Error adding course ${course.id}:`, courseError);
          } finally {
            setLoading(false)
          }
        }
        // console.log("Order already captured.");
        setCartItems([]);
        navigate("/paymentsuccess");
        setLoading(false)
        return;
      }

      const response = await CallAPI(
        endpoints.captureOrder,
        { orderID: data.orderID },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Server response after capturing order:", response);

      if (response.status === 200) {
        for (const course of cartItems) {
          try {
            const addCourseResponse = await CallAPI(endpoints.addToPurchase, {
              user_id: getID("userId"),
              course_id: course.id,
              actual_price: course.actual_price,
              bought_price: course.discounted_price,
              course_title: course?.course_title
            });

            if (addCourseResponse.status === 200) {
              console.log(`Course ${course.id} added successfully.`);
            } else {
              console.error(
                `Failed to add course ${course.id}:`,
                addCourseResponse
              );
            }
          } catch (courseError) {
            // console.error(`Error adding course ${course.id}:`, courseError);
          }
        }
        navigate("/paymentsuccess");
      } else {
        // console.error("Failed to capture order on server:", response);
      }
    } catch (error) {
      // console.error("Error capturing order:", error);
      if (error.response) {
        // console.error("Response data:", error.response.data);
        // console.error("Response status:", error.response.status);
        // console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // console.error("Request data:", error.request);
      } else {
        // console.error("Error message:", error.message);
      }
    }
  };

  return (
    <Container maxW="99%" height="100%" bgColor="#f6f6f6">
      {/* <Text fontSize={"24px"} fontWeight={"700"} color={"#8A0EE5"} padding={"10px 0px 10px 10px"}>
        Cart Items
      </Text> */}
      {/* {cartItems?.length > 0 && (
        <Text
          fontWeight={"bold"}
          fontSize={"22px"}
          color={"#202020"}
          pb={"0.5rem"}
          pl={"1rem"}
        >
          Cart Items
        </Text>
      )} */}
      <Box display={"flex"}>
        <Box
          // height={"100vh"}
          width={cartItems?.length > 0 ? "74.5%" : "100%"}
          overflowY={"auto"}
          borderRight={cartItems?.length > 0 ? "2px solid lightgray" : "none"}
        >
          <Box className={styles.cartWrapper}>
            {loading ? (
              <div
                style={{ alignItems: "center", width: "100%" }}
                className="shimmerLoadingCourse"
              >
                <ShimmerPostList
                  postStyle="STYLE_FOUR"
                  col={3}
                  row={1}
                  gap={40}
                />
              </div>
            ) : (
              cartItems?.map((value, index) => {
                const { userDetails } = value;
                const isAddedToCart = context?.cartItems?.includes(value.id)
                const isAddedToWishlist = context?.wishListItems?.includes(value.id)
                const isPurchased = context?.purchased?.includes(value.id)
                return (
                  <>
                    <Box margin={"3px"}>
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
                        isAddedToCart={isAddedToCart}
                        removeFromCart={removeFromCart}
                        addToWishList={addToWishList}
                        isAddedToWishlist={isAddedToWishlist}
                        removeFromWishList={removeFromWishList}
                        courseLoading={value.id == courseLoading}
                        wishLoading={value.id == wishLoading}
                        isPurchased={isPurchased}
                      // removeFromCart={removeFromCart}
                      // addToWishList={addToWishList}
                      />
                    </Box>
                  </>
                );
              })
            )}

            {cartItems == "" && !loading && (
              <Box
                w={"100%"}
                h={"auto"}
                display={"flex"}
                mt={"50px"}
                flexDir={"column"}
                ml={"1rem"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FaCartShopping size={50} color="#8A0EE5" />
                <Text p={"10px"} fontWeight={"bold"} fontSize={"22px"}>
                  Your Cart Is Empty!
                </Text>
                {/* <Button onClick={() => na vigate("/Service")}>Add Courses</Button> */}
                <TecButton
                  className="tecPrimaryButton"
                  onClick={() => {
                    navigate("/Service");
                  }}
                  title="Add Courses"
                />
              </Box>
            )}
            {loading && ""}
          </Box>

          {/* <Text fontWeight={"bold"} fontSize={"22px"} color={"#202020"} pb={"0.5rem"} p={"1rem"}>Wishlist Courses</Text>
          {true && <RecommendedCourse />} */}
          {/* <Text fontWeight={"bold"} fontSize={"22px"} color={"#202020"} pb={"0.5rem"} p={"1rem"}>Recommended Courses</Text>
          {true && <RecommendedCourse />} */}
        </Box>

        {/* ***************************Shopping Price Billing********************************** */}
        {cartItems?.length > 0 && (
          <Box width="22%" position={"fixed"} right={"40px"}>
            <Box
              bg="#f2f2f5"
              width="100%"
              height={"auto"}
              ml={"15px"}
              border={"none"}
              borderRadius={"0.5rem"}
            >
              <Box
                width="100%"
                padding={"1rem"}
                borderBottom="2px solid black"
              >
                <Text fontSize={"18px"} fontWeight="bold" color={"black"}>
                  Price Details
                </Text>
              </Box>
              <Box
                width="100%"
                height={"auto"}
                display={"flex"}
                justifyContent={"space-between"}
                padding={"1rem"}
              >
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#202020"}>
                  Price ({cartItems?.length}{" "}
                  {cartItems?.length <= 1 ? "Item" : "Items"})
                </Text>
                <Text display="flex" gap="10px">
                  {prices?.totalPrice == prices?.discount ? "" : <Text
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    color={"#202020"}
                    textDecoration="line-through"
                  >
                    {APP_CURRENCY}
                    {prices?.totalPrice.toFixed(2)}
                  </Text>}

                  <Text fontSize={"16px"} fontWeight={"bold"} color={"#202020"}>
                    {APP_CURRENCY}
                    {prices?.discount.toFixed(2)}
                  </Text>
                </Text>
              </Box>
              {!!couponApplied && (
                <Box
                  width="100%"
                  height={"auto"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  padding={"1rem"}
                >
                  <Box width="100%">
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize={"16px"}
                        fontWeight={"bold"}
                        color={"#202020"}
                      >
                        Discount
                      </Text>

                      <Text
                        fontWeight={"bold"}
                        float={"inline-end"}
                        fontSize={"14px"}
                        color={"#202020"}
                      >
                        -{APP_CURRENCY}
                        <span id="couponDisCountPrice">{prices?.discountAmount.toFixed(2)}</span>

                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text
                        fontWeight={"bold"}
                        cursor={"pointer"}
                        color={"#8A0EE5"}
                        fontSize={"14px"}
                      >
                        {couponCode}
                      </Text>

                      <Text
                        float={"inline-end"}
                        fontStyle={"italic"}
                        cursor={"pointer"}
                        color={"blue"}
                        fontSize={"14px"}
                        onClick={HandleRemoveCoupon}
                        _hover={{ textDecoration: "underline" }}
                        display={'flex'}
                        gap={2}

                      >
                        Remove coupon
                        {removeCouponLoading && <BOLoading />}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}

              <Box
                width="100%"
                height={"auto"}
                display={"flex"}
                justifyContent={"space-between"}
                padding={"1rem"}
              >
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#202020"}>
                  Total Amount
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"} color={"#202020"}>
                  {APP_CURRENCY}
                  {prices?.discount.toFixed(2)}
                </Text>
              </Box>
            </Box>
            {!couponApplied && (
              <Box className={styles?.couponContainer} >
                <Text display="flex" flexDirection="column">
                  <Input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    width={"100%"}
                    bg={"white"}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  ></Input>
                  {error && <Text fontSize="14px" fontStyle="italic" color="red">Invalid Coupon</Text>}
                  {couponError && <Text fontSize="14px" fontStyle="italic" color="red">Discount applies on orders over $50</Text>}
                </Text>
                <input type="hidden" value={couponCode} id="couponCodeValue" />
                {couponCode !== "" && (
                  <TecButton
                    className="tecPrimaryButton"
                    onClick={HandleCouponApply}
                    loading={couponLoading}
                    title="Apply"
                  >

                  </TecButton>
                )}
              </Box>
            )}
            <Box width="100%" height={"auto"} ml={"15px"} mt={"20px"}>
              {courseLoading === "" && cartItems?.length > 0 && <PayPalButtons
                forceReRender={[couponApplied]}
                fundingSource={window.paypal.FUNDING.PAYPAL}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => {
                  onApprove(data, actions)
                }}
              />}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
