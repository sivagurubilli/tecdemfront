import React from "react";
import { Container, Box, Grid, GridItem, Text } from "@chakra-ui/react";

import Card from "../Card";
import Arrow from "../arrow";
import Inprogressapi from "./inprogressapi";
import Styles from "./MyCourse.module.css"
import { IMAGE_4 } from "../ApiData";
import NoDataFound from "../NoDataFound/NoDataFound";
import MyCourseCard from "../MyCourseCard/MyCourseCard";

const InProgress = (props) => {
  const { courseList } = props;
  return (
    <Container maxW="100%"  marginLeft="0px">
      <Grid className={Styles?.courseContainer} display={"flex"} >
        {courseList?.length > 0 ? courseList.map((value, index) => {
          const { userDetails } = value;
          const videosTotalProgress = [];
          const videoCurrentProgress = [];
          //getting video length & progress length
          if (!!value.sections) {
            const { sections } = value;
            sections.map((secItems) => {
              if (secItems?.courseSubSections) {
                secItems?.courseSubSections.map((subSecItems) => {
                  videosTotalProgress.push(subSecItems?.video_length);
                  videoCurrentProgress.push(subSecItems?.progressData?.video_progress || "0")
                })
              }
            })
          }
          //calculating video progress
          let videoProgress = videoCurrentProgress.map(Number);
          let videoProgressSum = videoProgress.reduce((acc, num) => acc + num, 0);

          //calculating total video progress 
          let totalVideoProgress = videosTotalProgress.map(Number);
          let totalVideoProgressSum = totalVideoProgress.reduce((acc, num) => acc + num, 0);


          return (
            <GridItem key={index} marginBottom="10px">
              <MyCourseCard
                isMyCourse={true}
                courseObject={value}
                key={index}
                imgsrc={IMAGE_4}
                title={value.course_title}
                profile={value.profile_url}
                thumbnail={value?.thumbnail}
                name={`${userDetails?.first_name || ""} ${userDetails?.last_name || ""
                  }`}
                course={value}
                videoProgress={videoProgressSum}
                totalVideoLength={totalVideoProgressSum}
              />
            </GridItem>
          );
        }) : <NoDataFound title="No course started yet!" />}
      </Grid>
    </Container>
  );
};

export default InProgress;
