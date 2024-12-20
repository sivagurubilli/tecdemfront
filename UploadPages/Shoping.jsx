import React from 'react'
import giftico from './gift-icon.svg'
import { MDBIcon } from 'mdb-react-ui-kit';
import CardCourse from './CardShop'
import CardImage from '../../img/img4.jpg'
import Currency from './Currency.svg'
import {
    GridItem, Square, Box, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer, Button, Input, Text, Flex, Grid
} from "@chakra-ui/react"
import ApiData from '../ApiData';
import Card from '../Card';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { StarIcon } from "@chakra-ui/icons"

const Shoping = () => {
    const [Apply, setApply] = React.useState(false)
    const handleClick = () => setApply(!Apply)

    return (
        <Box p={4}>
            <GridItem mt="20px">
            <Text ml="30px" color="#6D31EDFF" fontSize="30px">Shopping Cart</Text>
            </GridItem>
            <Flex color='white' flexDirection={{ base: "column", md: "row" }}>
                <Box ml={{ base: "0", md: "30px" }} width={{ base: "100%", md: "70%" }}>
                    <style>
                        {`
                            .custom-card::after {
                                content: "";
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 100%;
                                width: 2px;
                                background-color: #000;
                                margin-left: 10px;
                            }
                        `}
                    </style>
                    <MDBCard className="custom-card" style={{ marginBottom: "20px" }}>
                        <MDBRow className='g-0 w-100'>
                            <MDBCol md='4'>
                                <Box>
                                    <CardCourse imgsrc={CardImage} />
                                </Box>
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between">
                                        <MDBCardTitle fontSize={{ base: "20px", md: "25px" }} color="Black">
                                            Introduction To React JS
                                        </MDBCardTitle>
                                        <Box fontSize="25px" mt={{ base: "10px", md: "0" }}>
                                            <MDBIcon fas icon="heart" style={{ color: "red", marginLeft: "20px" }} />
                                            <MDBIcon far icon="times-circle" style={{ color: "black" }} />
                                        </Box>
                                    </Flex>
                                    <MDBCardText>
                                        This course provides a beginner's introduction to the powerful and ever-more popular React. js JavaScript framework.
                                    </MDBCardText>
                                    <Box as="span" color="gray.600" fontSize="sm">
                                        4.5
                                    </Box>
                                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                        {Array(5).fill('').map((_, i) => (
                                            <StarIcon key={i} color="yellow.400" />
                                        ))}
                                    </Box>
                                    <Flex mt={2} alignItems="center">
                                        <Box as="span">
                                            <img src={giftico} alt="Gift Icon" style={{ width: "24px", height: "24px" }} />
                                        </Box>
                                        <Box as="span" color="yellow.600" fontSize="lg" ml={1}>
                                            Benefits out of this course
                                        </Box>
                                    </Flex>
                                    <Box mt="15px">
                                        <Flex flexWrap="wrap" gap={2}>
                                            <Box bg="#F5F1FEFF" borderRadius="18px" color="#6D31EDFF" p={2}>
                                                Mentors Support AnyTime <MDBIcon far icon="user" style={{ color: "blue" }} />
                                            </Box>
                                            <Box bg="#F5F1FEFF" borderRadius="18px" color="#6D31EDFF" p={2}>
                                                Interesting Gifts For Learner Achievement <MDBIcon fas icon="gift" style={{ color: "blue" }} />
                                            </Box>
                                        </Flex>
                                    </Box>
                                    <Box mt="15px">
                                        <Flex flexWrap="wrap" gap={2}>
                                            <Box bg="#F5F1FEFF" borderRadius="18px" color="#6D31EDFF" p={2}>
                                                Opportunity For Internship
                                            </Box>
                                            <Box bg="#F5F1FEFF" borderRadius="18px" color="#6D31EDFF" p={2}>
                                                Mystery Spin Wheel With Gifts <MDBIcon fas icon="dharmachakra" style={{ color: "blue" }} />
                                            </Box>
                                        </Flex>
                                    </Box>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </Box>

                {/* Right side Box */}
                <Square bg='white.500' size='300px' height="auto" mt={{ base: "20px", md: "10px" }} ml={{ base: "0", md: "10px" }}>
                    <Box textAlign="start" color="#6D31EDFF" fontSize="23px" fontWeight="700" p={4}>
                        <Text>Order Summary</Text>
                        <TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th display="flex" alignItems="center" justifyContent="flex-start">
                                            <img src={Currency} alt='' />
                                            <Text fontSize="23px" textDecoration="line-through" color="red" mx={2}>450</Text>
                                            <img src={Currency} alt='' />
                                            <Text fontSize="23px">190/Month</Text>
                                        </Th>
                                    </Tr>
                                    <Tr>
                                        <Th colSpan={2} textAlign="right">
                                            <Text color="red" fontSize="10px">After Offer</Text>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td colSpan={2} textAlign="center">
                                            <Button mt="20px" colorScheme='blue'>Checkout and Explore</Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td textAlign="center">Promo / Coupon Codes</Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td colSpan={2} textAlign="center">
                                            <Input mt="10px" htmlSize={10} width='auto' placeholder='Enter Coupon' />
                                            <Button ml={2} colorScheme='blue' onClick={handleClick}>Apply</Button>
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Square>
            </Flex>

            {/* Footer boxes */}
            <GridItem mt={8}><Text fontWeight="300" ml="29px" color="#6D31EDFF" fontSize={{ base: "24px", md: "30px" }}>Related videos</Text></GridItem>

            <Box className="container-fluid px-1 mb-2 mt-2">
                <Box className="row">
                    <Box className="col-12">
                        <Box className="row gy-5" ml={2}>
                            {ApiData.map((value, index) => (
                                <Card
                                    key={index}
                                    imgsrc={value.imgsrc}
                                    title={value.title}
                                    profile={value.profile}
                                    name={value.name}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Shoping;
