import React, { useState, useEffect, useContext } from "react";
import {Box} from "@chakra-ui/react";
import styles from './CourseSearchandMentors.module.css'
import { BucketListContext } from "../../../Context/BucketListContext";
import MiddleComponentNew from "./MiddleComponentsNew";

const CourseSearchandMentors = ({ youTubeSearchData }) => {
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
        <Box className={styles?.dndComponentWrapper}>
          
                <MiddleComponentNew
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
           
        </Box>
    )
}

export default CourseSearchandMentors