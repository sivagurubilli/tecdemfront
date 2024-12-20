import {
    Box,
    Flex, Avatar,
    Text, Button
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import cardImg from '../../img/img4.jpg'
import { getUserData } from "../../middleware/auth";

const CardShop = (props) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };


    return (

        <div className="col-md-3 col-3 " style={{ width: "300px" }}>
            <div className="card p-3">
                <img
                    src={cardImg}
                    // src={props.img}
                    className="card-img-top"
                    alt="..."
                    class="rounded"
                    style={{ height: "150px" }}
                />

                <div className="card-body ps-1 ">
                    <h5
                        className="card-title font-weight-bold"
                        style={{ color: "black",fontSize:"20px" }}
                    >
                        Introduction To React Js
                        {/* {props.title} */}
                    </h5>
                    <div class="d-flex">
                        <img src={""} style={{ marginRight: "10px" }} />
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

                        <Flex mt="2" ml="-40px">
                            <Avatar src='https://bit.ly/dan-abramov' />
                            <Box display="flex" alignItems="start">
                                <Flex flexDirection="column">
                                    <p className="user-name" style={{ marginLeft: "10px",color:"black" }}>
                                        {getUserData().userdata.first_name +
                                            " " +
                                            getUserData().userdata.last_name}
                                    </p>
                                    <span className="user-role" style={{ color: "grey", marginLeft: "10px" }}>
                                        Expert(React)
                                    </span>
                                    <Button size="sm" colorScheme="purple" marginLeft="5px" marginTop="5px">
                                    Save For Later
                                </Button>
                                </Flex>
                            </Box>
                        </Flex>

                    </div>

                    {isInputFocused && (
                        <Box height="150px" overflow="auto" marginTop="10px">
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

    );
};

export default CardShop;