import React, { useContext, useEffect, useState } from "react";
import { Flex, Box, Input, Button, Text, Avatar, Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import IBotArr from "../../img/IBotArr.svg";
import IBotArr1 from "../../img/IBotArr1.svg";
import { CallAPI, post } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { useDrag } from "react-dnd";
import styles from "./PopOver.module.css"
import { toastError, toastSuccess } from "../../util_helper";
import mentorCardStyle from "./MentorCard.module.css"
import { CLIENT_URL } from "../../siteConfig";
import { PurchasedListContext } from "../../Context/PurchasedListContext";
import { BucketListContext } from "../../Context/BucketListContext";
import { getUserData } from "../../middleware/auth";

const MentorsCardBot = () => {
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

  return (
    <>

      <Box className={styles?.mentorSearchWrapper}>
        <Flex justifyContent="space-between" alignItems="center">
          <Input
            // w={{ base: "100%", md: "auto" }}
            // mr={10}
            mb={{ base: 3, md: 0 }}
            placeholder="Support and Mentor search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Flex alignItems="center">
            <Button onClick={handlePrevClick} variant="ghost">
              <img src={IBotArr1} alt="Previous" />
            </Button>
            <Button onClick={handleNextClick} variant="ghost">
              <img src={IBotArr} alt="Next" />
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex className={styles?.mentorList}
        flexDirection={{ base: "column", md: "row" }}
        mt={2}
        gap={3}
        flexWrap="wrap"
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

  // console.log(mentor)
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
      color="grey"
      height={{ base: "auto", md: 142 }}
      w={{ base: 120, md: 120, lg: 110 }}
      padding={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid gray"
      position="relative"
      bg="white"
      mb={4}
      opacity={isDragging ? 0.5 : 1}
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

export default MentorsCardBot;
