import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Card,
  Skeleton,
  Text,
  Container,
  Box,
  Link,
} from "@chakra-ui/react"; // Import Chakra UI components

import Draggable from "react-draggable";
import { IoSend } from "react-icons/io5";

const YouTube = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(10);
  const [videoAfterSlider, setVideoAfterSlider] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page number
  const [totalResults, setTotalResults] = useState(0);// Total number of search results

  const handleSearch = async (value) => {
    if (!value.trim()) {
      alert("Please enter a valid search term.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            type: "video",
            maxResults: 10,
            q: value,
            key: "AIzaSyBWs_RprsJw7_eQl84PQL2eZ4zIMgl069U",
          },
        }
      );

      setSearchResults(response.data.items);
      setVideoAfterSlider(response.data.items);
      alert(`Found ${response.data.items.length} videos.`);
    } catch (error) {
      console.error("Error fetching YouTube search results:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    return (
      <Container maxW="100%" display="flex" flexWrap="wrap">
        {videoAfterSlider.map((result) => (
          <Card key={result.id.videoId}>
            <Card
              src={result.snippet.thumbnails.high.url}
              alt={result.snippet.title}
            />
            <Card>
              <Text fontSize="lg" fontWeight="500">
                {result.snippet.title}
              </Text>
              <Text fontSize="sm" color="grey">
                {result.snippet.channelTitle} ·{" "}
                {new Date(result.snippet.publishedAt).toLocaleDateString()}
              </Text>
            </Card>
            <Card>
              <Button colorScheme="blue">
                <Link
                  href={`https://www.youtube.com/watch?v=${result.id.videoId}`}
                >
                  Watch
                </Link>
              </Button>
            </Card>
          </Card>
        ))}
        ;
      </Container>
    );
  };

  const handleCountChange = (count) => {
    setFetchCount(count);
    setVideoAfterSlider(searchResults.slice(0, count));
  };

  useEffect(() => {
    setFetchCount(10); // Set default fetch count
  }, []);

  return (
    <Container>
      <Text fontSize="30px" fontWeight="500">
        Search the videos
      </Text>
      <Box display="flex">
        <Input
          placeholder="Search for vidddeos..."
          size="lg"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <Button
          colorScheme="blue"
          onClick={() => handleSearch(searchText)}
          isLoading={isLoading}
          rightIcon={<IoSend />}
        >
          Search
        </Button>
      </Box>
      <Draggable zindex={100}>
        <Card
          position="absolute"
          bottom="100px"
          right="100px"
          width="15px"
          height="40px"
          zIndex="100"
          bgColor="#d5d5d5"
          display="flex"
          flexDirection="row"
        >
          <Button onClick={() => handleCountChange(fetchCount - 1)}>-</Button>
          <Text width="30px" height="30px" margin="5px" borderRadius="3px">
            {fetchCount}
          </Text>
          <Button onClick={() => handleCountChange(fetchCount + 1)}>+</Button>
        </Card>
      </Draggable>

      {isLoading ? <Skeleton /> : renderResults()}
    </Container>
  );
};

export default YouTube;
