import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import CardCourse from "../components/UploadPages/CardShopPay";
import CardImage from "../img/img4.jpg";
import Pay1 from "./Pay1.svg";
import Pay2 from "./Pay2.svg";
import Pay3 from "./Pay3.svg";
import Pay4 from "./pay4.svg";
import scanner from "./scanner.jpg";
import scan from "./Scan.png";
import Pay6 from "./pay6.png";
import Currency from "../components/UploadPages/Currency.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Checkbox,
  GridItem,
  Box,
  TabList,
  VStack,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Menu,
  InputGroup,
  Container,
  Tabs,
  Tab,
  chakra,
} from "@chakra-ui/react";
import ApiData from "../ApiData";
import Card from "../Card";
import { MDBCard, MDBRadio, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Flex } from "antd";

const PayScan = () => {
  const [Apply, setApply] = React.useState(false);
  const handleClick = () => setApply(!Apply);

  return (
    <div>
      <GridItem mt="20px">
        <h3
          style={{
            fontWeight: "3]600px",
            marginLeft: "29px",
            color: "#6D31EDFF",
          }}
        >
          Checkout And Explore
        </h3>
      </GridItem>
      <Flex color="white">
        <Box style={{ marginLeft: "30px", width: "900px" }}>
          {/* //right box for visa ui */}

          <Flex>
            <MDBIcon
              far
              icon="credit-card"
              style={{ color: "pink", marginTop: "40px", marginRight: "4px" }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginLeft: "30px",
                marginTop: "34px",
              }}
            >
              Payment Method
            </span>
          </Flex>
          <Flex style={{ marginTop: "20px", justifyContent: "space-between" }}>
            <div
              className="d-flex flex-row pb-3 mr-3"
              style={{ marginLeft: "0px", height: "60px" }}
            >
              <div className="d-flex align-items-center pe-4">
                <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
              </div>
              <div className="rounded border d-flex p-3 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <MDBIcon
                    fab
                    icon="cc-visa"
                    size="lg"
                    className="text-primary pe-2"
                  />
                  <img src={Pay3} alt="" style={{ width: "35px" }} />
                  <img src={Pay1} alt="" style={{ width: "35px" }} />
                </p>
              </div>
            </div>

            <div
              className="d-flex flex-row pb-3 mr-3"
              style={{ marginLeft: "30px", height: "60px" }}
            >
              <div className="d-flex align-items-center pe-4">
                <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
              </div>
              <div className="rounded border d-flex p-3 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <img src={Pay4} alt="" style={{ width: "70px" }} />
                </p>
              </div>
            </div>

            <div
              className="d-flex flex-row pb-3 mr-6"
              style={{ marginRight: "30px", height: "60px" }}
            >
              <div className="d-flex align-items-center pe-4">
                <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
              </div>
              <div className="rounded border d-flex p-3 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <img src={scan} alt="" style={{ width: "35px" }} />
                  <img
                    src={Pay6}
                    alt=""
                    style={{ width: "100px", height: "40px" }}
                  />
                </p>
              </div>
            </div>
          </Flex>

          <Container maxW="md" bg="white.600" color="white">
            <VStack>
              <img src={scanner} alt="" style={{ width: "200px" }} />
              <span
                className="text-center fw-bold mx-3 mb-0"
                style={{
                  fontWeight: "600",
                  color: "black",
                  marginLeft: "50px",
                }}
              >
                Pay With QR Code
              </span>
              <span style={{ color: "grey", marginLeft: "1px" }}>
                Use Your Phone Camera To Scan this Code To Pay Instantly
              </span>
              <div
                className="divider d-flex align-items-center my-2"
                style={{ borderColor: "black" }}
              >
                <p
                  className="text-center  mx-3 mb-0"
                  style={{ color: "black", marginLeft: "10px" }}
                >
                  or Sign in
                </p>
              </div>
              <p style={{ color: "black" }}>with</p>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em" style={{ width: "400px", color: "black" }}>
                  <Tab>Phone Number</Tab>
                  <Tab>Link With Email</Tab>
                </TabList>
                <Tab />
              </Tabs>
              <Box>
                <InputGroup>
                  <Menu>
                    <MenuButton
                      w="86px"
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      +92
                    </MenuButton>
                    <MenuList color="black">
                      <MenuItem>+91</MenuItem>
                      <MenuItem>+652</MenuItem>
                      <MenuItem>+142</MenuItem>
                    </MenuList>
                  </Menu>
                  <Input color="black" type="tel" placeholder="phone number" />
                </InputGroup>
              </Box>
              <Button
                mt="10px"
                colorScheme="blue"
                variant="solid"
                width="300px"
              >
                Pay With Link
              </Button>
            </VStack>
          </Container>
        </Box>

        {/* //Right side Box */}

        <div
          style={{
            borderRight: "1px solid black",
            marginRight: "20px",
            height: "100%",
          }}
        ></div>
        <Container
          maxW="md"
          bg="white.600"
          color="white"
          borderLeft="1px solid #BDC1CAFF"
        >
          {/* <MDBCard className="custom-card"> */}
          <MDBRow className="g-0 w-6">
            <MDBCol md="9">
              <Box>
                <Text
                  display="flex"
                  textAlign="center"
                  color="#6D31EDFF"
                  fontSize="20px"
                  fontWeight="700"
                >
                  Order Summary
                </Text>
                <CardCourse imgsrc={CardImage} />
                <Flex style={{ marginTop: "20px" }}>
                  <img src={Currency} alt="" />
                  <span
                    style={{
                      fontSize: "23px",
                      textDecoration: "line-through",
                      color: "red",
                    }}
                  >
                    450
                  </span>
                  <img src={Currency} alt="" />
                  <span
                    style={{
                      fontSize: "23px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    190/Month
                  </span>
                </Flex>
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "27px",
                    marginTop: "5px",
                  }}
                >
                  After Offer
                </span>
                <Box>
                  <Flex>
                    <span style={{ color: "grey", fontSize: "10px" }}>
                      By Selecting The Button Below.I Agree To The{" "}
                      <span style={{ textDecoration: "underline" }}>
                        Property Rules.Terms And Conditions
                      </span>
                      .Privacy Policy.
                    </span>
                  </Flex>
                  <Checkbox mt="10px" color="black" defaultChecked>
                    Agree And Continue
                  </Checkbox>
                  <Button
                    mt="10px"
                    colorScheme="blue"
                    variant="solid"
                    width="300px"
                  >
                    Confirm And Pay
                  </Button>
                </Box>
              </Box>
            </MDBCol>
          </MDBRow>
          {/* </MDBCard> */}
        </Container>
      </Flex>

      {/* //footer boxes */}
      <GridItem>
        <h1
          style={{ marginLeft: "30px", color: " #6D31EDFF", fontSize: "25px" }}
        >
          Learn More
        </h1>
      </GridItem>

      <div
        className="container-fluid px-1 mb-2 mt-2"
        style={{ marginLeft: "0px", marginRight: "-15px" }}
      >
        <div className="row">
          <div className="col-15">
            <div className="row gy-5" style={{ marginLeft: "8px" }}>
              {ApiData.map((value, index) => {
                return (
                  <Card
                    key={index}
                    imgsrc={value.imgsrc}
                    title={value.title}
                    profile={value.profile}
                    name={value.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PayScan;
