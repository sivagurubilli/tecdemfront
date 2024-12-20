import { Box, Button, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, Flex, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import ApiData from "../ApiData";
import { SlLike } from "react-icons/sl";
import { Progress } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";
import { placeHolderImage, ratingsList } from "../Config";
import Styles from "./Review.module.css"
import { decrypt } from "../../middleware/auth";
import { getID } from "../../siteConfig";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import { BOLoading, TecButton } from "../elements/elements";
import NoDataFound from "../NoDataFound/NoDataFound";
import { ChevronDownIcon } from "@chakra-ui/icons";
import debounce from 'lodash.debounce';
import { AddToTrash, toastError, toastSuccess } from "../../util_helper";
import messageService from "../MessageService/Index";
import StarRating from "../StarRating.js/StarRating";
import { MdOutlineOutlinedFlag } from "react-icons/md";





const Review = (props) => {
    const { courseId, courseDetails, setCourseDetails, handleScrollToWidget } = props;
    const [reviewList, setReviewList] = useState({
        list: [],
        count: 0,
    });
    const [newReview, setReview] = useState({
        comment: "",
        stars: 0,
        search: "",
    })
    const [loading, setLoading] = useState(false);
    const stars = Array(5).fill(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("All ratings");
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [editActive, setActive] = useState("");
    const [averageRating, setAverageRating] = useState("");
    const [reviewCount, setReviewCount] = useState(0);
    const isReviewed = courseDetails?.isReviewedByUser?.includes(getID('userId'));
    const [isOpenAlert, setIsOpenAlert] = useState();
    const onCloseAlert = () => setIsOpenAlert(false);
    const cancelRef = useRef();

    const handleSelect = (value) => {
        handleSearchReviewByText({ target: { value } });
    };
    const handleItemClick = (item) => {
        setSelected(item.name);
        handleSelect(item.value);
        setIsOpen(false);
    };

    useEffect(() => {
        try {
            messageService.onMessage().subscribe((m) => {
                if (m.senderId === "recycleBin" && m.target === "restoreData") {
                    if (!!courseId) {
                        fetchReview();
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    }, [courseId])



    const fetchReview = (filterObject, isFilter) => {
        try {
            CallAPI(endpoints?.getReviews,
                {
                    ...filterObject || {},
                    course_id: courseId
                }).then((res) => {
                    if (res?.status?.code === 200) {
                        let updatedData = [];
                        updatedData = res?.data?.data?.filter((items) => JSON.stringify(items?.userDetails) !== "{}")
                        if (!isFilter) {
                            const allRatingStars = updatedData.map((items) => Number(items?.stars));
                            const sum = allRatingStars.reduce((total, rating) => total + rating, 0);
                            const averageRating = sum / allRatingStars.length;
                            setAverageRating(averageRating.toFixed(1));
                            setReviewCount(updatedData?.length);
                        }
                        setReviewList({
                            list: updatedData,
                            count: updatedData.length
                        })
                        // setReview((prev)=>{
                        //     return {...prev ,[name] : value}
                        // })
                        return;
                    }
                    toastError(res?.status?.message)
                })
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     try {
    //         if (reviewCount > 0) {
    //             const reviewCountElement = document.getElementById('reviewCountId');
    //             if (reviewCountElement) {
    //                 reviewCountElement.innerHTML = `(${reviewCount})`
    //             }

    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [reviewCount])





    const handleAddReview = (e) => {
        try {
            const { value } = e.target;
            setReview((prev) => {
                return { ...prev, comment: value }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmitReview = () => {
        try {
            if (!!!newReview.stars) {
                return toastError("Please provide star ratings!")
            }
            if (!!!newReview.comment.trim()) {
                return toastError("Please enter your review!")
            }
            const reqData = {
                user_id: getID('userId'),
                course_id: courseId,
                stars: newReview?.stars,
                comment: newReview?.comment
            }
            setLoading('init')
            CallAPI(endpoints?.reviewByUser, reqData)
                .then((res) => {
                    setLoading('')
                    if (res?.status?.code === 200) {
                        fetchReview();
                        setReview({
                            comment: "",
                            stars: 0,
                        })
                        setCourseDetails((prev) => {
                            return { ...prev, isReviewedByUser: [...prev?.isReviewedByUser, getID('userId')] }
                        })
                        return toastSuccess(res?.status?.message);
                    }
                    return toastError(res?.status?.message)
                })

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!!courseId) {
            fetchReview();
        }
    }, [courseId])


    const handleSearchReviewByText = debounce((e) => {
        try {
            const { value, name } = e?.target;
            if (!!value) {
                fetchReview({
                    [name]: value
                }, true)
            } else {
                fetchReview()
            }
        } catch (error) {
            console.error(error);
        }
    }, 500)


    const handleDeleteReview = (reviewObject) => {
        try {

            const { uuid, course_id, id } = reviewObject;
            setLoading('del')
            if (!!uuid) {
                CallAPI(endpoints?.updateReviewByLike, { uuid, status: "0", course_id, review_id: id }).then((res) => {
                    setLoading('')
                    if (res?.status?.code === 200) {
                        setIsOpenAlert("")
                        AddToTrash(uuid, 'reviewList', `${reviewObject?.comment}~${JSON.stringify(reviewObject)}`, reviewObject?.course_id, id);
                        setCourseDetails((prev) => {
                            return { ...prev, isReviewedByUser: prev?.isReviewedByUser.filter((item) => item !== getID('userId')) }

                        })
                        fetchReview();
                        return
                    }
                    toastError(res?.status?.message)
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleClickEditReview = (reviewObject) => {
        try {
            setActive(reviewObject?.uuid)
            handleScrollToWidget();
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmitEdit = () => {
        try {

        } catch (error) {
            console.error(error);
        }
    }


    const handleEditReview = (e) => {
        try {
            const { value, name } = e.target;
            const _reviewList = reviewList?.list;
            const updatedData = _reviewList.map((items) => {
                if (items.uuid === name) {
                    return { ...items, comment: value }
                }
                return items;
            })
            setReviewList((prev) => {
                return { ...prev, list: updatedData }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditStar = (uuid, index) => {
        try {
            const _reviewList = reviewList?.list;
            const updatedData = _reviewList.map((items) => {
                if (items.uuid === uuid) {
                    return { ...items, stars: index + 1 }
                }
                return items;
            })
            setReviewList((prev) => {
                return { ...prev, list: updatedData }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateEdited = (updatedObject) => {
        try {
            if (updatedObject.comment.trim() === "") {
                toastError("Please enter review!");
                return;
            }
            const { uuid, course_id, stars, comment } = updatedObject;
            setLoading('edit')
            if (!!uuid) {
                CallAPI(endpoints?.updateReviewByLike, { uuid, course_id, comment, stars }).then((res) => {
                    if (res?.status?.code === 200) {
                        fetchReview();
                        setLoading('')
                        setActive("");
                        return
                    }
                    toastError(res?.status?.message)
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleReport = (reviewObject) => {
        try {
            messageService.sendMessage("review", { show: true, reviewObject, key: 'review_id' }, "reportModal");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                (reviewCount >= 0) ?
                    <>
                        <Flex width="100%" alignItems="center">
                            {
                                (reviewCount === 0) && (<Text color="#6534e4" fontSize="18px" fontWeight="bold"> Review</Text>)

                            }
                            {
                                (reviewCount == 1) && (<Text color="#6534e4" fontSize="18px" fontWeight="bold">{reviewCount} Review</Text>)
                            }
                            {
                                (reviewCount > 1) && (<Text color="#6534e4" fontSize="18px" fontWeight="bold">{reviewCount} Reviews</Text>)
                            }
                        </Flex>
                    </> : ""
            }
            <Box
                // width="930px"
                // height="115px"
                bgColor="#f8f9fa"
                padding="10px"
                display="flex"
                justifyContent="space-between"
            // textOverflow={"ellipsis"}
            >
                <Box>
                    {!!reviewCount && <Text fontSize="20px">{averageRating === "NaN" ? "0" : averageRating}/5</Text>}
                    {!!reviewCount && <Text fontSize="10px">({reviewCount})</Text>}
                    <Box display="flex">
                        <StarRating average={averageRating} />
                    </Box>
                </Box>
                <Box width="150px" display={"none"} marginTop="" marginBottom="15px">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Progress
                            value={100}
                            colorScheme="yellow"
                            marginBottom="2px"
                            height="5px"
                            width="100px"
                            borderRadius="3px"
                            color={"#6534e4"}
                        />
                        <Text display="flex" marginTop="-5px" marginLeft="5px">
                            5
                        </Text>
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Progress
                            value={80}
                            colorScheme="yellow"
                            marginBottom="2px"
                            height="5px"
                            width="100px"
                            borderRadius="3px"
                            color={"#6534e4"}
                        />
                        <Text display="flex" marginTop="-5px" marginLeft="5px">
                            4
                        </Text>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Progress
                            value={60}
                            colorScheme="yellow"
                            marginBottom="2px"
                            height="5px"
                            width="100px"
                            borderRadius="3px"
                            color={"#6534e4"}
                        />
                        <Text display="flex" marginTop="-5px" marginLeft="5px">
                            3
                        </Text>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Progress
                            value={40}
                            colorScheme="yellow"
                            marginBottom="2px"
                            height="5px"
                            width="100px"
                            borderRadius="3px"
                            color={"#6534e4"}
                        />
                        <Text display="flex" marginTop="-5px" marginLeft="5px">
                            2
                        </Text>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Progress
                            value={20}
                            colorScheme="yellow"
                            marginBottom="2px"
                            height="5px"
                            width="100px"
                            borderRadius="3px"
                            color={"#6534e4"}
                        />
                        <Text display="flex" marginTop="-5px" marginLeft="5px">
                            1
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box className={Styles?.addReview}>

                {isReviewed ? "" : <><Box className={Styles?.giveRatings}>
                    {stars.map((_, index) => {
                        return index + 1 <= newReview?.stars ? <i
                            onClick={() => {
                                setReview((prev) => {
                                    return { ...prev, stars: index + 1 }
                                })
                            }}
                            className="fas fa-star"></i> : <i onClick={() => {
                                setReview((prev) => {
                                    return { ...prev, stars: index + 1 }
                                })
                            }} className="far fa-star"></i>
                    })}
                </Box>
                    <Box className={Styles?.inputContainer}>
                        <Textarea
                            type="text"
                            width="100%"
                            placeholder="Give your review"
                            onChange={handleAddReview}
                            value={newReview?.comment}
                        />
                        {/* <Button onClick={handleSubmitReview}>Submit Review {loading === 'init' && <BOLoading style={{ marginLeft: "5px" }} />}</Button> */}
                        <TecButton
                            title="Submit Review"
                            className="tecPrimaryButton"
                            loading={loading === 'init'}
                            onClick={handleSubmitReview}
                        />
                    </Box> </>}
                <Box className={Styles?.filterContainer}>
                    <Input
                        type="text"
                        width="100%"
                        name={"searchText"}
                        placeholder="Search review here"
                        onChange={handleSearchReviewByText}
                        value={newReview?.searchText}
                    />
                    <select name="ratingCount" className={Styles?.selectInput} onChange={handleSearchReviewByText}>
                        {ratingsList?.map((items) => {
                            return <option value={items?.value}>
                                {items?.name}
                            </option>
                        })}
                    </select>
                    {/* <div className={Styles.dropdown}>
                        <div className={Styles.dropdownHeader} onClick={toggleDropdown}>
                            {selected}
                        </div>
                        {isOpen && (
                            <div className={Styles.dropdownList}>
                                {ratingsList.map((item) => (
                                    <div
                                        key={item.value}
                                        className={Styles.dropdownItem}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.value ? (
                                            <span>
                                                {[...Array(parseInt(item.value, 10))].map((_, i) => (
                                                    <FaStar key={i} color="gold" />
                                                ))}
                                            </span>
                                        ) : (
                                            item.name
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> */}
                </Box>



            </Box>
            <Box marginTop={5} className={Styles?.reviewedList}>
                {reviewList?.list.length > 0 ? reviewList?.list?.map((value, index) => {
                    const { userDetails } = value;
                    const userName = `${userDetails?.first_name || ''} ${userDetails?.last_name || ""}`;
                    const stars = Array(5).fill(false);
                    const _stars = Number(value?.stars);

                    return (

                        <div key={index} className={`${Styles?.reviewContainer} fadeElement`}>
                            <div className={Styles?.reviewDetails}>
                                <div className={Styles?.profileImage}>
                                    <div className={Styles?.profileContainer}>

                                        <img src={userDetails?.profile_url || placeHolderImage} />
                                        <h5 style={{ fontSize: "16px" }}>{userName}</h5>
                                    </div>
                                    {
                                        <div className={Styles?.actionContainer}>
                                            <i style={{ padding: "5px 4px" }} className={`fas fa-ellipsis-vertical ${Styles?.ellipseDate}`}></i>
                                            <div className={`${Styles?.actionList} box-shadow`}>
                                                {value?.user_id === getID('userId') && <span onClick={() => {
                                                    handleClickEditReview(value)
                                                }} >Edit</span>}
                                                {loading === 'del' ? <BOLoading /> : value?.user_id === getID('userId') && <span onClick={() => {
                                                    // handleDeleteReview(value)
                                                    setIsOpenAlert(value);
                                                }} >Delete</span>}
                                                {value?.user_id !== getID('userId') &&
                                                    <Flex justifyContent="space-between" justify="space-around"
                                                        w="100%">
                                                        <a
                                                            style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}  // Use flexbox for inline display
                                                            onClick={() => {
                                                                handleReport(value);
                                                            }}
                                                            className={Styles?.reportText}
                                                        >
                                                            <MdOutlineOutlinedFlag /> {/* Icon with some right margin */}
                                                            Report
                                                        </a>
                                                    </Flex>
                                                    //     (<span><a style={{ paddingLeft: "7px", paddingRight: "2px" }} onClick={() => {
                                                    //     handleReport(value);
                                                    // }} className={Styles?.reportText}> <MdOutlineOutlinedFlag />Report</a></span>)
                                                }
                                            </div>

                                        </div>}


                                </div>
                                <div className={Styles?.reviewStarsComment}>
                                    <div className={Styles?.reviewStars}>
                                        {stars.map((items, idx) => {
                                            return idx + 1 <= _stars ? <i
                                                onClick={() => {
                                                    value?.uuid === editActive && handleEditStar(value?.uuid, idx);
                                                }}
                                                className="fas fa-star"></i> :
                                                <i
                                                    onClick={() => {
                                                        value?.uuid === editActive && handleEditStar(value?.uuid, idx);
                                                    }}
                                                    className="far fa-star"></i>
                                        })}
                                    </div>

                                    {value?.uuid === editActive ? <div className={Styles?.editWrapper}>
                                        <Textarea
                                            type="text"
                                            width="100%"
                                            placeholder="Give your review"
                                            name={value?.uuid}
                                            onChange={handleEditReview}
                                            value={value?.comment}
                                        />
                                        <Box className={Styles?.buttonWrapper}>
                                            <Button size="sm" onClick={() => {
                                                setActive("")
                                                fetchReview();

                                            }}>Cancel</Button>
                                            <Button bgColor={"#595cd9"} color={"#ffffff"} size="sm" onClick={() => { handleUpdateEdited(value) }}>Update  {loading === 'edit' && <BOLoading style={{ marginLeft: "5px" }} />}</Button>
                                        </Box>


                                    </div> : <p className={Styles?.commentDescription}>
                                        {value?.comment}
                                    </p>}
                                </div>
                            </div>
                        </div>

                    );
                }) : <NoDataFound title="No reviews yet!" />}
            </Box>
            <AlertDialog
                isOpen={!!isOpenAlert}
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert}
            >
                <AlertDialogOverlay variantColor="yellow" />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Note
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure want to delete?</AlertDialogBody>

                    <AlertDialogFooter>
                        <TecButton
                            title="Cancel"
                            className={`tecSecondaryButton marginRight-2`}
                            onClick={onCloseAlert}

                        />
                        <TecButton
                            // title="Delete"
                            className={`tecPrimaryButton`}
                            onClick={() => {
                                handleDeleteReview(isOpenAlert)
                            }}

                        >
                            Delete {loading === "del" && <BOLoading />}
                        </TecButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default Review;