import React, { useContext, useState, useEffect, useRef } from "react";
import { Input, Card, message } from "antd";
import IBotPagination from "./MasterBot/IBotPagination";
import { Joystick } from "react-joystick-component";
import { Container, Tooltip } from "@chakra-ui/react";
import { YouTubeContext } from "../Context/YoutubeContext";
import useStore from "../store";
import styles from "./Youtube.module.css"
import messageService from "./MessageService/Index";
import NoDataFound from "./NoDataFound/NoDataFound";
import debounce from "debounce";
import { BOLoading, TecButton } from "./elements/elements";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";


const YouTubeSearch = () => {
  const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);
  const { videos, fetchVideos, loading } = useContext(YouTubeContext);
  const [videosPerPage] = useState(5);

  const totalPages = Math.ceil(videos.length / videosPerPage);


  const [currentPage, setCurrentPage] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [initialized, setInitialzed] = useState(true)
  const { setYoutubeUrl, setYoutubeVideoId } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    fetchVideos("react.js");
  }, []);

  const handleSearch = debounce(async (value) => {
    try {
      if (!value.trim()) {
        message.error("Please enter a valid search term.");
        return;
      }
      try {
        await fetchVideos(value);
        setCurrentPage(1);
        message.success(`Found ${videos.length} videos.`);
      } catch (error) {
        console.error("Error fetching YouTube search results:", error);
        message.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  }, [1000])





  const handlePageHover = (pageNumber) => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setAnimate(false);
    }, 300);
  };





  const handleToggleStop = () => {
    try {
      const renderedVideos = renderResults();
      const centerIndexInRendered = positionIndex.findIndex(
        (pos) => position[pos] === "center"
      );

      const centerVideo = renderedVideos[centerIndexInRendered];

      if (centerVideo) {
        messageService.sendMessage("youTube", centerVideo, "rightPanelVideo");
      } else {
        console.error("Center video not found");
      }
    } catch (error) {
      console.error("Error in handleToggleStop:", error);
    }
  };



  const handleToggleMove = (event) => {
    try {
      if (event.direction === "LEFT") {
        handlePrev()
      } else if (event.direction === "RIGHT") {
        handleNext()
      }
    } catch (error) {
      console.error(error);
    }
  }
  const navigate = useNavigate()
  const handleMakeFullScreen = () => {
    try {
      navigate('/ibot/video/fullscreen')

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVideos("react.js");
  }, []);
  const handleNext = () => {

    setPositionIndex((prevIndexes) => {
      const updatedIndex = prevIndexes.map((prevIndexes) => (prevIndexes + 1) % 5)
      return updatedIndex
    })
  };

  const handlePrev = () => {
    setPositionIndex((prevIndexes) => {
      const updatedIndex = prevIndexes.map((prevIndex) => {
        return (prevIndex - 1 + 5) % 5;
      });
      return updatedIndex;
    });
  };


  const position = [
    "center",
    "left1",
    "left",
    "right",
    "right1",

  ];

  const imageVariant = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 2 },
    left: { x: "-90%", scale: 0.5, zIndex: 1 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 2 },

  };



  const renderResults = () => {
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToDisplay = videos.slice(startIndex, endIndex);
    return videosToDisplay;
  };

  const handleDragStart = (e, video) => {
    const videoData = JSON.stringify({
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      type: "videos",
      fullData: video
    });
    e.dataTransfer.setData("video", videoData);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles?.youTubeSearchContainer}>
        <Input
          placeholder="Search for videos..."
          size="large"
          onPressEnter={(e) => handleSearch(e.target.value)}
          className="marginBottom-2" />
        <Tooltip
          label="Drag the circle and move left or right"
          placement="top"
          hasArrow
          className={styles?.tooltipContainer}
        >
          <div className={styles?.joyStickContainer}>


            <Joystick
              size={35}
              sticky={false}
              throttle={300}
              baseColor="#8A0EE5"
              stickColor="white"
              stickSize={20}
              baseShape="square"
              move={handleToggleMove}
              stop={handleToggleStop}
            />
          </div>
        </Tooltip>
      </div>
      <div className={styles.youtubeCarouselWrapper}>

    
      {
       loading?<BOLoading />:renderResults()?.length===0?<NoDataFound />: renderResults()?.map((result, index) => (
        
          <motion.div
            key={index}

            initial='center'
            animate={position[positionIndex[index]]}
            variants={imageVariant}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', width: '40%',top:0 }}
          >
            <div
              draggable={true}
              onDragStart={(e) => handleDragStart(e, result)}
              onClick={() => {
                messageService.sendMessage("youTube", result, "rightPanelVideo") }}
              className={styles.motionCard}>
              <img src={result.snippet.thumbnails.high.url}
                alt={`Slide ${index + 1}`} />
              <p>{result.snippet.title}</p>

            </div>
          </motion.div>

        ))
      }
        </div>
      <div className={styles.PaginationContainer}>
        <div className={styles.iBotFullScreenButton}>
          <TecButton
            title={<i class="fas fa-expand"></i>}
            className="thirdButtonPrimary"
          onClick={handleMakeFullScreen}

          />
        </div>
        <div className={styles.IBotPaginationButton}>
          <IBotPagination
            totalPages={totalPages}
            onPageHover={handlePageHover}
          />
        </div>

      </div>

    </div>
  );
};

export default YouTubeSearch;
