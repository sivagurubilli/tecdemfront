import React from "react";
import { FormControl, Input, Box, Button, HStack } from "@chakra-ui/react";

const CustomForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <HStack
        bgColor="#fafafb"
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingLeft="50px"
        overflow="auto"
        width="99%"
        marginLeft="15px"
      >
        <Box
          h="40px"
          width="120px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          <Input
            placeholder="Enter the goal"
            type="text"
            name="goal"
            width="400px"
            variant="filled"
            value={formData.goal}
            onChange={handleChange}
          />
        </Box>
        <Box
          height="40px"
          width="80px"
          fontSize="20px"
          display="flex"
          alignItems="center"
          cursor="pointer"
        >
          <Input
            placeholder="Choose the priority"
            type="text"
            id="priority"
            name="priority"
            width="400px"
            variant="filled"
            value={formData.priority}
            onChange={handleChange}
          />
        </Box>
        <Box
          h="40px"
          width="150px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          <Input
            placeholder="Enter the challenges that you face"
            type="text"
            id="challenges"
            name="challenges"
            width="300px"
            variant="filled"
            value={formData.challenges}
            onChange={handleChange}
          />
        </Box>
        <Box
          h="40px"
          width="250px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          <Input
            placeholder="Enter the flow"
            type="text"
            id="flow"
            name="flow"
            width="400px"
            variant="filled"
            value={formData.flow}
            onChange={handleChange}
          />
        </Box>
        <Box
          h="40px"
          width="150px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          <Input
            placeholder="Enter the Link"
            type="text"
            id="tagsAndLinks"
            name="tagsAndLinks"
            width="400px"
            variant="filled"
            value={formData.tagsAndLinks}
            onChange={handleChange}
          />
        </Box>
        <Box
          h="40px"
          width="150px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          <Input
            placeholder="Select Date and Time"
            id="date"
            name="date"
            size="md"
            type="date"
            value={formData.date}
            onChange={handleChange}
            width="300px"
            dateFormat="yyyy-MM-dd"
          />
        </Box>

        <Button onClick={handleSubmit} width="100px" colorScheme="purple">
          Add Task
        </Button>
      </HStack>
    </FormControl>
  );
};

export default CustomForm;
