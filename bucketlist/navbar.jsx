import React from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,

} from "@chakra-ui/react";
import ShowAllSegments from "./ShowAllSegments";
import TargetSegments from "./TargetSegments";
import IFlow from './IFlow'
import { FaCrown } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { MdOutlineDownload } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import Wishlist from "../components/Wishlist/Wishlist";
import MainBucketList from "./bucketList";

const Navbar = () => {

  return (
    <Box
      maxW="100%"
      bgColor="white"
      paddingLeft={{ base: "10px", md: "20px" }}
       minH="100vh"
    >

      {/* <Text fontSize={{ base: "30px", md: "35px" }} fontWeight="500">
        Your BucketList
      </Text> */}
      <Tabs variant="enclosed" colorScheme="white" isLazy>
        <TabList
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          {/* <Tab
            _selected={{s
              borderBottom: "4px solid #6534e4",
              color: "#6534e4",
              fontWeight: "700",
              borderRadius: "0px",
            }}
            _focus={{ boxShadow: "md" }}
            borderColor="white"
            borderTop="3px solid transparent"
            fontWeight="500"
            marginRight={{ base: "10px", md: "20px" }}
          >
            Show All
          </Tab> */}
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
            marginRight={{ base: "10px", md: "20px" }}
          >
            <Box marginRight="10px" fontSize="20px">
            <i class="fab fa-opencart"></i>
            </Box>
            BucketList
          </Tab>
          {/* <Tab
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
            marginRight={{ base: "10px", md: "20px" }}
          >
            <Box marginRight="10px" fontSize="20px">
            <i class="far fa-heart"></i>
            </Box>
            Wishlist
          </Tab> */}
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
            marginRight={{ base: "10px", md: "20px" }}
          >
            <Box marginRight="10px" fontSize="20px">
            <i class="fab fa-stack-overflow"></i>
            </Box>
            iFlow
          </Tab>
          <Box display="flex" justifyContent="center" alignItems="center">

          </Box>{" "}
          {/* <Box
            fontSize="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            marginLeft="550px"
            cursor="pointer"
          >
            {" "}
            <Box fontSize="25px" fontWeight="700">
              {" "}
              <BsFiletypeCsv />{" "}
            </Box>{" "}
            CSV{" "}
          </Box>{" "}
          <Box
            fontSize="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            marginLeft="15px"
            cursor="pointer"
          >
            {" "}
            <Box fontSize="25px" fontWeight="700">
              {" "}
              <MdOutlineDownload />{" "}
            </Box>{" "}
            Excel{" "}
          </Box>{" "}
          <Box
            fontSize="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            marginLeft="15px"
            cursor="pointer"
          >
            {" "}
            <Box fontSize="25px" fontWeight="700">
              {" "}
              <IoMdShare />{" "}
            </Box>{" "}
            Share{" "}
          </Box> */}
        </TabList>
        <TabPanels >
          {/* <TabPanel>
            <ShowAllSegments />
          </TabPanel> */}
          <TabPanel w="100%" h="100%" px={0}>
          <Box w="100%" h="100%">
              <MainBucketList />
            </Box>
          </TabPanel>
          {/* <TabPanel>
            <Wishlist />
          </TabPanel> */}
          <TabPanel>
            <IFlow />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>
  );
};

export default Navbar;
