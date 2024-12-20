import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  HStack,
  StackDivider,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";
import { GrNext } from "react-icons/gr";

import ApiData from "../ApiData.jsx";
import CardCourse from "../Card.js";
import axios from "axios";
import profile1 from "../../img/profile1.jpg";
import PaymentCard from "./PaymentCard.jsx";
import { useState } from "react";
import PayPalPayment from "./Paypal.jsx";
import RazorpayPayment from "./razorpay.jsx";
import CardPayment from "./stripe.jsx";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });

    var options = {
      key: { key },
      amount: order.amount,
      currency: "INR",
      name: "Tecdemy",
      description: "Introduction to ReactJS",
      image: { profile1 },
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        name: "Naru Sreenivas Reddy",
        email: "sreenunaru672@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6f42c1",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
  };
  return (
    <Container maxW="100%" height="100%" bgColor="white">
      <Breadcrumb spacing="8px" separator={<GrNext color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            style={{
              color: "#6f42c1",
              fontSize: "48px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Checkout
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack spacing="30px" divider={<StackDivider borderColor="gray.400" />}>
        <PaymentCard />
        <Box>
          <Button
            onClick={() => setSelectedMethod("paypal")}
            colorScheme="purple"
            marginRight="10px"
          >
            PayPal
          </Button>
          <Button
            onClick={() => setSelectedMethod("upi")}
            colorScheme="purple"
            marginRight="10px"
          >
            UPI
          </Button>
          <Button
            onClick={() => setSelectedMethod("card")}
            colorScheme="purple"
          >
            Card
          </Button>
        </Box>
        {selectedMethod === "upi" && (
          <RazorpayPayment checkoutHandler={checkoutHandler} amount={4999} />
        )}
        {selectedMethod === "card" && <CardPayment />}
        {selectedMethod === "paypal" && <PayPalPayment />}
        {/* <Box>
          <Text color="#6D31EDFF" fontSize="23px" fontWeight="700">
            Order Summary
          </Text>
          <Box display="flex" gap="10px">
            <Text
              textDecoration="line-through red"
              fontSize="32px"
              fontWeight="500"
            >
              &#8377;9999
            </Text>
            <Text fontSize="35px" fontWeight="700">
              &#8377;4999
            </Text>
          </Box>
          <Button colorScheme="purple" marginBottom="10px">
            <a href="/payment">Checkout</a>
          </Button>
          <Text color="#6D31EDFF" marginBottom="10px">
            Promo/Coupon Codes
          </Text>
          <InputGroup size="sm">
            <Input placeholder="Enter Coupon" marginBottom="10px" />
            <InputRightAddon color="white" bgColor="#6D31EDFF" cursor="pointer">
              Apply
            </InputRightAddon>
          </InputGroup>
        </Box> */}
      </HStack>
      <Box marginLeft="20px">
        <Text
          fontSize="25px"
          fontWeight="500"
          marginTop="20px"
          marginBottom="20px"
          color="#6f42c1"
        >
          Learn More
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {ApiData.map((value, index) => {
            return (
              <GridItem key={index} marginBottom="30px">
                <CardCourse
                  key={index}
                  imgsrc={value.imgsrc}
                  title={value.title}
                  profile={value.profile}
                  name={value.name}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Payment;
