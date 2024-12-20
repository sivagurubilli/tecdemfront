import { useContext, useEffect } from "react";
import styles from "./NotificationsPopup.module.css"
import { TabList, Tabs, Tab, TabPanels, TabPanel, Divider } from "@chakra-ui/react";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from "moment";
import { TecButton } from "../elements/elements";
import io from 'socket.io-client'
import { SERVER_URL, getID } from "../../siteConfig";
import { useNavigate } from "react-router-dom";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";

const socket = io.connect(SERVER_URL)


const NotificationsPopup = () => {

    const { context, setContext } = useContext(PurchasedListContext)
    const { notifications } = context;
    const achievements = notifications.filter((items) => items?.category === "achievement") || [];
    const updates = notifications.filter((items) => items?.category === "update") || [];
    const message = notifications.filter((items) => items?.category === "message") || [];
    const request = notifications.filter((items) => items?.category === "request") || [];
    const userId = getID("userId");
    const navigate = useNavigate();
    //find length of unread notification
    const unreadNotifications = notifications.filter((items) => items?.notificationStatus?.is_read === "0").length;
    useEffect(() => {
        try {
            socket.on('updateNotifications', (data) => {
                const { newNotification } = data;

                if (!!newNotification) {
                    if (newNotification?.user_id == userId || !!!newNotification?.user_id) {

                        setContext((prevContext) => ({
                            ...prevContext, notifications: [newNotification, ...prevContext.notifications,
                            ]
                        }))
                    }
                }
            });
            return () => {
                socket.off('updateNotifications');
            };
        } catch (error) {
            console.error(error);
        }
    }, [socket])

    const handleMarkAsReadAll = async () => {
        try {
            //make all notification as is_read 0
            if (unreadNotifications !== 0) {
                setContext({
                    ...context, notifications: notifications.map((notification) => ({
                        ...notification, notificationStatus: { ...notification.notificationStatus, is_read: "1" }
                    }))
                });
                await CallAPI(endpoints?.markAllAsRead, { user_id: userId })
            }
        } catch (error) {
            console.error(error);
        }
    }


    const markAsReadUnRead = async (notification) => {
        try {
            const { notificationStatus = null } = notification;
            const { is_read = "1" } = notificationStatus;
            const updateNotification = notifications.map((items) => {
                if (notification?.id === items?.id) {
                    items.notificationStatus.is_read = is_read === "0" ? "1" : "0"
                    return items;
                }
                return items;
            })
            setContext((prev) => ({ ...prev, notifications: updateNotification }));
            let payload = {}
            payload.user_id = getID('userId');
            payload.notification_id = notification?.id;
            payload.is_read = is_read === "0" ? "1" : "0"
            const response = await CallAPI(endpoints?.markAsReadNotification, payload);
            if (response?.status?.code === 200) {
                if (response?.status?.message === "create") {
                    const updateNotification = notifications.map((items) => {
                        if (notification?.id === items?.id) {
                            items.notificationStatus = response?.data;
                            return items;
                        }
                        return items;
                    })
                    setContext((prev) => ({ ...prev, notifications: updateNotification }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleScrollTop = (number) => {
        try {
            const scrollableDiv = document.querySelector(`.notifyContainer${number}`);
            scrollableDiv.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleNavigateToLink = (notification) => {
        try {
            //to make mark as read
            const { notificationStatus = null } = notification;
            const { is_read = "1" } = notificationStatus;
            if (notification?.notificationStatus?.is_read === "0") {
                markAsReadUnRead(notification)
            }
            //navigate to link
            // if (!!notification?.external_url) {
            //     navigate(notification?.external_url);
            // }
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div className={`${styles?.notificationPopupContainer}  tec-shadow notificationContainer`}>
            <div className={`${styles?.notificationsHeader} padding-3`}>
                <h5>Notifications </h5>
                {!!notifications.filter((items) => items?.notificationStatus?.is_read === "0").length && <div className={styles?.notificationsCount}>{notifications.filter((items) => items?.notificationStatus?.is_read === "0").length}</div>}
            </div>
            <div className={`${styles?.notificationsBody}`}>
                <div className={styles?.tabsContainer}>
                    <Tabs borderBottom={"none"}>
                        <TabList borderBottom={"none"} className="tec-shadow-bottom">
                            <Tab
                                onClick={() => { handleScrollTop(1) }}
                                _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                            >
                                All
                            </Tab>
                            <Tab
                                onClick={() => { handleScrollTop(2) }}
                                _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}

                            >
                                Message
                            </Tab>
                            <Tab
                                onClick={() => { handleScrollTop(3) }}
                                _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                            >
                                Request
                            </Tab>
                            <Tab
                                onClick={() => { handleScrollTop(4) }}
                                _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                            >
                                Updates
                            </Tab>
                            <Tab
                                onClick={() => { handleScrollTop(5) }}
                                _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                            >
                                Achievements
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel p={0} className="padding-2">
                                <ul className={`${styles?.notificationsList} notifyContainer1`}>
                                    {notifications?.map((notification,index) => {
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        return <li onClick={()=>navigate('/disco-room')} key={index} className={`fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            <p className={styles?.notificationTitle}>{notification?.category}</p>
                                            <div className={`marginLeft-1 ${styles?.dangerText}`} dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

                                            {!!notification?.external_url_title && <p className={`${styles?.notificationMessage} marginLeft-1`}>

                                                <a href={notification?.external_url} target="_blank" ><p className={`${styles?.externalLink} `}
                                                    onClick={() => {
                                                        handleNavigateToLink(notification);
                                                    }}
                                                >{notification?.external_url_title}</p></a>
                                            </p>}

                                            <div className={`${styles?.notificationsFooter} marginLeft-1`}>
                                                <p className={styles?.notificationTime}>{formattedDate}</p>
                                                <p className={styles?.markAsReadAction} onClick={() => {
                                                    markAsReadUnRead(notification);
                                                }}>{`Mark as ${notificationStatus?.is_read === "0" ? "read" : "Unread"}`}</p>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </TabPanel>

                            <TabPanel p={0} className="padding-2">
                                <ul className={`${styles?.notificationsList} notifyContainer2`}>
                                    {message?.length === 0 ? <NoDataFound title="No messages yet!" /> : message?.map((notification,index) => {
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        return <li key={index} className={`fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            <div className={`marginLeft-1 ${styles?.dangerText}`} dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

                                            {!!notification?.external_url_title && <p className={styles?.notificationMessage}>
                                                <a ><p className={styles?.externalLink}

                                                    onClick={() => {
                                                        handleNavigateToLink(notification);
                                                    }}
                                                >{notification?.external_url_title}</p></a>
                                            </p>}

                                            <div className={styles?.notificationsFooter}>
                                                <p className={styles?.notificationTime}>{formattedDate}</p>
                                                <p className={styles?.markAsReadAction} onClick={() => {
                                                    markAsReadUnRead(notification);
                                                }}>{`Mark as ${notificationStatus?.is_read === "0" ? "read" : "Unread"}`}</p>
                                            </div>
                                        </li>
                                    })}
                                </ul>


                            </TabPanel>

                            <TabPanel p={0} className="padding-2">
                                <ul className={`${styles?.notificationsList} notifyContainer3`}>
                                    {request?.length === 0 ? <NoDataFound title="No requests yet!" /> : request?.map((notification,index) => {
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        return <li key={index} className={`fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            <div className={`marginLeft-1 ${styles?.dangerText}`} dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

                                            {!!notification?.external_url_title && <p className={styles?.notificationMessage}>
                                                <a ><p className={styles?.externalLink}
                                                    onClick={() => {
                                                        handleNavigateToLink(notification);
                                                    }}
                                                >{notification?.external_url_title}</p></a>
                                            </p>}

                                            <div className={styles?.notificationsFooter}>
                                                <p className={styles?.notificationTime}>{formattedDate}</p>
                                                <p className={styles?.markAsReadAction} onClick={() => {
                                                    markAsReadUnRead(notification);
                                                }}>{`Mark as ${notificationStatus?.is_read === "0" ? "read" : "Unread"}`}</p>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </TabPanel>

                            <TabPanel p={0} className="padding-2">
                                <ul className={`${styles?.notificationsList} notifyContainer4`}>
                                    {updates?.length === 0 ? <NoDataFound title="No updates yet!" /> : updates?.map((notification,index) => {
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        return <li key={index} className={`fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}

                                            <div className={`marginLeft-1 ${styles?.dangerText}`} dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

                                            {!!notification?.external_url_title && <p className={styles?.notificationMessage}>
                                                <a ><p className={styles?.externalLink}
                                                    onClick={() => {
                                                        handleNavigateToLink(notification);
                                                    }}
                                                >{notification?.external_url_title}</p></a>
                                            </p>}

                                            <div className={styles?.notificationsFooter}>
                                                <p className={styles?.notificationTime}>{formattedDate}</p>
                                                <p className={styles?.markAsReadAction} onClick={() => {
                                                    markAsReadUnRead(notification);
                                                }}>{`Mark as ${notificationStatus?.is_read === "0" ? "read" : "Unread"}`}</p>
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </TabPanel>
                            <TabPanel p={0} className="padding-2">
                                <ul className={`${styles?.notificationsList} notifyContainer5`}>
                                    {achievements?.length === 0 ? <NoDataFound title="No Achievement yet!" /> : achievements?.map((notification,index) => {
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        return <li key={index} className={`fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}
                                            <div className={`marginLeft-1 ${styles?.dangerText}`} dangerouslySetInnerHTML={{ __html: notification?.title }}></div>
                                            {!!notification?.external_url_title && <p className={styles?.notificationMessage}>
                                                <a ><p className={styles?.externalLink}
                                                    onClick={() => {
                                                        handleNavigateToLink(notification);
                                                    }}
                                                >{notification?.external_url_title}</p></a>
                                            </p>}

                                            <div className={styles?.notificationsFooter}>
                                                <p className={styles?.notificationTime}>{formattedDate}</p>
                                                <p className={styles?.markAsReadAction} onClick={() => {
                                                    markAsReadUnRead(notification);
                                                }}>{`Mark as ${notificationStatus?.is_read === "0" ? "read" : "Unread"}`}</p>
                                            </div>
                                        </li>
                                    })}
                                </ul>

                            </TabPanel>



                        </TabPanels>
                    </Tabs>
                </div>


            </div>
            <div className={`${styles?.notificationsFooter} tec-shadow-top padding-3`}>
                <div className={styles?.buttonsWrapper}>
                    <h5 className={`${unreadNotifications === 0 ? styles?.inactiveRead : ""}`} onClick={handleMarkAsReadAll}>Mark All As Read</h5>
                    <TecButton
                        title="View All"
                        className="thirdButtonPrimary"
                        onClick={() => {
                            navigate('/user-notifications')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default NotificationsPopup;