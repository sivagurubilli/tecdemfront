import {
  Box,
  Card,
  Container,
  Grid,
  GridItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiChalkboardTeacher } from "react-icons/pi";
import { FaChalkboard } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import MentorCard from "./Mentor-Card";
import MenGui1 from "../../img/MenGui-1.jpg";
import MenGui2 from "../../img/MenGui-2.jpg";
import MenGui3 from "../../img/MenGui-3.jpg";
import MenGui4 from "../../img/MenGui-4.jpg";
import Men1 from "../../img/Male 2 E.svg";
import Men2 from "../../img/Male 5 E.svg";
import Female1 from "../../img/Female 1 E.svg";
import Female2 from "../../img/Female 2 G.svg";

const MentorGuidance = () => {
  return (
    <Container maxH="100%" maxWidth="100%" bgColor="white">
      <Box
        fontSize={{ base: "24px", md: "36px", lg: "48px" }}
        color="#6D31EDFF"
        textAlign="center"
        fontWeight="700"
        padding={{ base: "10px", md: "20px" }}
      >
        Get Learnings From
      </Box>
      <Box marginBottom="30px">
        <HStack spacing="87px" marginLeft="30px" flexWrap="wrap">
          <Card
            align="center"
            height="322px"
            width="276px"
            bgColor="#6D31ED57"
            padding="32px"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <Box
              marginBottom="20px"
              height="80px"
              width="80px"
              borderRadius="50%"
              bgColor="#6D31EDFF"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="50px"
              color="white"
            >
              <LiaChalkboardTeacherSolid />
            </Box>
            <Text fontSize="20px" fontWeight="700" marginBottom="20px">
              Mentors
            </Text>
            <Text marginBottom="20px" fontSize="16px" textAlign="center">
              Get a guidance and advice to grow
            </Text>
            <a href="/Mentor">
              <Text
                fontSize="14px"
                fontWeight="700"
                display="flex"
                gap="10px"
                justifyContent="center"
                alignItems="center"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Explore
                <FaArrowRightLong />
              </Text>
            </a>
          </Card>
          <Card
            align="center"
            height="322px"
            width="276px"
            bgColor="#15ABFF36"
            padding="32px"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <Box
              marginBottom="20px"
              height="80px"
              width="80px"
              borderRadius="50%"
              bgColor="#15ABFFFF"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="50px"
              color="white"
            >
              <PiChalkboardTeacher />
            </Box>
            <Text fontSize="20px" fontWeight="700" marginBottom="20px">
              Trainers
            </Text>
            <Text marginBottom="20px" fontSize="16px" textAlign="center">
              Get support and teachings from top teachers
            </Text>
            <a href="/Mentor">
              <Text
                fontSize="14px"
                fontWeight="700"
                display="flex"
                gap="10px"
                justifyContent="center"
                alignItems="center"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Explore
                <FaArrowRightLong />
              </Text>
            </a>
          </Card>
          <Card
            align="center"
            height="322px"
            width="276px"
            bgColor="#FF56A561"
            padding="32px"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <Box
              marginBottom="20px"
              height="80px"
              width="80px"
              borderRadius="50%"
              bgColor="#FF56A5FF"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="40px"
              color="white"
            >
              <FaChalkboardUser />
            </Box>
            <Text fontSize="20px" fontWeight="700" marginBottom="20px">
              Coach
            </Text>
            <Text marginBottom="20px" fontSize="16px" textAlign="center">
              Get you're special teachings and advice
            </Text>
            <a href="/Mentor">
              <Text
                fontSize="14px"
                fontWeight="700"
                display="flex"
                gap="10px"
                justifyContent="center"
                alignItems="center"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Explore
                <FaArrowRightLong />
              </Text>
            </a>
          </Card>
          <Card
            align="center"
            height="322px"
            width="276px"
            bgColor="#FFD31759"
            padding="32px"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <Box
              marginBottom="20px"
              height="80px"
              width="80px"
              borderRadius="50%"
              bgColor="#FFD317FF"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="40px"
              color="white"
            >
              <FaChalkboard />
            </Box>
            <Text fontSize="20px" fontWeight="700" marginBottom="20px">
              Mentors
            </Text>
            <Text marginBottom="20px" fontSize="16px" textAlign="center">
              Get more preachings and guidance
            </Text>
            <a href="/Mentor">
              <Text
                fontSize="14px"
                fontWeight="700"
                display="flex"
                gap="10px"
                justifyContent="center"
                alignItems="center"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Explore
                <FaArrowRightLong />
              </Text>
            </a>
          </Card>
        </HStack>
      </Box>
      <Box>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              borderColor="white"
              borderTop="3px solid transparent"
              fontWeight="500"
            >
              MENTORSji
            </Tab>
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              borderColor="white"
              borderTop="3px solid transparent"
              fontWeight="500"
            >
              TRAINER
            </Tab>
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              borderColor="white"
              borderTop="3px solid transparent"
              fontWeight="500"
            >
              COACH
            </Tab>
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              borderColor="white"
              borderTop="3px solid transparent"
              fontWeight="500"
            >
              GURU
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontWeight="700" fontSize="30px" marginBottom="20px">
                Popular Albums
              </Text>
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                }}
                gap={3}
                flexWrap="wrap"
              >
                <GridItem>
                  <MentorCard
                    title="React JS Course Album"
                    image={MenGui1}
                    personimg={Female2}
                    personname="Suganya"
                  />
                </GridItem>
                <GridItem>
                  <MentorCard
                    title="Python Course Album"
                    image={MenGui3}
                    personimg={Female1}
                    personname="Kavya Shree"
                  />
                </GridItem>
                <GridItem>
                  <MentorCard
                    title="DevOps Course Album"
                    image={MenGui2}
                    personimg={Men1}
                    personname="Mohit Sharma"
                  />
                </GridItem>
                <GridItem>
                  <MentorCard
                    title="Soft Skills Course Album"
                    image={MenGui4}
                    personimg={Men2}
                    personname="Joe Daniel"
                  />
                </GridItem>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default MentorGuidance;
