import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text, Box, Flex, Avatar, Button } from "@chakra-ui/react";
import StarRating from "./ratingFunctionality";
import { Grid, GridItem } from "@chakra-ui/react";
import Avat1 from '../../img/Avatar1.svg'
import Avat3 from '../../img/Avatar3.svg'
import Avat5 from '../../img/Avatar5.svg'
import Avat7 from '../../img/Avatar7.svg'
const UserRatings = () => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem w="100%">
          <Card maxW="sm">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Joe Thomas" src={Avat1} />

                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb="1">
                      Prasana Kumar
                    </Text>
                    <Text fontSize="xl">
                      <StarRating totalStars={5} />
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text colorScheme="gray">3d ago</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                I recently hired a business coach and was highly impressed with
                their support and expertise.
              </Text>
            </CardBody>
            <CardFooter
              justify="end"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button colorScheme="purple">Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem w="100%">
          <Card maxW="sm">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Joe Thomas" src={Avat3} />

                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb="1">
                      Mohit Sharma
                    </Text>
                    <Text fontSize="xl">
                      <StarRating totalStars={5} />
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text colorScheme="gray">3d ago</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                I recently hired a business coach and was highly impressed with
                their support and expertise.
              </Text>
            </CardBody>
            <CardFooter
              justify="end"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button colorScheme="purple">Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem w="100%">
          <Card maxW="sm">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Joe Thomas" src={Avat5} />

                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb="1">
                      Sreenivas Naru
                    </Text>
                    <Text fontSize="xl">
                      <StarRating totalStars={5} />
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text colorScheme="gray">3d ago</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                I recently hired a business coach and was highly impressed with
                their support and expertise.
              </Text>
            </CardBody>
            <CardFooter
              justify="end"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button colorScheme="purple">Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem w="100%">
          <Card maxW="sm">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Joe Thomas" src={Avat7} />

                  <Box>
                    <Text fontSize="xl" fontWeight="bold" mb="1">
                      Rishab Gupta
                    </Text>
                    <Text fontSize="xl">
                      <StarRating totalStars={5} />
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text colorScheme="gray">3d ago</Text>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                I recently hired a business coach and was highly impressed with
                their support and expertise.
              </Text>
            </CardBody>
            <CardFooter
              justify="end"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button colorScheme="purple">Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}

export default UserRatings;
