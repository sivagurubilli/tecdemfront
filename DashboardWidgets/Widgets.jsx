import {
  CircularProgress,
  CircularProgressLabel,
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
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { getID } from "../../siteConfig";
import {
  classifyCourses,
  secondsToHours,
  toastError,
  toastSuccess,
} from "../../util_helper";
import {
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CourseSlider } from "../CourseSlider/CourseSlider";
import styles from "./widgets.module.css";
import { BOLoading, TecButton } from "../elements/elements";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "../CourseCard/CourseCard";
import { IMAGE_4 } from "../ApiData";
import MyCourseCard from "../MyCourseCard/MyCourseCard";
import { getUserData } from "../../middleware/auth";
import {
  COMPLETED_COURSE_ICON,
  placeHolderImage,
  IN_PROGRESS_ICON,
  PROFILE_STARS,
  TO_DO_LIST_ICON,
  VIEW_ALL_BUTTON,
  ADD_BUTTON_ICON,
  BANNER_IMAGES,
} from "../Config";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import messageService from "../MessageService/Index";
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from "moment";
import { ShimmerPostList, ShimmerTitle } from "react-shimmer-effects";
import Slider from "react-slick";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { toast } from "react-toastify";
import { PiCertificateDuotone } from "react-icons/pi";
import Certificate from "../TecdemyCertificate/Certificate";
import { RxDownload } from "react-icons/rx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toJpeg, toPng } from "html-to-image";
import download from "downloadjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.backgroundColor = "#9BD0F5";

export const ProgressWidget = () => {
  const userId = getID("userId") || "";
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDoLoading, setTodoLoading] = useState(true);
  const [courseList, setCourseList] = useState({
    loading: true,
    inProgressData: 0,
    completedData: 0,
    totalCoursesLength: 0,
    inProgress: 0,
    completed: 0,
  });
  const navigate = useNavigate();

  const fetchUserProgressCourses = () => {
    try {
      CallAPI(endpoints?.getUserProgress, {
        user_id: userId,
      }).then((res) => {
        setLoading(false);
        if (res?.status?.code === 200) {
          const { data } = res;
          if (data?.data?.length > 0) {
            const {
              completedCourses,
              inProgressCourses,
              allCourses,
              completedCoursePercentage,
              pendingCoursePercentage,
            } = classifyCourses(data?.data);
            setCourseList((prev) => {
              return {
                ...prev,
                completed: Number(completedCoursePercentage),
                inProgress: Number(pendingCoursePercentage),
                completedData: completedCourses,
                inProgressData: inProgressCourses,
              };
            });
          }
        }
        toastError(res?.status?.message);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodoList = () => {
    try {
      CallAPI(endpoints?.getTodoList, { user_id: userId }).then((res) => {
        setTodoLoading(false);
        if (res?.status?.code === 200) {
          setTodoList(res?.data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    fetchUserProgressCourses();
    fetchTodoList();
  }, []);

  // todoForm
  // dashboardTodWidget
  useEffect(() => {
    try {
      messageService.onMessage().subscribe((m) => {
        if (m?.senderId === "todoForm") {
          const { data } = m.text;
          setTodoList(data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleUpdateTodo = (todObject, todoIndex) => {
    try {
      // return;
      const updatedList = todoList.map((items, idx) => {
        if (idx === todoIndex) {
          return {
            ...items,
            is_checked: todObject?.is_checked === "1" ? "0" : "1",
          };
        }
        return items;
      });
      setTodoList(updatedList);
      let { to_do_text, uuid, is_checked, status, user_id } = todObject;
      is_checked = todObject?.is_checked === "1" ? "0" : "1";
      CallAPI(endpoints?.AddUpdateToDo, {
        uuid,
        to_do_text,
        is_checked,
        status,
        user_id,
      }).then((res) => {
        if (res?.status?.code === 200) {
          return;
        }
        toastError(res?.status?.message);
        fetchTodoList();
      });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className={`${styles?.progressContainer} col-lg-12`}>
      <div className="row">
        <div className={styles.progressWidgetContainer}>
          <div className={styles.courseCompleteContainer}>
            <div className={`${styles?.courseCompleteCard} ${styles?.noShadow}`} style={{ borderRadius: "22px" }}>
              <div className={`card-body  ${styles?.completedWidget}`}>
                <div className={` ${styles.CoursewidgetWrapper}`}>
                  <div className={`d-flex align-items-center ${styles?.iconWrapper}`}>
                    <div className={styles?.completeIcon}>
                      {COMPLETED_COURSE_ICON}
                    </div>
                    <i title="Get Certificate" className={`fas fa-medal ${styles?.certificateIcon}`}
                      onClick={() => navigate("/user-certificates")}></i>

                  </div>

                  <div className={styles?.courseCompletedCountTitle}>
                    <h2>{courseList?.completedData.length || 0}</h2>
                  </div>
                </div>
                <div className={styles?.titleWrapper}>
                  <strong>Courses Completed</strong>
                </div>
                <div className={styles?.courseInfo}>
                  {!courseList?.completedData && <p>Browse courses and get started today!</p>}
                  {courseList?.completedData?.length === 0 && <p>Browse courses and get started today!</p>}
                  {courseList?.completedData?.length > 0 && <p>Great job! Keep going!</p>}

                </div>

              </div>
            </div>
          </div>
          <div className={styles.courseCompleteContainer}>
            <div className={`${styles?.courseCompleteCard} ${styles?.noShadow}`} style={{ borderRadius: "22px" }}>
              <div className={`card-body ${styles?.progerssWidget}`}>
                <div className={`${styles.CoursewidgetWrapper}`}>
                  <div className={`d-flex align-items-center ${styles?.iconWrapper}`}>
                    {IN_PROGRESS_ICON}
                  </div>

                  <div className={styles?.courseCompletedCountTitle}>
                    <h2>{courseList?.inProgressData?.length || 0}</h2>
                  </div>
                </div>
                <div className={styles?.titleWrapper}>

                  <strong>Courses In Progress</strong>
                </div>
                <div className={styles?.courseInfo}>


                  {!courseList?.inProgressData && <p>Browse courses and get started today!</p>}
                  {courseList?.inProgressData?.length === 0 && <p>Browse courses and get started today!</p>}
                  {courseList?.inProgressData?.length > 0 && <p>Keep up the great work!</p>}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div
            className={`card h-60 ${styles?.noShadow}`}
            style={{ borderRadius: "22px" }}
          >
            <div
              className={`card-body padding-2 paddingLeftRight-2 d-flex flex-column`}
            >
              <div className={`  ${styles.widgetWrapper}`}>
                <div
                  className={`${styles?.countTitle} d-flex justify-content-between w-100`}
                >
                  <p className={styles?.todoListTitle}>
                    {" "}
                    {TO_DO_LIST_ICON} To Do List
                  </p>
                  <div className={styles?.todActions}>
                    <TecButton
                      className="thirdButtonPrimary"
                      onClick={() => {
                        messageService.sendMessage(
                          "todoWidget",
                          { show: true, isAdding: true },
                          "popup"
                        );
                      }}
                      small
                    >
                      {ADD_BUTTON_ICON}
                      <span>Add</span>
                    </TecButton>
                    <TecButton
                      // title="View All"
                      className="thirdButtonPrimary"
                      onClick={() => {
                        messageService.sendMessage(
                          "todoWidget",
                          { show: true },
                          "popup"
                        );
                      }}
                      small
                    >
                      {VIEW_ALL_BUTTON}
                      <span>View All</span>
                    </TecButton>
                  </div>
                </div>

                <div className={`${styles?.todoList} mt-1`}>
                  <ul className="marginTop-2 h-40">
                    {toDoLoading ? (
                      <ShimmerTitle line={1} variant="primary" />
                    ) : todoList.length === 0 ? (
                      <NoDataFound title="No To-Dos yet!" />
                    ) : (
                      todoList.map((items, idx) => {
                        const storedDateFormat =
                          localStorage.getItem("storedDateFormat") ||
                          "MM/DD/YYYY";
                        const storedTimeFormat =
                          localStorage.getItem("storedTimeFormat") || "hh:mm A";
                        const storedTimeZone =
                          localStorage.getItem("storedTimeZone") || "UTC";

                        const timeStamp = moment.tz(
                          items?.createdAt,
                          storedTimeZone
                        );

                        let dateFormat;
                        switch (storedDateFormat) {
                          case "DD/MM/YYYY":
                            dateFormat = "DD/MM/YYYY";
                            break;
                          case "MM/DD/YYYY":
                            dateFormat = "MM/DD/YYYY";
                            break;
                          case "MM-DD-YYYY":
                            dateFormat = "MM-DD-YYYY";
                            break;
                          case "DD-MM-YYYY":
                            dateFormat = "DD-MM-YYYY";
                            break;
                          default:
                            dateFormat = "MM/DD/YYYY";
                        }

                        const timeFormat =
                          storedTimeFormat === "HH:mm:ss" ? "HH:mm" : "hh:mm A";

                        const formattedDateTime = `${timeStamp.format(
                          dateFormat
                        )}, ${timeStamp.format(timeFormat)}`;

                        return (
                          <li
                            key={idx}
                            className={`${styles?.todoListItem} fadeElement padding-2 marginLeftRight-2 marginBottom-2 tec-border-radius`}
                            onClick={() => handleUpdateTodo(items, idx)}
                          >
                            <div className={styles?.listLeftSide}>
                              <input
                                type="checkbox"
                                readOnly
                                checked={items?.is_checked === "1"}
                              />
                              <span
                                className={`${items?.is_checked === "1" ? styles?.strikeIfChecked : ""} ${styles?.todoText}`}
                              >
                                {items?.to_do_text}
                              </span>
                            </div>
                            <div className={styles?.rightPanelTimings}>
                              <p>{formattedDateTime}</p>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export const WishListSlider = () => {
  const {
    filteredPurchaseList,
    wishList,
    cart,
    addToCart,
    WishListLoading,
    addWishListLoading,
    addCartLoading,
    context,
    setContext,
  } = useContext(PurchasedListContext);
  const [courseList, setCourseList] = useState([]);
  const userId = getID("userId") || "";
  const [loading, setLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const navigate = useNavigate();

  const fetchWishListCourse = async () => {
    try {
      await CallAPI(endpoints.getWishList_v1, {
        user_id: userId,
      }).then((res) => {
        setLoading(false);
        setCourseList(res?.session?.token?.data);
        // setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      fetchWishListCourse();
    } catch (error) {
      console.error(error);
    }
  }, []);

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
            return { ...prev, cartItems: [...prev?.cartItems, course.id] };
          });
          setCourseLoading("");
          //   toast.success(res?.status?.message);
        } else {
          setCourseLoading("");
          //   toast.error(res?.status?.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishList = async (course) => {
    try {
      setWishLoading(course.id);
      const res = await CallAPI(endpoints.removeFromWishlist_v1, {
        user_id: getID("userId"),
        course_id: course?.id,
      });
      if (res?.status?.code === 200) {
        setContext((prev) => {
          return {
            ...prev,
            wishListItems: prev?.wishListItems?.filter(
              (items) => items !== course?.id
            ),
          };
        });
        const newData = courseList.filter((item) => item.id !== course?.id);
        setCourseList(newData);
        setWishLoading("");
        // toast.success(res?.status?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishLoading("");
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
            return {
              ...prev,
              cartItems: prev?.cartItems?.filter(
                (items) => items !== course?.id
              ),
            };
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    courseList?.length > 0 && (
      <div className={`${styles?.sliderWrapper} marginLeft-2 marginBottom-4`}>
        <div className={styles?.wishlistHeader}>
          <Text className="paddingLeft-2"> My Wishlist </Text>
          <TecButton
            title="View All Courses"
            className="tecPrimaryButton"
            onClick={() => navigate("/wishlist")}
          />
        </div>
        {courseList.length < 4 ? (
          <div className={`${loading ? "margin-2" : styles?.courseContainer} marginLeftRight-2 marginTop-1`}>
            {loading ? (
              <ShimmerPostList
                postStyle="STYLE_FOUR"
                col={4}
                row={1}
                gap={30}
              />
            ) : (
              courseList.map((value, index) => {
                const { userDetails } = value;
                const isAddedToCart = context?.cartItems?.includes(value.id);
                const isAddedToWishlist = context?.wishListItems?.includes(
                  value.id
                );
                const isPurchased = context?.purchased?.includes(value.id);
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
                    isAddedToWishlist={isAddedToWishlist}
                    removeFromWishList={removeFromWishList}
                    courseLoading={value.id == courseLoading}
                    wishLoading={value.id == wishLoading}
                    isPurchased={isPurchased}
                    showWishListIcon={false}
                  />
                );
              })
            )}
          </div>
        ) : (
          <CourseSlider
            courseList={courseList}
            handleAddToCart={handleAddToCart}
            removeFromCart={removeFromCart}
            removeFromWishList={removeFromWishList}
            courseLoading={courseLoading}
            wishLoading={wishLoading}
          />
        )}
      </div>
    )
  );
};

export const EnrolledCourse = () => {
  const [inProgressCourse, setInProgressCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getID("userId") || "";
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const [courseLoading, setCourseLoading] = useState("");

  const fetchUserProgressCourses = () => {
    try {
      CallAPI(endpoints?.getUserProgress, {
        user_id: userId,
      }).then((res) => {
        setLoading(false);
        if (res?.status?.code === 200) {
          const { data } = res;
          setCourseList(data?.data);
        }

        toastError(res?.status?.message);
      });
    } catch (error) {
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
    try {
      if (courseList.length > 0) {
        const { allCourses } = classifyCourses(courseList);
        setInProgressCourse(allCourses);
      }
    } catch (error) {
      console.error(error);
    }
  }, [courseList]);

  const handleAddToCart = () => { };

  const addToWishList = () => { };

  return (
    inProgressCourse.length > 0 && (
      <div className={`${styles?.sliderWrapper} marginLeft-2 marginBottom-4`}>
        <div
          className={`${styles?.wishlistHeader} paddingRight-2 paddingTopBottom-2`}
        >
          <Text className="paddingLeft-2"> Enrolled Courses </Text>
          <TecButton
            title="View All Courses"
            className="tecPrimaryButton"
            onClick={() => navigate("/mycourse")}
          />
        </div>
        {inProgressCourse.length < 4 ? (
          <div className={`${loading ? "margin-2" : styles?.courseContainer} marginLeftRight-2 marginTop-1`}>
            {loading ? (
              <ShimmerPostList
                postStyle="STYLE_FOUR"
                col={4}
                row={1}
                gap={30}
              />
            ) : (
              inProgressCourse.map((value, index) => {
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
                  0
                );
                return (
                  <MyCourseCard
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
                );
              })
            )}
          </div>
        ) : (
          <CourseSlider courseList={inProgressCourse} myCourse />
        )}
      </div>
    )
  );
};

export const DashProfile = () => {
  const [certificateDetails, setCertificateDetails] = useState({});
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const certificateRef = useRef();

  const handleOpen = (course) => {
    try {
      handleGetCertificate(getID("userId"));
    } catch (error) {
      console.error(error);
    }
  };

  const downloadImage = async (element, format = "png") => {
    try {
      let dataUrl;
      if (format === "jpeg") {
        dataUrl = await toJpeg(element, { quality: 0.95 });
      } else {
        dataUrl = await toPng(element);
      }
      const extension = format === "jpeg" ? "jpeg" : "png";
      download(dataUrl, `certificate.${extension}`);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleDownload = (format) => {
    if (certificateRef.current) {
      downloadImage(certificateRef.current, format);
    }
  };

  const handleGetCertificate = (user_id) => {
    try {
      setCertificateLoading(true);
      setWelcome(true);
      CallAPI(endpoints?.getCertificate, { user_id, type: "welcome" }).then(
        (res) => {
          setCertificateLoading(false);
          if (res?.status?.code === 200) {
            setCertificateDetails(res?.data);
            onOpen();
            return;
          }
          toastError("Something went wrong!");
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const userDetails = getUserData()?.userdata || {};
  return (
    userDetails && (
      <div className={`${styles?.profileWrapper} padding-3`}>
        <div className={styles?.profileHeader}>
          <span className={styles.profileStarsImages}>{PROFILE_STARS}</span>
          <img
            src={userDetails?.profile_url || placeHolderImage}
            alt="profile"
            className={styles?.profileImage}
          />
          <div className={styles?.profileHeaderLeft}>
            <p>Welcome, {userDetails?.first_name}!</p>
            <span className={styles?.roles}>
              {userDetails?.roles}
              <TecButton
                onClick={() => handleOpen()}
                className="tecSecondaryButton"
              >
                {certificateLoading ? (
                  <BOLoading />
                ) : (
                  <i title="Welcome Certificate" className={`fas fa-medal`}></i>
                )}
              </TecButton>
            </span>
            <Modal
              closeOnOverlayClick={false}
              size={["xs", "md", "lg", "4xl"]}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontSize={["md", "lg", "xl", "2xl"]}>Certificate</ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={["4", "6", "8"]}>
                  <div ref={certificateRef}>
                    <Certificate
                      totalVideoLengthHours={`0.1min`}
                      todayDate={moment().format("DD-MM-YYYY")}
                      certificateDetails={certificateDetails}
                      isWelcome={welcome}
                    />
                  </div>
                </ModalBody>
                <ModalFooter flexWrap="wrap" justifyContent="center" gap="4">
                  <TecButton
                    className={`thirdButtonPrimary`}
                    onClick={() => handleDownload("png")}
                  >
                    <RxDownload /> PNG
                  </TecButton>
                  <TecButton
                    className={`thirdButtonPrimary`}
                    onClick={() => handleDownload("jpeg")}
                  >
                    <RxDownload /> JPEG
                  </TecButton>
                  <TecButton
                    className={`tecSecondaryButton`}
                    onClick={onClose}
                  >
                    Cancel
                  </TecButton>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </div>
        </div>
        <div className={styles?.offerWidgetContainer}>
          <OfferWidget
            title="🎉 Special Offer!"
            description="Get courses starting from $10.99 only for the next"
            dayLeft="3 days!"
          />
        </div>
      </div>
    )
  );
};

export const OfferWidget = (props) => {
  const { title = "", description = "", dayLeft = "" } = props;
  return (
    <Link to={'/service'} className={`${styles?.offerWidgetWrapper}`}>
      <h3>{title}</h3>
      <p>{description} <span className={styles?.daysOffer}>{dayLeft}</span></p>
    </Link>
  );
};

export const UserProgressChart = () => {
  const userId = getID("userId") || "";

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Learning Hours",
        data: [10, 5, 22, 33, 56],
        backgroundColor: "#8A0EE5",
      },
    ],
  });
  const [courseList, setCourseList] = useState([]);

  const fetchUserProgressCourses = () => {
    try {
      CallAPI(endpoints?.getUserProgress, {
        user_id: userId,
      }).then((res) => {
        if (res?.status?.code === 200) {
          const { data } = res;
          setCourseList(data?.data);
          const { coursesHourlyProgress } = classifyCourses(data?.data);
          //fetch sum of values which in this array coursesHourlyProgress
          const sum = coursesHourlyProgress.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          const totalSum = Number(secondsToHours(sum));
          setChartData((prev) => {
            return {
              ...prev,
              datasets: [
                {
                  label: "Learning Hours",
                  data: [totalSum],
                  backgroundColor: "#8A0EE5",
                },
              ],
            };
          });
        }
        toastError(res?.status?.message);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      // make a login to get today's time format as 12pm to 2pm in array [12pm-2pm]
      const intervals = generateTimeIntervals();
      setChartData((prev) => {
        return { ...prev, labels: ["Today"] };
      });
      fetchUserProgressCourses();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="col-md-6 col-lg-4">
      <div className={`card h-100 ${styles?.noShadow}`}>
        <div className={`card-body d-flex flex-column`}>
          <div className={` mb-2 ${styles.widgetWrapper}`}>
            <div className={styles?.countTitle}>
              <p>Learning Hours</p>
            </div>
            <div className={styles?.countValue}>
              <Bar
                style={{ position: "relative", height: "360px" }}
                // data={{
                //     labels: ['8-4', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'sep', 'oct', 'nov', 'dec'],
                //     datasets: [
                //         {
                //             label: 'Weekly',
                //             data: [0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0],
                //         },
                //     ]
                // }}
                data={chartData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const DashboardBanner = () => {
//     const navigate = useNavigate();
//     return <div className={`${styles?.bannerWrapper} marginBottom-3`}>
//         <img src={BANNER_IMAGE} onClick={() => {
//             navigate('/ibot')
//         }} />
//         {false && <div className={styles?.bannerElementWrapper}>
//             <h3 className="marginBottom-2">World’s 1st Pain Free Rapid & Accelerated Learning Platform </h3>
//             <p className="marginBottom-2">Personalized AI Learning Bot to serve all your learning needs </p>
//             <TecButton
//                 onClick={() => {
//                     navigate('/ibot')
//                 }}
//                 title="ALL IN ONE BOT"
//                 className={`tecPrimaryButton ${styles?.botButton}`}
//             />
//         </div>}
//     </div>
// }

export const DashboardBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === BANNER_IMAGES.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`${styles?.bannerWrapper} marginBottom-3`}>
      <div className={styles?.carousel}>
        {BANNER_IMAGES.map((banner, index) => (
          <div
            key={index}
            className={`${styles?.carouselSlide} ${index === currentSlide ? styles?.active : ""
              }`}
          >
            <img
              src={banner.src}
              alt={banner.link}
              onClick={() => navigate(banner.link)}
            />
            {/* <div className={styles?.bannerElementWrapper}>
                            <h3 className="marginBottom-2">{banner.title}</h3>
                            <p className="marginBottom-2">{banner.description}</p>
                            <TecButton
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation when button is clicked
                                    navigate(banner.link);
                                }}
                                title={banner.buttonTitle}
                                className={`tecPrimaryButton ${styles?.botButton}`}
                            />
                        </div> */}
          </div>
        ))}
      </div>
      <div className={styles?.carouselDots}>
        {BANNER_IMAGES.map((_, index) => (
          <span
            key={index}
            className={`${styles?.dot} ${index === currentSlide ? styles?.active : ""
              }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const generateTimeIntervals = () => {
  try {
    const intervals = [];
    let start = new Date();
    start.setHours(0, 0, 0, 0); // Set to midnight
    let end = new Date(start);
    end.setHours(end.getHours() + 4);

    while (start.getDate() === end.getDate()) {
      intervals.push(`${formatTime(start)} - ${formatTime(end)}`);
      start.setHours(start.getHours() + 4);
      end.setHours(end.getHours() + 4);
    }

    return intervals;
  } catch (error) {
    console.error(error);
  }
};

const formatTime = (date) => {
  try {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}${ampm}`;
  } catch (error) {
    console.error(error);
  }
};

export const BannerSlider = memo(() => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
  };

  const navigate = useNavigate();

  return <div className="bannerWrapper marginBottom-3">
    <Slider {...settings} className="courseSlider">
      {BANNER_IMAGES?.map((items, indx) => {
        return <div className={styles?.bannerItems} key={indx}>
          <LazyLoadImage
            src={items.src} 
            alt={items.alt}
            effect="blur"
            placeholderSrc="/placeholder.png"
            cclassName="bannerImage"
            threshold={100}
            width="100%"
            height="auto"
            onClick={() => items?.linkDisable && navigate(items?.link)}
          />
        </div>
      })}
    </Slider>
  </div>

});
