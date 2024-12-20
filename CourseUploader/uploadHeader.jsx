import React from "react";
import { Container, Text, Input } from "@chakra-ui/react";
import { Select, Box } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Styles from "./courseUploader.module.css"
const UploadHeader = (props) => {
  const { values, errors, handleChange, touched, handleBlur } = props;
  return (
    <Container
      maxW="100%"
      maxH="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="20px" fontWeight="400" color="#6f42c1">
        Upload a Content
      </Text>
      <Input
        name="courseTitle"
        value={values?.courseTitle}
        placeholder="Enter The Title"
        width="250px"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!!errors?.courseTitle && !!touched?.courseTitle ? <Text className={Styles?.errorField}>{errors?.courseTitle}</Text> : ""}

      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
        width="200px"
        name="dateTime"
        value={values?.dateTime}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!!errors?.dateTime && !!touched?.dateTime? <Text className={Styles?.errorField}>{errors?.dateTime}</Text> : ""}

      <Box>
        {/* <Button colorScheme="purple" marginRight="20px"> */}
        {/* Edit */}
        {/* </Button> */}
        {/* <Button colorScheme="yellow">Preview</Button> */}
      </Box>
    </Container>
  );
};

export default UploadHeader;
