import React from "react";
import {
  Container,
  Box,
  Text,
  Input,
  Card,
  Button,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import Styles from "./courseUploader.module.css"

const AddResources = (props) => {

  const { values, errors, handleBlur, touched, handleChange } = props;
  return (
    <Container maxW="100%">
      <Box display="flex">
        <Box width="25%" marginTop="20px">
          <Text marginBottom="20px" fontSize="20px" fontWeight="500">
            Add Resources
          </Text>
          <Card padding="15px" boxShadow="md" flexDir="row">
            <Box display={"flex"} flexDirection={"column"}>
              <Checkbox
                colorScheme="purple"
                marginBottom="10px"
                fontWeight="400"
                name="addResources[0]"
                checked={values[0]}
                onChange={handleChange}
              >
                Videos
              </Checkbox>
              <Checkbox
                colorScheme="purple"
                marginBottom="10px"
                fontWeight="400"
                name="addResources[1]"
                checked={values[1]}
                onChange={handleChange}

              >
                Quiz
              </Checkbox>
              <Checkbox
                colorScheme="purple"
                marginBottom="10px"
                fontWeight="400"
                name="addResources[2]"
                checked={values[2]}
                onChange={handleChange}

              >
                PDF
              </Checkbox>
              <Checkbox
                colorScheme="purple"
                marginBottom="10px"
                fontWeight="400"
                name="addResources[3]"
                checked={values[3]}
                onChange={handleChange}

              >
                Related Links
              </Checkbox>
              <Checkbox
                colorScheme="purple"
                marginBottom="10px"
                fontWeight="400"
                name="addResources[4]"
                checked={values[4]}
                onChange={handleChange}

              >
                Others
              </Checkbox>
              {/* {!!errors['addResources'] && !!touched['addResources'] ? <Text className={Styles?.errorField}>{errors['addResources']}</Text> : ""} */}

            </Box>
          </Card>
        </Box>
        <Box width="75%" marginTop="20px" marginLeft="20px">
          <Text marginBottom="20px" fontSize="20px" fontWeight="500">
            Add Resources
          </Text>
          <Textarea rows="4" placeholder="Description" />
          <Box marginTop="10px" display="flex" justifyContent="space-between">
            <Input placeholder="URL" width="300px" />
            {/* <Box>
              <Button colorScheme="red" color="white" marginRight="20px">
                Cancel
              </Button>
              <Button colorScheme="green">Upload</Button>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AddResources;
