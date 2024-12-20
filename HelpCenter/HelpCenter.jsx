import { Box, Button, ChakraProvider, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";
import { Image } from '@chakra-ui/react'
import Styles from "./HelpCenter.module.css"
import { HELP_CENTER_IMAGE, helpCenterHeading } from '../Config';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
    const navigate = useNavigate()
    return (
        <>
            <Container
                bgColor={"#f0f9fb"}
                paddingLeft={30}
                // margin={0}
                // width={"100%"}
                maxWidth="100%"
            >
                <Flex>
                    <Box flex="1" p="5">
                        <Container className='leftContainer'
                            maxWidth="100%"
                            marginTop={145}

                        >
                            <Heading
                                as='h1'
                                size='3xl'
                                // noOfLines={1}
                                textAlign={"left"}
                                fontSize={60}

                            >
                                {helpCenterHeading}
                            </Heading>
                            <InputGroup marginTop={10}>
                                <InputLeftElement
                                    children={<Icon as={SearchIcon} color="#14acff" />}
                                />
                                <Input type="text" placeholder="Search..." width={"80%"} />
                            </InputGroup>
                        </Container>
                    </Box>
                    <Box
                        flex="1"
                        p="0"
                        position={"relative"}
                        height={570}
                        overflow={"hidden"}
                    >
                        <Container
                            className='rightContainer'
                            alignItems={"center"}
                            maxWidth="100%"

                        >
                            <Image
                                src={HELP_CENTER_IMAGE}
                                alt='Dan Abramov'
                                // mixBlendMode={"darken"}
                                className={Styles?.bannerImage}
                            />
                            <Box className={Styles?.roundCircle} />
                            <Button className={Styles?.supportButton} color={"#ffffff"} bgColor={"#6c31ec"}> <MDBIcon fas icon="headphones" /> Chat Support </Button>

                        </Container>
                    </Box>
                </Flex>
            </Container>


            {/* body container */}
            <Container
                maxWidth="100%"
                className='bg-grey'

            >
                <Flex padding={"40px 200px"}>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget}>
                        <MDBIcon fas icon="cog" className={Styles?.gridIcon} />
                        <Heading
                            as='h5'
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            margin={0}
                            marginTop={5}
                            fontSize={22}
                        >
                            {"Settings"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Edit and manage your settings</Text>
                    </Box>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget} onClick={() => {
                        navigate("/accountandprofile")
                    }}>
                        <MDBIcon fas icon="user-alt" className={Styles?.gridIcon} />
                        <Heading
                            as='h3'
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            margin={0}
                            marginTop={5}
                            fontSize={22}

                        >
                            {"Account and profile"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Modify and manage your account</Text>
                    </Box>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget}>
                        <MDBIcon fas icon="graduation-cap" className={Styles?.gridIcon} />
                        <Heading
                            as='h3'
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            margin={0}
                            marginTop={5}
                            fontSize={22}
                        >
                            {"Learning Support"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Get back to us for any learning support</Text>
                    </Box>

                </Flex>

                <Flex padding={"40px 200px"}>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget}>
                        <MDBIcon fas icon="lock" className={Styles?.gridIcon} />
                        <Heading
                            as='h3'
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            margin={0}
                            marginTop={5}
                            fontSize={22}
                        >
                            {"Security"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Trust and safety - Manage Privacy</Text>
                    </Box>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget}>
                        <MDBIcon fas icon="credit-card" className={Styles?.gridIcon} />
                        <Heading
                            as='h3'
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            margin={0}
                            marginTop={5}
                            fontSize={22}
                        >
                            {"Purchase and Refunds"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Learn more about transfers</Text>
                    </Box>
                    <Box flex="1" p="4" cursor={"pointer"} className={Styles?.featureWidget}>
                        <MDBIcon fas icon="info-circle" className={Styles?.gridIcon} />
                        <Heading
                            as='h3'
                            margin={0}
                            marginTop={5}
                            // size='3xl'
                            noOfLines={1}
                            // textAlign={"left"}
                            // fontSize={70}
                            fontSize={22}

                        >
                            {"Others"}
                        </Heading>
                        <Text fontSize='small' margin={0}>Write to us for others</Text>
                    </Box>
                </Flex>
            </Container>


            {/* footer section */}
            <Container
                maxWidth="100%"
                className=''

            >
                <Flex padding={"40px 200px"} className={Styles?.footerHiring}>
                    <Box flex="1" p="4" bgColor={"#5113d8"} borderRadius={"10px"} color={"#ffffff"}>
                        <Heading
                            as='h1'
                            // margin={0}
                            // marginTop={10}
                            // size='3xl'
                            noOfLines={1}
                        // textAlign={"left"}
                        // fontSize={70}

                        >
                            {"Job search/Hiring"}
                        </Heading>
                        <Button
                        onClick={() => navigate("/jobandplacement")}
                            bgColor='#1facf9'
                            borderRadius={'50px'}
                            fontWeight={100}
                            fontSize={15}
                            color={"#ffffff"}
                            marginTop={5}
                        >Explore our jobs and placements</Button>
                    </Box>
                </Flex>
            </Container>
        </>
    );
}

export default HelpCenter;
