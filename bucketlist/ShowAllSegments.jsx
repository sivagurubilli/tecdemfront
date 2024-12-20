import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Textarea,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import data from "../bucketlist/data";
import { FaEarthAmericas } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import YouTube from "../components/YoutubeSearch";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineAddReaction } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { TbArrowBigRightLines } from "react-icons/tb";
import { PiCalendarCheckLight } from "react-icons/pi";
import { RiSkipForwardLine } from "react-icons/ri";
import YouTubeSearch from "../components/Youtube";
import SearchBar from "../components/SearchBar";
import CustomForm from "./Form";
import { useNavigate } from "react-router-dom";

const ShowAllSegments = () => {
  const navigate = useNavigate();
  const [data1, setData1] = useState(data);
  const [checkedStates, setCheckedStates] = useState([]);
  const [CheckList, setCheckList] = useState([]);
  const [formFill, setFormFill] = useState(false);
  const [formList, setFormList] = useState([]);
  const [formData, setFormData] = useState({
    goal: "",
    priority: "",
    challenges: "",
    flow: "",
    tagsAndLinks: "",
    date: "",
  });
  const [newList, setNewList] = useState([]);
  const [newOption, setNewOption] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleAddToDropdown = () => {
    if (newOption.trim() !== "") {
      const updatedList = [...newList, newOption];
      setNewList(updatedList);

      setNewOption("");
    }
  };

  const handleFilter = (searchTerm, filterType) => {
    let filteredData = [...data1];

    if (searchTerm !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.goal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.date.includes(searchTerm) ||
          item.flow.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "") {
      filteredData.sort((a, b) => a[filterType].localeCompare(b[filterType]));
    }

    setData1(filteredData);
  };
  const steps = [
    { title: "First", description: "Learn HTML" },
    { title: "Second", description: "Learn CSS" },
    { title: "Third", description: "Learn Javascript" },
    { title: "Four", description: "Learn ReactJS" },
    { title: "Five", description: "Learn NextJS" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleDelete = (key) => {
    const newdata = data1.filter((item) => {
      return item.priority !== key;
    });

    setData1(newdata);
  };

  const handleWholeDelete = () => {
    setFormList([]);
  };

  const handleClick = () => {
    setFormFill(!formFill);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormList = [...formList, formData];
    setFormList(newFormList);

    setFormData({
      goal: "",
      priority: "",
      challenges: "",
      flow: "",
      tagsAndLinks: "",
      date: "",
    });

    setFormFill(false);
  };

  const handleEdit = (priority) => {
    const newdata = data1.filter((item) => {
      return item.priority !== priority;
    });

    setFormList(newdata);
    const itemToEdit = data1.find((item) => item.priority === priority);

    setFormData({
      goal: itemToEdit.goal,
      priority: itemToEdit.priority,
      challenges: itemToEdit.challenges,
      flow: itemToEdit.flow,
      tagsAndLinks: itemToEdit.tagsAndLinks,
      date: itemToEdit.date,
    });

    setFormFill(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckbox = (index, key) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);

    if (newCheckedStates[index]) {
      const task = data1.find((item) => {
        return item.priority === key;
      });
      setCheckList((prevCheckList) => [...prevCheckList, task]);
    } else {
      setCheckList((prevCheckList) =>
        prevCheckList.filter((item) => item.priority !== key)
      );
    }
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterOptions={[
          { label: "Goal", value: "goal" },
          { label: "Challenges", value: "challenges" },
          { label: "Flow", value: "flow" },
          // Add more options as needed
        ]}
        onFilter={handleFilter}
      />
      <HStack
        bgColor="#fafafb"
        display={{ base: "none", md: "flex" }}
        paddingLeft={{ base: "10px", md: "20px" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        overflow="auto"
        width="99%"
        marginLeft="15px"
      >
        <Checkbox
          marginRight="10px"
          colorScheme="purple"
          borderColor="purple"
        ></Checkbox>

        <Box
          h="40px"
          width="140px"
          display="flex"
          alignItems="center"
          fontWeight="700"
          cursor="pointer"
          onClick={handleClick}
        >
          Goals
        </Box>
        <Box
          height="40px"
          width="100px"
          display="flex"
          alignItems="center"
          cursor="pointer"
          fontWeight="700"
        >
          Goal No
        </Box>
        <Box
          h="40px"
          width="200px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          Challenges
        </Box>
        <Box
          h="40px"
          width="250px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          flow
        </Box>
        <Box
          h="40px"
          width="180px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          Tag & Links
        </Box>
        <Box
          h="40px"
          width="150px"
          display="flex"
          alignItems="center"
          fontWeight="700"
        >
          Date
        </Box>
        <Box
          height="40px"
          width="50px"
          fontSize="25px"
          display="flex"
          alignItems="center"
          cursor="pointer"
          color="red"
          onClick={() => {
            handleWholeDelete();
          }}
        >
          <MdOutlineDeleteForever />
        </Box>
        <Box
          height="40px"
          width="50px"
          fontSize="20px"
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={handleClick}
        >
          <FiPlusCircle />
        </Box>
      </HStack>

      {formFill && (
        <div>
          <CustomForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

      <Container
        maxW="100%"
        overflow="auto"
        height={data1.length >= 4 ? "300px" : ""}
      >
        {data1.map((c, index) => {
          return (
            <HStack
              display={{ base: "none", md: "flex" }}
              paddingLeft={{ base: "10px", md: "20px" }}
              justifyContent="space-between"
              colorScheme="blue"
              key={index}
              borderBottom="2px solid grey"
            >
              <Checkbox
                colorScheme="purple"
                borderColor="purple"
                isChecked={checkedStates[index]}
                onChange={() => handleCheckbox(index, c.priority)}
              ></Checkbox>
              {/* <Box
              h="40px"
              textAlign="start"
              width="150px"
              marginTop="10px"
              marginLeft="30px"
            >
              <a href="/calendar">{}</a>
            </Box>
            <Box h="40px" textAlign="start" width="150px" marginTop="10px">
              <a href="/calendar">{}</a>
            </Box> */}
              <Box
                h="60px"
                textAlign="start"
                width="150px"
                marginTop="10px"
                fontWeight="500"
                display="flex"
                alignItems="center"
              >
                <Link>{c.goal}</Link>
              </Box>
              <Box textAlign="start" width="50px" marginTop="10px">
                {c.priority}
              </Box>
              <Box textAlign="start" width="150px" marginTop="10px">
                {c.challenges}
              </Box>
              <Box textAlign="start" width="250px" marginTop="10px">
                {c.flow}
              </Box>
              <Box textAlign="start" width="150px" marginTop="10px">
                {c.tagsAndLinks}
              </Box>
              <Box textAlign="start" width="150px" marginTop="10px">
                {c.date}
              </Box>
              <Box
                textAlign="start"
                width="30px"
                color="#6534e4"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={() => {
                  handleEdit(c.priority);
                }}
              >
                Edit
              </Box>
              <Box
                width="50px"
                color="red"
                fontSize="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={() => handleDelete(c.priority)}
              >
                <IoMdCloseCircleOutline />
              </Box>
            </HStack>
          );
        })}
      </Container>
      <Container maxW="100%" marginTop="20px">
        {/* <Box display="flex" alignItems="center">
          <Text
            color="#6D31EDFF"
            marginRight="40px"
            fontSize="20px"
            fontWeight="500"
            cursor="pointer"
          >
            Java
          </Text>
          <GrNext />
          <Text
            color="#6D31EDFF"
            marginRight="40px"
            marginLeft="40px"
            fontSize="20px"
            fontWeight="500"
            cursor="pointer"
          >
            Angular
          </Text>
          <GrNext />
          <Text
            color="#6D31EDFF"
            marginRight="40px"
            marginLeft="40px"
            fontSize="20px"
            fontWeight="500"
            cursor="pointer"
          >
            Python
          </Text>
          <GrNext />
          <Text
            marginLeft="40px"
            fontSize="20px"
            fontWeight="500"
            cursor="pointer"
          >
            React
          </Text>
        </Box> */}
      </Container>

      <Box marginTop="50px">
        <Stepper size="lg" index={activeStep} colorScheme="purple">
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Container maxW="100%" marginTop="50px" display="flex">
        <Box width="20%">
          <Text color="#6534e4" fontSize="25px" fontWeight="500">
            Performance Tracker{" "}
          </Text>
          <Text fontSize="20px" marginBottom="20px">
            Thrusday, March 28
          </Text>
          <Stepper
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
            colorScheme="green"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Card
          size={{ base: "md", md: "lg" }} // Adjust card size based on screen size
          padding={{ base: "10px", md: "20px" }}
          display="flex"
          flexDirection="row"
          boxShadow="md"
        >
          <Box width={{ base: "100%", md: "600px" }}>
            <Text fontSize="20px" fontWeight="500">
              Add your Bucket list/Target
            </Text>
            <Box display="flex" alignItems="center">
              <Select size="md" marginTop="20px" width="250px">
                {CheckList.map((k, index) => (
                  <option key={index} value={index}>
                    {k.goal}
                  </option>
                ))}
                {newList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Checkbox marginTop="15px" marginLeft="30px">
                Mentors
              </Checkbox>
              <Checkbox marginTop="15px" marginLeft="30px">
                Content
              </Checkbox>
              <Checkbox marginTop="15px" marginLeft="30px">
                Others
              </Checkbox>
            </Box>
            <Input marginTop="20px" placeholder="Search" />
            <Input
              marginTop="20px"
              height="160px"
              placeholder="Results / Add Comments"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <Box marginTop="70px">
              <Button colorScheme="red" marginRight="30px">
                <Link
                  onClick={() => {
                    navigate("/Mentors");
                  }}
                >
                  Mentors
                </Link>
              </Button>
              {/* <Button colorScheme="purple" variant="outline">
                Available Now
              </Button>
              <Button colorScheme="yellow">Schedule Later</Button> */}
              {/* <Button colorScheme="purple" marginLeft="20px">
                Let's get started
              </Button> */}
              <Button
                colorScheme="purple"
                marginLeft="20px"
                onClick={handleAddToDropdown}
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Box>
            <Box width="500px" height="350px" overflow="auto">
              <YouTubeSearch />
            </Box>
            {/* <Button colorScheme="green" marginTop="50px" marginLeft="80px">
              Add to my Goal
            </Button> */}
            <Button colorScheme="green" marginTop="50px" marginLeft="50px">
              Add to my Goal
            </Button>
          </Box>
        </Card>
      </Container>

      <Container
        maxW="100%"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        marginTop={{ base: "20px", md: "50px" }}
      >
        {/* <FormControl style={{ width: "50%" }}>
          <VStack align="stretch">
            <Text fontSize="30px" fontWeight="500">
              Add your BucketList/Target
            </Text>
            <FormLabel htmlFor="goal">Goal</FormLabel>
            <Input
              placeholder="Enter the goal"
              type="text"
              name="goal"
              width="400px"
              variant="filled"
              value={formData.goal}
              onChange={handleChange}
            />

            <FormLabel htmlFor="priority">Priority</FormLabel>
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

            <FormLabel htmlFor="challenges">Challenges</FormLabel>
            <Input
              placeholder="Enter the challenges that you face"
              type="text"
              id="challenges"
              name="challenges"
              width="400px"
              variant="filled"
              value={formData.challenges}
              onChange={handleChange}
            />

            <FormLabel htmlFor="flow">Flow</FormLabel>
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

            <FormLabel htmlFor="tagsAndLinks">Tags and Links</FormLabel>
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

            <FormLabel htmlFor="date">Date</FormLabel>
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

            <Button onClick={handleSubmit} width="100px" colorScheme="blue">
              Add Task
            </Button>
          </VStack>
        </FormControl> */}
        {/* <Box maxW="50%">
          <YouTube />
          <YouTubeSearch />
        </Box> */}
      </Container>
    </div>
  );
};

export default ShowAllSegments;