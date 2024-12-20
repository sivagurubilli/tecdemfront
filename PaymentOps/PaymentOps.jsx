import React from 'react'
import { MDBRadio, MDBIcon } from 'mdb-react-ui-kit'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text, HStack, Box, IconButton, Grid, Button, Select, Radio, MenuButton, Menu, MenuItem, MenuDivider, MenuList, Checkbox, ListItem, List, useColorModeValue, VStack, Stack, FormLabel, FormControl, Input, GridItem } from '@chakra-ui/react'
import venomo from '../../Payment/venomo.png'
import P1 from '../../Payment/P.svg'
import Pay3 from '../../Payment/Pay3.svg'
import Pay4 from '../../Payment/pay4.svg'
import Pay6 from '../../Payment/pay6.png'
import Scan1 from '../../Payment/Scan.png'
import PaymentPrice from './PaymentPrice'

const PaymentOps = () => {

    const [data, setData] = React.useState('');

  const handleDataTransfer = (data) => {
    
    setData(data);
  };

    return (
        <div>
            {/* Navbar  */}
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

                <GridItem rowSpan={2} colSpan={1} borderRight="1px black solid">
                    <Box>
                        <VStack
                            bg="#D3C1FA66"
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
                    </Box>
                </GridItem>

                {/* Offer Box */}

                <GridItem colSpan={4} h={"300"}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        textAlign="center"
                        justify="center"
                        // border="1px blue solid"
                        borderRadius="10px"
                        spacing={{ base: 2, lg: 10 }}
                        py={2}
                        bg="#D3C1FA80"
                    >
                        {/* <Text color="red"><i class="fas fa-star"></i></Text> */}
                        <Text fontWeight="700" fontSize="18" color="#171A1FFF" marginTop="70px" fontFamily={"Manrope"}>
                            Promotional <br />
                            Discount - 60%
                        </Text>
                        <Box position="relative">
                            <Box
                                position="absolute"
                                top="-16px"
                                left="50%"
                                style={{ transform: 'translate(-50%)' }}>
                            </Box>
                            <Box py={4} px={12}>
                                <Text fontWeight="700" fontSize="18" fontFamily={"Manrope"} color="#DE3B40FF">
                                    Program Fees-2250 USD
                                </Text>
                                <HStack justifyContent="center">
                                    <Text fontSize="64" fontWeight="700" color="#6D31EDFF" fontFamily={"Lexend"} ml={"-10"}>
                                        $
                                    </Text>
                                    <Text fontSize="64" fontWeight="700" color="#6D31EDFF" fontFamily={"Lexend"}>
                                        {data}
                                    </Text>
                                    {/* <Text fontSize="32" fontWeight="400" color="#171A1FFF">
                                        /month
                                    </Text> */}
                                </HStack>
                            </Box>

                            <VStack
                                py={0}
                                borderBottomRadius={'xl'}>
                                <List spacing={2} textAlign="start" px={10}>

                                    <ListItem fontSize="18" fontWeight="700" fontFamily={"Manrope"}>
                                        <i class="fas fa-check" style={{ color: "red", marginLeft: "-15px" }}></i>
                                        Includes
                                    </ListItem>
                                    <ListItem fontFamily={"manrope"} fontSize={"18"} fontWeight={"400"}>
                                        Foundation-300 USD
                                    </ListItem>
                                    <ListItem fontFamily={"manrope"} fontSize={"18"} fontWeight={"400"}>
                                        Core - 300 USD
                                    </ListItem>
                                    <ListItem fontFamily={"manrope"} fontSize={"18"} fontWeight={"400"}>
                                        Project - 300 USD
                                    </ListItem>
                                </List>
                                {/* <Box color="red" ml="1000px" mt="10px"><i class="fas fa-star"></i></Box> */}
                            </VStack>
                        </Box>

                    </Stack>
                </GridItem>

                {/* 2nd Box Of Input Form */}

                <GridItem colSpan={4} h={"630"} w={"100%"} bg={"white"}>
                    <Box style={{ marginLeft: "30px", width: "full" ,marginTop:"10px"}}>

                        {/* //right box for visa ui */}

                        <Flex mt={"-5"}>
                            <MDBIcon far icon="credit-card" style={{ color: "#FF56A5FF", marginTop: "50px", marginRight: "4px" }} />
                            <Text style={{ fontSize: "32px", fontWeight: "700", marginLeft: "30px", marginTop: "34px", fontFamily: "Lexend" }}>
                                Payment Method</Text>
                        </Flex>

                        <Flex style={{ marginTop: "20px", justifyContent: "space-between" }}>

                            <div className="d-flex flex-row pb-3 mr-3" style={{ marginLeft: "0px", height: "60px" }}>

                                <div className="rounded border d-flex p-3 align-items-center">
                                    <div className="d-flex align-items-center pe-4">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <p className="mb-0 d-flex flex-row align-items-center">
                                        <img src={Pay4} alt='' style={{ width: "70px" }} />
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex flex-row pb-3 mr-3" style={{ marginLeft: "0px", height: "60px" }}>

                                <div className="rounded border d-flex p-3 align-items-center">
                                    <div className="d-flex align-items-center pe-4">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <p className="mb-0 d-flex flex-row align-items-center">
                                        <img src={venomo} alt='' style={{ width: "60px", fontSize: "60px", fontWeight: "900px" }} />
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex flex-row pb-3 mr-6" style={{ marginRight: "30px", height: "60px" }}>
                                <div className="rounded border d-flex p-3 align-items-center">
                                    <div className="d-flex align-items-center pe-2">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <p className="mb-0 d-flex flex-row align-items-center">
                                        <img src={P1} alt='' style={{ width: "80px", height: "40px" }} />
                                        <Text fontWeight="400" fontSize="24px"> Pay Later</Text>
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex flex-row pb-3 mr-6" style={{ marginRight: "30px", height: "60px" }}>
                                <div className="rounded border d-flex p-3 align-items-center">
                                    <div className="d-flex align-items-center pe-4">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <p className="mb-0 d-flex flex-row align-items-center">
                                        <Text>
                                            Debit/Credit Card
                                        </Text>
                                        <MDBIcon
                                            fab
                                            icon="cc-visa"
                                            size="lg"
                                            className="text-primary pe-2"
                                        />
                                        <img src={Pay3} alt='' style={{ width: "35px" }} />
                                    </p>
                                </div>
                            </div>

                        </Flex>

                        <FormLabel fontSize="14" fontWeight="700" fontFamily={"Manrope"}>Name On Card</FormLabel>

                        <Flex>
                            <Input width="530px" bg="#F3F4F6FF" mt="1px" htmlSize={50} placeholder='Enter Name On Card' />
                            <FormControl mt="-28px" width="530px">
                                <FormLabel fontSize="14" fontWeight="700" fontFamily={"Manrope"}>Card Number</FormLabel>
                                <Input type='Card Number' bg="#F3F4F6FF" placeholder='Enter Card Number' />
                            </FormControl>
                        </Flex>

                        <FormLabel mt="10px" fontSize="14" fontWeight="700" fontFamily={"Manrope"} Cursor="pointer">Expiration Date</FormLabel>

                        <Flex mt="1px">

                            <Input placeholder='Select Date and Time' bg="#F3F4F6FF" width="530px" size='md' mt="10px" type='datetime-local' />

                            <FormControl mt="-20px" width="530px">
                                <FormLabel fontSize="14" fontWeight="700" fontFamily={"Manrope"}>Enter CVV</FormLabel>
                                <Input width="530px" bg="#F3F4F6FF" type='Address' placeholder='Enter CVV' />
                            </FormControl>

                        </Flex>
                        <Checkbox defaultChecked mt="10px" fontSize="14" fontWeight="400" fontFamily={"Manrope"}>Use Same Address As Billing Info</Checkbox>

                        <FormControl mt="15px" width="1060px">
                            <FormLabel fontSize="14" fontWeight="700" fontFamily={"Manrope"}>Address</FormLabel>
                            <Input type='Address' bg="#F3F4F6FF" placeholder='Add Address' />
                        </FormControl>

                        <FormLabel mt="10px" fontSize="14" fontWeight="700" fontFamily={"Manrope"}>Zip/Postal Address</FormLabel>
                        <Flex>
                            <Input width="530px" htmlSize={50} bg="#F3F4F6FF" placeholder='input code' />
                            <FormControl w="530px" mt="-8">
                                <FormLabel fontSize="14" fontWeight="700" mt="3px">Country</FormLabel>
                                <Select bg="#F3F4F6FF" placeholder='Select country'>
                                    <option>United States</option>
                                    <option>SwitchzerLand</option>
                                </Select>
                            </FormControl>
                        </Flex>
                        <Checkbox mt="10px" defaultChecked fontSize="16" fontWeight="400" ml="570px">Save My Card For Future Information</Checkbox>
                    </Box>
                </GridItem>

            </Grid>

            <PaymentPrice transferData={handleDataTransfer} />
        </div>
    )
}

export default PaymentOps