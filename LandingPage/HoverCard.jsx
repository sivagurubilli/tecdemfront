import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const HoverCard = ({ course, onAddToCart }) => {
  const MotionBox = motion(Box);

  return (
    <MotionBox
      position="absolute"
      top={-10}
      left={0}
      w="320px"
      p={4}
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      zIndex={10}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition="0.3s ease-in-out"
    >
      <Image
        src={course.thumbnail || "/placeholder.png"}
        alt={course.course_title}
        borderRadius="md"
        mb={3}
      />
      <VStack align="start" spacing={2}>
        <Text fontSize="lg" fontWeight="bold">
          {course.course_title}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {course.course_description}
        </Text>
        <HStack justifyContent="space-between" w="100%">
          <Text fontWeight="bold" fontSize="lg" color="purple.600">
            ${course.price}
          </Text>
          <Button
            colorScheme="purple"
            onClick={() => onAddToCart(course.id)}
            size="sm"
          >
            Add to Cart
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default HoverCard;
