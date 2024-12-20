import React, { useEffect, useState } from "react";
import Styles from "./courseUploader.module.css";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Select,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import endpoints from "../../middleware/endpoint";
import { get } from "../../middleware/api";
import { IoAdd } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { post } from "../../middleware/api";
import { toast } from "react-toastify";
import { BOLoading } from "../elements/elements";
import CourseUploader from "./CourseUploader";
import { decrypt } from "../../middleware/auth";

export default function AddExperience(props) {
  let userId = "";
  const { selectedForm, setSelectedForm } = props;
  const [fetchedData, setFetchedData] = useState([]);
  const [newExpData, setNewExpData] = useState({
    // uuid: uuidv4(),
    name: "",
    role: "",
    yoe: "",
    duration: "Years",
    startingDate: "",
    endingDate: "",
  });
  const [editableData, setEditableData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxDate, setMaxDate] = useState("");
  const [isExperienceAdded, setIsExperienceAdded] = useState(false);

  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.name) errors.name = "Organization Name is required";
  //   if (!values.role) errors.role = "Role is required";
  //   // if (!values.yoe) errors.yoe = "Years of Experience is required";
  //   // else if (isNaN(values.yoe))
  //   //   errors.yoe = "Year of Experience must be a number";
  //   if (!values.startingDate) errors.startingDate = "Starting Date is required";
  //   if (!values.endingDate) errors.endingDate = "Ending Date is required";
  //   return errors;
  // };
  // const validateEdit = (values) => {
  //   const errors = {};

  //   if (!values.organization_name)
  //     errors.organization_name = "Organization Name is required";
  //   if (!values.experience_role) errors.experience_role = "Role is required";
  //   if (!values.yoe) errors.yoe = "Years of Experience is required";
  //   else if (isNaN(values.yoe))
  //     errors.yoe = "Year of Experience must be a number";
  //   if (!values.startingDate) errors.startingDate = "Starting Date is required";
  //   if (!values.endingDate) errors.endingDate = "Ending Date is required";
  //   return errors;
  // };

  const getExperienceData = () => {
    try {
      setLoading(true);
      post(endpoints.getExperienceData, {
        user_id: userId,
      }).then((APIData) => {
        setFetchedData(APIData.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Add New Experience
  const AddNewExp = () => {
    try {
      // const validationErrors = validate(newExpData);
      // if (Object.keys(validationErrors).length === 0) {
      post(endpoints.createExperience, newExpData)
        .then((res) => {
          toast.success("Experience Added Successfully", {
            pauseOnHover: false,
          });

          setNewExpData({
            uuid: uuidv4(),
            name: "",
            role: "",
            yoe: "",
            duration: "",
            startingDate: "",
            endingDate: "",
          });
          onClose();
          setIsExperienceAdded(true);
        })
        .catch((error) => {
          toast.error("Failed to Add", {
            pauseOnHover: false,
          });
        });
      // } else {
      //   setErrors(validationErrors);
      // }
    } catch (error) {
      toast.error("Some Error Occured", {
        pauseOnHover: false,
      });
    }
  };

  // Delete a Experience
  const deleteExperience = (id) => {
    try {
      post(endpoints.deleteExperience, {
        id: id,
      })
        .then((res) => {
          console.log(res);
          toast.success("Deleted Successfully", {
            pauseOnHover: false,
          });
          setIsExperienceAdded(true);
        })
        .catch((error) => {
          toast.error("Failed to Delete", {
            pauseOnHover: false,
          });
        });
    } catch (error) {
      toast.error("Some Error Occured", {
        pauseOnHover: false,
      });
    }
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  // Edit the Experience
  const editExp = async () => {
    try {
      // post(endpoints.updateExperience, editableData)
      //   .then((res) => {
      //     toast.success("Update Successfully");
      //     // let form = (document.getElementById("EditExpForm").style.display =
      //     //   "none");
      //   })
      //   .catch((error) => {
      //     toast.error("Failed to update");
      //   });
      // const validationErrors = validateEdit(editableData);
      // if (Object.keys(validationErrors).length === 0) {
      await post(endpoints.updateExperience, editableData)
        .then((res) => {
          console.log(res);
          onClose();
          setIsExperienceAdded(true);

          toast.success("Updated Successfully", {
            pauseOnHover: false,
          });
          // let form = (document.getElementById("EditExpForm").style.display =
          //   "none");
        })
        .catch((error) => {
          toast.error("Failed to update", {
            pauseOnHover: false,
          });
        });
      // } else {
      //   setErrors(validationErrors);
      // }
    } catch (error) {
      toast.error("Some Error Occured", {
        pauseOnHover: false,
      });
    }
  };

  const calculateExperience = (startingDate, endingDate) => {
    if (!startingDate || !endingDate) return { years: 0, months: 0 };

    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    if (isNaN(startDate) || isNaN(endDate)) return { years: 0, months: 0 };

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  // const OpenAddExpForm = () => {
  //   let form = (document.getElementById("AddExpForm").style.display = "block");
  // };

  // Fetch all the experiences
  useEffect(() => {
    if (isExperienceAdded) {
      const userDetail = JSON.parse(decrypt(localStorage.getItem("userData")));
      userId = userDetail.id;
      setNewExpData({ ...newExpData, id: userDetail.id });
      getExperienceData();
      setIsExperienceAdded(false);
    }
  }, [isExperienceAdded]);
  useEffect(() => {
    const userDetail = JSON.parse(decrypt(localStorage.getItem("userData")));
    userId = userDetail.id;
    setNewExpData({ ...newExpData, id: userDetail.id });
    getExperienceData();
    setIsExperienceAdded(false);
  }, []);

  useEffect(() => {
    // Get today's date
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${day}`;

    // Set the max date
    setMaxDate(todayDate);
  }, []);

  const CloseAddExpForm = () => {
    let form = (document.getElementById("AddExpForm").style.display = "none");
  };

  const HandleEditButton = (editableData) => {
    onOpen();
    // let form = (document.getElementById("EditExpForm").style.display = "block");
    setEditableData(editableData);
  };

  const CloseEditExpForm = () => {
    let form = (document.getElementById("EditExpForm").style.display = "none");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewExpData((prevState) => {
      const updatedData = { ...prevState, [name]: value };
      // setErrors(validate(updatedData));
      return updatedData;
    });
    setNewExpData({ ...newExpData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevState) => {
      const updatedData = { ...prevState, [name]: value };
      // setErrors(validateEdit(updatedData));
      return updatedData;
    });
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  return (
    // <>

    // {
    //     (fetchedData)?
    //     fetchedData.map((expData)=>{
    //         return(
    //             <>
    //                         <form id={expData.id}>
    //                         <Box className={Styles?.addProfileBody} overflowX="scroll">
    //                                         <Box p="3" className={Styles?.textAlignLeft}>
    //                                             <Heading
    //                                                 as={"h6"}
    //                                             >
    //                                                 Experience Details
    //                                             </Heading>
    //                                         </Box>
    //                                         <Flex>
    //                                             <Box flex="1" p="3" className={Styles?.textAlignLeft}>
    //                                                 <Text>
    //                                                     Organization Name
    //                                                 </Text>
    //                                                 <Input
    //                                                     name="orgName"
    //                                                     placeholder='Enter Organization Name'
    //                                                     value={expData.organization_name}
    //                                                     // onChange={(e) => {
    //                                                     // setFullName(e.target.value);
    //                                                     // handleChange(e);
    //                                                 // }}
    //                                                 // onBlur={handleBlur} placeholder="Enter your full name"
    //                                                 >
    //                                                 </Input>
    //                                                 {/* {!!errors['fullName'] && !!touched['fullName'] ? <Text className={Styles?.errorField}>{errors['fullName']}</Text> : ""} */}

    //                                             </Box>
    //                                             <Box flex="1" p="3" className={Styles?.textAlignLeft}>
    //                                                 <Text>
    //                                                     Role
    //                                                 </Text>
    //                                                 <Input name="role"
    //                                                 placeholder='Enter Your Role'
    //                                                 value={expData.experience_role}

    //                                                 // placeholder={(userDetails.roles)?userDetails.roles:"Select Option"}
    //                                                 >
    //                                                     {/* <option value='admin'>Admin</option>
    //                                                     <option value='student'>Student</option>
    //                                                     <option value='learner'>Learner</option>
    //                                                     <option value='university'>University</option>
    //                                                     <option value='mentor'>Mentor</option>
    //                                                     <option value='department'>Department</option> */}
    //                                                 </Input>
    //                                                 {/* {!!errors['userRole'] && !!touched['userRole'] ? <Text className={Styles?.errorField}>{errors['userRole']}</Text> : ""} */}
    //                                             </Box>
    //                                         </Flex>
    //                                         <Flex>
    //                                             <Box flex="1" p="3" className={Styles?.textAlignLeft}>
    //                                                 <Text>
    //                                                     Year of Experience
    //                                                 </Text>
    //                                                 <Input
    //                                                 placeholder='Enter Year of Experience'
    //                                                 value={expData.yoe}

    //                                                 // onBlur={handleBlur}
    //                                                 // onChange={handleChange}
    //                                                 // value={userDetails.mobile_number}
    //                                                 // name="yoe"
    //                                                 // placeholder="Enter Year of Experience"
    //                                                 >

    //                                                 </Input>
    //                                                 {/* {!!errors['phoneNumber'] && !!touched['phoneNumber'] ? <Text className={Styles?.errorField}>{errors['phoneNumber']}</Text> : ""} */}

    //                                             </Box>
    //                                             <Box flex="1" p="3" className={Styles?.textAlignLeft}>
    //                                                 <Text>Starting Date</Text>
    //                                                 <Input type="text"
    //                                                 value={expData.startingDate}
    //                                                 placeholder="MM/DD/YY"
    //                                                 // onBlur={handleBlur}
    //                                                 // onChange={handleChange}
    //                                                 // name="emailAddress"
    //                                                 // placeholder="Enter your email address"
    //                                                 // value={userDetails.email_id}
    //                                                 >

    //                                                 </Input>
    //                                                 {/* {!!errors['emailAddress'] && !!touched['emailAddress'] ? <Text className={Styles?.errorField}>{errors['emailAddress']}</Text> : ""} */}
    //                                             </Box>
    //                                         </Flex>
    //                                         <Flex>
    //                                             <Box flex="1" p="3" className={Styles?.textAlignLeft} w={"50%"}>
    //                                                 <Text>
    //                                                     Ending Date
    //                                                 </Text>
    //                                                 <Input
    //                                                 type="text"
    //                                                 value={expData.endingDate}
    //                                                 // onBlur={handleBlur}
    //                                                 // onChange={handleChange}
    //                                                 // value={userDetails.mobile_number}
    //                                                 // name="yoe"
    //                                                 // placeholder="Enter Year of Experience"
    //                                                 >

    //                                                 </Input>
    //                                                 {/* {!!errors['phoneNumber'] && !!touched['phoneNumber'] ? <Text className={Styles?.errorField}>{errors['phoneNumber']}</Text> : ""} */}
    //                                             </Box>
    //                                             {/* <Box flex="1" p="3" className={Styles?.textAlignLeft} w={"50%"}>
    //                                                 <Text>
    //                                                     New Experience
    //                                                 </Text>
    //                                                 <Button onClick={AddNewPage}>Add New Experience</Button>
    //                                             </Box> */}
    //                                         </Flex>
    //                                         <Box className={Styles?.addProfileFooter} mt={5} >
    //                                         {/* <Button
    //                                         type="submit"
    //                                         // onClick={UploadCertificates}
    //                                         >Save</Button> */}
    //                                         </Box>
    //                         </Box>
    //                         </form>
    //             </>
    //         )
    //     })
    //     :
    //     ""
    // }

    // <center><Button w="93%" padding="10px" bg="#6c31ee" color="white" onClick={AddNewPage}>Add New Experience</Button></center>
    // {
    //     (fetchedData.length>0)?
    //     <center><Button w="93%" padding="7px" bg="#6c31ee" color="white" mt="8px">Save</Button></center>
    //     : ""
    // }
    // </>

    <>
      {/* ************************Add Experience Form***************************************************** */}

      <form style={{ display: "none" }}>
        <Box overflowX="scroll">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontSize="24px"
              color="Black"
              fontWeight="700px"
              textAlign="left"
              border="none"
              padding="5px"
            >
              Add New Experience
            </Text>
            <IoIosClose
              color="black"
              size="30px"
              cursor="pointer"
              onClick={CloseAddExpForm}
            />
          </Box>
          <Flex>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Organization Name</Text>
              <Input
                name="name"
                placeholder="Enter Organization Name"
                onChange={handleInput}
              ></Input>
            </Box>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Role</Text>
              <Input
                name="role"
                placeholder="Enter Your Role"
                onChange={handleInput}
              ></Input>
            </Box>
          </Flex>
          <Flex>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Year of Experience</Text>
              <Input
                name="yoe"
                placeholder="Enter Year of Experience"
                onChange={handleInput}
              ></Input>
            </Box>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Start Date</Text>
              <Input
                type="text"
                // value={expData.startingDate}
                name="startingDate"
                placeholder="MM/DD/YY"
                onChange={handleInput}
              ></Input>
            </Box>
          </Flex>
          <Flex>
            <Box flex="2" p="3" className={Styles?.textAlignLeft} w={"50%"}>
              <Text>End Date</Text>
              <Input
                type="text"
                placeholder="MM/DD/YY"
                name="endingDate"
                onChange={handleInput}
              ></Input>
              <Button
                float="right"
                marginRight="5px"
                mt="10px"
                onClick={AddNewExp}
              >
                Save
              </Button>
            </Box>
          </Flex>
          <Box className={Styles?.addProfileFooter} mt={5}></Box>
        </Box>
      </form>

      {/* ************************Edit Experience Form***************************************************** */}
      <form style={{ display: "none" }}>
        <Box className={Styles?.addProfileBody} overflowX="scroll">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontSize="24px"
              color="Black"
              fontWeight="700px"
              textAlign="left"
              border="none"
              padding="5px"
            >
              {editableData === "" ? "Add New Experience" : "Edit Experience"}
            </Text>
            <IoIosClose
              color="black"
              size="30px"
              cursor="pointer"
              onClick={CloseEditExpForm}
            />
          </Box>
          <Flex>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Organization Name</Text>
              <Input
                name="organization_name"
                placeholder="Enter Organization Name"
                value={editableData.organization_name}
                onChange={handleChange}
              ></Input>
              {/* {!!errors['fullName'] && !!touched['fullName'] ? <Text className={Styles?.errorField}>{errors['fullName']}</Text> : ""} */}
            </Box>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Role</Text>
              <Input
                name="experience_role"
                placeholder="Enter Your Role"
                value={editableData.experience_role}
                onChange={handleChange}
              ></Input>
            </Box>
          </Flex>
          <Flex>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Year of Experience</Text>
              <Input
                name="yoe"
                placeholder="Enter Year of Experience"
                value={editableData.yoe}
                onChange={handleChange}
              ></Input>
            </Box>
            <Box flex="1" p="3" className={Styles?.textAlignLeft}>
              <Text>Starting Date</Text>
              <Input
                type="text"
                name="startingDate"
                value={editableData.startingDate}
                placeholder="MM/DD/YY"
                onChange={handleChange}
              ></Input>
            </Box>
          </Flex>
          <Flex>
            <Box flex="2" p="3" className={Styles?.textAlignLeft} w={"50%"}>
              <Text>Ending Date</Text>
              <Input
                type="text"
                placeholder="MM/DD/YY"
                name="endingDate"
                value={editableData.endingDate}
                onChange={handleChange}
              ></Input>
              <Button
                float="right"
                marginRight="5px"
                mt="10px"
                onClick={editExp}
                _hover={{ color: "#6d31ed" }}
              >
                Save
              </Button>
            </Box>
          </Flex>
          {/* <Box className={Styles?.addProfileFooter} mt={5}>
            <Button 
                        type="submit"
                        // onClick={UploadCertificates}
                        >Save</Button>
          </Box> */}
        </Box>
      </form>
      {/* <Box mt={5} textAlign={"left"}>
        <Button
          bg="#6d31ed"
          color="white"
          colorScheme="purple"
          alignSelf="self-start"
          onClick={() => setSelectedForm(1)}
        >
          Back
        </Button>
      </Box> */}
      <Box className={Styles?.addProfileExpBody} bgColor={"white"}>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
          <Text
            fontFamily="Manrope"
            fontWeight="700"
            color="black"
            fontSize="20px"
            padding="10px"
          >
            Experience
          </Text>
          <IoAdd
            color="black"
            size="30px"
            cursor="pointer"
            onClick={() => {
              // OpenAddExpForm();
              setAddForm(true);
              onOpen();
            }}
          />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {!addForm ? (
              <>
                <ModalHeader>Edit Experience</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box id="EditExpForm" mt="0px">
                    <Box
                      width="100%"
                      display="flex"
                      flexDir="column"
                      justifyContent="center"
                      alignItems="left"
                    >
                      <Input
                        type="text"
                        placeholder="Enter Role"
                        width="100%"
                        mt="15px"
                        height="40px"
                        name="experience_role"
                        value={editableData.experience_role}
                        onChange={handleChange}
                      ></Input>
                      {errors.experience_role && (
                        <Text color="red" ml="10px">
                          {errors.experience_role}
                        </Text>
                      )}
                      <Input
                        type="text"
                        placeholder="Enter Organization Name"
                        mt="15px "
                        width="100%"
                        height="40px"
                        name="organization_name"
                        value={editableData.organization_name}
                        onChange={handleChange}
                      ></Input>
                      {errors.organization_name && (
                        <Text color="red" ml="10px">
                          {errors.organization_name}
                        </Text>
                      )}
                      {/* <Input
                        type="text"
                        placeholder="Enter Year of Experience"
                        mt="15px"
                        width="100%"
                        height="40px"
                        name="yoe"
                        value={editableData.yoe}
                        onChange={handleChange}
                      ></Input>
                      {errors.yoe && (
                        <Text color="red" ml="10px">
                          {errors.yoe}
                        </Text>
                      )} */}
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex flexDirection="column" width="49%">
                          <FormLabel m="0px" mt="10px">
                            To
                          </FormLabel>
                          <Input
                            type="date"
                            placeholder="Start Date (MM/DD/YY)"
                            width="100%"
                            height="40px"
                            name="startingDate"
                            value={editableData.startingDate}
                            onChange={handleChange}
                            max={maxDate}
                          ></Input>
                          {/* {errors.startingDate && (
                            <Text color="red">{errors.startingDate}</Text>
                          )} */}
                        </Flex>
                        <Flex flexDirection="column" width="49%">
                          <FormLabel m="0px" mt="10px">
                            From
                          </FormLabel>
                          <Input
                            type="date"
                            placeholder="End Date (MM/DD/YY)"
                            width="100%"
                            height="40px"
                            name="endingDate"
                            value={editableData.endingDate}
                            onChange={handleChange}
                            max={maxDate}
                          ></Input>
                          {/* {errors.endingDate && (
                            <Text color="red">{errors.endingDate}</Text>
                          )} */}
                        </Flex>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          width="48%"
                          mt="15px"
                          height="40px"
                          color="white"
                          bgColor="#6e31ec"
                          onClick={editExp}
                          isDisabled={
                            !editableData.experience_role ||
                            !editableData.organization_name
                          }
                          _hover={{}}
                        >
                          Save
                        </Button>
                        <Button
                          width="48%"
                          mt="15px"
                          height="40px"
                          onClick={() => {
                            onClose();
                            CloseEditExpForm();
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </ModalBody>
              </>
            ) : (
              <>
                <ModalHeader>Add Experience</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box id="AddExpForm" mt="0px">
                    <Box
                      width="100%"
                      display="flex"
                      flexDir="column"
                      justifyContent="center"
                      alignItems="left"
                    >
                      <Input
                        isRequired
                        type="text"
                        placeholder="Enter Role"
                        width="100%"
                        mt="15px"
                        height="40px"
                        name="role"
                        value={newExpData.role}
                        onChange={handleInput}
                      ></Input>
                      {errors.role && (
                        <Text color="red" ml="10px">
                          {errors.role}
                        </Text>
                      )}
                      <Input
                        type="text"
                        placeholder="Enter Organization Name"
                        mt="15px "
                        width="100%"
                        height="40px"
                        name="name"
                        value={newExpData.name}
                        onChange={handleInput}
                      ></Input>
                      {errors.name && (
                        <Text color="red" ml="10px">
                          {errors.name}
                        </Text>
                      )}
                      {/* <Input type='text' placeholder='Enter Year of Experience' mt="15px" width="95%" height="40px" name="yoe" value={newExpData.yoe} onChange={handleInput}></Input>  */}
                      {/* <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Flex flexDirection="column" width="48%">
                          <Input
                            type="text"
                            mt="15px"
                            placeholder="Enter Years of Experience"
                            width="100%"
                            height="40px"
                            name="yoe"
                            value={newExpData.yoe}
                            onChange={handleInput}
                          ></Input>
                          {errors.yoe && (
                            <Text color="red" ml="10px">
                              {errors.yoe}
                            </Text>
                          )}
                        </Flex>
                        <Input
                          mt="15px"
                          placeholder="Select Role"
                          width="46%"
                          height="40px"
                          name="duration"
                          value={newExpData.duration}
                          onChange={handleInput}
                        >
                          <option value="Years">Years</option>
                          <option value="Months">Months</option>
                        </Input>
                      </Box> */}
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex flexDirection="column" width="48%">
                          <FormLabel m="0px" mt="10px">
                            To
                          </FormLabel>
                          <Input
                            type="date"
                            placeholder="Start Date"
                            width="100%"
                            height="40px"
                            name="startingDate"
                            value={newExpData.startingDate}
                            onChange={handleInput}
                            max={maxDate}
                          ></Input>
                          {/* {errors.startingDate && (
                            <Text color="red">{errors.startingDate}</Text>
                          )} */}
                        </Flex>
                        <Flex flexDirection="column" width="48%">
                          <FormLabel m="0px" mt="10px">
                            From
                          </FormLabel>
                          <Input
                            type="date"
                            placeholder="End Date"
                            width="100%"
                            height="40px"
                            name="endingDate"
                            value={newExpData.endingDate}
                            onChange={handleInput}
                            max={maxDate}
                          ></Input>
                          {/* {errors.endingDate && (
                            <Text color="red">{errors.endingDate}</Text>
                          )} */}
                        </Flex>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          width="48%"
                          mt="15px"
                          height="40px"
                          color="white"
                          bgColor="#6e31ec"
                          onClick={() => {
                            AddNewExp();
                            onClose();
                          }}
                          isDisabled={!newExpData.role || !newExpData.name}
                          _hover={{}}
                        >
                          Save
                        </Button>
                        <Button
                          width="48%"
                          mt="15px"
                          height="40px"
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </ModalBody>
              </>
            )}

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>

        {loading ? (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BOLoading />
            </div>
          </>
        ) : fetchedData && fetchedData.length > 0 ? (
          <Box
            display="flex"
            flexWrap={"Wrap"}
            overflowY="scroll"
            height="130px"
          >
            {fetchedData.map((expData, index) => {
              const startDate = new Date(expData.startingDate);
              const endDate = new Date(expData.endingDate);

              const isEndDatePresent = isToday(endDate) || endDate > new Date();
              return (
                <>
                  <Box display="flex" h="auto" justifyContent="space-between">
                    <Box width="93%" paddingLeft="15px">
                      <Text
                        fontSize="18px"
                        color="Black"
                        fontWeight="600"
                        m="0px"
                      >
                        {expData.experience_role}
                      </Text>
                      <Text
                        fontSize="16px"
                        color="Black"
                        fontWeight="400"
                        m="0px"
                      >
                        {expData.organization_name}
                      </Text>
                      {expData.startingDate && expData.endingDate ? (
                        <>
                          <Text
                            fontSize="16px"
                            color="gray"
                            fontWeight="200"
                            m="0px"
                          >
                            {`${expData.startingDate} -`}{" "}
                            {isEndDatePresent ? "Present" : expData.endingDate}
                          </Text>
                          <Text>
                            {(() => {
                              const { years, months } = calculateExperience(
                                expData.startingDate,
                                expData.endingDate
                              );
                              if (years == 1 && months == 1) {
                                return `${years} Year ${months} Month Experience`;
                              } else if (years == 1 && months == 0) {
                                return `${years} Year Experience`;
                              } else if (years == 1) {
                                return `${years} Year ${months} Months Experience`;
                              } else if (years > 0 && months == 0) {
                                return `${years} Years Experience`;
                              } else if (years > 0) {
                                return `${years} Years ${months} Months Experience`;
                              } else if (months == 1) {
                                return `${months} Month Experience`;
                              } else if (months > 0) {
                                return `${months} Months Experience`;
                              } else {
                                return "";
                              }
                            })()}
                          </Text>
                        </>
                      ) : (
                        ""
                      )}

                      {/* <Text
                      fontSize="16px"
                      color="gray"
                      fontWeight="200"
                    >{`${expData.yoe} ${expData.duration} Experience`}</Text> */}
                    </Box>
                    <Box height="40px" d="flex" flexDir="column" p="5px">
                      <MdModeEdit
                        color="darkgray"
                        size="20px"
                        cursor="pointer"
                        onClick={() => {
                          setAddForm(false);
                          HandleEditButton(fetchedData[index]);
                          onOpen();
                        }}
                      />
                      <MdDelete
                        color="darkgray"
                        size="20px"
                        cursor="pointer"
                        style={{ marginTop: "5px" }}
                        onClick={() => deleteExperience(expData.id)}
                      />
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        ) : (
          <Box marginLeft={"10px"}>
          No Experience Added Yet
          </Box>
        )}
        {/* {fetchedData == "" ? <Text>No Experience Added</Text> : ""} */}
      </Box>

      {/* <Box
        //   className={Styles?.addProfileFooter}
        mt={5}
        textAlign={"right"}
        // onClick={() => setSelectedForm(3)}
      >
        <Button
          bg="#6d31ed"
          color="white"
          colorScheme="purple"
          onClick={() => setSelectedForm(3)}
          // isDisabled={!fetchedData || fetchedData.length === 0}
        >
          Next
        </Button>
      </Box> */}
    </>
  );
}
