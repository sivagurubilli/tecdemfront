import { useContext, useEffect } from "react";
import styles from "./Notifications.module.css"
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { SERVER_URL, getID } from "../../siteConfig";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import moment from "moment";
import NoDataFound from "../NoDataFound/NoDataFound";
import { TecButton } from "../elements/elements";
import { ShimmerTable } from "react-shimmer-effects";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { useNavigate } from "react-router-dom";



const Notifications = () => {
    const { context, setContext } = useContext(PurchasedListContext)
    const { notifications = [] } = context;
    const userId = getID("userId");
    const achievements = notifications.filter((items) => items?.category === "achievement") || [];
    const updates = notifications.filter((items) => items?.category === "update") || [];
    const message = notifications.filter((items) => items?.category === "message") || [];
    const request = notifications.filter((items) => items?.category === "request") || [];

    const notificationLength = notifications.filter((items) => items?.notificationStatus?.is_read === "0").length;
    const navigate = useNavigate();

    const handleMarkAsReadAll = () => {
        try {
            //make all notification as is_read 0
            setContext({
                ...context, notifications: notifications.map((notification) => ({
                    ...notification, is_read: "1"
                }))
            });
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
            payload.user_id = userId;
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

    const handleNavigateToLink = (notification) => {
        try {
            //to make mark as read

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

    return <div className={`${styles?.notificationPopupContainer}  tec-shadow notificationContainer`}>
        <div className={`${styles?.notificationsHeader} padding-3`}>
            <h5>Notifications  </h5>
            {!!notificationLength && <div className={styles?.notificationsCount}>{notificationLength}</div>}
        </div>
        <div className={`${styles?.notificationsBody}`}>
            <div className={styles?.tabsContainer}>
                <Tabs borderBottom={"none"}>
                    <TabList borderBottom={"none"} className="tec-shadow-bottom">
                        <Tab
                            _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                        >
                            All
                        </Tab>
                        <Tab
                            _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}

                        >
                            Message
                        </Tab>
                        <Tab
                            _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                        >
                            Request
                        </Tab>
                        <Tab
                            _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                        >
                            Updates
                        </Tab>
                        <Tab
                            _selected={{ color: "#8A0EE5", borderBottom: "2px solid #8A0EE5" }}
                        >
                            Achievements
                        </Tab>
                    </TabList>
                    {context?.notificationLoading ?

                        <ShimmerTable row={5} col={1} />
                        : <TabPanels>
                            <TabPanel p={0} className="padding-2">
                                <ul className={styles?.notificationsList}>
                                    {notifications?.length > 0 ? notifications?.map((notification) => {
                                        const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                        const { notificationStatus } = notification;
                                        if (!!!notificationStatus?.is_read) {
                                            notificationStatus.is_read = "0"
                                        }
                                        return <li className={`${styles?.notificationContainer} fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                            <p className={styles?.notificationTitle}>{notification?.category}</p>
                                            <div dangerouslySetInnerHTML={{ __html: notification?.title }}></div>
                                            {!!notification?.external_url_title && <p className={styles?.notificationMessage}>
                                                <a href={notification?.external_url} target="_blank" ><p className={styles?.externalLink}
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
                                    }) : <NoDataFound title="No notifications yet!" />}
                                </ul>
                            </TabPanel>

                            <TabPanel>
                                {message?.length === 0 ? <NoDataFound title="No messages yet!" /> : message?.map((notification) => {
                                    const { notificationStatus } = notification;
                                    if (!!!notificationStatus?.is_read) {
                                        notificationStatus.is_read = "0"
                                    } const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                    return <li onClick={()=>navigate('/disco-room')}  className={`${styles?.notificationContainer} fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                        {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

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
                            </TabPanel>

                            <TabPanel>

                                {request?.length === 0 ? <NoDataFound title="No requests yet!" /> : request?.map((notification) => {
                                    const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                    const { notificationStatus } = notification;
                                    if (!!!notificationStatus?.is_read) {
                                        notificationStatus.is_read = "0"
                                    }
                                    return <li className={`${styles?.notificationContainer} fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                        {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

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
                            </TabPanel>

                            <TabPanel>

                                {updates?.length === 0 ? <NoDataFound title="No updates yet!" /> : updates?.map((notification) => {
                                    const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                    const { notificationStatus } = notification;
                                    if (!!!notificationStatus?.is_read) {
                                        notificationStatus.is_read = "0"
                                    }
                                    return <li className={`${styles?.notificationContainer} fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                        {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

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
                            </TabPanel>
                            <TabPanel>
                                {achievements?.length === 0 ? <NoDataFound title="No Achievement yet!" /> : achievements?.map((notification) => {
                                    const formattedDate = moment(notification.createdAt || moment.now()).fromNow();
                                    const { notificationStatus } = notification;
                                    if (!!!notificationStatus?.is_read) {
                                        notificationStatus.is_read = "0"
                                    }
                                    return <li className={` ${styles?.notificationContainer} fadeElement padding-2 marginBottom-1 tec-border-bottom ${notificationStatus?.is_read === "0" ? styles?.unreadNotification : ""}`}>
                                        {/* <p className={styles?.notificationTitle}>{notification?.category}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: notification?.title }}></div>

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

                            </TabPanel>



                        </TabPanels>}
                </Tabs>
            </div>


        </div>
        {false && <div className={`${styles?.notificationsFooter} tec-shadow-top padding-3`}>
            <div className={styles?.buttonsWrapper}>
                <h5 onClick={handleMarkAsReadAll}>Mark All As Read</h5>
                <TecButton
                    title="View All"
                    className="thirdButtonPrimary"
                />
            </div>
        </div>}
    </div>
}

export default Notifications;