import React from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text, HStack, Box, IconButton, Grid, Button, Container, CloseButton, MenuButton, Menu, MenuItem, MenuDivider, MenuList, Checkbox, ListItem, List, useColorModeValue, VStack, Stack, FormLabel, FormControl, Input, GridItem, Heading } from '@chakra-ui/react'
import Right from './Right.svg'

const BillingCancel = () => {
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

                <GridItem rowSpan={2} colSpan={1} borderRight="1px black solid" bg="#D3C1FA66">
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
                <GridItem colSpan={4} h={"600"} w={"100%"} bg={"white"}>

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
                                <Text color={"#2D0A76FF"} fontFamily={"Lexend"} fontSize={"35"} fontWeight={"600"} mr={"100"}>Are you certain <br />
                                    you want to cancel?</Text>
                                <Text color={"#323743FF"} fontFamily={"Manrope"} fontSize={"15"} fontWeight={"400"} mr={"100"}>Keep in mind that you'll also lose access to specific <br />features, courses, account benefits, and plans.</Text>
                            </Box>
                            <Box mt={"105"} ml={"200"}
                                w={0}
                                h={0}
                                borderBottom={"50px solid #B9E5FFFF"}
                                borderRight={"43.3px solid transparent"}
                                borderLeft={"43.3px solid transparent"}
                            />
                        </Container>


                        <List spacing={6} mr={"50"} mt={"14"}>
                            <ListItem fontFamily={"Manrope"} fontSize={"20"} fontWeight={"700"}>
                                You'll be parting ways with
                            </ListItem>

                            <ListItem spacing={4} fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"}>
                                <Flex>
                                <i class="fas fa-square-phone"></i>
                                <Text mt={"-1"} ml={"2"}>Courses and guidance</Text>
                                </Flex>
                            </ListItem>
                            <ListItem fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"}>
                                <Flex>
                                <i class="fas fa-users"></i>
                                <Text mt={"-1"} ml={"2"}>Mentor support</Text>
                                </Flex>
                            </ListItem>
                            <ListItem fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"}>
                                
                                <Flex>
                                    <i class="fas fa-headset"></i>
                                <Text mt={"-1"} ml={"2"}>Priority Support</Text>
                                </Flex>
                            </ListItem>
                            {/* You can also use custom icons from react-icons */}
                            <ListItem fontFamily={"Manrope"} fontSize={"16"} fontWeight={"400"}>
                                <Flex>
                                <i class="far fa-copy"></i>
                                <Text mt={"-1"} ml={"2"}>Learningss</Text>
                                </Flex>
                            </ListItem>
                            <Button bg={"#6D31EDFF"}>
                                <Text color={"white"}>Keep my current plan</Text>
                            </Button>
                            <ListItem fontFamily={"Manrope"} fontSize={"14"} fontWeight={"400"}>
                               <Text> Continue to cancel</Text>
                            </ListItem>
                        </List>

                        <VStack
                            // bg="#D3C1FA66"
                            py={4}
                            borderBottomRadius={'xl'}>
                            <List spacing={8} textAlign="start" px={12}>
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
                        
                    </Flex>
                </GridItem>

            </Grid>
        </div>
    )
}

export default BillingCancel