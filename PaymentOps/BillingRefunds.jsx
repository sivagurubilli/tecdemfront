import React from 'react'
import {getUserData} from "../../middleware/auth";
import Ava1 from '../../img/Avatar1.svg'
import { ChevronDownIcon, AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Flex, Text, HStack, Box, IconButton, Grid, Button, Container, CloseButton, MenuButton, Menu, MenuItem, MenuDivider, MenuList, Avatar, AvatarBadge, Checkbox, ListItem, List, useColorModeValue, VStack, Editable, EditablePreview, EditableTextarea, Spinner, AccordionPanel, GridItem, Accordion, AccordionButton, AccordionIcon, AccordionItem } from '@chakra-ui/react'
import Right from './Right.svg'

const BillingRefunds = () => {
    return (
        <div>
            {/* Navbar Top */}
            <Flex justifyContent="space-between" borderBottom="1px black solid">
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Billing Ops</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>

                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Process Payment <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Test Transfer <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Orders And Credits <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Subscribe <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Bookings <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Time Bookings <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Cancelled Bookings <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Refunds <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuDivider />
                            </MenuList>


                        </Menu>
                    </Flex>
                </HStack>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Bookings Ops</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Process Payment <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Test Transfer <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Meeting Ops</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Subscriber Ops</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Process Payment <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Jobs And Placement</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Process Payment <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontFamily={"Manrope"} fontSize={"18"} fontWeight={"700"}>Platform Ops</Text>
                                    </VStack>
                                    <Box>
                                        <ChevronDownIcon />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem gap={2} fontSize="md">Pricing <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Process Payment <i class="fas fa-angle-right"></i></MenuItem>
                                <MenuItem gap={2} fontSize="md">Test Transfer <i class="fas fa-angle-right"></i></MenuItem>

                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>

            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                {/* SideBar */}

                <GridItem rowSpan={2} colSpan={1} borderRight="1px black solid" bg="#D3C1FA66">

                    <VStack
                        // bg="#D3C1FA66"
                        py={4}
                        borderBottomRadius={'xl'}>
                        <List spacing={8} textAlign="start" px={4}>

                            <ListItem color={'blue'} display="flex" marginStart={"-15"}>
                                <Text display="flex">
                                    <i class="fas fa-house"></i>
                                    <Text ml={"5"} mt={"-1"}>Pricing</Text>
                                </Text>
                            </ListItem>

                            <ListItem display="flex" marginStart={"-15"}>
                                <Text display="flex">
                                    <i class="far fa-bell"></i>
                                    <Text ml={"5"} mt={"-1"}>Process Payment</Text>
                                </Text>
                            </ListItem>

                            <ListItem display="flex" marginStart={"-15"}>
                                <Text display={"flex"}>
                                    <i class="far fa-file-lines"></i>
                                    <Text ml={"5"} mt={"-1"}>Test Transfer</Text>
                                </Text>
                            </ListItem>

                            <ListItem display="flex" marginStart={"-15"}>
                                <Text display="flex">
                                    <i class="fab fa-searchengin"></i>
                                    <Text ml={"5"} mt={"-1"}>Order and Credits</Text>
                                </Text>
                            </ListItem>

                                   //Accordance//

                            <Accordion allowMultiple>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <ListItem display="flex" marginStart={"-20"} mr={"10"}>
                                                <Text ml={"10"}><i class="far fa-heart"></i></Text>
                                                <Text fontFamily={"Manrope"} fontWeight={"400"} ml={"5"} mt={"-1"}>Subscribers</Text>
                                                <AccordionIcon ml={"5"} />
                                            </ListItem>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Text mt={"-3"}>Item 1</Text>
                                        <Text>Item 2</Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>

                            <ListItem display="flex" marginStart={"-15"} >
                                <i class="far fa-bookmark"></i>
                                <Text ml={"5"} mt={"-1"}>BookMarks</Text>
                            </ListItem>
                        </List>
                    </VStack>
                     <Flex>
                    <Box mt={"320"}>

                        <a style={{ marginTop: "10px" }}
                            className="nav-link  hide-arrow user-dropdown"
                        >
                            <div className="avatar avatar-online">
                                <Avatar src={Ava1}
                                    style={{ height: "60px", marginLeft: "20px", marginBottom: "15px" }}>
                                    <AvatarBadge boxSize='1em' bg='green.500' />
                                    </Avatar>
                            </div>

                            <div className="user-details" style={{ marginTop: "12px", marginLeft: "20px",fontFamily:"Manrope", fontSize:"16px",fontWeight:"700"}}>
                                <p className="user-name">
                                    {getUserData().userdata.first_name +
                                        " " +
                                        getUserData().userdata.last_name}
                                </p>
                                <span className="user-role">
                                    <p style={{ color: "#565D6DFF",fontFamily:"Manrope",fontSize:"11px",fontWeight:"400" }}>View Profile</p>
                                </span>
                            </div>
                        </a>
                    </Box>

                    <Box mt={"345"} ml={"35"} fontSize={"30"} color={"#9095A1FF"}><i class="fas fa-gear"></i></Box>
                    </Flex>
                </GridItem>

                {/* Main Screen */}

                <GridItem colSpan={4} h={"240"} w={"1300"} bg={"white"}>

                    <Container maxW='835px' w={"1391"} alignItems={"center"} mt={"6"} h={"173"} borderWidth='1px' borderRadius='lg' bg={"#171A1FFF"}>
                        <Flex marginTop={"5"} ml={"5"}>
                            <Text fontFamily={"Lexend"} fontSize={"32"} fontWeight={"700"} color={"white"}>Current Subscription Plan</Text>
                            <i style={{ color: 'white', fontSize: "40px", marginLeft: "10px", marginTop: "10px" }} class="fas fa-tags"></i>
                            <img src={Right} alt='' style={{ width: '55px', height: '55px', marginLeft: "300px" }} />

                        </Flex>

                        <Flex justifyContent={"space-between"}>
                            <Text fontFamily={"Lexend"} ml={"240"} mt={"5"} fontSize={"32"} fontWeight={"700"} color={"white"}>4 Plans Active with  2355 $</Text>
                            <Button w={150} bg={"#6D31EDFF"} color={"white"} mt={"5"} borderRadius={"25"}><Text fontSize={"18"} fontWeight={"400"} fontFamily={"Manrope"}>View More</Text></Button>
                        </Flex>
                    </Container>

                </GridItem>

                {/* Bottom Menu */}
                <GridItem colSpan={4} h={"570"} w={"100%"} bg={"white"}>

                    <Flex bg={"#F8F9FAFF"}>
                        <Text align={"center"} fontFamily={"Lexend"} fontSize={"18"} fontWeight={"600"} ml={"20"}>Subscription Cancellation</Text>
                        <CloseButton ml={"800"} />
                    </Flex>

                    <Flex>
                        <Container h={"500"} w={"617"} bg={"#4811BF38"} ml={"10"}>
                            <Box position={"relative"} >
                                <Box ml={"-100"} position={"absolute"} top={"50px"} left={"300px"} w={"50px"} h={"50px"} borderRadius={"50%"} bg={"#8E61F173"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <i className="fas fa-users" style={{ fontSize: "14px", color: "#FFF" }}></i>
                                </Box>
                            </Box>
                            <Box mt={"160"}>
                                <Text color={"#2D0A76FF"} fontFamily={"Lexend"} fontSize={"35"} fontWeight={"600"} mr={"100"}>What's the reason <br />
                                    for canceling ?</Text>
                                <Text color={"#323743FF"} fontFamily={"Manrope"} fontSize={"15"} fontWeight={"400"} mr={"100"}>We're sorry to see you go! Please tell us why <br />you're cancelling your premium plan.</Text>
                            </Box>
                            <Box mt={"105"} ml={"250"}
                                w={0}
                                h={0}
                                borderBottom={"50px solid #B9E5FFFF"}
                                borderRight={"43.3px solid transparent"}
                                borderLeft={"43.3px solid transparent"}
                            />
                        </Container>

                        <Box mr={"200"}>
                            <List spacing={4} mt={"14"}>
                                <ListItem fontFamily={"Manrope"} fontSize={"20"} fontWeight={"700"}>
                                    Your input guides our improvements.
                                </ListItem>

                                <Checkbox fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"} defaultChecked>No longer meets my requirements</Checkbox><br />
                                <Checkbox fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"} defaultChecked>Increased scale</Checkbox><br />
                                <Checkbox fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"} defaultChecked>Budget constraints</Checkbox><br />
                                <Checkbox fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"} defaultChecked>Seeking improvements</Checkbox><br />
                                <Checkbox fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"} defaultChecked>Different reason</Checkbox><br />

                            // Click the text to edit
                                <Editable color={"#BDC1CAFF"} defaultValue='Your explanation'>
                                    <EditablePreview />
                                    <EditableTextarea />
                                </Editable>

                                <Button bg={"#6D31EDFF"} color={"white"}>
                                    Confirm to cancel
                                    <Spinner color='white.500' borderStyle="dotted" ml={"5"} />
                                </Button>
                            </List>
                        </Box>
                    </Flex>
                </GridItem>

            </Grid>
        </div>
    )
}

export default BillingRefunds