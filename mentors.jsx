import React from 'react'
import { getUserData } from "../middleware/auth";
import {Stack, Button, Box, Container, Flex, Input, Avatar, Wrap, WrapItem, Tabs, TabList, TabPanels, Tab, TabPanel, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react'
import img1 from '../img/img5.jpg'
import { TbPhoneCall } from "react-icons/tb";

import Ava1 from '../img/Avatar1.svg'
import Ava2 from '../img/Avatar2.svg'
import Ava3 from '../img/Avatar3.svg'
import Ava4 from '../img/Avatar4.svg'
import Ava5 from '../img/Avatar5.svg'
import Ava6 from '../img/Avatar6.svg'
import Ava7 from '../img/Avatar7.svg'


const Mentors = () => {
    return (
        <div>
            <a style={{ marginTop: "10px" }}
                className="nav-link  hide-arrow user-dropdown"
            >
                <div className="avatar avatar-online">
                    <Avatar src={Ava1} className="w-px-50 rounded-circle"
                        style={{ height: "60px", marginLeft: "20px", marginBottom: "15px" }} />
                </div>

                <div className="user-details" style={{ marginTop: "12px", marginLeft: "20px" }}>
                    <p className="user-name">
                        {getUserData().userdata.first_name +
                            " " +
                            getUserData().userdata.last_name}
                    </p>
                    <span className="user-role">
                        {/* {getUserData().userdata.roles} */}
                        <p style={{ color: "blueviolet" }}>Learner</p>
                        <span style={{ fontSize: "10px" }}>React.js Stage 4</span>
                    </span>
                </div>
            </a>
            <div className='Header'>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>MENTORS hi</Tab>
                        <Tab>TRAINER</Tab>
                        <Tab>COACH</Tab>
                        <Tab>GURU</Tab>
                    </TabList>
                    {/* //Main Box For Both Right and Left  */}
                    <TabPanels>
                        {/* //First Box Panel */}
                        <TabPanel>
                            <Wrap>

                                {/* //Content in First Box */}
                                <Flex>
                                <WrapItem>
                                    <Box w='670px' p="10px" flexDirection="column" bg='white'>
                                        <Box fontWeight="500">
                                            <p>Available Mentors</p>
                                        </Box>

                                        <Wrap align="start" marginTop="15px">
                                            <WrapItem>
                                                <Avatar name='Dan Abrahmov' src={Ava1} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Kola Tioluwani' src={Ava2} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Kent Dodds' src={Ava3} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Ryan Florence' src={Ava4} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Prosper Otemuyiwa' src={Ava5} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Christian Nwamba' src={Ava6}/>
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Segun Adebayo' src={Ava7} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Ryan Florence' src={Ava1} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Prosper Otemuyiwa' src={Ava3} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Christian Nwamba' src={Ava5} />
                                            </WrapItem>
                                            <WrapItem>
                                                <Avatar name='Segun Adebayo' src={Ava7} />
                                            </WrapItem>
                                        </Wrap>

                                        {/* //This Flex box for request the Mentors */}

                                        <Flex mt="12">
                                            <Avatar src={Ava1} />
                                            <Box display="flex" alignItems="center">
                                                <Flex flexDirection="column">
                                                    <p className="user-name" style={{ marginLeft: "10px" }}>
                                                        {getUserData().userdata.first_name +
                                                            " " +
                                                            getUserData().userdata.last_name}
                                                    </p>
                                                    <span className="user-role" style={{ color: "blueviolet", marginLeft: "10px" }}>
                                                        Expert(React)
                                                    </span>
                                                </Flex>

                                                <Button colorScheme="purple" marginLeft="350px">
                                                    Request
                                                </Button>
                                                <Box p="10px">
                                                    <TbPhoneCall boxSize="40px" />
                                                </Box>
                                            </Box>
                                        </Flex>

                                        {/* //This Box For Message Or Talk With Mentors */}

                                        <Box display="flex" alignItems="center" marginTop="30px" >
                                            <Avatar src={Ava1}/>

                                            <Box flexDirection="column">
                                                <Container w="500px" borderRadius="10px" marginTop="25px" marginLeft="0px" bg="#D3C1FAFF" h="127px">
                                                    <span>Hello saw, your request i. Please tell, how can I help you.</span>
                                                    <span>Available tomorrow at 2:00 IST</span>
                                                </Container>
                                                <Box><span style={{ color: "grey", marginLeft: "10px" }}>2 mins ago</span></Box>
                                            </Box>
                                        </Box>

                                        <Box bg="#F3F4F6FF" w="50%" ml="335px" h="50px" mt="5px" >
                                            Yes I need your help on Logics
                                        </Box>
                                        <Box bg="#F3F4F6FF" w="30%" ml="490px" h="50px" mt="15px" >
                                            Thank you , will join.
                                        </Box>
                                        <Box bg="#F3F4F6FF" w="20%" ml="535px" h="50px" mt="15px" >
                                            <i class="far fa-face-grin-beam"></i>
                                        </Box>
                                        <Box><span style={{ color: "grey", marginLeft: "533px" }}>Just Now</span></Box>
                                        <Stack spacing={4}>


                                            {/* for input field at last of 1st box */}
                                            <InputGroup size='md' mt="30px">
                                                <InputLeftAddon color="blue"><i class="fas fa-angle-right"></i></InputLeftAddon>
                                                <Input bg="#F3F4F6FF" placeholder='Type a message' />
                                                <InputRightAddon><i class="fas fa-location-arrow"></i></InputRightAddon>
                                            </InputGroup>
                                        </Stack>
                                    </Box>
                                </WrapItem>


                                {/* //for right side Content Box */}
                                <WrapItem>
                                    <Box w='670px' p="10px" flexDirection="column" bg='white'>
                                        <Input w="492px" ml="75px" placeholder='Search Mentors by categories' />
                                        <Container>
                                            <MentortCard />
                                        </Container>

                                        {/* //Paginations // */}

                                        <Box mt="10px">
                                            <nav aria-label="Page navigation example">
                                                <ul class="pagination justify-content-center">
                                                    <li class="page-item disabled">
                                                        <a class="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">&raquo;</span>
                                                            <span class="sr-only">Previous</span>
                                                        </a>
                                                    </li>
                                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item active">
                                                        <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                                    </li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">...</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">8</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">9</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">10</a></li>
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true">&raquo;</span>
                                                            <span class="sr-only">Next</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </Box>

                                        <Box bg='#FFFFFFFF' w='80%' p={4}>
                                            <Flex mt="12">
                                                <Avatar src={Ava1} />
                                                <Box display="flex" alignItems="center">
                                                    <Flex flexDirection="column">
                                                        <p className="user-name" marginLeft="10px" >
                                                            UserName  <span style={{ fontWeight: "lighter" }}>  12:00 PM</span>
                                                        </p>
                                                        <span className="user-role" style={{ color: "blueviolet", marginLeft: "0px" }}>
                                                            Nisi quis voluptate esse pariatela
                                                        </span>
                                                    </Flex>

                                                </Box>
                                            </Flex>
                                            <Flex mt="12">
                                                <Avatar src={Ava1} />
                                                <Box display="flex" alignItems="center">
                                                    <Flex flexDirection="column">
                                                        <p className="user-name" marginLeft="10px" >
                                                            UserName<span style={{ fontWeight: "lighter" }}>  12:00 PM</span>
                                                        </p>
                                                        <span className="user-role" style={{ color: "blueviolet", marginLeft: "0px" }}>
                                                            Nisi quis voluptate esse pariatela
                                                        </span>
                                                    </Flex>

                                                </Box>
                                            </Flex>
                                        </Box>


                                    </Box>
                                </WrapItem>
                                </Flex>
                            </Wrap>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <div>

                </div>
            </div>
        </div>

    )
}

export default Mentors