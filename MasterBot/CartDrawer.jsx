import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  VStack,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import ApiData from "../ApiData";import img1 from "../../img/img1.jpeg";
import img2 from "../../img/img2.jpg";
// import img3 from "../img/img3.jpg";
// import img4 from "../img/img4.jpg";
// import img5 from "../img/img5.jpg";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleBuyNow = (paymentLink) => {
    window.location.href = paymentLink;
  };

  return (
    <div>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <i className="fas fa-cart-plus"></i> Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart MenuList</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {ApiData.map((course, index) => (
                <Box key={index} p={4} borderWidth="1px" rounded="md">
                  <Flex justify="center" mb={4}>
                    <Image src={course.imgsrc} alt={course.title} boxSize="150px" />
                  </Flex>
                  <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
                    {course.title}
                  </Text>
                  <Text fontSize="sm" mb={4}>
                    {course.description}
                  </Text>
                  {/* <Button
                    colorScheme="teal"
                    onClick={() => handleBuyNow(course.paymentLink)}
                  >
                    Buy Now
                  </Button> */}
                </Box>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
