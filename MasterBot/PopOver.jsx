import React, { useState, useEffect, useContext } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  Card,
  Flex,
  useColorMode,
  useColorModeValue,

} from "@chakra-ui/react";

import MiddleComponent from "./MiddleComponent ";
import RightComponent from "../../components/MentorGuidance/RightComponent";
import { BucketListContext } from "../../Context/BucketListContext";
import styles from "./PopOver.module.css"

function PopOver({ youTubeSearchData }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBgColor = useColorModeValue("white", "gray.700");

  const [newData, setNewData] = useState("");
  const [maxChar, setMaxChar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
      <Box
        size="xl"
        // padding="10px"
        display="flex"
        // flexDirection="row"
        // gap="180px"
        boxShadow="none"
        // backgroundColor="#FEFEFE"
        borderRadius="5px"
        width="100%"
        maxWidth="100%"
        className={`${styles?.subWrapper} padding-2`}

      >
        {/* <Flex flexDirection={{ base: "column", md: "row" }} > */}
        <Box className={styles?.dndComponentWrapper}>
          <DndProvider backend={HTML5Backend}>
            <MiddleComponent
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
            />
          </DndProvider>
        </Box>
        <Box className={styles?.rightPanelVideoViewer}>
          <RightComponent />
        </Box>
        {/* </Flex> */}
      </Box>
  );
}

export default PopOver;
