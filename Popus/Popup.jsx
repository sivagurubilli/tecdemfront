import { useContext, useEffect, useState } from "react";
import UndoPopup from "../UndoPopup/Undo";
import messageService from "../MessageService/Index";
import RecycleBin from "../RecycleBin/RecycleBin";
import ReportModal from "../ReportModal/ReportModal";
import PreviewModal from "../PreviewModal/PreviewModal";
import AddUpdateToDo from "../AddUpdateTodo/ToDoForm";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { SERVER_URL, getID } from "../../siteConfig";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { toastError } from "../../util_helper";
import ChangePassword from "../ChangePassword/ChangePassword";
import { decrypt, getUserData } from "../../middleware/auth";
import { useLocation, useNavigate } from "react-router-dom";
// import Verifyemail from "../verifyemail/verifyemail";
import io from 'socket.io-client'
import JoinMeetDrawer from "../../TecMeet/JoinMeet";
import MenuForm from "../Admin/MenuForm/MenuForm";
const socket = io.connect(SERVER_URL)
const Popups = ({ token }) => {
  const { context, setContext } = useContext(PurchasedListContext)


  //for recycle
  const [showUndoPopup, setShowUndoPopup] = useState({})
  const [showRecycleBin, setShowRecycleBin] = useState(false)
  const [showVerifyEmail, setShowVerifyEmail] = useState({})
  const [showReportPopup, setReportPopup] = useState({});
  const [showFilesPopup, seShowFilePopup] = useState({});
  const [showList, setShowList] = useState({ show: false })
  const [showChangePassword, setChangePassword] = useState({ show: false })
  const [userDetails, setUserDetails] = useState({})
  const [courseDetails, setCourseDetails] = useState({})
  const location = useLocation();
  const [showJoinMeeting, setShowJoinMeeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (!getID("userId")) {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    try {
      //get user details from session
      if (getID('userData')) {
        const userDetails = getUserData().userdata;
        setUserDetails(userDetails);
      }

      //remove zoom element from 
      // const zoomElement = document.getElementById("zmmtg-root");
      // if (zoomElement) {
      //   zoomElement.remove();
      // }
    } catch (error) {
      console.error(error);
    }
  }, [])

  const GetCartItems = async () => {
    try {
      await CallAPI(endpoints.getCartItems_v1, {
        user_id: getID("userId"),
      }).then((res) => {
        if (res?.status?.code === 200) {
          const cartData = res?.session?.token?.data;
          const cartItemsIds = cartData.map((items) => items?.id);
          setContext((prev) => {
            return { ...prev, cartItems: cartItemsIds }
          });
          return;
        }
        toastError(res?.status?.message)

      });
    } catch (error) {
      console.error(error);
    }
  };


  const CreateCertificate = async () => {
    try {
      const userDetails = getUserData().userdata;
      CallAPI(endpoints?.createCertificate, {
        user_id: getID('userId'),
        student_name: `${userDetails?.first_name || ""} ${userDetails?.last_name || ""}`,
        mentor_name: "Prof. Prasanna Kumar",
        type: "welcome"
      }).then((res) => {
        if (res?.status?.code === 200) {
          // setCourseDetails((prev) => {
          //   return { ...prev, certificate: res?.data }

          // })
          return
        }
        toastError("Something went wrong!")
      })
    } catch (error) {

    }

  }

  const fetchWishlistItems = async () => {
    try {
      const response = await CallAPI(endpoints.getWishList_v1, {
        user_id: getID("userId"),
      });
      if (response?.status?.code === 200) {
        const wishlistData = response?.session?.token?.data;
        const WishlistIds = wishlistData.map((items) => items?.id);
        setContext((prev) => {
          return { ...prev, wishListItems: WishlistIds }
        });
        return
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };


  const fetchPurchasedCourses = async () => {
    try {
      const response = await CallAPI(endpoints.getPurchasedCourses, {
        user_id: getID("userId"),
      });
      if (response?.status?.code === 200) {
        const purchasedData = response?.data?.data;
        const PurchasedIds = purchasedData.map((items) => items?.id);
        setContext((prev) => {
          return { ...prev, purchased: PurchasedIds }
        })
      }
      return
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
    }
  };


  const fetchNotifications = () => {
    try {
      const user_id = getID('userId');
      // console.log("getiing data from notification");

      if (!!user_id) {
        CallAPI(endpoints?.getNotifications, { user_id })
          .then((res) => {
            if (res?.status?.code === 200) {
              setContext((prev) => {
                return { ...prev, notifications: res?.data, notificationLoading: false }
              })
              return;
            }
            setContext((prev) => {
              return { ...prev, notificationLoading: false }
            })
          })
      }
    } catch (error) {
      console.error(error);
    }
  }


  // useEffect(() => {
  //   try {
  //     if (!!context?.userId) {
  //       socket.on('refreshNotification', (data) => {
  //         fetchNotifications();
  //       });

  //       // Cleanup on unmount
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }, [context])




  const handleMakeMentorOnline = () => {
    try {
      const userDetails = getUserData().userdata;

      const { id = 0 } = userDetails;
      setContext((prev) => {
        const mentors = prev.onlineMentors;

        return { ...prev, onlineMentors: [...mentors, id] }
      })
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    try {
      messageService.onMessage().subscribe((m) => {
        if (m?.senderId === "courseDetailPage" && m?.target === "undoPopup") {
          setShowUndoPopup(m?.text);
          setTimeout(() => {
            setShowUndoPopup({ show: false });
          }, 3000);
        }
        if (m?.senderId === "dashboardHeader" && m?.target === "popup") {
          setShowRecycleBin(m?.text?.show);
        }
        if (m?.senderId === "dashboardLayout" && m?.target === "popup") {
          setShowVerifyEmail(m?.text);
        }
        if (m?.senderId === "review" && m?.target === "reportModal") {
          setReportPopup(m?.text);
        }
        if (m?.senderId === "coursePage" && m?.target === "previewModal") {
          seShowFilePopup(m?.text);
        }
        if (m?.senderId === "todoWidget" && m?.target === "popup") {
          setShowList(m?.text);
        }
        if (m?.senderId === "dashBoardProfile" && m?.target === "popupOpen") {
          setChangePassword(m?.text);
        }
        if (m?.senderId === "chatVideoView" && m?.target === "popup") {
          setShowJoinMeeting(m?.text?.show);
        }

      })
      if (!!context.userId) {
        GetCartItems();
        fetchWishlistItems();
        fetchPurchasedCourses();
        CreateCertificate()
        fetchNotifications();
        handleMakeMentorOnline();
      }
    } catch (error) {
      console.error(error);
    }
  }, [context.userId]);


  return (
    <>
      {/* <VerifyEmail showVerifyEmail={showVerifyEmail} /> */}
      <UndoPopup
        setShowUndoPopup={setShowUndoPopup}
        showUndoPopup={showUndoPopup}
      />
      {
        <RecycleBin
          setShowRecycleBin={setShowRecycleBin}
          showRecycleBin={showRecycleBin}
        />
      }

      {showReportPopup?.show && <ReportModal showReportPopup={showReportPopup} />}
      {showFilesPopup?.show && <PreviewModal
        fileName={showFilesPopup?.fileName}
        fileUrl={showFilesPopup?.fileUrl}
        uuid={showFilesPopup?.uuid}
        allList={showFilesPopup?.allList}
        section_id={showFilesPopup?.section_id}
        handleDeleteExternalResource={showFilesPopup?.handleDeleteExternalResource}
        isMyCourse={showFilesPopup?.isMyCourse}
      />}
      {<AddUpdateToDo showList={showList} isAdding={showList?.isAdding} />}
      {showChangePassword?.show && <ChangePassword isShow={showChangePassword.show} />}
      {<JoinMeetDrawer showJoinMeeting={showJoinMeeting} setShowJoinMeeting={setShowRecycleBin} />}
      <MenuForm />
    </>
  );
};

export default Popups;
