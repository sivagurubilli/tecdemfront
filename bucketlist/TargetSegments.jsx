import React, { useContext } from "react";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaHeart, FaFilePdf, FaTrash } from "react-icons/fa";
import { BucketListContext } from "../Context/BucketListContext";
// import Styles from "../components/Service.module.css";

const Styles = {}

const TargetSegments = () => {
  const { bucketList, addToBucketList, removeFromBucketList } =
    useContext(BucketListContext); // Use the context
  const handleAddToCart = (courseId) => {

  };

  const handleAddToBucketList = (course) => {
    addToBucketList(course); // Add to bucket list
  };

  const handleDeleteBucketList = (courseId) => {
    removeFromBucketList(courseId);
  };

  return (
    <Box fontFamily="Arial, sans-serif" p="20px">
      <Flex direction="row" justify="space-between" h="100vh" overflow="hidden">
        <Box
          w="40%"
          h="100%"
          overflowY="auto"
          p="20px"
          border="1px solid #ccc"
          borderRadius="5px"
        >
          {/* <Heading size="md" mb="2">
            Your Videos ({courses.length})
          </Heading> */}
          <Divider my="10px" />
          <VStack align="flex-start" spacing="20px" >
            {bucketList.map((course) => {
              return <Flex
                key={course.uiid}
                alignItems="flex-start"
                mb="20px"
                p="20px"
                border="1px solid #ccc"
                borderRadius="5px"
              >
                <Box w="150px" mr="20px" >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    width="150"
                    height="100%"
                    className={`${Styles?.thumbImageCard} ${Styles?.textSelectedStop}`}
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box flex="1">
                  <Flex alignItems="center" mb="10px">
                    <Heading size="md" flex="1" mr="2">
                      {course.title}
                    </Heading>
                    <IconButton
                      aria-label={`Like ${course.title}`}
                      icon={<FaHeart color="gray" />}
                      variant="ghost"
                    />
                    <IconButton
                      aria-label={`Delete ${course.title}`}
                      icon={<FaTrash />}
                      variant="ghost"
                      onClick={() => handleDeleteBucketList(course.id)}
                      ml="2"
                    />
                  </Flex>
                  <Text fontSize="sm" color="gray.600" mb="10px">
                    {course.description}
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleAddToCart(course.id)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Flex>
            })}
          </VStack>
        </Box>

        <Box
          w="30%"
          h="100%"
          overflowY="auto"
          p="20px"
          border="1px solid #ccc"
          borderRadius="5px"
        >
          <Heading size="md" mb="2">
            Related Links
          </Heading>
          <Divider my="10px" />
          <VStack align="flex-start" spacing="4">
            <ChakraLink href="https://reactjs.org/" isExternal>
              React Official Website
            </ChakraLink>
            <ChakraLink href="https://github.com/facebook/react" isExternal>
              React GitHub Repository
            </ChakraLink>
            <ChakraLink href="https://reacttraining.com/" isExternal>
              React Training
            </ChakraLink>
            {/* <ChakraLink href={url} isExternal>
              Received Url
            </ChakraLink> */}
          </VStack>
        </Box>

        <Box
          w="30%"
          h="100%"
          overflowY="auto"
          p="20px"
          border="1px solid #ccc"
          borderRadius="5px"
        >
          <Heading size="md" mb="2">
            PDF Resources
          </Heading>
          <Divider my="10px" />
          <VStack align="flex-start" spacing="4">
            <Flex alignItems="center">
              <IconButton
                aria-label="PDF Resource 1"
                icon={<FaFilePdf />}
                variant="ghost"
                colorScheme="blue"
                mr="2"
              />
              <ChakraLink href="link_to_pdf_resource_1" isExternal>
                PDF Resource 1
              </ChakraLink>
            </Flex>
            <Flex alignItems="center">
              <IconButton
                aria-label="PDF Resource 2"
                icon={<FaFilePdf />}
                variant="ghost"
                colorScheme="blue"
                mr="2"
              />
              <ChakraLink href="link_to_pdf_resource_2" isExternal>
                PDF Resource 2
              </ChakraLink>
            </Flex>
          </VStack>
        </Box>
      </Flex>
      <Divider my="20px" />
    </Box>
  );
};

export default TargetSegments;
