import React, { useContext, useState, useEffect, useRef } from "react";
import { Input, Card, message } from "antd";
import { Icon, Tooltip } from '@chakra-ui/react';
import { Joystick } from 'react-joystick-component';
import debounce from 'debounce';
import { YouTubeContext } from '../../../Context/YoutubeContext';
import NoDataFound from '../../NoDataFound/NoDataFound';
import { BOLoading, TecButton } from "../../elements/elements";
import styles from './YoutubeScreen.module.css';
import { JOYSTICK_SENSITIVITY } from "../../../siteConfig";
import messageService from "../../MessageService/Index";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const YoutubeScreen = () => {
    const { Meta } = Card;
    const { videos, fetchVideos, loading } = useContext(YouTubeContext);
    const [animate, setAnimate] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedVideoRef = useRef(null);

    const handleSearch = async (value) => {
        if (!value.trim()) {
            message.error("Please enter a valid search term.");
            return;
        }
        try {
            await fetchVideos(value);

            message.success(`Found ${videos.length} videos.`);
        } catch (error) {
            console.error("Error fetching YouTube search results:", error);
            message.error("An error occurred. Please try again later.");
        }
    }

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

    const handleToggleStop = () => {
        try {
            messageService.sendMessage("youTube", videos[selectedIndex], "rightPanelVideo")

        } catch (error) {
            console.error(error);
        }
    }


    const handleToggleMove = (event) => {
        try {
            console.log(selectedIndex)
            if (event.direction === "LEFT") {
                setSelectedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : prevIndex
                );
            } else if (event.direction === "RIGHT") {
                setSelectedIndex((prevIndex) =>
                    prevIndex < videos.length - 1 ? prevIndex + 1 : prevIndex
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchVideos("react.js");
    }, []);

    useEffect(() => {
        if (selectedVideoRef.current) {
            selectedVideoRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedIndex]);

    const renderResults = () => (
        <div className={`${styles.videoContainer} ${animate ? styles.animate : ""}`}>
            {loading ? (
                <BOLoading />
            ) : videos?.length ? (
                videos.map((result, index) => (
                    <div
                        ref={selectedIndex === index ? selectedVideoRef : null}
                        key={result.id.videoId}
                        className={`${styles.videoCard} ${selectedIndex === index ? styles.activeVideo : ""}`}
                        onClick={() => setSelectedIndex(index)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, result)}
                    >
                        <Card
                            hoverable
                            className={styles.youtubeCard}
                            cover={
                                <img
                                    alt={result.snippet.title}
                                    src={result.snippet.thumbnails.high.url}
                                    className={styles.thumbnail}
                                    onClick={() => {
                                        messageService.sendMessage("youTube", result, "rightPanelVideo");
                                    }}
                                />
                            }
                        >
                            <Meta title={result.snippet.title} className={styles.metaTitle} />
                        </Card>
                    </div>
                ))
            ) : (
                <NoDataFound title="No videos found!" />
            )}
        </div>
    );

    const navigate = useNavigate();
    return (
        <div className={styles.container}>

            <div className={styles.searchContainer}>
                <Tooltip label="Go Back" placement="top" hasArrow bg="#8A0EE5" color="white">
                    <Icon
                        as={ArrowBackIcon}
                        boxSize={8}
                        height={7}
                        color="#8A0EE5"
                        cursor="pointer"
                        transition="transform 0.2s ease-in-out, color 0.2s ease-in-out"
                        _hover={{
                            color: "#700cbf",
                            transform: "scale(1.1)"
                        }}
                        _active={{
                            transform: "scale(0.95)"
                        }}
                        onClick={() => navigate(-1)} 
                    />
                </Tooltip>
                <Input
                    placeholder="Search for videos..."
                    size="large"
                    onPressEnter={(e) => handleSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <Tooltip label="Drag the circle and move left or right" placement="top" hasArrow>
                    <div className={styles.joystickContainer}>
                        <Joystick
                            size={35}
                            sticky={false}
                            throttle={100}
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
            <div className={styles.resultsContainer}>
                {renderResults()}
            </div>
        </div>
    );
};

export default YoutubeScreen;
