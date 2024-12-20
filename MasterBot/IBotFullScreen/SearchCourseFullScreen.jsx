import React, { useState, useEffect, useContext } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  Card,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,

} from "@chakra-ui/react";

import MiddleComponent from "../MiddleComponent ";
import RightComponent from "../../../components/MentorGuidance/RightComponent";
import { BucketListContext } from "../../../Context/BucketListContext";
import styles from "./SearchCourseFullScreen.module.css"
import FullScreenMiddleComponent from "./FullScreenMiddleComponent/FullScreenMiddleComponent";
import MentorsCardBot from "../MentorsCardBot";
import MentorFullScreen from "./MentorFullScreen/MentorFullScreen";
import IflowCard from "../IflowCard";
import IFlowFullScreen from "./IFlowFullScreen/IFlowFullScreen";

function SearchCourseFullScreen({ youTubeSearchData }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBgColor = useColorModeValue("white", "gray.700");

  const [newData, setNewData] = useState("");
  const [maxChar, setMaxChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCards, setVisibleCards] = useState('bucketList');
  const [newOption, setNewOption] = useState("");
  const { updateOptions, filteredResults } = useContext(BucketListContext);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNewData = (data) => {
    setNewData("Search data Received");
  };

  const handleTextareaChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 400) {
      setNewOption(inputValue);
      setMaxChar("");
    } else {
      setMaxChar("Maximum character limit (400) exceeded!");
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const newValue = `option${filteredResults.length + 1}`;
      const newLabel = newOption.trim();
      const newOptionObj = { value: newValue, label: newLabel };
      updateOptions(newOptionObj);
      setNewOption("");
    }
  };



  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.leftContainer}>
          {/* <Heading size="md" marginBottom="5px">iBotControl</Heading> */}
          <Box className={styles?.dndComponentWrapper}>

            <FullScreenMiddleComponent
              newOption={newOption}
              options={filteredResults}
              handleTextareaChange={handleTextareaChange}
              handleAddOption={handleAddOption}
              maxChar={maxChar}
              handleCloseButtonClick={() => window.history.back()}
              handleNewData={handleNewData}
              youTubeSearchData={youTubeSearchData}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={5}
              newData={newData}
              setVisibleCards={setVisibleCards}
              visibleCards={visibleCards}
            />
          </Box>
        </div>

        <div className={styles.rightContainer}>
        <div className={styles?.mentorContainer} >
         <MentorFullScreen />
       </div>
       <div >
         <IFlowFullScreen setVisibleCards={setVisibleCards} visibleCards={visibleCards} />

       </div>
        </div>
         
      </DndProvider>
    </div>

    //     <div className={styles.container}>
    //         <DndProvider backend={HTML5Backend}>
    //       <div className={styles.leftContainer}>
    //         <Heading size="md" marginBottom="5px">iBotControl</Heading>


    //         <Box className={styles?.dndComponentWrapper}>

    //             <FullScreenMiddleComponent
    //               newOption={newOption}
    //               options={filteredResults}
    //               handleTextareaChange={handleTextareaChange}
    //               handleAddOption={handleAddOption}
    //               maxChar={maxChar}
    //               handleCloseButtonClick={() => window.history.back()}
    //               handleNewData={handleNewData}
    //               youTubeSearchData={youTubeSearchData}
    //               handlePageChange={handlePageChange}
    //               currentPage={currentPage}
    //               totalPages={5}
    //               newData={newData}
    //               setVisibleCards={setVisibleCards} 
    //               visibleCards={visibleCards}
    //             />

    //         </Box>
    //       </div>
    //       <div className={styles.rightContainer}>
    //   <Box className={styles?.mentorContainer} height="50%">
    //     <MentorFullScreen />
    //   </Box>
    //   <Box height="50%" mt={{ base: 2, md: 2 }}>
    //     <IFlowFullScreen setVisibleCards={setVisibleCards} visibleCards={visibleCards} />

    //   </Box>
    // </div>

    //       </DndProvider>
    //     </div>
  );


}

export default SearchCourseFullScreen;
