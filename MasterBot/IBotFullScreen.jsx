import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './IBotFullScreen.module.css';
import { Joystick } from 'react-joystick-component';
import { getID, JOYSTICK_SENSITIVITY } from "../../siteConfig";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from "@emotion/styled";
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
  Tooltip,
  Heading
} from "@chakra-ui/react";
import NoDataFound from '../NoDataFound/NoDataFound';
import { BOLoading } from '../elements/elements';
import { BucketListContext } from '../../Context/BucketListContext';
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import debounce from 'debounce';
import { useDrag } from 'react-dnd';

const IBotFullScreen = () => {

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Local");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const {
    addToBucketList,
    fetchGoogleSearchResults,
    fetchCourseSearchResults,
    filteredResults,
    setFilteredResults,
    selectedResult,
    courseLoading,
    fetchGoogleResults

  } = useContext(BucketListContext);


  const resultContainerRef = useRef(null);
  const resultRefs = useRef([]);
  const handleJoystickMove = useCallback(
    (event) => {
      if (!showDropdown) {
        setShowDropdown(true);
      } else {
        if (event.direction === "LEFT") {
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (event.direction === "RIGHT") {
          setSelectedIndex((prevIndex) =>
            prevIndex < filteredResults.length - 1 ? prevIndex + 1 : prevIndex
          );
        }
      }
    },
    []
  );

  const handleJoystickStop = useCallback(() => {
    try {
      if (!!filteredResults[selectedIndex]) {
        handleSelectCourse(filteredResults[selectedIndex])
      }
    } catch (error) {
      console.error(error);
    }

  }, []);

  const StyledCheckbox = styled(Checkbox)`
  .chakra-checkbox__control {
    border-radius: 7px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; /* Ensure no background color */
  }

  .chakra-checkbox__control[data-checked] {
    border: 4px solid #8a0ee5;
    background-color: transparent;
  }

  .chakra-checkbox__control[data-checked]::before {
    content: none; /* Remove the default checkmark */
  }

  .chakra-checkbox__control svg {
    display: none; /* Hide the default checkmark */
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
          console.log(res)
          setHistory(res?.data);
          return;
        }
        setHistory([]);

      })

  } catch (error) {
    console.error(error);
  }
}


useEffect(() => {
  fetchUserHistory();
}, [])

const handleSearchCourses = debounce(async (e) => {
  try {
    const { value } = e.target;
    setSelectedIndex(-1)
    if (selectedOption === 'Local') {
      let result = await fetchCourseSearchResults(value, false)
    } else {

      // alert('Pending')
      // let result = await fetchGoogleSearchResults(value)
      // let result =
    }
  } catch (error) {
    console.error(error);
  }
}, 1000)

useEffect(() => {
  try {
    handleSearchCourses({
      target: {
        value: "course"
      }
    })
    messageService.onMessage().subscribe((m) => {
      if (m.target === "googleSearch") {
        setSelectedIndex(-1)
      }
    })
    return () => {
      setFilteredResults([])
    }
  } catch (error) {
    console.error(error);
  }

}, [])

useEffect(() => {
  try {
    setFilteredResults([])
    const searchInputElement = document.getElementById('searchCourseField');
    if (searchInputElement) {
      searchInputElement.value = ""
      if (selectedOption === 'Local') {
        searchInputElement.placeholder = 'Search by course name'
      } else {
        searchInputElement.placeholder = 'Search from internet'
      }
    }

  } catch (error) {
    console.error(error);
  }
}, [selectedOption])

const DraggableCourseItem = ({ item, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RESULT",
    item: {
      id: item?.id,
      title: item?.course_title,
      thumbnail: item?.thumbnail,
      fullData: item,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <a
      draggable
      ref={(el) => {
        resultRefs.current[index] = el;
        drag(el);
      }}
      href={item.link}
      onDragStart={(e) => handleDragStart(e, item)}
      rel="noopener noreferrer"
      style={{
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        textDecoration: "none",
        color: "black",
        borderRadius: "4px",
        border: "1px solid #e2e8f0",
        cursor: "grab",
      }}
      className={`marginBottom-2 fadeElement ${selectedIndex === index ? styles?.courseListActive : ""}`}
      onClick={() => handleSelectCourse(item)}
    >
      <img
        src={item?.thumbnail}
        alt={item?.thumbnail}
        style={{
          width: "60px",
          objectFit: "cover",
          borderRadius: "4px",
          marginRight: "10px",
        }}
      />
      <div className={styles?.courseListContainer}>
        <Text fontSize="md" color="blue.500">
          {item?.course_title}
        </Text>
        <Text className={styles?.uploaderName}>
          {`${item?.userDetails?.first_name || ""} ${item?.userDetails?.last_name || ""}`}
        </Text>
      </div>
    </a>
  );
};
  return (
    <div className={styles.container}>

      <div className={styles.leftContainer}>
        {/* <Heading size="md" marginBottom="5px">iBotControl</Heading> */}
        <Flex justifyContent="space-around" alignItems="center" className={styles?.rightPanelSecond}>

          <Flex alignItems="center" className={styles.searchActions}>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #CBD5E0"
              borderRadius="8px"
              width={'600px'}
              overflow="hidden"
              background="#FFFFFF"
            >
              <Menu isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                <MenuButton
                  width="100%"
                  textAlign="left"
                  fontSize="15px"
                  padding="10px"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {historyLoading ? "Loading history..." : "Search History"}
                </MenuButton>
                <MenuList className={`${styles.historyList} tec-shadow padding-1`}>
                  {history.length === 0 ? (
                    <NoDataFound title="No history found!" />
                  ) : (
                    history.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => { }}
                        className={`
                    ${styles.historyItem}
                    ${styles?.historyActive ? "active" : ""}
                  `}
                      >
                        {item.history_text}
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </Menu>
            </Box>

            <Tooltip
              label={`${historyLoading ? "Loading..." : "Drag the circle and move"}`}
              placement="top"
              hasArrow
            >
              <Box marginLeft="10px">
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
              </Box>
            </Tooltip>
          </Flex>
          <Flex alignItems="center" className={styles?.searchActions}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={'space-around'}
              border="1px solid #CBD5E0"
              borderRadius="8px"
              width={'300px'}
              gap={'5px'}
              overflow="hidden"
              background="#FFFFFF"
            >
              <Flex direction="column" align="center" gap={"5px"}>
                <Menu>
                  <MenuButton padding="5px" margin={'0px 5px'}>
                    <Flex gap={"30px"}  justifyContent={'space-around'} >
                      <StyledCheckbox
                        isChecked={selectedOption === "Local"}
                        onChange={() => setSelectedOption("Local")}
                        isReadOnly
                      // marginRight="10px"
                      >
                        Local
                      </StyledCheckbox>
                      <StyledCheckbox
                        isChecked={selectedOption === "Internet"}
                        onChange={() => setSelectedOption("Internet")}
                        isReadOnly
                      >
                        Internet
                      </StyledCheckbox>
                    </Flex>
                  </MenuButton>
                  <MenuList w={270}>
                    <SimpleGrid columns={2} spacing={1} padding={2}>
                      <MenuItem>
                        <StyledCheckbox>iMentor</StyledCheckbox>
                      </MenuItem>
                      <MenuItem>
                        <StyledCheckbox>All</StyledCheckbox>
                      </MenuItem>
                    </SimpleGrid>
                  </MenuList>
                </Menu>
              </Flex>
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
          </Flex>
        </Flex>
        <DndProvider backend={HTML5Backend}>
      <div className={`${styles?.googleSearchWrapper} marginTopBottom-2`}>
        <div className={styles?.searchContainer}>
          <Input
            onChange={handleSearchCourses}
            value="Course"
            id="searchCourseField"
          />
          <Joystick
            size={35}
            sticky={false}
            baseColor="#CBD5E0"
            stickColor="white"
            stickSize={20}
            throttle={JOYSTICK_SENSITIVITY}
            baseShape="square"
            move={handleJoystickMove}
            stop={handleJoystickStop}
          />
        </div>

        <div className={`${styles?.searchResultContainer} marginTopBottom-2`} ref={resultContainerRef}>
          {courseLoading ? (
            <BOLoading />
          ) : filteredResults.length === 0 ? (
            <Text fontSize="16px" color="black" textAlign="center">
              No courses found!
            </Text>
          ) : (
            filteredResults.map((item, index) => (
              <DraggableCourseItem key={item?.id} item={item} index={index} />
            ))
          )}
        </div>
      </div>
    </DndProvider>
      </div>
      <div className={styles.rightContainer}>40% Width Content</div>
    </div>
  );
};

export default IBotFullScreen;
