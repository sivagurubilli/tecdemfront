import { Box, Button, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";

import img2 from "../../img/img2.jpg";
import profile1 from "../../img/profile1.jpg";
import { FaHeart } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import StarRating from "../Mentors/ratingFunctionality";
import { BsGift } from "react-icons/bs";
import { BsPersonHeart } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import { GiShipWheel } from "react-icons/gi";
import { BsBuildingsFill } from "react-icons/bs";

const PaymentCard = ({ amount, checkouthandler }) => {
  return (
    <Box maxH="100%" maxW="20%">
      <Card maxH="100%" boxShadow="md">
        <CardBody display="flex">
          <Box>
            <img
              src={img2}
              className="card-img-top mb-2"
              alt="..."
              class="rounded"
              style={{ height: "130px", width: "350px" }}
            />
            <h5
              className="card-title font-weight-bold mb-2"
              style={{ color: "black" }}
            >
              Introduction to React JS
            </h5>
            <div class="d-flex mb-2">
              <img src={profile1} style={{ marginRight: "10px" }} />
              <p
                class="text-start"
                style={{
                  fontSize: "10px",
                  marginRight: "30px",
                  color: "black",
                  fontWeight: "400",
                }}
              >
                Olivia Wilson
              </p>
            </div>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap="10px">
                <Text
                  textDecoration="line-through red"
                  fontSize="20px"
                  fontWeight="500"
                >
                  &#8377;9999
                </Text>
                <Text fontSize="20px" fontWeight="700">
                  &#8377;4999
                </Text>
              </Box>
              {/* <Button
                colorScheme="purple"
                onClick={() => checkouthandler(amount)}
              >
                Buy Now
              </Button> */}
            </Box>
          </Box>
          {/* <Box width="100%" marginLeft="20px">
            <Box display="flex" justifyContent="space-between" width="100%">
              <h5
                className="card-title font-weight-bold mb-2"
                style={{ color: "black" }}
              >
                Introduction to React JS
              </h5>
              <Box display="flex" gap="15px" fontSize="25px">
                <FaHeart color="red" />
                <IoCloseCircleOutline fontSize="30px" />
              </Box>
            </Box>
            <Text>
              This course provides a beginner's introduction to the powerful and
              ever-more popular React. js JavaScript framework.
            </Text>
            <Box display="flex" gap="10px">
              <Text>4.0</Text>
              <StarRating totalStars={5} />
            </Box>
            <Box display="flex" gap="10px" marginTop="10px">
              <BsGift color="#C8005DFF" fontSize="40px" />
              <Text color="#E81779FF" fontSize="24px">
                Benefits out of this course
              </Text>
            </Box>
            <Box marginTop="20px">
              <Box display="flex" marginBottom="10px">
                <Box display="flex" gap="10px" alignItems="center">
                  <Text
                    color="#6d31ed"
                    bgColor="#f5f1fe"
                    padding="5px"
                    borderRadius="20px"
                    fontSize="14px"
                    paddingLeft="8px"
                    paddingRight="8px"
                  >
                    Mentors Support Anytime
                  </Text>
                  <BsPersonHeart color="#6d31ed" />
                </Box>
                <Box
                  display="flex"
                  gap="10px"
                  alignItems="center"
                  marginLeft="10px"
                >
                  <Text
                    color="#6d31ed"
                    bgColor="#f5f1fe"
                    padding="5px"
                    borderRadius="20px"
                    fontSize="14px"
                    paddingLeft="8px"
                    paddingRight="8px"
                  >
                    Interestic gifts for the learners Achievement
                  </Text>
                  <AiOutlineGift color="#6d31ed" />
                </Box>
              </Box>
              <Box display="flex">
                <Box display="flex" alignItems="center" gap="10px">
                  <Text
                    color="#6d31ed"
                    bgColor="#f5f1fe"
                    padding="5px"
                    paddingLeft="10px"
                    paddingRight="10px"
                    borderRadius="20px"
                    fontSize="14px"
                  >
                    Opportunity for Internships
                  </Text>
                  <BsBuildingsFill color="#6d31ed" />
                </Box>
                <Box
                  display="flex"
                  gap="10px"
                  alignItems="center"
                  marginLeft="10px"
                >
                  <Text
                    color="#6d31ed"
                    bgColor="#f5f1fe"
                    padding="5px"
                    borderRadius="20px"
                    fontSize="14px"
                    paddingLeft="10px"
                    paddingRight="10px"
                  >
                    Mystery spin wheel with gifts
                  </Text>
                  <GiShipWheel color="#6d31ed" />
                </Box>
              </Box>
            </Box>
          </Box> */}
        </CardBody>
      </Card>
    </Box>
  );
};

export default PaymentCard;
