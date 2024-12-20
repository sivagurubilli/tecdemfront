import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, Flex, Text, Checkbox, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { CallAPI } from '../../middleware/api';
import endpoints from '../../middleware/endpoint';
import { getUserData } from '../../middleware/auth';
import { PurchasedListContext } from '../../Context/PurchasedListContext';
const CourseRecommendation = ({ todoData, courseData, userId, closeDrawer }) => {
  const [checkedCourses, setCheckedCourses] = useState(new Set());
  const { context, setContext } = useContext(PurchasedListContext);
  const userDetails = getUserData().userdata;

  // useEffect(() => {
  //   const fetchCheckedCourses = async () => {
  //     try {
  //       const response = await CallAPI(endpoints.getCheckedCourses, { userId: userDetails?.id });
  //       if (response?.status?.code === 200) {
  //         setCheckedCourses(new Set(response.data));
  //       } else {
  //         console.error('Failed to fetch checked courses:', response?.status?.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching checked courses:', error);
  //     }
  //   };

  //   fetchCheckedCourses();
  // }, [userDetails?.id]);

  // const handleCheckboxToggle = async (courseId) => {
  //   const isChecked = checkedCourses.has(courseId);
  //   const updatedCheckedCourses = new Set(checkedCourses);

  //   if (isChecked) {
  //     updatedCheckedCourses.delete(courseId);
  //   } else {
  //     updatedCheckedCourses.add(courseId);
  //   }

  //   setCheckedCourses(updatedCheckedCourses);

  //   try {
  //     const response = await CallAPI(endpoints.updateCheckedCourses, {
  //       userId: userDetails?.id,
  //       courseId,
  //       isChecked: !isChecked,
  //     });

  //     if (response?.status?.code !== 200) {
  //       console.error('Failed to update checked course:', response?.status?.message);
  //     }
  //   } catch (error) {
  //     console.error('Error updating checked course:', error);
  //   }
  // };

  return (
    <Box ml="5" mt="1">
      {courseData?.length > 0 && <Text fontSize="sm" fontWeight={500} textAlign={'right'} color="gray.600">
        Recommended Courses
      </Text>}
      {courseData.length > 0 ? (
        <Stack spacing="1">
          {courseData?.map((course) => {

            const isPurchased = context?.purchased?.includes(
              course.id
            );
            return (
              <Card
                key={course.uuid}
                p="1"
                borderBottom="1px"
                borderColor="gray.200"
                boxShadow="sm"
                borderRadius="md"
                background={'#e9e9e9'}

              >
                <Flex alignItems="flex-start" direction="column">
                  <NavLink onClick={() => {
                    closeDrawer()
                    handleCheckboxToggle(course.uuid)
                  }} to={
                    isPurchased
                      ? `/coursevideo/${course?.uuid}`
                      : `/course/${course?.uuid}`
                  }>


                    <Flex pl={2} alignItems="flex-start" direction="column">
                      <Text textAlign="start" fontWeight="medium" fontSize="md" color="gray.700" cursor="pointer">
                        {course.course_title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Publisher - {course.userDetails?.first_name} {course.userDetails?.last_name}
                      </Text>
                    </Flex>

                  </NavLink>
                </Flex>
              </Card>
            )
          }
          )}
        </Stack>
      ) : (
        <Text mt="2" color="gray.500">

        </Text>
      )}
    </Box>
  );
};

export default React.memo(CourseRecommendation);
