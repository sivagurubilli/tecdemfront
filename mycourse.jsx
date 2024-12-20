import React from "react";
import { Link } from "react-router-dom";
import Arrow from "./arrow";

export default function Mycourse() {

  
  return (
    <>
      <div class="content-wrapper">
        <div class="container-fluid flex-grow-1 container-p-y">
          <div class="row">
            <div class="col-xl-12">
              <h4 class="text-muted">My Courses</h4>
              <div class="nav-align-top mb-4">
                <ul class="nav nav-pills" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      type="button"
                      class="nav-link active"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#in-progress"
                    >
                      In Progress
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      type="button"
                      class="nav-link"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#all-courses"
                    >
                      All Course
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      type="button"
                      class="nav-link"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#completed"
                    >
                      Completed
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      type="button"
                      class="nav-link"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#my-favorite"
                    >
                      My Favorites
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      type="button"
                      class="nav-link"
                      role="tab"
                      data-bs-toggle="tab"
                      data-bs-target="#my-certificate"
                    >
                      My Certificates
                    </button>
                  </li>
                </ul>
                <div class="tab-content bg-transparent shadow-none p-0 mt-3">
                  <div
                    class="tab-pane fade active show"
                    id="in-progress"
                    role="tabpanel"
                  >
                    <h6 class="text-muted">
                      <span class="fs-4 text-primary">2</span> out of{" "}
                      <span class="fs-4 text-primary">5</span> Course shown
                    </h6>
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        {/* <div class="card mb-3">
                                                    <div class="card-body">
                                                        <div class="d-flex gap-3">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/cloud-architect-masters-course.jpg" alt="" class="w-px-100" />
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <a href="javascript:void(0)" class="text-body">
                                                                            <h5 class="mb-0">CLOUD ARCHITECT MASTERS COURSE</h5>
                                                                        </a>
                                                                        <hr />
                                                                        <div class="d-flex flex-wrap">
                                                                            <span class="me-4"><i class='bx bx-like me-1'></i> 1 Free Test</span>
                                                                            <span class="me-4"><i class='bx bx-notepad me-1'></i> 576 Questions</span>
                                                                            <span class="me-4"><i class='bx bx-play-circle me-1'></i> 226 Videos</span>
                                                                            <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="text-md-end">
                                                                            <div></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <Arrow />
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a
                                      href={"/course-detail"}
                                      class="text-body"
                                    >
                                      <h5 class="mb-0">
                                        {" "}
                                        CLOUD ARCHITECT MASTERS COURSE
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 576
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        226 Videos
                                      </span>
                                      {/* <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span> */}
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <Arrow />
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href={"/javascript"} class="text-body">
                                      <h5 class="mb-0">
                                        {" "}
                                        THE COMPLETE JAVASCRIPT COURSE 2024:
                                        FROM ZERO TO EXPERT
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 495
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        330 Videos
                                      </span>
                                      {/* <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span> */}
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="all-courses" role="tabpanel">
                    <h6 class="text-muted">
                      <span class="fs-4 text-primary">5</span> out of{" "}
                      <span class="fs-4 text-primary">5</span> Course shown
                    </h6>
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href="/course-detail" class="text-body">
                                      <h5 class="mb-0">
                                        CLOUD ARCHITECT MASTERS COURSE
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 576
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        226 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 77
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>

                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href={"/javascript"} class="text-body">
                                      <h5 class="mb-0">
                                        {" "}
                                        THE COMPLETE JAVASCRIPT COURSE 2024:
                                        FROM ZERO TO EXPERT
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 495
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        330 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 80
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href="/amazon-aws" class="text-body">
                                      <h5 class="mb-0">
                                        AMAZON WEB SERVICES(AWS) CERTIFIED - 4
                                        CERTIFICATIONS!
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 547
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        356 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 89
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href="/fullstack" class="text-body">
                                      <h5 class="mb-0">
                                        THE ULTIMATE FULLSTACK WEB DEVLOPMENT
                                        COURSE FOR 2024
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 520
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        290 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 67
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href="cybersecurity" class="text-body">
                                      <h5 class="mb-0">
                                        CYBER SECURITY: FROM BEGINNER TO EXPERT
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 395
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        274 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 157
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="completed" role="tabpanel">
                    {/* <h5 class="text-muted">
                      &nbsp;&nbsp;&nbsp; Courses not yet completed{" "}
                    </h5> */}
                    <h6 class="text-muted">
                      <span class="fs-4 text-primary">1</span> out of{" "}
                      <span class="fs-4 text-primary">5</span> Course shown
                    </h6>
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a href="/fullstack" class="text-body">
                                      <h5 class="mb-0">
                                        THE ULTIMATE FULLSTACK WEB DEVLOPMENT
                                        COURSE FOR 2024
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 520
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        290 Videos
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-flask me-1"></i> 67
                                        Labs
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bxs-inbox me-1"></i>{" "}
                                        Sandbox
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="my-favorite" role="tabpanel">
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        {/* <div class="card mb-3">
                                                    <div class="card-body">
                                                        <div class="d-flex gap-3">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/cloud-architect-masters-course.jpg" alt="" class="w-px-100" />
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <a href="javascript:void(0)" class="text-body">
                                                                            <h5 class="mb-0">CLOUD ARCHITECT MASTERS COURSE</h5>
                                                                        </a>
                                                                        <hr />
                                                                        <div class="d-flex flex-wrap">
                                                                            <span class="me-4"><i class='bx bx-like me-1'></i> 1 Free Test</span>
                                                                            <span class="me-4"><i class='bx bx-notepad me-1'></i> 576 Questions</span>
                                                                            <span class="me-4"><i class='bx bx-play-circle me-1'></i> 226 Videos</span>
                                                                            <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="text-md-end">
                                                                            <div></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                        <div class="card mb-3">
                          <div class="card-body">
                            <div class="d-flex gap-3">
                              <div class="flex-shrink-0">
                                <img
                                  src="assets/images/cloud-architect-masters-course.jpg"
                                  alt=""
                                  class="w-px-100"
                                />
                              </div>
                              <div class="flex-grow-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <a
                                      href={"/course-detail"}
                                      class="text-body"
                                    >
                                      <h5 class="mb-0">
                                        CLOUD ARCHITECT MASTERS COURSE
                                      </h5>
                                    </a>
                                    <hr />
                                    <div class="d-flex flex-wrap">
                                      <span class="me-4">
                                        <i class="bx bx-like me-1"></i> 1 Free
                                        Test
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-notepad me-1"></i> 576
                                        Questions
                                      </span>
                                      <span class="me-4">
                                        <i class="bx bx-play-circle me-1"></i>{" "}
                                        226 Videos
                                      </span>
                                      {/* <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span> */}
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="text-md-end">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="my-certificate"
                    role="tabpanel"
                  >
                    <h5 class="text-muted">
                      &nbsp;&nbsp;&nbsp; Courses not yet completed{" "}
                    </h5>

                    {/* <h6 class="text-muted"><span class="fs-4 text-primary">0</span> out of <span class="fs-4 text-primary">0</span> Course shown</h6> */}
                    {/* <div class="row">
                                            <div class="col-12 col-lg-6">
                                                <div class="card mb-3">
                                                    <div class="card-body">
                                                        <div class="d-flex gap-3">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/cloud-architect-masters-course.jpg" alt="" class="w-px-100" />
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <a href="javascript:void(0)" class="text-body">
                                                                            <h5 class="mb-0">CLOUD ARCHITECT MASTERS COURSE</h5>
                                                                        </a>
                                                                        <hr />
                                                                        <div class="d-flex flex-wrap">
                                                                            <span class="me-4"><i class='bx bx-like me-1'></i> 1 Free Test</span>
                                                                            <span class="me-4"><i class='bx bx-notepad me-1'></i> 576 Questions</span>
                                                                            <span class="me-4"><i class='bx bx-play-circle me-1'></i> 226 Videos</span>
                                                                            <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="text-md-end">
                                                                            <div></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card mb-3">
                                                    <div class="card-body">
                                                        <div class="d-flex gap-3">
                                                            <div class="flex-shrink-0">
                                                                <img src="assets/images/cloud-architect-masters-course.jpg" alt="" class="w-px-100" />
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <a href="javascript:void(0)" class="text-body">
                                                                            <h5 class="mb-0">CLOUD ARCHITECT MASTERS COURSE</h5>
                                                                        </a>
                                                                        <hr />
                                                                        <div class="d-flex flex-wrap">
                                                                            <span class="me-4"><i class='bx bx-like me-1'></i> 1 Free Test</span>
                                                                            <span class="me-4"><i class='bx bx-notepad me-1'></i> 576 Questions</span>
                                                                            <span class="me-4"><i class='bx bx-play-circle me-1'></i> 226 Videos</span>
                                                                            <span class="me-4"><i class='bx bxs-flask me-1'></i> 77 Labs</span>
                                                                            <span class="me-4"><i class='bx bxs-inbox me-1'></i> Sandbox</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="text-md-end">
                                                                            <div></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-backdrop fade"></div>
      </div>
    </>
  );
}
