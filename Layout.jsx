import { useLocation } from "react-router-dom"

import { lazy, Suspense, useEffect } from "react";
import { getID } from "../siteConfig";
import { decrypt } from "../middleware/auth";
import messageService from "./MessageService/Index";
import LandingPage from "./LandingPage/LandingPage";
import { BOLoading } from "./elements/elements";

const WhyJoinUs = lazy(() => import("./LandingPage/WhyJoinUs"))
const TestimonialsCommunity = lazy(() => import("./LandingPage/TestimonialsCommunity"))
const Popular = lazy(() => import("./LandingPage/Popular"))
const Homepage = () => {
  const location = useLocation();
  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        const { email_verified } = userDetails;
        if (!email_verified) {
          messageService.sendMessage("dashboardLayout", { show: true, userDetails }, "popup")
        }
      }
    } catch (error) {
      console.error(error);
    }


  }, [location])

  return null
}


function Layout() {
  return (
    <div>
      <Homepage />
      <LandingPage />
      <Suspense fallback={<div><BOLoading /></div>}>
        <WhyJoinUs />
      </Suspense>
      <Suspense fallback={<div><BOLoading /></div>}>
        <Popular />
      </Suspense>
      <Suspense fallback={<div><BOLoading /></div>}>
        <TestimonialsCommunity />
      </Suspense>
    </div>
  );
}
export default Layout;