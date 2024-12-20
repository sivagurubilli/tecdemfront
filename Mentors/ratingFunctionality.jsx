import React, { useState } from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <HStack spacing={1}>
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1;
        return (
          <Icon
            as={FaStar}
            key={index}
            color={value <= rating ? "yellow.500" : "gray.300"}
            onClick={() => handleClick(value)}
            cursor="pointer"
          />
        );
      })}
    </HStack>
  );
};

export default StarRating;
