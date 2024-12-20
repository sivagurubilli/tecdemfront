import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const MentorCard = ({ image, title, personimg, personname }) => {
  return (
    <Container>
      <a href="/Mentor">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          cursor="pointer"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={image}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="10px">5 MIN READ</Text>
                <Text fontWeight="700">{title}</Text>
              </Box>

              <Box py="2" display="flex" gap={2}>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  borderRadius="20px"
                  size="xs"
                >
                  # tags
                </Button>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  borderRadius="20px"
                  size="xs"
                >
                  # category
                </Button>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  borderRadius="20px"
                  size="xs"
                >
                  # article
                </Button>
              </Box>
            </CardBody>

            <CardFooter
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="350px"
            >
              <Box display="flex" gap={1} alignItems="center">
                <Image src={personimg} height="50px" width="50px" />
                <Text fontWeight="500">{personname}</Text>
              </Box>
              <Text fontSize="10px">April 11</Text>
            </CardFooter>
          </Stack>
        </Card>
      </a>
    </Container>
  );
};

export default MentorCard;
