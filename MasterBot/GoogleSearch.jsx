import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import { Joystick } from "react-joystick-component";
import { BucketListContext } from "../../Context/BucketListContext";
import IBotSearchPagination from "./IBotSearchPagination";
import { Box, Text, Button, Input, HStack } from "@chakra-ui/react";
import { useDrag, DragPreviewImage } from "react-dnd";
import styles from "./PopOver.module.css"
import messageService from "../MessageService/Index";
import { BOLoading, TecButton } from "../elements/elements";
import debounce from "debounce";
import { JOYSTICK_SENSITIVITY } from "../../siteConfig";
import { Link, useNavigate } from "react-router-dom";
import { div } from "three/webgpu";
import { IBotIflowContext } from "../../Context/iBotIflowContext";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const GoogleSearch = ({ selectedOption }) => {
  const defaultSearchText = "Search Here What you Want to learn....";
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // const [selectedResult, setSelectedResult] = useState(null);
  const [googleSearchList, setGoogleSearchList] = useState([]);
  const [showDummyResult, setShowDummyResult] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [searchLoading, setSearchLoading] = useState(false);
  const {
    addToBucketList,
    fetchGoogleSearchResults,
    fetchCourseSearchResults,
    filteredResults,
    setFilteredResults,
    selectedResult,
    courseLoading,
    fetchGoogleResults,
    // fetchCourse,
    googleSearchLists,
    setGoogleSearchLists,
    searchLoading,
    setSearchLoading

  } = useContext(BucketListContext);
  const [searchedCourses, setSearchedCourses] = useState([]);
  // const [googleSearchList, setGoogleSearchList] = useState([]);
  const resultsPerPage = 2;
  // const [{ isDragging }, drag] = useDrag(
  //   () => ({
  //     type: "RESULT",
  //     item: { selectedResult },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   }),
  //   [selectedResult]
  // );
  const fetchCourse = async (text) => {
    try {
      setSearchLoading(true);
      const response = await fetch(`https://xvxurdsm6h.execute-api.us-east-1.amazonaws.com/tecdemy-apis/`, {
        method: 'POST',
        body: JSON.stringify({
          service: 'course_search',
          body: { user_query: text },
        }),
      });
      const result = await response.json();
      const { answer } = result;
      const { courses, google_results = [] } = answer;
      const courseList = courses?.response || [];
      setGoogleSearchList(google_results);


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      if (!!selectedResult) {
        // setSearchTerm(selectedResult?.history_text);
        setSelectedIndex(-1)
      }
    } catch (error) {
      console.error(error);
    }

  }, [selectedResult])

  useEffect(() => {
    try {
      handleSearchCourses({
        target: {
          value: "h"
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
          searchInputElement.style.setProperty('--placeholder-color', 'gray');
        } else {
          searchInputElement.placeholder = 'Search from internet'
          searchInputElement.style.setProperty('--placeholder-color', 'gray');
        }
      }

    } catch (error) {
      console.error(error);
    }
  }, [selectedOption])



  const handlePageHover = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPosts([]);
    setFilteredResults([]);
    setShowDropdown(false);
    // setSelectedResult(null); // Clear the selected result
    setShowDummyResult(true);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "" || value === defaultSearchText) {
      handleClearSearch();
    } else {
      setShowDropdown(true);
      setShowDummyResult(false);
    }
  };

  const handleFocus = () => {
    if (searchTerm === defaultSearchText) {
      setSearchTerm("");
    }
  };

  const handleBlur = () => {
    // if (searchTerm === "") {
    //   setSearchTerm("");
    //   setShowDropdown(false);
    //   setSelectedResult(null); // Clear the selected result on blur if empty
    //   setShowDummyResult(true);
    // }
  };

  const handleAddToBucketList = () => {
    if (filteredResults.length > 0) {
      addToBucketList(filteredResults);
    }
  };
  const resultContainerRef = useRef(null);
  const resultRefs = useRef([]);


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
    [showDropdown, filteredResults, selectedIndex]
  );

  const handleJoystickStop = useCallback(() => {
    try {
      if (!!filteredResults[selectedIndex]) {
        handleSelectCourse(filteredResults[selectedIndex])
      }
    } catch (error) {
      console.error(error);
    }

  }, [filteredResults, selectedIndex]);

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);


  const handleSelectCourse = (course) => {
    try {
      messageService.sendMessage("googleSearchPanel", course, "rightPanelViewer")
    } catch (error) {
      console.error(error);
    }
  }


  const handleDragStart = (e, items) => {
    try {
      const videoData = JSON.stringify({
        id: items?.id,
        title: items?.course_title,
        thumbnail: items?.thumbnail,
        type: "videos",
        fullData: items
      });
      e.dataTransfer.setData("video", videoData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchCourses = debounce(async (e) => {
    try {
      const { value } = e.target;

      setSelectedIndex(-1)
      if (selectedOption === 'Local') {

        await fetchCourseSearchResults(value, false)

      } else {

        await fetchCourse(value)

        const google = await fetchGoogleResults(value)


        // alert('Pending')
        // let result = await fetchGoogleSearchResults(value)
        // let result =
      }

    } catch (error) {
      console.error(error);
    } finally {
    }
  }, 1000)
  const { setFlowVideos, flowVideos } = useContext(IBotIflowContext);

  const handleSendData = async (item) => {
    setLoading(true);
    const founded = await flowVideos?.buckListItems?.find(
      (items) => items?.id === item?.id
    );
    if (!!!founded) {
      let newItem = {
        fullData: { item },
        id: item.id,
        thumbnail: item?.thumbnail,
        title: item?.course_title,
        type: 'videos',
      };

      await setFlowVideos((prev) => {
        return { ...prev, buckListItems: [...prev.buckListItems, newItem] };
      });
    }

    setLoading(false);
  };

  const handleRemoveItem = async (item) => {
    setLoading(true);
    const updatedBucketlistItem = flowVideos?.buckListItems?.filter(
      (course) => course?.id !== item?.id
    );
    await setFlowVideos((prev) => {
      return { ...prev, buckListItems: updatedBucketlistItem };
    });
    setLoading(false);
  };
  const DraggableCourseItem = ({ item, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "RESULT",
      item: { id: item.id, title: item.course_title, thumbnail: item.thumbnail, fullData: item },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }));

    const founded = flowVideos?.buckListItems?.find(
      (items) => items?.id === item?.id
    );

    return (
      <Link
        ref={(el) => {
          resultRefs.current[index] = el;
          drag(el);
        }}
        draggable
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
        className={`${styles.courseListContainer} ${selectedIndex === index ? styles.courseListActive : ""}`}
        onClick={() => handleSelectCourse(item)}
      >
        <img
          src={item.thumbnail}
          alt="thumbnail"
          style={{ width: "60px", objectFit: "cover", borderRadius: "4px", marginRight: "10px" }}
        />
        <div
          className={styles.courseTitleContainer}

        >
          <Text fontSize="md" color="blue.500">{item.course_title}</Text>
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'} >

            <Text>{`${item.userDetails?.first_name || ""} ${item.userDetails?.last_name || ""}`}</Text>

            <Box
              display={{ base: 'flex', md: 'none' }}
            >
              <TecButton
                title={founded ? `Added` : 'Add'}
                onClick={() => {
                  if (founded) {
                    handleRemoveItem(item);
                  } else {
                    handleSendData(item);
                  }
                }}
                icon={founded ? <DeleteIcon /> : <AddIcon />}
                loading={loading}
                styling={{
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  colorScheme: 'purple',
                  variant: 'solid',
                  borderRadius: 'full',
                  borderColor: founded ? 'transparent' : '#8A0EE5',
                  backgroundColor: founded ? '#8A0EE5' : 'white',
                  color: founded ? 'white' : '#8A0EE5',
                  padding: '0.1rem 1rem',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  _hover: {
                    backgroundColor: '#8A0EE5',
                    color: 'white',
                    boxShadow: '0 6px 16px rgba(138, 14, 229, 0.5)',
                  },
                  _active: {
                    transform: 'scale(0.98)',
                    boxShadow: '0 3px 8px rgba(138, 14, 229, 0.3)',
                  },
                }}
              />
            </Box>
          </HStack>
        </div>
      </Link>
    );
  };

  const navigate = useNavigate()
  const handleMakeFullScreen = () => {
    try {
      navigate('/ibot/fullscreen')

    } catch (error) {
      console.error(error);
    }
  }
  // console.log(filteredResults)

  return (
    <div className={`${styles?.googleSearchWrapper} marginTopBottom-2`}>
      <div className={styles?.searchContainer}>
        <Input
          onChange={(e) => {
            setQuery(e.target.value)
            handleSearchCourses(e)
          }}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          // placeholder="Local search..."
          // defaultValue={""}
          value={query}
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
        {selectedOption == 'Local' ? (
          <>
            {courseLoading ? <BOLoading /> : filteredResults.length === 0 && (
              <Text fontSize="16px" color="black" textAlign="center">
                No courses found!
              </Text>
            )}
            {filteredResults.length > 0 && filteredResults.map((item, index) => (

              <DraggableCourseItem key={item?.id} item={item} index={index} />


            ))}
          </>
        ) : (<>

          {searchLoading ? (<BOLoading />) : (
            <div>
              {googleSearchList.length === 0 ? (<Text fontSize="16px" color="black" textAlign="center">
                No Data found!
              </Text>) : (
                <div className={`${styles?.googleResults} card `}>
                  {/* <h5 className="marginBottom-2">Global results for : <span className={styles?.searchFor}>{searchText}</span></h5> */}
                  <div className="">
                    <div className="">
                      {googleSearchLists?.length === 0 ? "No Data Found" : googleSearchLists?.map((items) => {
                        return (

                          <div className={`${styles?.googleResult} `}>
                            <a href={items.url} target="_blank" rel="noopener noreferrer">
                              {items?.title}
                            </a>
                            <p>{items?.description}</p>
                          </div>

                        )
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}


        </>)}



      </div>

      {<div className={`${styles?.searchedActions} marginBottom-2`}>
        <TecButton
          title={<i className="fas fa-expand"></i>}
          className="thirdButtonPrimary"
          onClick={handleMakeFullScreen}

        />
        {false && <IBotSearchPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageHover}
        />}
      </div>}
    </div>
  );
};

export default GoogleSearch;
