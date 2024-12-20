import React from "react";
import { Container, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import AllcoursesApi from "./allcourseapi";
import Card from "../Card";
import Arrow from "../arrow";

const AllCourses = () => {
  return (
    <Container maxW="100%" bgColor="white" marginLeft="0px">
      <Grid templateColumns="repeat(4, 1fr)" gap={4} marginLeft="0px">
        {AllcoursesApi.map((value, index) => {
          return (
            <GridItem key={index} marginBottom="30px">
              <Card
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
    </Container>
  );
};

export default AllCourses;