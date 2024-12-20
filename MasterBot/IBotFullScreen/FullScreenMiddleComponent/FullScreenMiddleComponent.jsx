import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import ShareComponent from "../../ShareComponent";
import IflowCard from "../../IflowCard";
import MentorsCardBot from "../../MentorsCardBot";
import IBotPagination from "../../IBotPagination";
import { Joystick } from "react-joystick-component";
import { Heading, Icon, Tooltip } from "@chakra-ui/react";
import { BucketListContext } from "../../../../Context/BucketListContext";
import {
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
  SimpleGrid,
  IconButton,
  Box,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './FullScreenMiddleComponent.module.css'
import GoogleSearch from "../../GoogleSearch";
import styled from "@emotion/styled";
import { TecButton } from "../../../elements/elements";

import endpoints from "../../../../middleware/endpoint";
import { JOYSTICK_SENSITIVITY, getID } from "../../../../siteConfig";
import messageService from "../../../MessageService/Index";
import NoDataFound from "../../../NoDataFound/NoDataFound";
import { CallAPI } from "../../../../middleware/api";
import GoogleSearchFullScreen from "../GoogleSearchFullScreen/GoogleSearchFullScreen";
import { ArrowBackIcon } from "@chakra-ui/icons";

const FullScreenMiddleComponent = ({
  newOption,
  handleNewData,
  youTubeSearchData,
  newData,

}) => {
  const [searchText, setSearchText] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState('bucketList');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Local");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const { filteredResults, dropdownVisible,fetchGoogleResults, selectResult, selectedResult, defaultSearchText, fetchCourseSearchResults } =
    useContext(BucketListContext);
  const resultRefs = useRef([]);



  const handleToggleOption = (option) => {
    setSelectedOption(option);
  };
  const handleLeftMove = () => {
    setSelectedOption("Local");
  };

  const handleRightMove = () => {
    setSelectedOption("Internet");
  };
  useEffect(() => {
    if (!dropdownVisible) {
      setDropdownOpen(false);
    }
  }, [dropdownVisible]);

  const handleJoystickMove = (event) => {
    try {
      if (!dropdownOpen) {
        setDropdownOpen(true);
      } else {
        if (event.direction === "LEFT") {
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (event.direction === "RIGHT") {
          setSelectedIndex((prevIndex) =>
            prevIndex < history.length - 1 ? prevIndex + 1 : prevIndex
          );
        }
      }

      const selectedResult = history[selectedIndex];
      if (selectedResult) {
        selectResult(selectedResult);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const handleDeleteOption = (value) => {
    setDropdownOptions(
      dropdownOptions.filter((option) => option.value !== value)
    );
  };

  const handleAddToFlowClick = () => {
    setVisibleCards("flow");
  };

  const handleIBucketListClick = () => {
    setVisibleCards("bucketList");
  };

  const handleIconClick = () => {
    window.location.href = "https://www.w3schools.com/whatis/whatis_react.asp";
  };

  const handleStarClick = () => {
    setIsRatingVisible(!isRatingVisible);
    setIsStarClicked(true);
    if (rating < 5) {
      setRating(rating + 1);
    }
  };

  const handleShareClick = () => {
    setIsShareOpen(true);
  };

  const closeShareModal = () => {
    setIsShareOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleSearchChange = (e) => {
    clearTimeout(debounceTimer);
    const value = e.target.value;
    setDebounceTimer(setTimeout(() => setSearchText(value), 1000));
  };

  useEffect(() => {
    const cx = "b55e894210beb48e8";
    const gcse = document.createElement("script");
    gcse.type = "text/javascript";
    gcse.async = true;
    gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(gcse, s);

    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      .gsc-control-cse .gsc-input-box, .gsc-control-cse .gsc-input {
        width: 440px;
        margin-left: 10px !important;
      }
      .gsc-control-cse .gsc-search-button {
        height: 40px !important;
        line-height: 40px !important;
      }
    `;
    document.head.appendChild(style);
  }, []);
  const StyledCheckbox = styled(Checkbox)`
  .chakra-checkbox__control {
    border-radius: 7px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .chakra-checkbox__control[data-checked] {
    border: 4px solid #8a0ee5;
    background-color:#8a0ee5;
    position: relative;
  }
.chakra-checkbox__label {
    margin-left: 5px;
  }
`;

  const fetchUserHistory = () => {
    try {
      CallAPI(endpoints?.getHistory, { user_id: getID("userId") })
        .then((res) => {
          setHistoryLoading(false)
          if (res?.status?.code === 200) {
            setHistory(res?.data);
            return;
          }
          setHistory([]);
          // toastError("Failed to load history")
        })

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchUserHistory();
  }, [])

  const handleJoystickStop = async () => {
    try {
      setDropdownOpen(false)
      const inputElement = document.getElementById('searchCourseField');
      if (!!inputElement) {
        inputElement.value = selectedResult?.history_text || ""
        let result = await fetchCourseSearchResults(selectedResult?.history_text, true)
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectHistoryItem = async (history) => {
    try {
      setDropdownOpen(false)
      const inputElement = document.getElementById('searchCourseField');
      if (!!inputElement) {
        inputElement.value = history?.history_text || ""
        let result = await fetchCourseSearchResults(history?.history_text, true)
        await fetchGoogleResults(history?.history_text)
        messageService.sendMessage("middleComponent", {}, "googleSearch")
      }
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    try {
      if (resultRefs.current[selectedIndex]) {
        resultRefs.current[selectedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    } catch (error) {
      console.error(error);
    }

  }, [selectedIndex]);
  const navigate = useNavigate();


  return (
    <>
      <div className={styles.leftContainer}>
        <Box className={`${styles?.flexRightPanel} padding-2`} >
          <div className={styles.btnContainer}>
            <div  className={styles.gobackButton}>
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
            </div>


            <div className={styles.historyContainer}>
              <Box
                display="flex"
                alignItems="center"
                border="1px solid #CBD5E0"
                borderRadius="8px"
                width={'100%'}
                overflow="hidden"
                background="#FFFFFF" >
                <Menu

                  className="tec-shadow"
                  isOpen={dropdownOpen}
                  onClose={() => setDropdownOpen(false)}
                >
                  <MenuButton

                    className={styles.menuButton}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    padding={'5px'}
                    textAlign={'left'}
                    pl={5}

                    textOverflow="ellipsis"
                    fontSize="clamp(12px, 1.2vw, 15px)"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {historyLoading ? "Loading history..." : "Search History"}

                  </MenuButton>
                  <MenuList className={`${styles?.historyList} tec-shadow padding-1`}>
                    {history.length === 0 ? <NoDataFound title="No history found!" /> : history?.map((item, index) => {
                      return <div key={index}
                        ref={el => resultRefs.current[index] = el}
                        onClick={() => {
                          handleSelectHistoryItem(item);
                        }}
                        className={`${styles?.historyItem} tec-border-radius marginBottom-1 padding-2 ${selectedResult?.history_text === item?.history_text ? styles?.historyActive : ""}`}>
                        <p className={styles?.historyItemTitle}>{item?.history_text}</p>
                      </div>
                    })}
                  </MenuList>
                </Menu>
              </Box>
              <Tooltip
                label={`${historyLoading ? "Loading..." : "Drag the circle and move"}`}
                placement="top"
                hasArrow
              >
                <div>
                  <Joystick
                    size={35}
                    sticky={false}
                    baseColor="#8A0EE5"
                    stickColor="white"
                    stickSize={20}
                    throttle={JOYSTICK_SENSITIVITY}
                    baseShape="square"
                    move={handleJoystickMove}
                    stop={handleJoystickStop}

                  />
                </div>
              </Tooltip>
            </div>
            <div className={styles.localInternetContainer}>
              <Box
                display="flex"
                alignItems="center"
                width={'100%'}
                justifyContent={{ base: 'space-around', md: 'center' }}
                border="1px solid #CBD5E0"
                borderRadius="8px"
                // width={{base:'300px', md:'695px', lg:'300px'}}
                gap={'5px'}
                overflow="hidden"
                background="#FFFFFF"
              >
                <Menu>
                  <MenuButton
                    className={styles.menuButton}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    padding={'5px'}
                    textOverflow="ellipsis"
                    fontSize="clamp(12px, 1.2vw, 15px)"

                  >
                    <Flex gap={"30px"} justifyContent={'space-around'} >
                      <StyledCheckbox
                        isChecked={selectedOption === "Local"}
                        onChange={() => setSelectedOption("Local")}
                        isReadOnly

                      >
                        Local
                      </StyledCheckbox>
                      <StyledCheckbox
                        isChecked={selectedOption === "Internet"}
                        onChange={() => setSelectedOption("Internet")}
                        isReadOnly>
                        Internet
                      </StyledCheckbox>
                    </Flex>
                  </MenuButton>
                  {/* <MenuList w={270}>
                    <SimpleGrid columns={2} spacing={1} padding={2}>
                      <MenuItem>
                        <StyledCheckbox>iMentor</StyledCheckbox>
                      </MenuItem>
                      <MenuItem>
                        <StyledCheckbox>All</StyledCheckbox>
                      </MenuItem>
                    </SimpleGrid>
                  </MenuList> */}
                </Menu>
              </Box>

              <Box>
                <Tooltip
                  label="Drag the circle and move"
                  placement="top"
                  hasArrow
                >
                  <div>
                    <Joystick
                      size={35}
                      sticky={false}
                      throttle={JOYSTICK_SENSITIVITY}
                      baseColor="#8A0EE5"
                      stickColor="white"
                      stickSize={20}
                      baseShape="square"
                      move={(e) => {
                        if (e.direction === "LEFT") handleLeftMove();
                        if (e.direction === "RIGHT") handleRightMove();
                      }}
                    />
                  </div>
                </Tooltip>
              </Box>
            </div>
          </div>
          {/* <Flex  className={styles?.rightPanelSecond}>


            <div>


            <Flex alignItems="center" className={styles?.searchActions}>

              <Flex direction="column" align="center" width={'50%'}>

              </Flex>

            </Flex>
            </div>
          </Flex> */}

          <Box className={styles?.rightPanelThird}>
            <GoogleSearchFullScreen
              selectedOption={selectedOption} />
          </Box>
        </Box>


      </div>
      <ShareComponent isOpen={isShareOpen} onClose={closeShareModal} />
    </>
  );
};

export default FullScreenMiddleComponent;
