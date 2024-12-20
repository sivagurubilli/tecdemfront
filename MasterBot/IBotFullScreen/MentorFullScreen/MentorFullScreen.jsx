import React, { useContext, useEffect, useState } from "react";
import { Flex, Box, Input, Button, Text, Avatar, Card, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import IBotArr from "../../../../img/IBotArr.svg";
import IBotArr1 from "../../../../img/IBotArr1.svg";
import { CallAPI, post } from "../../../../middleware/api";
import endpoints from "../../../../middleware/endpoint";
import { useDrag } from "react-dnd";
import styles from "./MentorFullScreen.module.css"
import { toastError, toastSuccess } from "../../../../util_helper";
import mentorCardStyle from "../../MentorCard.module.css"
import { CLIENT_URL } from "../../../../siteConfig";
import { PurchasedListContext } from "../../../../Context/PurchasedListContext";
import { BucketListContext } from "../../../../Context/BucketListContext";
import { getUserData } from "../../../../middleware/auth";
import messageService from "../../../MessageService/Index";

const MentorFullScreen = () => {
    const [mentors, setMentors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const { context, setContext, onlineUsers } = useContext(PurchasedListContext);
    const { onlineMentors } = context
    const {
        addToBucketList,
        fetchGoogleSearchResults,
        fetchCourseSearchResults,
        filteredResults,
        setFilteredResults,
        selectedResult,
        courseLoading

    } = useContext(BucketListContext);

    //fetch mentors from course list
    const searchedCoursesMentors = [];
    if (filteredResults.length > 0) {
        filteredResults?.map((items) => {
            if (items?.userDetails?.roles === 'mentor') {
                searchedCoursesMentors.push(items?.userDetails?.id)
            }
        })
    }

    useEffect(() => {
        fetchMentors();
    }, [filteredResults]);

    const fetchMentors = () => {
        try {
            CallAPI(endpoints?.fetchByRole, { fetch: "business", role: "mentor" })
                .then((res) => {
                    if (res?.status?.code === 200) {
                        const updatedMentors = res?.data?.map((items) => {
                            return { ...items, name: `${items?.first_name || ''} ${items?.last_name || ''}` }
                        })
                        if (searchedCoursesMentors.length > 0) {
                            setMentors(updatedMentors.filter((items) => searchedCoursesMentors.includes(items.id)) || []);
                        } else {
                            setMentors(updatedMentors || []);
                        }
                        return;
                    }
                    toastError("Something went wrong!")
                })
                .catch((error) => {
                    console.error("Error fetching mentors:", error);
                    setMentors([]);
                });
        } catch (error) {
            console.error(error);
        }

    };

    const handleSearchChange = (e) => {
        try {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
        } catch (error) {
            console.error(error);
        }

    };

    const rotateMentors = (array, direction) => {
        try {
            const length = array.length;
            if (length === 0) return array;

            if (direction === "next") {
                // Rotate right
                return [...array.slice(1), array[0]];
            } else if (direction === "prev") {
                // Rotate left
                return [array[length - 1], ...array.slice(0, length - 1)];
            }
        } catch (error) {
            console.error(error);
        }

    };

    const handlePrevClick = () => {
        setMentors((prevMentors) => rotateMentors(prevMentors, "prev"));
    };

    const handleNextClick = () => {
        setMentors((prevMentors) => rotateMentors(prevMentors, "next"));
    };

    const filteredMentors = mentors.filter((mentor) =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDisplayedMentors = () => {
        try {
            const displayArray = searchTerm ? filteredMentors : mentors;
            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;
            return displayArray.slice(start, end);
        } catch (error) {
            console.error(error);
        }

    };

    const displayedMentors = getDisplayedMentors();


    const handleShareClick = (mentor) => {
        try {
            const mentorProfileLink = `${CLIENT_URL}/mentorProfile/${mentor?.uuid}`
            navigator.clipboard.writeText(mentorProfileLink).then(() => {
                toastSuccess('Mentor profile copied to clipboard!')
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleMessageToMentor = (mentor) => {
        try {

        } catch (error) {
            console.error(error);
        }

    }

    const handleSelectMentor = (mentor) => {
        try {

        } catch (error) {
            console.error(error);
        }
    }
    const navigate = useNavigate()

    const handleNavigate = (dest) => {

        navigate(dest)
    }

    return (
        <>
            <Box className={styles?.mentorSearchWrapper}>
                <Flex alignItems="center" margin="10px 0">
                    <Flex alignItems="center" width="90%" gap={3}>
                        <Input
                            placeholder="Support and Mentor search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            mb={{ base: 3, md: 0 }}
                            width="50%"
                        />

                        <Flex alignItems="center" ml={4}>
                            <Button onClick={handlePrevClick} variant="ghost">
                                <img src={IBotArr1} alt="Previous" />
                            </Button>
                            <Button onClick={handleNextClick} variant="ghost">
                                <img src={IBotArr} alt="Next" />
                            </Button>
                        </Flex>

                        <Button
                            backgroundColor="#8A0EE5"
                            color="white"
                            _hover={{ backgroundColor: "#6D0FC7" }}
                            borderRadius="md"
                            px={6}
                            onClick={() => handleNavigate("/disco-room")}
                        >
                            Disco Room
                        </Button>
                        <Button
                            backgroundColor="#8A0EE5"
                            color="white"
                            _hover={{ backgroundColor: "#6D0FC7" }}
                            borderRadius="md"
                            px={6}
                            onClick={() => {
                                messageService.sendMessage('chatVideoView', { show: true }, 'popup');
                            }}
                        >
                            Join Room
                        </Button>
                    </Flex>
                </Flex>
            </Box>



            <Flex className={styles?.mentorList}
                flexDirection={{ base: "column", md: "row" }}
                mt={2}

                gap={3}
                flexWrap="wrap"
                height={'75%'}
                overflowY={'auto'}
            >
                {displayedMentors.map((mentor, index) => {
                    return <MentorCard
                        key={index}
                        mentor={mentor}
                        handleShareClick={handleShareClick}
                        handleMessageToMentor={handleMessageToMentor}
                        handleSelectMentor={handleSelectMentor}
                        onlineUsers={onlineUsers}
                    />
                })}

                {/* {
                    Array.from({ length: 100 }, (_, i) => i + 1).map((_, index) => {
                        return <MentorCard
                            key={index}
                            mentor={{
                                address: "",
                                bus_acnt_name: "",
                                bus_email: "testuser@gmail.com",
                                change_password_token: "",
                                city: "",
                                country: "",
                                createdAt: "2024-07-22T04:41:04.000Z",
                                date_format: "",
                                description: "Welcome to My Profile\n",
                                dob: "1991-07-09",
                                email_expiry: "",
                                email_verified: true,
                                email_verify_token: "7d89b2b708806b13b282a4f53a5cbb9d",
                                first_name: "Lara",
                                has_password: true,
                                id: 160360,
                                is_active: true,
                                is_delete: false,
                                lastMessageCreateAt: 0,
                                last_name: "Adelaide",
                                login_type: "system",
                                mobile_number: "",
                                name: "Lara Adelaide",
                                otp: "",
                                otp_expiry: "",
                                password: "81dc9bdb52d04dc20036dbd8313ed055",
                                profile_url: "https://apialpha.tecdemy.com/bo-images/files_1722510468675.jpg",
                                provider_token: "",
                                roles: "mentor",
                                state: "",
                                time_format: "",
                                time_zone: "",
                                updatedAt: "2024-08-01T11:07:49.000Z",
                                uuid: "00fab3f4-156b-4242-a47a-c671c4fbf21d",
                            }}
                        />
                    })
                } */}
            </Flex>

        </>
    );
};

const MentorCard = ({ mentor, handleShareClick, handleMessageToMentor, handleSelectMentor, onlineUsers = [] }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "MENTOR",
        item: { id: mentor.id, mentor },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [mentor]);
    const userDetails = getUserData()?.userdata;
    const { roles = "" } = userDetails;

    const handleDragStart = (e, mentor) => {
        try {
            const videoData = JSON.stringify({ ...mentor, name: mentor?.name, type: "mentors", id: mentor?.id, fullData: mentor });
            e.dataTransfer.setData("video", videoData);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Card
            ref={drag}
            onDragStart={(e) => handleDragStart(e, mentor)}
            draggable={true}
            opacity={isDragging ? 0.5 : 1}
            className={mentorCardStyle.MentorCard}

        >
            <Flex className={mentorCardStyle?.headerMasterBot}>
                <i className={`far fa-circle-dot ${onlineUsers.includes(mentor?.id?.toString()) ? mentorCardStyle?.activeMentor : ""}`}></i>

                <i className="fas fa-share-nodes" onClick={() => handleShareClick(mentor)}></i>
            </Flex>
            <Flex className={mentorCardStyle?.bodyMasterBot}>
                {!!mentor?.profile_url ? <img src={mentor?.profile_url} className={mentorCardStyle.avatarProfileImage} /> :
                    <Avatar size="lg" name={mentor.name} src={mentor.avatar} />
                }
            </Flex>
            <Flex className={mentorCardStyle?.footerMasterBot}>
                {roles === 'student' && <Link to={`/disco-room/${mentor?.uuid}`}><i className="far fa-comment-dots" ></i></Link>}

                <input type="checkbox" id={`checkbox-${mentor.id}`} onChange={() => handleSelectMentor(mentor)} />
            </Flex>
            <Text className={mentorCardStyle?.mentorName}>
                {mentor.name}
            </Text>






        </Card>
    );
};

export default MentorFullScreen;
