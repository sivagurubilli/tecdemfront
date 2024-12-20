import React from 'react'
import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { Flex, Text, HStack, Box, IconButton, Grid, Button, Container, CloseButton,AvatarBadge, MenuButton, Menu, MenuItem, MenuDivider, MenuList, Checkbox, ListItem, List, useColorModeValue, VStack, Stack, FormLabel, FormControl, Input, GridItem, Heading, Avatar } from '@chakra-ui/react'
import Right from './Right.svg'
import {getUserData} from "../../middleware/auth";
import Ava1 from '../../img/Avatar1.svg'

const BillingCanConf = () => {


    return (
        <div>
            {/* Navbar */}
            <Flex justifyContent="space-between" borderBottom="1px black solid">
                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    <VStack>
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Billing Ops</Text>
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
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Bookings Ops</Text>
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
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Meeting Ops</Text>
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
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Subscriber Ops</Text>
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
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Jobs And Placement</Text>
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
                                        <Text padding="1px" fontSize="md" color="#171A1FFF">Platform Ops</Text>
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

                <GridItem rowSpan={4} colSpan={1} borderRight="1px black solid" bg="#D3C1FA66">
                    <Box>
                        <VStack
                            // bg="#D3C1FA66"
                            py={4}
                            borderBottomRadius={'xl'}>
                            <List spacing={8} textAlign="start">
                                <ListItem color={'blue'} display="flex" justifyContent="space-between">
                                    Pricing
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Process Payment
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Test Transfer
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Order and Credits
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Subscribers
                                    <Button bg={"red"} color={'white'} fontSize={"10"} h={"5"} borderRadius={"100%"}>9</Button>
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Bookings
                                    <Button bg={"red"} color={'white'} fontSize={"10"} h={"5"} borderRadius={"50%"}>99+</Button>
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Time Bookings
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Cancelled Bookings
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between">
                                    Refunds
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                            </List>
                        </VStack>

                        <Flex >
                    <Box mt={"150"}>

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

                    <Box mt={"170"} ml={"35"} fontSize={"30"} cursor={"pointer"} color={"#9095A1FF"}><i class="fas fa-gear"></i></Box>
                    </Flex>
                    </Box>
                </GridItem>

                {/* Main Screen */}

                <GridItem colSpan={4} h={"250"} w={"1300"} bg={"white"}>

                    <Container maxW='835px' w={"1391"} alignItems={"center"} mt={"10"} h={"173"} borderWidth='1px' borderRadius='lg' bg={"#171A1FFF"}>
                        <Flex marginTop={"5"} ml={"5"}>
                            <Text fontFamily={"Lexend"} fontSize={"32"} fontWeight={"700"} color={"white"}>Current Subscription Plan</Text>
                            <i style={{ color: 'white', fontSize: "40px", marginLeft: "10px", marginTop: "10px" }} class="fas fa-tags"></i>
                            <img src={Right} alt='' style={{ width: '50px', height: '50px', marginLeft: "300px" }} />

                        </Flex>

                        <Flex justifyContent={"space-between"}>
                            <Text fontFamily={"Lexend"} ml={"240"} mt={"5"} fontSize={"32"} fontWeight={"700"} color={"white"}>4 Plans Active with  2355 $</Text>
                            <Button w={150} bg={"#6D31EDFF"} color={"white"} mt={"5"} borderRadius={"25"}><Text fontSize={"18"} fontWeight={"400"} fontFamily={"Manrope"}>View More</Text></Button>
                        </Flex>
                    </Container>

                </GridItem>

                {/* Bottom Menu */}
                <GridItem colSpan={4} h={"500"} w={"100%"} bg={"white"}>

                    <Flex bg={"#F8F9FAFF"}>
                        <Text align={"center"} fontFamily={"Lexend"} fontSize={"18"} fontWeight={"600"} ml={"20"}>Subscription Cancellation</Text>
                        <CloseButton ml={"800"} />
                    </Flex>

                    <Flex>
                        <Container maxH={"500"} maxW={"517"} bg={"#4811BF38"} ml={"10"}>
                            <Box position={"relative"} >
                                <Box ml={"-120"} position={"absolute"} top={"50px"} left={"300px"} w={"50px"} h={"50px"} borderRadius={"50%"} bg={"#8E61F173"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <i className="fas fa-users" style={{ fontSize: "14px", color: "#FFF" }}></i>
                                </Box>
                            </Box>
                            <Box mt={"140"} ml={"10"}>
                                <Text color={"#2D0A76FF"} fontFamily={"Lexend"} fontSize={"35"} fontWeight={"600"} mr={"100"}>We regret to see   <br />
                                    you leave?</Text>
                                <Text color={"#323743FF"} fontFamily={"Manrope"} fontSize={"15"} fontWeight={"400"} mr={"100"}>After canceling, we want to ensure you have all<br />the necessary information moving forward.</Text>
                            </Box>
                            <Box mt={"100"} ml={"250"}
                                w={0}
                                h={0}
                                borderBottom={"50px solid #B9E5FFFF"}
                                borderRight={"43.3px solid transparent"}
                                borderLeft={"43.3px solid transparent"}
                            />
                        </Container>


                        <List spacing={6} mr={"50"} mt={"14"}>

                            <Box gap={"2"}>
                                <Avatar bg='blue.500' icon={<CheckIcon fontSize='1.5rem' />} />

                                <ListItem spacing={4} fontFamily={"Manrope"} fontSize={"11"} fontWeight={"700"}>
                                    <Text color={"#379AE6FF"}>Submitted for Cancellation</Text>
                                </ListItem>
                            </Box>

                            <ListItem fontFamily={"Lexend"} fontSize={"16"} fontWeight={"700"}>
                                <Text color={"#323743FF"}>Please visit the Billing page for</Text>
                            </ListItem>

                            {/* You can also use custom icons from react-icons */}
                            <Box gap={"2"}>
                                <ListItem fontFamily={"Manrope"} fontSize={"16"} fontWeight={"300"}>
                                    <Text>• Download your invoices for your records.</Text>
                                </ListItem>

                                <ListItem fontFamily={"Manrope"} fontSize={"16"} fontWeight={"300"}>
                                    <Text>• Safely remove any stored credits/debit card data.</Text>
                                </ListItem>
                            </Box>

                            <Button bg={"#6D31EDFF"}>
                                <Text color={"white"} fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"}>Go to Billing</Text>
                            </Button>

                        </List>

                    </Flex>
                </GridItem>

            </Grid>
        </div>
    )
}

export default BillingCanConf