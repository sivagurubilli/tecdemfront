import { Box, Skeleton, } from "@chakra-ui/react";
import Homepagefooter from "../Shared/Homepagefooter.jsx";
import styles from "./dashboard.module.css"
import { DashProfile } from "./DashboardWidgets/Widgets.jsx";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

//Lazy Loading Imports

const EnrolledCourse = lazy(() => import('./DashboardWidgets/EnrolledCourse.jsx'))
const WishListCourses = lazy(() => import('./DashboardWidgets/WishListCourses.jsx'))
const BannerSlider = lazy(() => import("./DashboardWidgets/Widgets.jsx").then(module => ({ default: module.BannerSlider })));
const ProgressWidget = lazy(() => import("./DashboardWidgets/Widgets.jsx").then(module => ({ default: module.ProgressWidget })));

const LazyComponent = ({ component }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible && (
        <Suspense fallback={<div><Skeleton height="200px" startColor="gray.200" endColor="gray.300" borderRadius="md" />
        </div>}>
          {component()}
        </Suspense>
      )}
    </div>
  );
};


const Dashboardcontent = () => {


  return (
    <div className={`${styles.dashboardContentWrapper} content-wrapper DashboardMainContainer`}>
      {/* <!-- Content --> */}
      <DashProfile />
      <div className={`${styles?.dashboardItemsWrapper} paddingLeftRight-3 row`}>
      <LazyComponent component={() => <ProgressWidget />} />
        {/* <UserProgressChart /> */}
      </div>
      <Box className={styles?.bannerWrapperDashboard}>
        {/* <DashboardBanner /> */}
        <LazyComponent component={() => <BannerSlider />} />
      </Box>
      <Box width={"100%"}>
        <LazyComponent component={() => <EnrolledCourse />} />

      </Box>
      <Box width={"100%"}>
        <LazyComponent component={() => <WishListCourses />} />

      </Box>
      <div className="my-2">
        <Homepagefooter />
      </div>
    </div>
  );
};
function Dashboard() {
  return (
    <div>
      <Dashboardcontent />
    </div>
  );
}
export default Dashboard;
