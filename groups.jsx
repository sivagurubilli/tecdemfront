import {
  Box,
  Container,
  Divider,
  Image,
  Input,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Groups = () => {
  function DataTabs({ data }) {
    return (
      <Container
        maxW="90%"
        height="100vh"
        bgColor="white"
        marginTop="20px"
        marginBottom="20px"
        borderRadius="10px"
        paddingTop="20px"
      >
        <Tabs display="flex" variant="">
          <Box
            width="400px"
            height="100vh"
            overflow="auto"
            borderRight="5px solid #f5f5f9"
            borderTopLeftRadius="10px"
            paddingBottom="20px"
          >
            <TabList>
              <VStack spacing={3}>
                {data.map((tab, index) => (
                  <Box
                    key={index}
                    height="50px"
                    borderBottom="1px solid black"
                    width="300px"
                    _hover={{ bgColor: "#f5f5f9" }}
                  >
                    <Tab
                      textColor="black"
                      textDecoration="none"
                      alignSelf="flex-start"
                      // _hover={{ bgColor: "#f5f5f9" }}
                      _selected={{ bgColor: "#f5f5f9" }}
                      _focus={{ boxShadow: "md" }}
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      overflowX="auto"
                    >
                      <Image
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                        width="30px"
                        height="30px"
                        borderRadius="50%"
                        marginRight="20px"
                      />
                      {tab.label}
                    </Tab>
                  </Box>
                ))}
              </VStack>
            </TabList>
          </Box>
          <Box width="100%" height="100vh">
            <TabPanels>
              {data.map((tab, index) => (
                <TabPanel p={0} key={index}>
                  <Box
                    maxW="100%"
                    height="60px"
                    bgColor="#f5f5f9"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    paddingLeft="20px"
                    borderTopRightRadius="10px"
                    marginLeft="10px"
                  >
                    <Image
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                      width="30px"
                      height="30px"
                      borderRadius="50%"
                      marginRight="20px"
                    />
                    <Text fontWeight="700">{tab.label}</Text>
                  </Box>
                  <Text
                    m={4}
                    height="50px"
                    bgColor="aliceblue"
                    paddingLeft="10px"
                    paddingTop="5px"
                    borderRadius="5px"
                  >
                    {tab.content}
                  </Text>
                  {/* <Box height="50px" width="100%" bgColor="red" top="450px">
                    <Input width="600px" marginLeft="20px" />
                  </Box> */}
                </TabPanel>
              ))}
            </TabPanels>
          </Box>
        </Tabs>
      </Container>
    );
  }

  const tabData = [
    {
      label: "AWS",
      content:
        "Learn the fundamentals of Amazon Web Services (AWS) and cloud computing.",
    },
    {
      label: "AWS Fundamentals",
      content:
        "Gain a solid understanding of AWS services and how to use them effectively.",
    },
    {
      label: "Frontend Development",
      content:
        "Master HTML, CSS, and JavaScript to build interactive and responsive user interfaces.",
    },
    {
      label: "React.js Essentials",
      content:
        "Explore the core concepts of React.js and build dynamic web applications.",
    },
    {
      label: "Angular Basics",
      content:
        "Learn the basics of Angular framework to develop modern web applications.",
    },
    {
      label: "Vue.js Crash Course",
      content:
        "Dive into Vue.js framework and create powerful single-page applications.",
    },
    {
      label: "Fullstack Development",
      content:
        "Become proficient in both frontend and backend development to build complete web applications.",
    },
    {
      label: "MERN Stack Bootcamp",
      content:
        "Master the MERN (MongoDB, Express.js, React.js, Node.js) stack and create fullstack applications.",
    },
    {
      label: "MEAN Stack Introduction",
      content:
        "Get started with the MEAN (MongoDB, Express.js, Angular, Node.js) stack and develop scalable web apps.",
    },
    {
      label: "Django Fullstack",
      content:
        "Learn Django framework and build fullstack web applications using Python.",
    },
    {
      label: "Web Development",
      content:
        "Develop modern web applications with ASP.NET Core framework using C# programming language.",
    },
    {
      label: "Node.js & Express ",
      content:
        "Explore the fundamentals of Node.js and Express.js to build backend services.",
    },
    {
      label: "MongoDB for Beginners",
      content:
        "Get started with MongoDB and learn to work with NoSQL databases efficiently.",
    },
  ];

  // 3. Pass the props and chill!
  return <DataTabs data={tabData} />;
};
//   return (
//     <div>
//       <Container
//         maxW="90%"
//         height="100vh"
//         bgColor="white"
//         marginTop="20px"
//         marginBottom="20px"
//         borderRadius="10px"
//       >
//         <Tabs display="flex">
//           <Box
//             width="250px"
//             height="100vh"
//             bgColor="red"
//             overflow="auto"
//             scrollBehavior="smooth"
//           >
//             <TabList>
//               <VStack spacing={4}>
//                 <Tab>One</Tab>
//                 <Tab>Two</Tab>
//                 <Tab>Three</Tab>
//                 <Tab>Four</Tab>
//                 <Tab>Five</Tab>
//                 <Tab>Six</Tab>
//                 <Tab>Seven</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//                 <Tab>Eight</Tab>
//               </VStack>
//             </TabList>
//           </Box>
//           <Box width="100%" height="100vh" bgColor="red">
//             <TabPanels>
//               <TabPanel>
//                 <p>one!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>two!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//               <TabPanel>
//                 <p>three!</p>
//               </TabPanel>
//             </TabPanels>
//           </Box>
//         </Tabs>
//       </Container>
//     </div>
//   );
// };

export default Groups;
