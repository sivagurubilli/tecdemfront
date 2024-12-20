import React from 'react'
import { GridItem, Grid, Container, Flex } from '@chakra-ui/react'
import {
    ButtonGroup,
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    VStack,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    Button
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import PaymentOps from './PaymentOps'
// import data from '../../bucketlist/data'


const PaymentPrice = ({ transferData  }) => {

    console.log(typeof transferData); 

    const handleClick  = (data) => {
        transferData (data);
    };

    return (
        <div>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={1}
                bg='white'
            >
                {/* SideBar */}
                {/* <GridItem rowSpan={2} colSpan={1} bg='white'>
                    <Box>
                        <VStack
                            bg=" #D3C1FA66"
                            py={4}
                            borderBottomRadius={'xl'}>
                            <List spacing={8} textAlign="start" px={12}>
                                <ListItem display="flex" justifyContent="space-between" cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Pricing
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Process Payment
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Test Transfer
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Order and Credits
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Subscribers
                                    <Button bg={"red"}  fontSize={"10"} h={"5"} borderRadius={"100%"}  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"white" }}>9</Button>
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Bookings
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Time Bookings
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Cancelled Bookings
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                                <ListItem display="flex" justifyContent="space-between"  cursor={"pointer"} _hover={{ transform: 'scale(1.2)',color:"blue" }}>
                                    Refunds
                                    <Text>
                                        <i class="fas fa-angle-right"></i>
                                    </Text>
                                </ListItem>
                            </List>
                            <Box w="80%" pt={7}>
                                        <Button w="full" colorScheme="red" variant="outline">
                                            Start trial
                                        </Button>
                                    </Box>
                        </VStack>
                    </Box>
                </GridItem> */}

                {/* Main Div */}

                <GridItem colSpan={4} h={"300"} bg='white'>
                    <Box py={6}>
                        <VStack spacing={2}>
                            <Heading as="h1" mt={-3} fontSize="2xl" ml="-900px" color='red' fontFamily={"Lexend"}>
                                Program Name
                            </Heading>
                            <Heading as="h1" mt="5" fontSize="2xl" ml="-880px" fontFamily={"Lexend"}>
                                Choose Your Plan
                            </Heading>

                            <Flex alignItems="center" gap="10px">
                                <Text fontWeight="700" fontSize="18" display={'flex'} fontFamily={"Lexend"}>
                                    Program Fees -
                                </Text>
                                <Text mt="-12px" color="#DE3B40FF" fontSize={35} fontWeight={700} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>$</Text>
                                <Text  color="#DE3B40FF" fontSize={35} fontWeight={500} textDecoration="line-through" fontFamily={"Lexend"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}> 2250</Text>
                                <Text mt="5px" color="#171A1FFF" fontSize={12} fontWeight={500} ml={2} fontFamily={"Manrope"}>One Time</Text>
                            </Flex>

                            {/* <Container ml="100px">
                                <Flex gap="1">
                                    <Text><i class="fas fa-magnifying-glass"></i></Text>
                                    <Text fontSize="sm" color={'gray.500'} fontFamily="Lexend" fontStyle="italic">
                                        Survey Conducted By: Thomas Group
                                    </Text>
                                </Flex>

                                <Flex gap="1">
                                    <Text> <i class="fas fa-trophy"></i></Text>
                                    <Text fontSize="sm" color={'gray.500'} fontStyle="italic" fontFamily={"Lexend"}>
                                        Purpose : Rank The Top Ten Innovative PlatForm
                                    </Text>
                                </Flex>

                                <Flex gap="1">
                                    <Text><i class="fas fa-receipt"></i></Text>
                                    <Text fontSize="sm" color={'gray.500'} fontStyle="italic" fontFamily={"Lexend"}>
                                        Minimum Participants 35:
                                    </Text>
                                </Flex>
                            </Container> */}

                            <Box ml="700px" mt="-80px">
                                <ButtonGroup size='sm' isAttached variant='outline'>
                                    <Button borderRadius={"30"} border="1px #6D31EDFF solid"  bg="#F5F1FEFF"  _hover={{ bg: "#6D31EDFF",color:"white"}}  fontSize="14" fontWeight={"400"} fontFamily="Manrope">Monthly</Button>
                                    <Button borderRadius={"30"} border="1px #6D31EDFF solid"  bg="#F5F1FEFF" _hover={{ bg: "#6D31EDFF",color:"white"}}  fontSize="14" fontWeight={"400"} fontFamily="Manrope">Annually</Button>
                                </ButtonGroup>
                            </Box>

                        </VStack>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            textAlign="center"
                            justify="center"
                            spacing={{ base: 4, lg: 10 }}
                            py={10}>

                            <Box>
                                <Box py={6} px={12} cursor={"pointer"} bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}}>
                                    <Text fontWeight="500" fontSize="16" fontFamily={"Manrope"}>
                                        OPTION # 1
                                    </Text>
                                    <Text fontWeight="700" fontSize="20" fontFamily={"Manrope"}>
                                        Pay Professor
                                    </Text>
                                    <Text fontWeight="400" fontSize="14" fontFamily={"Manrope"}>Pay directly to the professor with 60% discount</Text>
                                </Box>
                                <HStack justifyContent="center">
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        $
                                    </Text>
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        900
                                    </Text>
                                    <Text fontSize="14" fontWeight="400" color="gray.500" fontFamily={"Manrope"}>
                                        One Time
                                    </Text>
                                </HStack>

                                <VStack
                                    bg={useColorModeValue('gray.50', 'gray.700')}
                                    py={2}
                                    borderBottomRadius={'xl'}>
                                    <List spacing={2} textAlign="start" px={12}>
                                        <Box w="100%" pt={0}>
                                            <Button onClick={() => {handleClick ("900");  window.location.href = '/PaymentOps'}}  w="full" border="1px #6D31EDFF solid"  bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}} fontFamily={"Manrope"} fontWeight={"400"} fontSize={"18"}>
                                                Get Started
                                            </Button>
                                        </Box>
                                        <Text fontSize={16} fontWeight={700} fontFamily={"Manrope"} color="#171A1FFF" cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>Fees Details</Text>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Final Fee Payable: 900 USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Promotional Discount - 60%
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            No Coupon Code applicable
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Pay Directly to Prof. Prasanna Kumar
                                        </ListItem>
                                    </List>
                                </VStack>
                            </Box>

                            <Box>
                                <Box py={6} px={12} cursor={"pointer"} bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}}>
                                    <Text fontWeight="500" fontSize="16"  fontFamily={"Manrope"}>
                                        OPTION # 2
                                    </Text>
                                    <Flex justifyContent="space-around">
                                        <Text fontWeight="700" fontSize="20" fontFamily={"Manrope"}>
                                            Pay Tecdemy
                                        </Text>
                                        <Button mt={"2"} fontSize="12" fontWeight="400"  fontFamily={"Manrope"} bg="pink" h="4">Reccomended</Button>
                                    </Flex>
                                    <Text fontWeight="400" fontSize="14" fontFamily={"Manrope"}  >Pay  with 20 USD discount with Coupon Code</Text>
                                </Box>
                                <HStack justifyContent="center">
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        $
                                    </Text>
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        880
                                    </Text>
                                    <Text fontSize="14" fontWeight="400" fontFamily={"Manrope"} color="gray.500">
                                        One Time
                                    </Text>
                                </HStack>

                                <VStack
                                    bg="white"
                                    py={2}
                                    borderBottomRadius={'xl'}>
                                    <List spacing={2} textAlign="start" px={12} >
                                        <Box w="100%" pt={0}>
                                            <Button w="full"  onClick={() => {handleClick ("880");  window.location.href = '/PaymentOps'}}  border="1px #6D31EDFF solid"  bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}} fontSize={"18"} fontWeight={"400"} fontFamily={"Manrope"}>
                                                Get Started
                                            </Button>
                                        </Box>
                                        <Text fontSize={16} fontWeight={700} fontFamily={"Manrope"} color="#171A1FFF" cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>Fees Details</Text>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Final Fee Payable: 880 USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Promotional Discount - 20 USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Coupon code DISCO20
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Pay through Tecdemy
                                        </ListItem>
                                    </List>
                                </VStack>
                            </Box>
                            <Box>
                                <Box py={6} px={12} cursor={"pointer"} bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}}>
                                    <Text fontWeight="500" fontSize="16" fontFamily={"Manrope"}>
                                        OPTION # 3
                                    </Text>
                                    <Text fontWeight="700" fontSize="20" fontFamily={"Manrope"} align={"start"}>
                                        Pay via Business Optima
                                    </Text>
                                    <Text fontWeight="400" fontSize="14" fontFamily={"Manrope"} >Pay with 10 USD with Coupon code</Text>
                                </Box>
                                <HStack justifyContent="center">
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        $
                                    </Text>
                                    <Text fontSize="48" fontWeight="700" fontFamily={"Manrope"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                        890
                                    </Text>
                                    <Text fontSize="14" fontWeight="400" color="gray.500" fontFamily={"Manrope"}>
                                        One Time
                                    </Text>
                                </HStack>

                                <VStack
                                    bg={useColorModeValue('gray.50', 'gray.700')}
                                    py={2}
                                    borderBottomRadius={'xl'}>
                                    <List spacing={2} textAlign="start" px={12}>
                                        <Box w="100%" pt={0}>
                                            <Button w="full"  onClick={() => {handleClick("890");  window.location.href = '/PaymentOps'}}  border="1px #6D31EDFF solid"  bg="#F5F1FEFF" borderRadius="8px" _hover={{ bg: "#6D31EDFF",color:"white"}}>
                                                Get Started
                                            </Button>
                                        </Box>
                                        <Text fontSize={16} fontWeight={700} fontFamily={"Lexend"} color="#171A1FFF" cursor={"pointer"}  _hover={{ transform: 'scale(1.2)' }}>Fees Details</Text>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Final Fee Payable: 890 USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500"  />
                                            Promotional Discount - 10 USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Coupon code BUSINESS10USD
                                        </ListItem>
                                        <ListItem fontSize={12} fontWeight={700} fontFamily={"Manrope"} color={"#171A1FFF"} cursor={"pointer"} _hover={{ transform: 'scale(1.2)' }}>
                                            <ListIcon as={FaCheckCircle} color="green.500" />
                                            Pay through Business Optima LLC
                                        </ListItem>
                                    </List>
                                </VStack>
                            </Box>
                        </Stack>
                    </Box>
                </GridItem>
            </Grid>
           
        </div>
    )
}

export default PaymentPrice