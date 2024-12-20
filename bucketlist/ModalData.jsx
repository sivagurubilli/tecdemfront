// import Style from "./JobPosting.module.css"
// import { TecButton } from '../../../components/elements/elements';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
// import { getID } from '../../../siteConfig';
// import { CallAPI, post } from '../../../middleware/api';
// import endpoints from '../../../middleware/endpoint';

const ModalData = () => {
  const toast = useToast();

  const validationSchema = Yup.object({
    company: Yup.string().required('Company name is required'),
    title: Yup.string().required('Job title is required'),
    location: Yup.string().required('Location is required'),
    experience: Yup.string().required('Experience is required'),
    skills: Yup.string()
      .matches(/^[a-zA-Z, ]*$/, 'Only alphabets and commas are allowed')
      .required('Skills are required'),
    description: Yup.string().required('Job description is required'),
    logo: Yup.mixed()
      .required('A company logo is required')
      .test(
        'fileType',
        'Only images are allowed',
        (value) =>
          value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      ),
    jobRequirements: Yup.string().required('Job requirements are required'),
  });

  // const initialValues = {
  //   company: '',
  //   title: '',
  //   location: '',
  //   experience: '',
  //   skills: '',
  //   description: '',
  //   logo: null,
  //   jobRequirements: '',
  //   user_id: getID('userId'),
  // };

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   const thumbnailFormData = new FormData();
  //   thumbnailFormData.append('thumbImage', values.logo);
  //   const thumbnailResponse = await post(
  //     endpoints.uploadCourseThumbnail,
  //     thumbnailFormData
  //   );

  //   const formattedValues = {
  //     ...values,
  //     logo: thumbnailResponse.data.filename,
  //     skills: values.skills,
  //     jobRequirements: values.jobRequirements,
  //   };
  //  console.log("job post form data :", formattedValues);

  //   const response = await CallAPI(endpoints.createJobPosting, formattedValues);
  //   console.log(response);
  //   console.log(formattedValues);

  //   toast({
  //     title: 'Job Posted Successfully.',
  //     status: 'success',
  //     duration: 5000,
  //     isClosable: true,
  //   });

  //   setSubmitting(false);
  // };

  return (
    <Box p={4} pt={0}  overflowY="auto">
      <Formik

      >
        {({ setFieldValue, errors }) => {
         return <Form>
            <Flex direction="column"  align="stretch">
              <Flex direction="row" gap={6}>
              <FormControl id="company" >
                <FormLabel>Company Name</FormLabel>
                <Field
                  as={Input}
                  name="company"
                  placeholder="Company Name"
                />
                {/* <p className={Style?.errormsg}>{errors?.company}</p> */}
              </FormControl>

              <FormControl id="title" >
                <FormLabel>Job Title</FormLabel>
                <Field
                  as={Input}
                  name="title"
                  placeholder="Job Title"
                />
                {/* <p className={Style?.errormsg}>{errors?.title}</p> */}
              </FormControl>
              </Flex>
              <Flex direction="row" gap={6}>
              <FormControl id="location" >
                <FormLabel>Location</FormLabel>
                <Field
                  as={Input}
                  name="location"
                  placeholder="Location"
                />
                {/* <p className={Style?.errormsg}>{errors?.location}</p> */}
              </FormControl>

              <FormControl id="experience" >
                <FormLabel>Experience</FormLabel>
                <Field
                  as={Input}
                  name="experience"
                  placeholder="Experience"
                />
                {/* <p className={Style?.errormsg}>{errors?.experience}</p> */}
              </FormControl>
              </Flex>
              <Flex direction="row" gap={6}>
              <FormControl id="skills" >
                <FormLabel>Skills (comma-separated)</FormLabel>
                <Field
                  as={Input}
                  name="skills"
                  placeholder="Skills (comma separated)"
                />
               {/* <p className={Style?.errormsg}>{errors?.skills}</p> */}
              </FormControl>
              <FormControl id="logo" >
                <FormLabel>Company Logo (JPEG/PNG)</FormLabel>
                <Input
                  type="file"
                  name="logo"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => {
                    setFieldValue('logo', event.currentTarget.files[0]);
                  }}
                />
                {/* <p className={Style?.errormsg}>{errors?.logo}</p> */}
              </FormControl>
               </Flex>
              <FormControl id="description" >
                <FormLabel>Job Description</FormLabel>
                <Field
                  as={Textarea}
                  name="description"
                  placeholder="Job Description"
                />
                {/* <p className={Style?.errormsg}>{errors?.description}</p> */}
              </FormControl>
              <FormControl id="jobRequirements" >
                <FormLabel>Job Requirements (comma-separated)</FormLabel>
                <Field
                  as={Textarea}
                  // className={Style?.Inputs}
                  borderColor="gray.300" // Default color
                        _focus={{ borderColor: "gray.500" }}
                  name="jobRequirements"
                  placeholder="Job Requirements (comma separated)"
                />
               {/* <p className={Style?.errormsg}>{errors?.jobRequirements}</p> */}
              </FormControl>
               <div className=''>
            {/* <TecButton type="submit" className={"tecPrimaryButton"}>Post Job</TecButton> */}
           </div>
            </Flex>
          </Form>
}}
      </Formik>
    </Box>
  );
};

export default ModalData;