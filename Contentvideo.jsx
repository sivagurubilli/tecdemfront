import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import Bucketlist from "./Bucketlist";
import Arrow from "./arrow";
import { Navigation } from "swiper/modules";
// import { Tooltip } from 'bootstrap';

const video = () => {
  if (window.innerWidth > 320 && window.innerWidth <= 414) {
    return 1;
  } else if (window.innerWidth > 414 && window.innerWidth <= 768) {
    return 2;
  } else {
    return 3;
  }
};

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function Contentvideo() {
  let value = video();
  const [setDimensions] = React.useState({
    width: window.innerWidth,
  });
  React.useEffect(() => {
    const debounceWindowResize = debounce(function windowResize() {
      setDimensions({
        width: window.innerWidth,
      });
    }, 500);

    window.addEventListener("resize", debounceWindowResize);
    return () => {
      window.removeEventListener("resize", debounceWindowResize);
    };
  });

  return (
    <div class="content-wrapper">
      <div class="container-fluid flex-grow-1 container-p-y">
        <div class="row">
          <div class="col-md-12 col-lg-8">
            <div class="card mb-4 course-name-card">
              <div class="card-body">
                <h5 class="card-title">
                  Microsoft Power BI Certification Training Course
                </h5>
                <p class="card-text">
                  Power BI certification course is curated by subject matter
                  experts to help you clear the official Microsoft Power BI Data
                  Analyst Exam: PL-300. This course will help you gain expertise
                  in Business Analytics and throughout the training,...
                </p>
              </div>
            </div>
            <div class="card mb-4 youtube-card">
              <div class="card-body p-0">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bx bxl-youtube"></i> http://youtube.com/
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Query"
                  />
                  <button class="btn" type="button" id="button-addon2">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
              <div class="card-img-bottom ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/fnA-_iDV_LY?si=oXtXOTKYRGptSKk9"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body cardpad">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={value}
                  loop={true}
                  style={{
                    "--swiper-theme-color": " #fff",
                    "--swiper-navigation-color": "main-blue",
                    "--swiper-navigation-size": "32px  32px",
                  }}
                  className="mySwiper"
                >
                  <div class="course-video-slider swiper mySwiper">
                    <div class="swiper-wrapper">
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="swiper-slide">
                          <div class="ratio ratio-16x9 iframe-rounded">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/fnA-_iDV_LY?si=HeXZrjeoCoApZbc9"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              loading="lazy"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      </SwiperSlide>
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
          <div class="mb-4 col-md-12 col-lg-4">
            <div class="card accord-style h-100">
              <div class="d-flex align-items-center p-3">
                <h4 class="card-header flex-grow-1 p-0">Course Content</h4>
                <Arrow />
                <Bucketlist type="button" />
              </div>

              <div class="accordion" id="course-content-accord">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      type="button"
                      class="accordion-button collapsed accord "
                      data-bs-toggle="collapse"
                      data-bs-target="#course-one"
                    >
                      Introduction to Power BI
                    </button>
                  </h2>
                  <div
                    id="course-one"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-two"
                    >
                      Power BI Desktop and Data Transformation
                    </button>
                  </h2>
                  <div
                    id="course-two"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-three"
                    >
                      Data Analysis Expression (DAX)
                    </button>
                  </h2>
                  <div
                    id="course-three"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-four"
                    >
                      Data Visualization
                    </button>
                  </h2>
                  <div
                    id="course-four"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-five"
                    >
                      Power BI Service
                    </button>
                  </h2>
                  <div
                    id="course-five"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-six"
                    >
                      Connectivity Modes
                    </button>
                  </h2>
                  <div
                    id="course-six"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-seven"
                    >
                      Power BI Report Server
                    </button>
                  </h2>
                  <div
                    id="course-seven"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-eight"
                    >
                      R & Python in Power BI
                    </button>
                  </h2>
                  <div
                    id="course-eight"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-nine"
                    >
                      Advanced Analytics in Power BI
                    </button>
                  </h2>
                  <div
                    id="course-nine"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item active">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      type="button"
                      class="accordion-button collapsed accord"
                      data-bs-toggle="collapse"
                      data-bs-target="#course-ten"
                    >
                      In-Class Project
                    </button>
                  </h2>
                  <div
                    id="course-ten"
                    class="accordion-collapse collapse"
                    data-bs-parent="#course-content-accord"
                  >
                    <div class="accordion-body bullet">
                      <ul>
                        <li>Introduction to Business Intelligence</li>
                        <li>Self-Service Business Intelligence (SSBI)</li>
                        <li>Introduction to Power BI</li>
                        <li>Traditional BI vs. Power BI</li>
                        <li>Power BI vs. Tableau vs. QlikView</li>
                        <li>Uses of Power BI</li>
                        <li>The Flow of Work in Power BI</li>
                        <li>Working with Power BI</li>
                        <li>Basic Components of Power BI</li>
                        <li>Comparison of Power BI Version</li>
                        <li>Introduction to Building Blocks of Power BI</li>
                        <li>Data model and importance of Data Modeling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mb-4">
            <div class="course-pack-list">
              <ul>
                <li class="card course-pack-card">
                  <div class="card-body">
                    <div class="course-pack-details">
                      <img src="assets/img/custom/mentor-image.png" alt=".." />
                      <div class="review-details">
                        <h4 class="course-author-name">Mentor:</h4>
                        <span>Reviews</span>
                        <div class="star-div">
                          <div class="star-wrapper">
                            <a href="/" class="bx bxs-star s1"></a>
                            <a href="/" class="bx bxs-star s2"></a>
                            <a href="/" class="bx bxs-star s3"></a>
                            <a href="/" class="bx bxs-star s4"></a>
                            <a href="/" class="bx bxs-star s5"></a>
                          </div>
                          <span>4.5 (61755)</span>
                        </div>
                        <div class="short-view">
                          <span>67 Total Hours</span>
                          <span>411 lectures</span>
                          <span>All levels</span>
                        </div>
                      </div>
                    </div>
                    <span class="course-price">$84.99</span>
                    <span class="like-button">
                      <input type="checkbox" name="" />
                      <i class="bx bx-heart"></i>
                      <i class="bx bxs-heart"></i>
                    </span>
                    <a href="/" class="btn add-cart-btn">
                      Add to Cart
                    </a>
                  </div>
                </li>
                <li class="card course-pack-card">
                  <div class="card-body">
                    <div class="course-pack-details">
                      <img src="assets/img/custom/mentor-image.png" alt=".." />
                      <div class="review-details">
                        <h4 class="course-author-name">Mentor:</h4>
                        <span>Reviews</span>
                        <div class="star-div">
                          <div class="star-wrapper">
                            <a href="/" class="bx bxs-star s1"></a>
                            <a href="/" class="bx bxs-star s2"></a>
                            <a href="/" class="bx bxs-star s3"></a>
                            <a href="/" class="bx bxs-star s4"></a>
                            <a href="/" class="bx bxs-star s5"></a>
                          </div>
                          <span>4.5 (61755)</span>
                        </div>
                        <div class="short-view">
                          <span>67 Total Hours</span>
                          <span>411 lectures</span>
                          <span>All levels</span>
                        </div>
                      </div>
                    </div>
                    <span class="course-price">$84.99</span>
                    <span class="like-button">
                      <input type="checkbox" name="" />
                      <i class="bx bx-heart"></i>
                      <i class="bx bxs-heart"></i>
                    </span>
                    <a href="/" class="btn add-cart-btn">
                      Add to Cart
                    </a>
                  </div>
                </li>
                <li class="card course-pack-card">
                  <div class="card-body">
                    <div class="course-pack-details">
                      <img src="assets/img/custom/mentor-image.png" alt=".." />
                      <div class="review-details">
                        <h4 class="course-author-name">Mentor:</h4>
                        <span>Reviews</span>
                        <div class="star-div">
                          <div class="star-wrapper">
                            <a href="/" class="bx bxs-star s1"></a>
                            <a href="/" class="bx bxs-star s2"></a>
                            <a href="/" class="bx bxs-star s3"></a>
                            <a href="/" class="bx bxs-star s4"></a>
                            <a href="/" class="bx bxs-star s5"></a>
                          </div>
                          <span>4.5 (61755)</span>
                        </div>
                        <div class="short-view">
                          <span>67 Total Hours</span>
                          <span>411 lectures</span>
                          <span>All levels</span>
                        </div>
                      </div>
                    </div>
                    <span class="course-price">$84.99</span>
                    <span class="like-button">
                      <input type="checkbox" name="" />
                      <i class="bx bx-heart"></i>
                      <i class="bx bxs-heart"></i>
                    </span>
                    <a href="/" class="btn add-cart-btn">
                      Add to Cart
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="content-backdrop fade"></div>
    </div>
  );
}

export default Contentvideo;
