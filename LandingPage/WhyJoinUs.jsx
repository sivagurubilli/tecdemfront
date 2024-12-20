import React, { useEffect, useRef } from "react";
import "./WhyJoinUs.css";
import { COMPHRENSIVE_COURSE_ICON, EXPERT_INSTRUCTOR,FLEXIBLE_LEARNING_ICON,QUALITY_CONTENT_ICON,ONE_TO_ONE_SESSION_ICON, AI_POWERED_LEARNING_ICON } from "../Config";



const WhyJoinUs = () => {


  const featureContainerRef = useRef(null);

  useEffect(() => {
    const container = featureContainerRef.current;
    // console.log(container)

    const handleScroll = () => {
      const items = container.children;
      let closestItem = null;
      let minDistance = Infinity;

      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      }

      Array.from(items).forEach((item) => item.classList.remove("highlighted"));
      if (closestItem) closestItem.classList.add("highlighted");
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div id="WhyJoinUs" className="why-join-us">
      <h2 className="whyjoinusHeading">
        Why <span className="highlight">Join Us?</span>
      </h2>
      <div className="featuress" ref={featureContainerRef}>
        <div className="feature-item">
          <div className="vector-bg1">     
            {EXPERT_INSTRUCTOR}
          </div>
          <h1 className="why-join-us-headings">Expert Instructors</h1>
          <p className="why-join-us-para">Learn from industry leaders<br/> with real-world experience.</p>
        </div>
        <div className="feature-item">
        <div className="vector-bg1">
          {COMPHRENSIVE_COURSE_ICON}
          </div>
          <h1 className="why-join-us-headings">Comprehensive Courses</h1>
          <p className="why-join-us-para">
            Our courses cover everything from basics to advanced topics,
            ensuring a deep understanding.
          </p>
        </div>
        <div className="feature-item">
        <div className="vector-bg1">
          {FLEXIBLE_LEARNING_ICON}
          </div>

          <h1 className="why-join-us-headings">Flexible Learning</h1>
          <p className="why-join-us-para">Access courses anytime, <br/>anywhere, on any device.</p>
        </div>
        <div className="feature-item">
        <div className="vector-bg1"> 
          {QUALITY_CONTENT_ICON}
         </div>
          <h1 className="why-join-us-headings">Affordable Quality Content</h1>
          <p className="why-join-us-para">Top-notch courses at prices<br/> that won’t break the bank.</p>
        </div>
        <div className="feature-item">
        <div className="vector-bg1">
          {ONE_TO_ONE_SESSION_ICON}
          </div>
          <h1 className="why-join-us-headings">One-to-One Sessions</h1>
          <p className="why-join-us-para">Get personalized guidance with<br/> direct access to mentors.</p>
        </div>
        <div className="feature-item">
        <div className="vector-bg1">
          {AI_POWERED_LEARNING_ICON}
          </div>
          <h1 className="why-join-us-headings">AI-Powered Learning</h1>
          <p className="why-join-us-para">Utilize AI tools to enhance your learning experience.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinUs;
