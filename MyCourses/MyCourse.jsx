import React, { useEffect, useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AllCourses from "./AllCourses";
import InProgress from "./InProgress";
import Completed from "./completed";
import UploadedByMe from "./UploadedByMe";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { getID } from "../../siteConfig";
import { toast } from "react-toastify";
import { ShimmerPostList } from "react-shimmer-effects";
import { getUserData } from "../../middleware/auth";
import { classifyCourses } from "../../util_helper";

const MyCourse = () => {
  const [loading, setLoading] = useState(true)
  const userId = getID("userId") || "";
  const [courseList, setCourseList] = useState([]);
  const [allCourseList, setAllCourseList] = useState([]);
  const [completedCourse, setCompletedCourse] = useState([]);
  const [inProgressCourse, setInProgressCourse] = useState([]);
  const { roles = "" } = getUserData()?.userdata;

  const fetchUserProgressCourses = () => {
    try {
      CallAPI(endpoints?.getUserProgress, {
        user_id: userId
      }).then((res) => {
        setLoading(false)
        if (res?.status?.code === 200) {
          const { data } = res;
          setCourseList(data?.data);
        }
        toast.error(res?.status?.message)
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      fetchUserProgressCourses();
    } catch (error) {
      console.error(error);
    }
  }, [])



  useEffect(() => {
    try {
      if (courseList.length > 0) {
        const { completedCourses, inProgressCourses, allCourses } = classifyCourses(courseList);
        setAllCourseList(allCourses)
        setCompletedCourse(completedCourses)
        setInProgressCourse(inProgressCourses)
      }
    } catch (error) {
      console.error(error);
    }
  }, [courseList])



  return (
    <div>
      <Container maxW="100%" className="bg-grey">
        <Tabs borderBottom={"none"}>
          <TabList borderBottom={"none"}>
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              // borderColor="white"
              // borderTop="3px solid transparent"
              fontWeight="600"
            >
              All Courses
            </Tab>
            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              // borderColor="white"
              // borderTop="3px solid transparent"
              fontWeight="600"
            >
              In Progress
            </Tab>

            <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              // borderColor="white"
              // borderTop="3px solid transparent"
              fontWeight="600"
            >
              Completed
            </Tab>
            {roles === "mentor" && <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              // borderColor="white"
              // borderTop="3px solid transparent"
              fontWeight="600"
            >
              My Uploads
            </Tab>}

            {roles === "admin" && <Tab
              _selected={{
                borderBottom: "4px solid #6534e4",
                color: "#6534e4",
                fontWeight: "700",
                borderRadius: "0px",
              }}
              _focus={{ boxShadow: "md" }}
              // borderColor="white"
              // borderTop="3px solid transparent"
              fontWeight="600"
            >
              My Uploads
            </Tab>}
          </TabList>
          <TabPanels >
            <TabPanel>
              {loading ?
                <div
                  style={{ alignItems: "center", width: "100%" }}
                  className="shimmerLoadingCourse"
                >
                  <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={4}
                    row={1}
                    gap={30}
                  />
                </div>
                : <AllCourses courseList={allCourseList} />}
            </TabPanel>
            <TabPanel>
              {loading ?
                <div
                  style={{ alignItems: "center", width: "100%" }}
                  className="shimmerLoadingCourse"
                >
                  <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={4}
                    row={1}
                    gap={30}
                  />
                </div>
                : <InProgress courseList={inProgressCourse} />}
            </TabPanel>
            <TabPanel>
              {loading ?
                <div
                  style={{ alignItems: "center", width: "100%" }}
                  className="shimmerLoadingCourse"
                >
                  <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={4}
                    row={1}
                    gap={30}
                  />
                </div>
                : <Completed courseList={completedCourse} />}
            </TabPanel>
            <TabPanel>
              {loading ?
                <div
                  style={{ alignItems: "center", width: "100%" }}
                  className="shimmerLoadingCourse"
                >
                  <ShimmerPostList
                    postStyle="STYLE_FOUR"
                    col={4}
                    row={1}
                    gap={30}
                  />
                </div>
                :
                <>
                  {roles === "mentor" && <UploadedByMe />}
                  {roles === "admin" && <UploadedByMe />}
                </>
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
};

export default MyCourse;
