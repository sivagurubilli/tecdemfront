import { Container } from "react-bootstrap";
import Styles from "./courseUploader.module.css";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiEraser } from "react-icons/ci";
import startsWith from "lodash.startswith";
// import {
//   HtmlEditor,
//   Image,
//   Inject,
//   Link,
//   QuickToolbar,
//   RichTextEditorComponent,
//   Toolbar,
// } from "@syncfusion/ej2-react-richtexteditor";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { MentorValidation } from "../ValidationSchema";
import { decrypt } from "../../middleware/auth";
import { toast } from "react-toastify";
import { post } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getID } from "../../siteConfig";
import { FileIcon } from "../../util_helper";
import { color } from "framer-motion";
import video from "../../../src/img/MP4_ICON.svg";
import profileStyles from "./AddProfile.module.css"

const AddProfile = (props) => {
  const [editorState, setEditorState] = useState("");
  const {
    profileValues,
    setProfileValues,
    handleNextForm,
    setFullName,
    selectedForm,
    setSelectedForm,
    files,
    handleUploadCertificates,
    uploadingFiles,
    setUploadingFiles,
    setFiles,
    userDetails,
    setUserDetails,
    uploadCertificates
  } = props;
  // const [files, setFiles] = useState([]);
  // const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleChangeTextEditor = (value) => {
    try {
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        profileSummary: "",
        certificates: "",
        userRole: "",
      },
      validationSchema: MentorValidation,
      onSubmit: async (values) => {
        const toSubmitValues = { ...values, images: uploadingFiles };
        const update = await uploadCertificates();
        handleNextForm();

        // handleNextForm();
      },
    });




  // const handleUploadCertificates = (e) => {
  //   try {
  //     const _files = Array.from(e.target.files);
  //     setUploadingFiles(_files);
  //     console.log(_files);
  //     const newImages = _files.map((file) => URL.createObjectURL(file));
  //     console.log(newImages);
  //     setFiles([...files, ...newImages]);
  //     console.log(files);
  //     handleChange(newImages.join(","));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Now i am uploading the Certificates and sessions in database.

  // const UploadCertificates = () => {
  //   const formData = new FormData();
  //   for (const file of uploadingFiles) {
  //     formData.append("files", file);
  //   }

  //   if (formData.has("files") === true) {
  //     post(endpoints.uploadSessions, formData)
  //       .then((res) => {
  //         toast.success("Uploaded Successfully");
  //         setSelectedForm(2);
  //       })
  //       .catch((error) => {
  //         toast.error("Failed to upload");
  //       });
  //   } else {
  //     toast.error("No File Selected");
  //   }

  //   setUploadingFiles([]);
  // };

  // To show User Profile information

  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Container maxW="100%" className={`${Styles?.mainContainer}`}>
      <Box className={`${Styles?.addProfileHeader} ${Styles?.textAlignLeft}`}>
        <Text fontSize="28px" fontWeight="500" color="#6f42c1">
          Start your journey with Tecdemy
        </Text>
        <Text>Make sure all the info is correct & start applying</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className={Styles?.addProfileBody}>
          <Box p="3" className={Styles?.textAlignLeft}>
            <Heading as={"h6"}>Profile Information</Heading>
          </Box>

          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="57%" display="flex" alignItems="center">
              Full Name
            </Text>
            <Box width={"100%"} position={"relative"}>
              <Input
                width="100%"
                name="fullName"
                value={values.fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                placeholder="Full name"
              ></Input>
              {!!errors['fullName'] && !!touched['fullName'] ? <Text className={`errorFieldLogin`}>{errors['fullName']}</Text> : ""}
            </Box>


          </Box>
          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="57%" display="flex" alignItems="center">
              Role
            </Text>
            <Box width={"100%"} position={"relative"}>
              <Input
                w={"100%"}
                onBlur={handleBlur}
                name="userRole"
                onChange={handleChange}
                placeholder={
                  userDetails.roles ? userDetails.roles : "Select Option"
                }
                value={values.userRole}
              />
              {!!errors['userRole'] && !!touched['userRole'] ? <Text className={`errorFieldLogin`}>{errors['userRole']}</Text> : ""}
            </Box>
          </Box>
          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="57%" display="flex" alignItems="center">
              Phone Number
            </Text>
            <Box width={"100%"} position={"relative"}>
              <PhoneInput
                inputStyle={{ width: "100%", height: "40px" }}
                dropdownStyle={{
                  backgroundColor: "#d0c2f7",
                  textAlign: "left",
                }}
                buttonStyle={{ height: "100%", backgroundColor: "#d0c2f7" }}
                country={"us"}
                value={values["phoneNumber"]}
                onChange={(e) => {
                  setFieldValue('phoneNumber', e)
                }}
                placeholder="Enter phone number"
                inputClass={Styles?.customplaceholder}
              />
              {!!errors['phoneNumber'] && !!touched['phoneNumber'] ? <Text className={`errorFieldLogin`}>{errors['phoneNumber']}</Text> : ""}
            </Box>


          </Box>
          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="58%" display="flex" alignItems="center">
              Email Address
            </Text>
            <Box width={"100%"} position={"relative"}>
              <Input
                onBlur={handleBlur}
                onChange={handleChange}
                name="emailAddress"
                placeholder="Enter your email address"
                value={values.bus_email}
              ></Input>
              {!!errors['emailAddress'] && !!touched['emailAddress'] ? <Text className={`${profileStyles?.errorField} errorFieldLogin`}>{errors['emailAddress']}</Text> : ""}
            </Box>


          </Box>

          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="58%" display="flex" alignItems="center">
              Profile Summary
            </Text>
            <Box width={"100%"} position={"relative"}>
              <TextArea
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="profileSummary"
                rows="5"
              ></TextArea>
              {!!errors['profileSummary'] && !!touched['profileSummary'] ? <Text className={`${profileStyles?.errorField} errorFieldLogin`}>{errors['profileSummary']}</Text> : ""}
            </Box>

          </Box>
          <Box flex="1" className={`${Styles?.flex} ${Styles?.AlignLeft}`}>
            <Text width="58%" display="flex" alignItems="center">
              Profile Summary
            </Text>
            <Box width={"100%"} position={"relative"}>
              <input
                type="file"
                style={{ width: "100%" }}
                accept=".mp4"
                multiple
                // value={values["certificates"]}
                name="certificates"
                onChange={(e) => {
                  const { value } = props;
                  handleUploadCertificates(e)
                }}
                onBlur={handleBlur}
                onDrop={handleUploadCertificates}
                className={Styles?.inputCertificates}
              />
            </Box>

          </Box>
        </Box>
        {files.length > 0 && <Box className={Styles?.uploadCertificateArea}>
          <Box className={Styles?.textAlignLeft}>
            <Heading as={"h6"}>Upload Sample Sessions</Heading>
          </Box>
          <Flex

            className={Styles?.uploadCertificateList}
            flexWrap={"wrap"}
          >
            {files.map((image, index) => {
              return (
                <Box className={Styles?.uploadDivs} key={index}>
                  <FileIcon size="100px" fileName={image?.name} />
                  <i
                    onClick={() => {
                      setFiles(files.filter((items, idx) => idx !== index));
                    }}
                    className={`fas fa-xmark ${Styles?.crossButton}`}
                  ></i>
                </Box>
              );
            })}
          </Flex>

        </Box>}
        <Box
          className={Styles?.addProfileFooter}
          mt={1}
          mb={2}
          textAlign={"right"}
        >
          <Button
            bg="#6d31ed"
            color="white"
            colorScheme="purple"
            type="submit"
          >Next</Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddProfile;
