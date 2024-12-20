import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import CardCourse from "./CardShopPay";
import CardImage from "../../img/CardImage.jpeg";
import Pay1 from "../../img/paypal.svg";
import Pay3 from "../../img/Upi.jpeg";
import Pay4 from "../../img/visa.svg";
import Pay6 from "../../img/Visacard.jpeg";
import Scan1 from "../../img/QRcode.png";

// import Currency from "../components/UploadPages/Currency.svg";

import {
  Text,
  Checkbox,
  GridItem,
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  Select,
  Container,
  Tabs,
  TabList,
  Tab,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  TabPanels,
  TabPanel,
  InputRightAddon,
} from "@chakra-ui/react";
import ApiData from "../ApiData";
import Card from "../Card";
import { MDBCard, MDBRadio, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { Flex } from "antd";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Payment = () => {
  const [state, setState] = React.useState("");
  const [Apply, setApply] = React.useState(false);
  const handleClick = () => setApply(!Apply);

  const handleChange = (value) => {
    setState(value);
    console.log(value); // Log the updated value, not the state
  };

  return (
    <Container maxW="100%" maxH="100%" bgColor="white">
      <GridItem mt="20px">
        <h3
          style={{
            fontWeight: "700px",
            marginLeft: "29px",
            color: " #6D31EDFF",
            fontSize: "30px",
          }}
        >
          Checkout And Explore
        </h3>
      </GridItem>
      <Flex bg="white">
        <Box style={{ marginLeft: "30px", width: "900px" }}>
          {/* //right box for visa ui */}

          <Flex style={{ marginTop: "40px" }}>
            <MDBIcon
              far
              icon="credit-card"
              style={{ color: "pink", marginTop: "10px" }}
            />
            <Text
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginLeft: "25px",
              }}
            >
              Payment Method
            </Text>
          </Flex>

          <Flex style={{ marginTop: "30px", justifyContent: "space-between" }}>
            <div className="d-flex flex-row pb-3 align-items-center justify-content-space-between">
              <div className="rounded border d-flex p-2 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <MDBRadio
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    label="Paypal"
                    onChange={() => handleChange("Paypal")}
                  />

                  <img
                    src={Pay1}
                    alt=""
                    style={{
                      width: "80px",
                      height: "50px",
                      marginLeft: "20px",
                    }}
                  />
                </p>
              </div>
            </div>

            <div
              className="d-flex flex-row pb-3 mr-3"
              style={{ marginLeft: "30px" }}
            >
              <div className="rounded border d-flex p-3 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <MDBRadio
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    label="Visa"
                    onChange={() => handleChange("Visa")}
                  />
                  <MDBIcon
                    fab
                    icon="cc-visa"
                    size="lg"
                    className="text-primary pe-2"
                    style={{ marginLeft: "20px" }}
                  />

                  <img
                    src={Pay4}
                    alt=""
                    style={{ width: "100px", height: "40px" }}
                  />
                  {/* <img
                    src={Pay6}
                    alt=""
                    style={{ width: "90px", height: "20px" }}
                  /> */}
                </p>
              </div>
            </div>

            <div
              className="d-flex flex-row pb-3 mr-3"
              style={{ marginRight: "30px" }}
            >
              <div className="rounded border d-flex p-3 align-items-center">
                <p className="mb-0 d-flex flex-row align-items-center">
                  <MDBRadio
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    label="UPI"
                    onChange={() => handleChange("UPI")}
                  />
                  <img
                    src={Pay3}
                    alt=""
                    style={{
                      width: "100px",
                      height: "40px",
                      marginLeft: "20px",
                    }}
                  />
                  {/* <img
                    src={Scan1}
                    alt=""
                    style={{ width: "90px", height: "20px" }}
                  /> */}
                </p>
              </div>
            </div>
          </Flex>
          {state == "Visa" && (
            <Box>
              <FormLabel fontSize="14" fontWeight="700">
                Name On Card
              </FormLabel>

              <Flex>
                <Input
                  mt="1px"
                  htmlSize={50}
                  width="auto"
                  placeholder="Enter Name On Card"
                />
                <FormControl mt="-28px" width="430px">
                  <FormLabel fontSize="14" fontWeight="700">
                    Card Number
                  </FormLabel>
                  <Input type="Card Number" placeholder="Enter Card Number" />
                </FormControl>
              </Flex>

              <FormLabel mt="10px" fontSize="14" fontWeight="700">
                Expiration Date
              </FormLabel>

              <Flex mt="1px">
                <Input
                  placeholder="Select Date and Time"
                  width="435px"
                  size="md"
                  mt="10px"
                  type="datetime-local"
                />

                <FormControl mt="-20px" width="430px">
                  <FormLabel fontSize="14" fontWeight="700">
                    Enter CVV
                  </FormLabel>
                  <Input type="Address" placeholder="Enter CVV" />
                </FormControl>
              </Flex>
              <Checkbox defaultChecked mt="10px" fontSize="14" fontWeight="300">
                Use Same Address As Billing Info
              </Checkbox>

              <FormControl mt="15px" width="870px">
                <FormLabel fontSize="14" fontWeight="700">
                  Address
                </FormLabel>
                <Input type="Address" placeholder="Add Address" />
              </FormControl>

              <FormLabel mt="10px" fontSize="14" fontWeight="700">
                Zip/Postal Address
              </FormLabel>
              <Flex>
                <Input htmlSize={50} width="auto" placeholder="input code" />
                <FormControl w="435px" mt="-8">
                  <FormLabel fontSize="14" fontWeight="700" mt="3px">
                    Country
                  </FormLabel>
                  <Select placeholder="Select country">
                    <option>United States</option>
                    <option>SwitchzerLand</option>
                  </Select>
                </FormControl>
              </Flex>
              <Checkbox
                mt="10px"
                defaultChecked
                fontSize="16"
                fontWeight="400"
                ml="570px"
              >
                Save My Card For Future Information
              </Checkbox>
            </Box>
          )}

          {state == "Paypal" && (
            <Container
              maxW="100%"
              bg="white.600"
              color="white"
              marginLeft="50px"
            >
              <Box display="flex" gap="30px">
                <Box>
                  <img
                    src={Scan1}
                    alt=""
                    style={{
                      width: "250px",
                      height: "250px",
                      marginRight: "20px",
                      marginLeft: "0px",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: "600",
                      color: "black",
                      marginLeft: "50px",
                    }}
                  >
                    Pay With QR Code
                  </span>
                </Box>
                <Box textAlign="center" marginTop="20px">
                  <span style={{ color: "grey" }}>
                    Use Your Phone Camera To Scan this Code To Pay Instantly
                  </span>

                  <p
                    className="text-center  mx-3 mb-0"
                    style={{ color: "black" }}
                  >
                    or Sign in
                  </p>

                  <p style={{ color: "black" }}>with</p>
                  <Tabs isFitted variant="enclosed">
                    <TabList
                      mb="1em"
                      style={{ width: "400px", color: "black" }}
                    >
                      <Tab>Phone Number</Tab>
                      <Tab>Link With Email</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Box>
                          <InputGroup>
                            <Menu>
                              {/* <MenuButton
                                w="86px"
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                              >
                                +1
                              </MenuButton>
                              <MenuList color="black">
                                <MenuItem>+91</MenuItem>
                                <MenuItem>+652</MenuItem>
                                <MenuItem>+142</MenuItem>
                              </MenuList> */}
                              <Select
                                placeholder="+1"
                                w="140px"
                                bg="lightblue"
                                color="black"
                                fontWeight="bold"
                              >
                                <option value="+1">+1</option>
                                <option value="+91">+91</option>
                                <option value="+93">+93</option>
                                <option value="+55">+55</option>
                                <option value="+86">+86</option>
                                <option value="+43">+43</option>
                              </Select>
                            </Menu>
                            <Input
                              color="black"
                              type="tel"
                              placeholder="phone number"
                            />
                          </InputGroup>
                        </Box>
                        {/* <a href="https://www.paypal.com/ncp/payment/8MGK98JM54VUW"> */}
                        <Button
                          mt="10px"
                          ml="97px"
                          colorScheme="blue"
                          variant="solid"
                          width="295px"
                        >
                          SignIn
                        </Button>
                        {/* </a> */}
                      </TabPanel>
                      <TabPanel>
                        <InputGroup>
                          <Input
                            color="black"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </InputGroup>
                        <Button
                          mt="10px"
                          colorScheme="blue"
                          variant="solid"
                          width="300px"
                        >
                          SignIn using Email
                        </Button>
                      </TabPanel>
                    </TabPanels>
                    <Tab />
                  </Tabs>
                </Box>
              </Box>
            </Container>
          )}
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
                  <span
                    style={{
                      fontSize: "23px",
                      textDecoration: "line-through",
                      color: "red",
                      marginRight: "15px",
                      display: "flex",
                    }}
                  >
                    <Text fontSize="23px" color="black">
                      &#x24;
                    </Text>
                    2000
                  </span>
                  <Text fontSize="23px" color="black" marginRight="2px">
                    &#x24;
                  </Text>
                  <span
                    style={{
                      fontSize: "23px",
                      color: "black",
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                  >
                    900
                  </span>
                </Flex>
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "80px",
                  }}
                >
                  After Discount
                </span>
                <Text color="#6D31EDFF" marginBottom="10px">
                  Promo/Coupon Codes
                </Text>
                <InputGroup size="sm">
                  <Input placeholder="Enter Coupon" marginBottom="10px" />
                  <InputRightAddon
                    color="white"
                    bgColor="#6D31EDFF"
                    cursor="pointer"
                  >
                    Apply
                  </InputRightAddon>
                </InputGroup>
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
                  {/* <a href="https://www.paypal.com/ncp/payment/8MGK98JM54VUW"> */}
                  <Button
                    mt="10px"
                    colorScheme="blue"
                    variant="solid"
                    width="300px"
                  >
                    Confirm And Pay
                  </Button>
                  {/* </a> */}
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
          style={{ marginLeft: "30px", color: " #6D31EDFF", fontSize: "30px" }}
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
    </Container>
  );
};
export default Payment;
