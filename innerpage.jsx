
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import "./newstyle.css"
import { Navigation } from 'swiper/modules';
import { getUserData } from "../middleware/auth"
import Arrow from './arrow';
const Innerpage = () => {
  const checkuser = async () => {
    let user = getUserData()
    if (user && user.usertoken && user.userdata && user.userdata.roles && user.userdata.roles == "Student") {
      window.location.replace("/cart")
    } else {
      window.location.replace("/login")
    }
  }
  return (
    <div>
      <section className="section course_detail_page">
        <div className="container">
          <nav className="breadcrumb-nav">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">All Courses</a></li>
              <li className="breadcrumb-item"><a href="#">Cloud Computing</a></li>
              <li className="breadcrumb-item active" aria-current="page">Microsoft Power BI Certification Training Course</li>
            </ol>
          </nav>
          <div className="course_main">
            <h2><img src="assets/images/master-program.svg" /> Microsoft Power BI Certification Training Course</h2>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 camc-img">
                <figure>
                  <img src="assets/images/cloud-architect-masters-course.jpg" />
                  <a href="" className="circle"><div><svg xmlns="http://www.w3.org/2000/svg" width="21.103" height="23.425" viewBox="0 0 21.103 23.425"><path id="Path_54" data-name="Path 54" d="M210.5,20.256h.64a5.083,5.083,0,0,1,1.514.571q7.743,4.447,15.49,8.887a4.628,4.628,0,0,1,1.022.761,1.987,1.987,0,0,1,.136,2.832,4.138,4.138,0,0,1-1.2.94c-4.385,2.516-8.762,5.046-13.162,7.537a13.539,13.539,0,0,1-3.8,1.9h-.686c-.019-.069-.087-.056-.132-.068a1.924,1.924,0,0,1-1.252-1.052,3.846,3.846,0,0,1-.342-1.776q0-8.816,0-17.631a4.985,4.985,0,0,1,.078-.978,2.363,2.363,0,0,1,.992-1.628A5.307,5.307,0,0,1,210.5,20.256Z" transform="translate(-208.723 -20.256)" fill="#fff" /></svg></div></a>
                </figure>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 camc-content">
                <div className="innerContent">
                  <h3>Extensive Program with 11 Courses</h3>
                  <a href="" className="viweall">View all</a>
                  <h4 className="sub-title">200+ Hours of Interactive Learning<br /> Capstone Project</h4>
                </div>
              </div>
            </div>
            <p>Power BI certification course is curated by subject matter experts to help you clear the official Microsoft Power BI Data Analyst Exam: PL-300. This course will help you gain expertise in Business Analytics and throughout the training,...</p>
          </div>
        </div>
      </section>
      <section className="section course_scroll_nav">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 course_nav_data_bx">
              <nav className="navbar">
                <ul className="nav navbar-tab nav_mlp_data">
                  <li className="nav-item">
                    <a href="#course_main" className="nav-link"><span>Syllabus</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#course_feature" className="nav-link"><span>Features</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#course_review" className="nav-link"><span>Reviews</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#course_faq" className="nav-link"><span>FAQ</span>
                    </a>
                  </li>

                </ul>
              </nav>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 entrol_main">
              <button
                onClick={checkuser}
                className="btn enroll_btn"><Arrow />ENROLL NOW
              </button></div>

          </div>
        </div>
      </section>
      <section className="section course_content_main scroll-margin-top" id="course_main">
        <div className="container">
          <div className="course_head">
            <h2>Microsoft Power BI  Course Syllabus</h2>
            <a href="" className="download_btn"><span><img src="assets/images/pdf-icon.svg" /></span>Download Curriculum</a>
          </div>
          <div className="program_syllabus_courses accordion" id="course_accordion">
            <div className="box_syllabus_course">
              <div className="top_info_sub_course row">
                <div className="col-lg-9 col-md-9 col-sm-12 col-12 top_info_sub_course_left">
                  <div className="pro_slyb">
                    <h3>Introduction to Power BI</h3>
                    <p>Python Scripting allows programmers to build applications easily and rapidly. This course is an introduction to Python scripting, which focuses on the concepts of Python. It will ...</p>
                    <div className="course_week_ps">
                      <ul>
                        <li>Week 5-6</li>
                        <li>10 Modules</li>
                        <li>30 Hours </li>
                        <li>6 Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 top_info_sub_course_right">
                  <figure>
                    <img src="assets/images/python.jpg" />
                    <a href="" className="circle"><div><svg xmlns="http://www.w3.org/2000/svg" width="21.103" height="23.425" viewBox="0 0 21.103 23.425"><path id="Path_54" data-name="Path 54" d="M210.5,20.256h.64a5.083,5.083,0,0,1,1.514.571q7.743,4.447,15.49,8.887a4.628,4.628,0,0,1,1.022.761,1.987,1.987,0,0,1,.136,2.832,4.138,4.138,0,0,1-1.2.94c-4.385,2.516-8.762,5.046-13.162,7.537a13.539,13.539,0,0,1-3.8,1.9h-.686c-.019-.069-.087-.056-.132-.068a1.924,1.924,0,0,1-1.252-1.052,3.846,3.846,0,0,1-.342-1.776q0-8.816,0-17.631a4.985,4.985,0,0,1,.078-.978,2.363,2.363,0,0,1,.992-1.628A5.307,5.307,0,0,1,210.5,20.256Z" transform="translate(-208.723 -20.256)" fill="#fff" /></svg></div></a>
                  </figure>
                </div>
              </div>
              <div className="accord_sub_ps accordion-item">
                <div className=" accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">Course Content</button>
                </div>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#course_accordion">
                  <div className="accordion-body">
                    <ul>

                      <li><a href="#">Introduction to Business Intelligence</a></li>
                      <li><a href="#">Self-Service Business Intelligence (SSBI)</a></li>
                      <li><a href="#">Introduction to Power BI</a></li>
                      <li><a href="#">Traditional BI vs. Power BI</a></li>
                      <li><a href="#">Power BI vs. Tableau vs. QlikView</a></li>
                      <li><a href="#">Uses of Power BI</a></li>
                      <li><a href="#">The Flow of Work in Power BI</a></li>
                      <li><a href="#">Working with Power BI</a></li>
                      <li><a href="#">Basic Components of Power BI</a></li>
                      <li><a href="#">Comparison of Power BI Version</a></li>
                      <li><a href="#">Introduction to Building Blocks of Power BI</a></li>
                      <li><a href="#">Data model and importance of Data Modeling</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="box_syllabus_course">
              <div className="top_info_sub_course row">
                <div className="col-lg-9 col-md-9 col-sm-12 col-12 top_info_sub_course_left">
                  <div className="pro_slyb">
                    <h3>Power BI Desktop and Data Transformation</h3>
                    <p>Fundamentals of Cloud Computing Self paced course <a href="#">Read More</a></p>
                    <div className="course_week_ps">
                      <ul>
                        <li>Week 1</li>
                        <li>1 Modules</li>
                        <li>3 Hours </li>
                        <li>4 Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 top_info_sub_course_right">
                  <figure>
                    <img src="assets/images/cloud-computing.jpg" />
                    <a href="" className="circle"><div><svg xmlns="http://www.w3.org/2000/svg" width="21.103" height="23.425" viewBox="0 0 21.103 23.425"><path id="Path_54" data-name="Path 54" d="M210.5,20.256h.64a5.083,5.083,0,0,1,1.514.571q7.743,4.447,15.49,8.887a4.628,4.628,0,0,1,1.022.761,1.987,1.987,0,0,1,.136,2.832,4.138,4.138,0,0,1-1.2.94c-4.385,2.516-8.762,5.046-13.162,7.537a13.539,13.539,0,0,1-3.8,1.9h-.686c-.019-.069-.087-.056-.132-.068a1.924,1.924,0,0,1-1.252-1.052,3.846,3.846,0,0,1-.342-1.776q0-8.816,0-17.631a4.985,4.985,0,0,1,.078-.978,2.363,2.363,0,0,1,.992-1.628A5.307,5.307,0,0,1,210.5,20.256Z" transform="translate(-208.723 -20.256)" fill="#fff" /></svg></div></a>
                  </figure>
                </div>
              </div>
              <div className="accord_sub_ps accordion-item">
                <div className=" accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Course Content</button>
                </div>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#course_accordion">
                  <div className="accordion-body">
                    <ul>
                      <li><a href="#">Introduction to Business Intelligence</a></li>
                      <li><a href="#">Self-Service Business Intelligence (SSBI)</a></li>
                      <li><a href="#">Introduction to Power BI</a></li>
                      <li><a href="#">Traditional BI vs. Power BI</a></li>
                      <li><a href="#">Power BI vs. Tableau vs. QlikView</a></li>
                      <li><a href="#">Uses of Power BI</a></li>
                      <li><a href="#">The Flow of Work in Power BI</a></li>
                      <li><a href="#">Working with Power BI</a></li>
                      <li><a href="#">Basic Components of Power BI</a></li>
                      <li><a href="#">Comparison of Power BI Version</a></li>
                      <li><a href="#">Introduction to Building Blocks of Power BI</a></li>
                      <li><a href="#">Data model and importance of Data Modeling</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="box_syllabus_course ">
              <div className="top_info_sub_course row">
                <div className="col-lg-9 col-md-9 col-sm-12 col-12 top_info_sub_course_left">
                  <div className="pro_slyb">
                    <h3>Data Analysis Expression (DAX)</h3>
                    <p>Professionals curate Tecdemy AWS Certification as per industry requirements and demands. This AWS Training will help you prepare for the AWS Certified Solutions Architect ... <a>Read More</a></p>
                    <div className="course_week_ps">
                      <ul>
                        <li>Week 5-6</li>
                        <li>16 Modules</li>
                        <li>36 Hours </li>
                        <li>14 Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 top_info_sub_course_right">
                  <figure>
                    <img src="assets/images/certified-aws.jpg" />
                    <a href="" className="circle"><div><svg xmlns="http://www.w3.org/2000/svg" width="21.103" height="23.425" viewBox="0 0 21.103 23.425"><path id="Path_54" data-name="Path 54" d="M210.5,20.256h.64a5.083,5.083,0,0,1,1.514.571q7.743,4.447,15.49,8.887a4.628,4.628,0,0,1,1.022.761,1.987,1.987,0,0,1,.136,2.832,4.138,4.138,0,0,1-1.2.94c-4.385,2.516-8.762,5.046-13.162,7.537a13.539,13.539,0,0,1-3.8,1.9h-.686c-.019-.069-.087-.056-.132-.068a1.924,1.924,0,0,1-1.252-1.052,3.846,3.846,0,0,1-.342-1.776q0-8.816,0-17.631a4.985,4.985,0,0,1,.078-.978,2.363,2.363,0,0,1,.992-1.628A5.307,5.307,0,0,1,210.5,20.256Z" transform="translate(-208.723 -20.256)" fill="#fff" /></svg></div></a>
                  </figure>
                </div>
              </div>
              <div className="accord_sub_ps accordion-item">
                <div className=" accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">Course Content</button>
                </div>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#course_accordion">
                  <div className="accordion-body">
                    <ul>
                      <li><a href="#">Introduction to Business Intelligence</a></li>
                      <li><a href="#">Self-Service Business Intelligence (SSBI)</a></li>
                      <li><a href="#">Introduction to Power BI</a></li>
                      <li><a href="#">Traditional BI vs. Power BI</a></li>
                      <li><a href="#">Power BI vs. Tableau vs. QlikView</a></li>
                      <li><a href="#">Uses of Power BI</a></li>
                      <li><a href="#">The Flow of Work in Power BI</a></li>
                      <li><a href="#">Working with Power BI</a></li>
                      <li><a href="#">Basic Components of Power BI</a></li>
                      <li><a href="#">Comparison of Power BI Version</a></li>
                      <li><a href="#">Introduction to Building Blocks of Power BI</a></li>
                      <li><a href="#">Data model and importance of Data Modeling</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="box_syllabus_course ">
              <div className="top_info_sub_course row">
                <div className="col-lg-9 col-md-9 col-sm-12 col-12 top_info_sub_course_left">
                  <div className="pro_slyb">
                    <h3>Data Visualization</h3>
                    <p>Python Scripting allows programmers to build applications easily and rapidly. This course is an introduction to Python scripting, which focuses on the concepts of Python. It will ...</p>
                    <div className="course_week_ps">
                      <ul>
                        <li>Week 5-6</li>
                        <li>10 Modules</li>
                        <li>30 Hours </li>
                        <li>6 Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 top_info_sub_course_right">
                  <figure>
                    <img src="assets/images/migrating-apps.jpg" />
                    <a href="" className="circle"><div><svg xmlns="http://www.w3.org/2000/svg" width="21.103" height="23.425" viewBox="0 0 21.103 23.425"><path id="Path_54" data-name="Path 54" d="M210.5,20.256h.64a5.083,5.083,0,0,1,1.514.571q7.743,4.447,15.49,8.887a4.628,4.628,0,0,1,1.022.761,1.987,1.987,0,0,1,.136,2.832,4.138,4.138,0,0,1-1.2.94c-4.385,2.516-8.762,5.046-13.162,7.537a13.539,13.539,0,0,1-3.8,1.9h-.686c-.019-.069-.087-.056-.132-.068a1.924,1.924,0,0,1-1.252-1.052,3.846,3.846,0,0,1-.342-1.776q0-8.816,0-17.631a4.985,4.985,0,0,1,.078-.978,2.363,2.363,0,0,1,.992-1.628A5.307,5.307,0,0,1,210.5,20.256Z" transform="translate(-208.723 -20.256)" fill="#fff" /></svg></div></a>
                  </figure>
                </div>
              </div>
              <div className="accord_sub_ps accordion-item">
                <div className=" accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">Course Content</button>
                </div>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#course_accordion">
                  <div className="accordion-body">
                    <ul>
                      <li><a href="#">Introduction to Business Intelligence</a></li>
                      <li><a href="#">Self-Service Business Intelligence (SSBI)</a></li>
                      <li><a href="#">Introduction to Power BI</a></li>
                      <li><a href="#">Traditional BI vs. Power BI</a></li>
                      <li><a href="#">Power BI vs. Tableau vs. QlikView</a></li>
                      <li><a href="#">Uses of Power BI</a></li>
                      <li><a href="#">The Flow of Work in Power BI</a></li>
                      <li><a href="#">Working with Power BI</a></li>
                      <li><a href="#">Basic Components of Power BI</a></li>
                      <li><a href="#">Comparison of Power BI Version</a></li>
                      <li><a href="#">Introduction to Building Blocks of Power BI</a></li>
                      <li><a href="#">Data model and importance of Data Modeling</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="accordion" id="free_course_accordion">
            <div className="accordion-item">
              <div className=" accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">Power BI Service</button>
              </div>
              <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#free_course_accordion">
                <div className="accordion-body">
                  <ul>
                  <li><a href="#">Introduction to Business Intelligence</a></li>
                        <li><a href="#">Self-Service Business Intelligence (SSBI)</a></li>
                        <li><a href="#">Introduction to Power BI</a></li>
                        <li><a href="#">Traditional BI vs. Power BI</a></li>
                        <li><a href="#">Power BI vs. Tableau vs. QlikView</a></li>
                        <li><a href="#">Uses of Power BI</a></li>
                        <li><a href="#">The Flow of Work in Power BI</a></li>
                        <li><a href="#">Working with Power BI</a></li>
                        <li><a href="#">Basic Components of Power BI</a></li>
                        <li><a href="#">Comparison of Power BI Version</a></li>
                        <li><a href="#">Introduction to Building Blocks of Power BI</a></li>
                        <li><a href="#">Data model and importance of Data Modeling</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <section className="section course_content_feature has-gray-bg scroll-margin-top" id="course_feature">
        <div className="container">
          <div className="course_head">
            <h2>Microsoft Power BI Certification  Course  Features</h2>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <div className="icon_box_wrap">
                <ul>
                  <li className="icon_box_wrap_content">
                    <figure><img src="assets/images/as-per-your-convinience.svg" /></figure>
                    <div className="box_content">
                      <h6>As per your convenience</h6>
                      <p>It has survived not only five centuries, but also the leap into electronic </p>
                    </div>
                  </li>
                  <li className="icon_box_wrap_content">
                    <figure><img src="assets/images/personal-learning.svg" /></figure>
                    <div className="box_content">
                      <h6>Personal Learning Manager</h6>
                      <p>Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, </p>
                    </div>
                  </li>
                  <li className="icon_box_wrap_content">
                    <figure><img src="assets/images/never-miss.svg" /></figure>
                    <div className="box_content">
                      <h6>Never miss a className</h6>
                      <p>It is a long established fact that a reader will be distracted by the readable </p>
                    </div>
                  </li>
                  <li className="icon_box_wrap_content">
                    <figure><img src="assets/images/lifetime-access.svg" /></figure>
                    <div className="box_content">
                      <h6>Lifetime Access</h6>
                      <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <div className="course_form">
                <div className="form_head">
                  <h4>Talk to our advisors</h4>
                  <p>Our advisors will get in touch with you in the next 24 hours</p>
                </div>
                <form>
                  <input type="text" name="" className="form-control" placeholder="Name" />
                  <input type="number" name="" className="form-control" placeholder="Phone Number" />
                  <input type="email" name="" className="form-control" placeholder="Email" />
                  <button type="submit" className="btn submit_btn">REQUEST A CALL</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section course_content_review scroll-margin-top" id="course_review">
        <div className="container">
          <div className="course_head is-gray-head">
            <h2>Microsoft Power BI Course Reviews</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-7">
              <div className="course-slider">
                <Swiper navigation={true}
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={1} loop={true}
                  style={{
                    "--swiper-theme-color": " #fff",

                    "--swiper-navigation-color": "main-blue",

                    "--swiper-navigation-size": "32px  32px",

                  }}
                  className="mySwiper">
                  <SwiperSlide> <div>
                    <div className="review-card">
                      <div className="review-author">
                        <figure>
                          <img src="assets/images/author-review.png" />
                        </figure>
                        <div className="review-author-details">
                          <p>Aida Bugg.</p>
                          <span>Build & Release Engineer, Sonata Software </span>
                        </div>
                      </div>
                      <h6>I carried out a post-course project that received accolades from both my client and the management.</h6>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    </div>
                  </div></SwiperSlide>
                  <SwiperSlide><div>
                    <div className="review-card">
                      <div className="review-author">
                        <figure>
                          <img src="assets/images/author-review.png" />
                        </figure>
                        <div className="review-author-details">
                          <p>Aida Bugg.</p>
                          <span>Build & Release Engineer, Sonata Software </span>
                        </div>
                      </div>
                      <h6>I carried out a post-course project that received accolades from both my client and the management.</h6>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    </div>
                  </div></SwiperSlide>
                  <SwiperSlide><div>
                    <div className="review-card">
                      <div className="review-author">
                        <figure>
                          <img src="assets/images/author-review.png" />
                        </figure>
                        <div className="review-author-details">
                          <p>Aida Bugg.</p>
                          <span>Build & Release Engineer, Sonata Software </span>
                        </div>
                      </div>
                      <h6>I carried out a post-course project that received accolades from both my client and the management.</h6>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    </div>
                  </div></SwiperSlide>
                  <SwiperSlide><div>
                    <div className="review-card">
                      <div className="review-author">
                        <figure>
                          <img src="assets/images/author-review.png" />
                        </figure>
                        <div className="review-author-details">
                          <p>Aida Bugg.</p>
                          <span>Build & Release Engineer, Sonata Software </span>
                        </div>
                      </div>
                      <h6>I carried out a post-course project that received accolades from both my client and the management.</h6>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.</p>
                    </div>
                  </div></SwiperSlide>

                </Swiper>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-5">
              <div className="partner-content">
                <h4>Our Master's Course Graduates Find Success in Top-tier Companies.</h4>
                <div className="partner-image">
                  <figure>
                    <img src="assets/images/amazon-logo.svg" />
                  </figure>
                  <figure>
                    <img src="assets/images/google-logo.svg" />
                  </figure>
                  <figure>
                    <img src="assets/images/microsoft-logo.svg" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section faq-section has-gray-bg scroll-margin-top" id="course_faq">
        <div className="container">
          <div className="header-text">
            <h2>FAQs</h2>
            <p>Microsoft Power BI Course FAQ's</p>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-md-1">
              <div>
                <div className="accordion accordion-flush has-plus-arrow faq-accordion" id="faq-accordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne">
                        <span>01</span> Alright, but what exactly do you do?
                      </button>
                    </h2>
                    <div id="faqOne" className="accordion-collapse collapse show" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design. That includes various aspects of brand planning and strategy, marketing and design.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo">
                        <span>02</span> I don't need a brand strategist but I need help executing an upcoming campaign.
                        Can we still work together?
                      </button>
                    </h2>
                    <div id="faqTwo" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, similique ab nobis corrupti sit consequatur nulla aspernatur aperiam aut recusandae laborum illo vitae dignissimos. Deleniti officia sint ducimus excepturi ut.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree">
                        <span>03</span> Why do you have a monthly project cap?
                      </button>
                    </h2>
                    <div id="faqThree" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, similique ab nobis corrupti sit consequatur nulla aspernatur aperiam aut recusandae laborum illo vitae dignissimos. Deleniti officia sint ducimus excepturi ut.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour">
                        <span>04</span> Are your rates competitive?
                      </button>
                    </h2>
                    <div id="faqFour" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, similique ab nobis corrupti sit consequatur nulla aspernatur aperiam aut recusandae laborum illo vitae dignissimos. Deleniti officia sint ducimus excepturi ut.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive">
                        <span>05</span> What are FAQ examples?
                      </button>
                    </h2>
                    <div id="faqFive" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, similique ab nobis corrupti sit consequatur nulla aspernatur aperiam aut recusandae laborum illo vitae dignissimos. Deleniti officia sint ducimus excepturi ut.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
function Innertechpage() {
  return (
    <div>
      <Innerpage />
    </div>
  );
}
export default Innertechpage;