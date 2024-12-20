import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { SlLike } from "react-icons/sl";

const CourseCard = (props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  return (
    <>
      <div
        className="col-md-3 col-3 "
        style={
          isInputFocused
            ? { width: "800px", height: "100%" }
            : { width: "300px", height: "300px" }
        }
      >
        <div className="card p-3">
          <img
            src={props.imgsrc}
            className="card-img-top"
            alt="..."
            class="rounded"
            style={isInputFocused ? { height: "300px" } : { height: "150px" }}
          />

          <div className="card-body ps-1 ">
            <h5
              className="card-title font-weight-bold"
              style={{ color: "black" }}
            >
              {props.title}
            </h5>
            <div class="d-flex">
              <img src={props.profile} style={{ marginRight: "10px" }} />
              <p
                class="text-start"
                style={{
                  fontSize: "10px",
                  marginRight: "30px",
                  color: "black",
                  fontWeight: "400",
                }}
              >
                {props.name}
              </p>
              <NavLink
                to="/course-video"
                className="btn btn-outline-primary"
                style={{
                  fontSize: "10px",
                  width: "100px",
                  backgroundColor: "#6d31ed",
                  color: "white",
                }}
              >
                Buy
              </NavLink>
            </div>
            <InputGroup>
              <Box fontSize="20px" marginTop="25px" marginRight="10px">
                <GrAttachment />
              </Box>

              <Input
                marginTop="15px"
                placeholder="Drop a comment"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              ></Input>
              <InputRightAddon marginTop="15px" backgroundColor="white">
                <FiSend />
              </InputRightAddon>
            </InputGroup>
            {isInputFocused && (
              <Box height="300px" overflow="auto" marginTop="10px">
                <Box display="flex" marginTop="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "15px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="15px">
                        17h
                      </Text>
                      <Text color="#6d31ed" marginLeft="10px" fontSize="15px">
                        1 like
                      </Text>
                      <Text fontSize="15px" marginLeft="10px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">Really good!!</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
                <Box display="flex" marginTop="10px" marginLeft="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "12px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="10px">
                        48m
                      </Text>
                      <Text color="#6d31ed" marginLeft="6px" fontSize="10px">
                        5 like
                      </Text>
                      <Text fontSize="10px" marginLeft="6px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">That's nice👌</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
                <Box display="flex" marginTop="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "12px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="10px">
                        17h
                      </Text>
                      <Text color="#6d31ed" marginLeft="10px" fontSize="10px">
                        1 like
                      </Text>
                      <Text fontSize="10px" marginLeft="10px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">Really good!!</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
                <Box display="flex" marginTop="10px" marginLeft="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "12px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="10px">
                        48m
                      </Text>
                      <Text color="#6d31ed" marginLeft="6px" fontSize="10px">
                        5 like
                      </Text>
                      <Text fontSize="10px" marginLeft="6px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">That's nice👌</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
                <Box display="flex" marginTop="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "12px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="10px">
                        17h
                      </Text>
                      <Text color="#6d31ed" marginLeft="10px" fontSize="10px">
                        1 like
                      </Text>
                      <Text fontSize="10px" marginLeft="10px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">Really good!!</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
                <Box display="flex" marginTop="10px" marginLeft="10px">
                  <img src={props.profile} style={{ marginRight: "10px" }} />
                  <p
                    class="text-start"
                    style={{
                      fontSize: "12px",
                      marginRight: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {props.name}
                    <Box display="flex">
                      <Text fontWeight="400" fontSize="10px">
                        48m
                      </Text>
                      <Text color="#6d31ed" marginLeft="6px" fontSize="10px">
                        5 like
                      </Text>
                      <Text fontSize="10px" marginLeft="6px">
                        Reply
                      </Text>
                    </Box>
                  </p>
                  <Text color="black">That's nice👌</Text>
                  <Text
                    height="25px"
                    fontSize="10px"
                    marginLeft="5px"
                    display="flex"
                    alignItems="center"
                  >
                    <SlLike />
                  </Text>
                </Box>
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
