import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TbCircleLetterT } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Support = () => {

  const navigate = useNavigate()
  return (
    <Container
      maxW="90%"
      bgColor="white"
      borderRadius="10px"
      marginTop="20px"
      marginBottom="20px"
      padding="50px"
    >
      <Text fontSize="30px" fontWeight="700">
        Select the topic for help
      </Text>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={50}
      >
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
            <Stack
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Box
                bgColor="black"
                color="white"
                fontSize="70px"
                borderRadius="50%"
              >
                <TbCircleLetterT />
              </Box>
              <Heading size="md">Getting Started</Heading>
              <Text>Learn how Tecdemy works and how to start Learning.</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          // border="0.3px solid black"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
            <Stack
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Box
                bgColor="black"
                color="white"
                fontSize="40px"
                height="70px"
                width="70px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MdOutlineReportProblem />
              </Box>
              <Heading size="md">Troubleshooting</Heading>
              <Text>Experiencing a technical issue? Check here.</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          // border="0.3px solid black"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
        
            <Stack
            onClick={() => {
              navigate("/accountandprofile")
            }}
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              >
              <Box
                bgColor="black"
                color="white"
                fontSize="30px"
                height="70px"
                width="70px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                <IoPersonSharp />
              </Box>
              <Heading size="md">Account/Profile</Heading>
              <Text>Manage your account settings.</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          // border="0.3px solid black"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
            <Stack
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Box
                bgColor="black"
                color="white"
                fontSize="40px"
                height="70px"
                width="70px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CiYoutube />
              </Box>
              <Heading size="md">Learning Experience</Heading>
              <Text>Everything about the Tecdemy Learning experience</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          // border="0.3px solid black"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
            <Stack
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Box
                bgColor="black"
                color="white"
                fontSize="40px"
                height="70px"
                width="70px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IoCartOutline />
              </Box>
              <Heading size="md">Purchase/Refunds</Heading>
              <Text>
                Learn about purchasing courses,how to send gifts, and refunds.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          border="2px solid black"
          bgColor="#f5f5f9"
          cursor="pointer"
          // border="0.3px solid black"
          _hover={{
            boxShadow: "md",
            bgColor: "white",
            border: "0px solid white",
          }}
        >
          <CardBody>
            <Stack
              mt="6"
              spacing="3"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Box
                bgColor="black"
                color="white"
                fontSize="40px"
                height="70px"
                width="70px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IoMdLock />
              </Box>
              <Heading size="md">Trust & Safety</Heading>
              <Text>Trust & Safety information and reporting.</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Container>
  );
};

export default Support;
