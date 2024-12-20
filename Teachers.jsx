import React from 'react'
import { Box, Grid, GridItem, Badge, Input, MenuButton, Image, Avatar, Progress, Text, Flex, Button, Card, CardHeader, CardBody, Heading, CardFooter, Stack, Menu } from '@chakra-ui/react'
import Star from '../img/star.svg'
import halfStar from '../img/half-star.svg'
import MenTeach from '../img/Teacher.png'
import Teacher1 from '../img/Tea1.jpg'
import Teacher2 from '../img/Tea2.jpg'
import Teach1 from '../img/Teach.jpg'
import Avata1 from '../img/Avatar1.svg'
import { ChevronDownIcon } from '@chakra-ui/icons'

const Teachers = () => {
    return (
        <div>
            <Grid h='1100px' templateRows='repeat(2,1fr)' templateColumns='repeat(5, 1fr)' gap={1} bg="white">

                {/* First Left Hand Side Sections */}

                <GridItem w="1000px" colSpan={1} bg='white' mt="20px" h="200px">
                    <Flex>
                        <Avatar ml='30' mt="30px" size="lg" src={Teach1} />
                        <Box ml='30' mt="20px">
                            <Text fontWeight='bold'>
                                Mohit Sharma
                                <Badge ml='1' colorScheme='green'>
                                    Top
                                </Badge>
                            </Text>
                            <Text color="#9095A1FF" fontSize='sm'>Frontend Developer</Text>
                            <Text color="#9095A1FF"><i class="fas fa-location-dot"></i> India-9.30 AM</Text>
                        </Box>
                    </Flex>

                    <Flex ml="110px" mt="2px">
                        <Button h="20px" fontSize="small" color="#6D31EDFF">Teacher</Button>
                        <Button h="20px" fontSize="small" color=" #15ABFFFF">Designer</Button>
                    </Flex>
                    <Button ml="870px" mt="-180px" borderRadius="30%" h="20px" fontSize="small" color=" #15ABFFFF">Top Teacher</Button>
                    <Box>
                        <Text fontWeight="900" ml="30px">OVERVIEW</Text>
                        <Text color="#9095A1FF" ml="30px">Reading practice to help you understand texts with a wide vocabulary where you may need to consider the writer's opinion. Texts include articles, reports, messages, short stories and reviews.Reading practice to help you understand long, complex texts about a wide variety of topics, some of which may be unfamiliar.</Text>
                    </Box>
                    <Flex ml="30px" mt="20px">
                        <Box ml="0px">
                            <Text color="#9095A1FF">Rating</Text><br /><p>4.8</p>
                        </Box>
                        <Box ml="20px">
                            <Text color="#9095A1FF">Reviews</Text><br /><p>1000+</p>
                        </Box>
                        <Box ml="20px">
                            <Text color="#9095A1FF">Courses</Text><br /><p>12</p>
                        </Box>
                        <Box ml="20px">
                            <Text color="#9095A1FF">Students</Text><br /><p>1000+</p>
                        </Box>
                    </Flex>
                </GridItem>

                {/* second card right hand side  */}

                <GridItem w="500px" rowSpan={2} colSpan={1} bg='white'>
                    <Card w="350px" h="460px" ml="25px" mt="20px">
                        <CardBody>
                            <Button w="310px" bg=" #6D31EDFF" color="white">Follow</Button>
                            <Button w="310px" bg="white" color="#6D31EDFF" mt="10px" border="2px blue solid">Message</Button>
                            <Flex>
                                <Box mt="10px" ml="5px">
                                    <Text style={{ fontSize: '24px' }}>4.8/5</Text>

                                    <Text mt="5px">(1000+reviews)</Text>
                                    <Flex mt="20px">
                                        <img src={Star} alt='' />
                                        <img src={Star} alt='' />
                                        <img src={Star} alt='' />
                                        <img src={Star} alt='' />
                                        <img src={halfStar} alt='' />
                                    </Flex>
                                </Box>
                                <Box ml="15px" mt="10px">
                                    <Flex> <Progress w="100px" borderRadius="5px" value={80} /><Text mt="-7px" ml="5px">5</Text></Flex>
                                    <Flex><Progress mt="5px" w="100px" borderRadius="5px" value={60} /><Text mt="-2px" ml="5px">4</Text></Flex>
                                    <Flex><Progress mt="5px" w="100px" borderRadius="5px" value={50} /><Text mt="-1px" ml="5px">3</Text></Flex>
                                    <Flex><Progress mt="5px" w="100px" borderRadius="5px" value={40} /><Text mt="-2px" ml="5px">2</Text></Flex>
                                    <Flex><Progress mt="5px" w="100px" borderRadius="5px" value={20} /><Text mt="-2px" ml="5px">1</Text></Flex>
                                </Box>
                            </Flex>
                            <Box mt="10px">
                                <Text fontSize="18px" fontWeight="700">Response Time</Text>
                                <Text fontSize="14px" fontWeight="400" color="#171A1FFF" mt="5px">Very Responsive to messages</Text>
                                <Text fontSize="18px" fontWeight="700" mt="5px">Certificates</Text>
                                <Text fontSize="14px" fontWeight="400" color="#171A1FFF">Google UX Design Professional</Text>
                                <Text fontSize="18px" fontWeight="700" mt="5px">Profile Link</Text>
                                <Input placeholder='https//:www.design.com' />
                                <Text fontSize="12px" color="#6D31EDFF" fontWeight="700" cursor="pointer">Copy Link</Text>
                            </Box>
                        </CardBody>
                    </Card>

                    {/* second card in right hand side  */}
                    <Card w="350px" h="600px" ml="25px" mt="10px">
                        <CardBody>
                            <Button borderRadius="40px" color="white" w="80px" h="30px" bg="#15ABFFFF" ml="180px">30% Off</Button>
                            <img src={MenTeach} alt='' />
                            <Box >
                                <Text fontSize="20px" fontWeight="600" ml="80px" mt="10">Connect More</Text>
                                <Text fontSize="20px" fontWeight="600" mt="10px">Teacher/Mentor/Trainer & Gurus</Text>
                                <Text fontSize="14px" fontWeight="400" mt="10px">Learn And Associate with Leaders To Grow</Text>
                                <Button bg="#6D31EDFF" borderRadius="6px" color="white" ml="100px" mt="10px">Chat Now</Button>
                            </Box>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Last Box */}

                <GridItem w="1000px" colSpan={4} bg='white'>
                    <Flex mt="28px">
                        <Text ml="30px" fontSize="24px" fontWeight="700">Courses</Text>
                        <Box ml="600px">
                            <Menu >
                                <MenuButton as={Button} bg="white" border="2px #9095A1FF solid" fontSize="12px" fontWeight="400" color="#9095A1FF" rightIcon={<ChevronDownIcon />}>
                                    Sort by:Newest
                                </MenuButton>
                            </Menu>
                        </Box>
                    </Flex>
                    <Box>
                        <Flex>
                            <Text fontSize="20px" fontWeight="700" ml="30" mt="20px">UI Design, A User-Centered Approach</Text>
                            <Text fontSize="20px" fontWeight="700" ml="435" mt="5">$49</Text>
                        </Flex>
                    </Box>

                    <Flex ml="30px" mt="10px">
                        <Text fontSize="12px" fontWeight="400">May 2021</Text>
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={halfStar} alt='' />
                    </Flex>
                    <Box ml="30">
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                w="331px"
                                h="192px"
                                src={Teacher1}
                                alt='Caffe Latte'
                            />
                            <CardBody>
                                <Button fontSize="11px" fontWeight="400" borderRadius="40px" color="white" w="94px" h="24px" bg="#15ABFFFF" mt="-45px" ml="-10px">Free Document</Button>
                                <Text color="#171A1FFF" fontSize="14px" fontWeight="400">Reading practice to help you understand texts with a wide vocabulary where you may need to consider the writer's opinion. Texts include articles, reports, messages, short stories and reviews.Reading practice to help you understand long, complex texts about a wide variety of topics, some of which may be unfamiliar.</Text>
                                <Text mt="10px" color="#565D6DFF" fontSize="12px" fontWeight="400">14 Hours/12 Lessons</Text>
                                <Box ml="331">
                                    <Button color="#6D31EDFF" fontSize="14px" fontWeight="400" bg="white" border="1px  #6D31EDFF solid">Add To Cart</Button>
                                    <Button color="white" fontSize="14px" fontWeight="400" bg="#6D31EDFF" ml="10px">Buy Now</Button>
                                </Box>
                            </CardBody>
                        </Card>
                    </Box>
                    <Box>
                        <Flex>
                            <Text fontSize="20px" fontWeight="700" ml="30" mt="20px">How To Set Up A Design System</Text>
                            <Text fontSize="20px" fontWeight="700" ml="480" mt="5">$79</Text>
                        </Flex>
                    </Box>

                    <Flex ml="30px" mt="10px">
                        <Text fontSize="12px" fontWeight="400">May 2021</Text>
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={Star} alt='' />
                        <img src={halfStar} alt='' />
                    </Flex>
                    <Box ml="30">
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                w="331px"
                                h="192px"
                                src={Teacher2}
                                alt='Caffe Latte'
                            />
                            <CardBody>
                                <Text color="#171A1FFF" fontSize="14px" fontWeight="400">Reading practice to help you understand texts with a wide vocabulary where you may need to consider the writer's opinion. Texts include articles, reports, messages, short stories and reviews.Reading practice to help you understand long, complex texts about a wide variety of topics, some of which may be unfamiliar.</Text>
                                <Text mt="10px" color="#565D6DFF" fontSize="12px" fontWeight="400">14 Hours/12 Lessons</Text>
                                <Box ml="331">
                                    <Button color="#6D31EDFF" fontSize="14px" fontWeight="400" bg="white" border="1px  #6D31EDFF solid">Add To Cart</Button>
                                    <Button color="white" fontSize="14px" fontWeight="400" bg="#6D31EDFF" ml="10px">Buy Now</Button>
                                </Box>
                                <Button color="#6D31EDFF" fontSize="14px" fontWeight="400" bg="white" border="1px  #6D31EDFF solid">Show All Courses</Button>
                            </CardBody>
                        </Card>
                    </Box>
                </GridItem>
            </Grid>
        </div>
    )
}

export default Teachers