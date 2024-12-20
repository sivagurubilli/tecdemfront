import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import messageService from "../MessageService/Index";
import styles from "./TecdemySearch.module.css"
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import CourseCard from "../CourseCard/CourseCard";
import { IMAGE_4 } from "../ApiData";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { getID } from "../../siteConfig";
import NoDataFound from "../NoDataFound/NoDataFound";
import { BOLoading } from "../elements/elements";

const TecdemySearch = () => {

    const [searchText, setSearchText] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [googleSearchList, setGoogleSearchList] = useState([]);
    const [courseLoading, setCourseLoading] = useState("");
    const [wishLoading, setWishLoading] = useState("");
    const { context, setContext } = useContext(PurchasedListContext)
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        messageService.onMessage().subscribe((m) => {
            if (m.senderId === 'fromHeader' && m.target === 'toSearch') {
                setSearchText(m.text.searchText)
            }
        })
    }, [])


    const fetchCourse = async (text) => {
        try {
            setSearchLoading(true);
            const response = await fetch(`https://xvxurdsm6h.execute-api.us-east-1.amazonaws.com/tecdemy-apis/`, {
                method: 'POST',
                body: JSON.stringify({
                    service: 'course_search',
                    body: { user_query: text },
                }),
            });
            const result = await response.json();
            const { answer } = result;
            const { courses, google_results = [] } = answer;
            const courseList = courses?.response || [];
            setGoogleSearchList(google_results);
            const fetchCourseList = await fetchCourseDetails(courseList.join('|'));
            setCourseList(fetchCourseList);
            setSearchLoading(false);
        } catch (error) {
            console.error(error);
        }
    }


    const fetchCourseDetails = async (courseIds) => {
        try {
            const response = await CallAPI(endpoints.fetchCourseList, {
                external: '1',
                id: courseIds,
            });
            if (response?.status?.code === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching full course details:', error);
            return [];
        }
    };


    useEffect(() => {
        fetchCourse(searchText);
    }, [searchText])


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

    console.log('this render')
    return (
        <>

            <div className={`${styles?.searchHeader} padding-3`}>
                {!!searchText && <h5>Search results for : <span className={styles?.searchFor}>{searchText}</span></h5>}
            </div>
            <div className={`${styles?.searchBody} margin-3 `}>
                <div className={styles?.coursesContainer}>
                    {searchLoading ? <BOLoading /> : courseList.length === 0 ? <NoDataFound title="No courses found!" /> : courseList?.map((value, index) => {
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
                    })}
                </div>
               {googleSearchList.length > 0 &&  <div className={`${styles?.googleResults} marginTop-2 card `}>
                    <h5 className="marginBottom-2">Global results for : <span className={styles?.searchFor}>{searchText}</span></h5>
                    <div className="row">
                        <div className="col-6">
                            {googleSearchList?.length === 0 ? "" : googleSearchList?.map((items) => {
                                return (

                                    <div className={`${styles?.googleResult} marginBottom-2`}>
                                        <a href={items.url} target="_blank" rel="noopener noreferrer">
                                            {items?.title}
                                        </a>
                                        <p>{items?.description}</p>
                                    </div>

                                )
                            })}
                        </div>
                    </div>

                </div>}
            </div >
            <div className={styles?.searchFooter}>

            </div>
        </>
    )
}

export default TecdemySearch;