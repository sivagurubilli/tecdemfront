import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import Styles from "./courseUploader.module.css";
import {
  Container,
  Box,
  Text,
  Input,
  Card,
  Button,
  Flex,
} from "@chakra-ui/react";

const FileUplaoder = () => {
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const [files, setFiles] = useState([]);

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    console.log(files.map((f) => f.meta));
  };

  const handleUploadCertificates = (e) => {
    try {
      const _files = Array.from(e.target.files);
      // setUploadingFiles(_files);
      const newImages = _files.map((file) => URL.createObjectURL(file));
      setFiles([...files, ...newImages]);
      // handleChange(newImages.join(","));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxW="100%" maxH="100%">
      {/* <Card padding="20px" boxShadow="md" marginTop="10px"> */}
      <Box
        // height="200px"
        width="100%"
        // border="3px dashed #9f9fa1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="#fafafb"
        borderRadius="10px"
        // marginTop="10px"
        margin={0}
        cursor="pointer"
        onClick={getUploadParams}
        classNames={"dropZoneImages"}
      >
        <Flex
          p="3"
          className={Styles?.uploadCertificateList}
          width={"100%"}
          margin={0}
          flexWrap={"wrap"}
        >
          {files.map((image, index) => {
            return (
              <Box className={Styles?.uploadDivs} key={index}>
                <img
                  src={image}
                  style={{ width: "100%" }}
                  alt={`upload-${index}`}
                />
                <i
                  onClick={() => {
                    setFiles(files.filter((items) => items !== image));
                  }}
                  className={`fas fa-xmark ${Styles?.crossButton}`}
                ></i>
              </Box>
            );
          })}

          <Box className={Styles?.uploadDivs} flex="1">
            <i class="fas fa-plus"></i>
            <input
              type="file"
              accept=".jpg,.png,.jpeg,.mp4"
              multiple
              // value={values['certificates']}
              name="certificates"
              onChange={handleUploadCertificates}
              onDrop={handleUploadCertificates}
              className={Styles?.inputCertificates}
            />
          </Box>
        </Flex>
      </Box>
      {/* <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          marginTop="20px"
        >
          <Text fontSize="20px" fontWeight="500">
            Upload Files
          </Text>
          <Box>
            <Button colorScheme="white" color="black" marginRight="20px">
              Cancel
            </Button>
            <Button colorScheme="purple">Upload</Button>
          </Box>
        </Box> */}
      {/* </Card> */}
    </Container>
  );
};

export default FileUplaoder;
