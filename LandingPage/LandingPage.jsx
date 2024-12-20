import React, { useEffect } from "react";
import { getUserData } from "../../middleware/auth";

import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import LandingPageBanner from '../../img/Home_Laptop_Image.webp'

import { BI_VISUALIZATION_ICON, CLOUD_COMPUTING_ICON, CYBER_SECURITY_ICON, DATA_SCIENCE_ICON, DEVOPS_ICON, PROGAMMING_ICON } from "../Config";
import { Heading } from "@chakra-ui/react";


const LandingPage = () => {

  let userData = null;
  const navigate = useNavigate();
  useEffect(() => {
    userData = getUserData()?.usertoken;
  }, []);


  const handleGetStarted = () => {
    navigate(userData ? "/dashboard" : "/login");
  };
  return (
    <div className="homepage">
      <header className="hero-section" id="home">

        <div className="text-content">
          <button className="learn-grow-btn ">
            <span><img src="https://i.ibb.co/8cpchqp/Star-15.png" alt="Star-15" border="0" /></span>Learn & Grow</button>
          <div>

          </div>

          <div className="taglineContainer">


            <h1 className="mainTagLine text-start">

              World’s 1st  <span className="highlight">Pain Free</span></h1>
              <img src="https://i.ibb.co/sJX0NL8/Vector-13.png" alt="Vector-13" className="tagline_image" /><br />
            <h1 className="tagline">Learning & Growth Management Platform</h1>
          </div>
          <div className="cta-buttons">
            <button className="get-started-btn"
              onClick={() => handleGetStarted()} >Get Started
              <img
                src="https://i.ibb.co/yn8D59R/Vector.png"
                alt="Vector"
                className="vector-icon"
              />
            </button>
            <button className="view-courses-btn" ><a href="#popular-courses">View Courses</a></button>
          </div>

        </div>
        <div className="image-content">

          <button className="learn-grow-btn-mobile ">
            <span><img src="https://i.ibb.co/8cpchqp/Star-15.png" alt="Star-15" border="0" /></span>Learn & Grow</button>

          <img src={LandingPageBanner} alt="Group-1321314042" className="laptop-image" border="0" loading="lazy" />
          {/* <img src="https://i.ibb.co/NK5N6cw/Group-1321314042.png" alt="Group-1321314042" className="laptop-image" border="0"/> */}
        </div>
      </header>

      <div className="stats-section">
  <div className="stat-item">
    <h1 className="stat-item-heading">40k+</h1>
    <p className="stat-item-para">Users</p>
  </div>
  <span className="divider">|</span>

  <div className="stat-item">
    <h1 className="stat-item-heading">100k+</h1>
    <p className="stat-item-para">Courses</p>
  </div>
  <span className="divider">|</span>

  <div className="stat-item">
    <h1 className="stat-item-heading">700k+</h1>
    <p className="stat-item-para">Mentors</p>
  </div>
  <span className="divider">|</span>

  <div className="stat-item">
    <h1 className="stat-item-heading">200k+</h1>
    <p className="stat-item-para">Trendy Subjects</p>
  </div>
  <span className="divider">|</span>

  <div className="stat-item">
    <h1 className="stat-item-heading">30k</h1>
    <p className="stat-item-para">Success Stories</p>
  </div>
</div>


      <div className="categories-section">
        <Heading className="categories-heading">Discover Top Categories</Heading>
        <div className="categories">
          <div className="category-item">

            <img
              src={CLOUD_COMPUTING_ICON}
              alt="Cloud Computing"
              className="vector-bg"
            />
            <p style={{ color: "#000000" }} className="category-item-text">Cloud Computing</p>
          </div>
          <div className="category-item">
            <div className="vector-bg">
              <img
                src={DEVOPS_ICON}
                alt="DevOps"
                className="vector-bg-image2"
              />
            </div>
            {/* <img src="https://i.ibb.co/Y728TW5/Ellipse-147.png"/> */}
            <p style={{ color: "#000000" }}>DevOps</p>
          </div>
          <div className="category-item">
            <div className="vector-bg">
            
              {PROGAMMING_ICON}
            </div>
           
            <p style={{ color: "#000000" }}>Programming & <br />Frameworks</p>
          </div>
          <div className="category-item">
            <div className="vector-bg">
              {BI_VISUALIZATION_ICON}
            </div>
            <p style={{ color: "#000000" }}>BI & <br />Visualization</p>
          </div>
          <div className="category-item">
            <div className="vector-bg">
              {DATA_SCIENCE_ICON}
            </div>
            <p style={{ color: "#000000" }}>Data Science</p>
          </div>
          <div className="category-item">
            <div className="vector-bg">
              {CYBER_SECURITY_ICON}
            </div>
            <p style={{ color: "#000000" }}>Cyber<br /> Security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
