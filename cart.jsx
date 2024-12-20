import React from "react";

import Arrow from "./arrow";

export default function CartPage() {
  return (
    <>
      <div class="content-wrapper">
        <div class="container-fluid flex-grow-1 container-p-y">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              <div class="card mb-4 course-name-card">
                <div class="card-body">
                  <p>
                    <span class="text-primary fs-4">1</span> Course(s) in Cart
                  </p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item mb-3">
                      <div class="d-flex gap-3">
                        <div class="flex-shrink-0">
                          <img
                            src="assets/images/cloud-architect-masters-course.jpg"
                            alt="google home"
                            class="w-px-75"
                          />
                        </div>
                        <div class="flex-grow-1">
                          <div class="row">
                            <div class="col-md-12">
                              <a href="/" class="text-body">
                                <h5 class="mb-0">
                                  Microsoft Power BI Certification Training
                                  Course
                                </h5>
                                <hr />
                              </a>
                              <dl class="row mb-0">
                                <dt class="col-sm-6 fw-normal">
                                  Practice Tests
                                </dt>
                                <dd class="col-6 text-end">
                                  <span class="text-primary fs-5">
                                    <strong>$299</strong>
                                  </span>
                                  {/* <s class="text-muted ms-2">$359</s> */}
                                  <a href="/" class="text-muted ms-2">
                                    <i class="bx bx-trash"></i>
                                  </a>
                                </dd>
                                {/* <dt class="col-sm-6 fw-normal">Practice Tests</dt>
                                                                <dd class="col-6 text-end">
                                                                    <span class="text-primary fs-5"><strong>$299</strong></span>
                                                                    <s class="text-muted ms-2">$359</s>
                                                                    <a href="javascript:void(0)" class="text-muted ms-2"><i class='bx bx-trash'></i></a>
                                                                </dd>
                                                                <dt class="col-sm-6 fw-normal">Practice Tests</dt>
                                                                <dd class="col-6 text-end">
                                                                    <span class="text-primary fs-5"><strong>$299</strong></span>
                                                                    <s class="text-muted ms-2">$359</s>
                                                                    <a href="javascript:void(0)" class="text-muted ms-2"><i class='bx bx-trash'></i></a>
                                                                </dd> */}
                              </dl>
                            </div>
                            <div class="col-md-4">
                              <div class="text-md-end">
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* <li class="list-group-item mb-3">
                                            <div class="d-flex gap-3">
                                                <div class="flex-shrink-0">
                                                    <img src="assets/img/custom/mentor-image.png" alt="google home" class="w-px-75" />
                                                </div>
                                                <div class="flex-grow-1">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <a href="javascript:void(0)" class="text-body">
                                                                <h4 class="mb-0">Course Name</h4>
                                                                <hr />
                                                            </a>
                                                            <dl class="row mb-0">
                                                                <dt class="col-sm-6 fw-normal">Practice Tests</dt>
                                                                <dd class="col-6 text-end">
                                                                    <span class="text-primary fs-5"><strong>$299</strong></span>
                                                                    <s class="text-muted ms-2">$359</s>
                                                                    <a href="javascript:void(0)" class="text-muted ms-2"><i class='bx bx-trash'></i></a>
                                                                </dd>
                                                                <dt class="col-sm-6 fw-normal">Practice Tests</dt>
                                                                <dd class="col-6 text-end">
                                                                    <span class="text-primary fs-5"><strong>$299</strong></span>
                                                                    <s class="text-muted ms-2">$359</s>
                                                                    <a href="javascript:void(0)" class="text-muted ms-2"><i class='bx bx-trash'></i></a>
                                                                </dd>
                                                                <dt class="col-sm-6 fw-normal">Practice Tests</dt>
                                                                <dd class="col-6 text-end">
                                                                    <span class="text-primary fs-5"><strong>$299</strong></span>
                                                                    <s class="text-muted ms-2">$359</s>
                                                                    <a href="javascript:void(0)" class="text-muted ms-2"><i class='bx bx-trash'></i></a>
                                                                </dd>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div class="mb-4 col-md-12 col-lg-4">
              <div class="border rounded p-4 mb-3 pb-3 bg-white">
                <h4>Summary</h4>
                <dl class="row mb-0">
                  <dt class="col-6 fw-normal">Original Price :</dt>
                  <dd class="col-6 text-end">$299</dd>
                </dl>

                <hr class="mx-n4" />
                <dl class="row mb-0">
                  <dt class="col-sm-6 fw-normal">Subtotal</dt>
                  <dd class="col-6 text-end">$299</dd>

                  <dt class="col-6 fw-normal">Tax Charge</dt>
                  <dd class="col-6 text-end">$0</dd>

                  {/* <dt class="col-6 fw-normal">Discount</dt>
                                    <dd class="col-6 text-end"><s class="text-muted">$5.00</s> <span class="badge bg-label-success ms-1">Free</span></dd> */}
                </dl>

                <hr class="mx-n4" />
                <dl class="row mb-0">
                  <dt class="col-6">Total</dt>
                  <dd class="col-6 fw-medium text-end mb-0">$299</dd>
                </dl>

                <hr class="mx-n4" />
                <div class="d-grid">
                  <a href={"/checkout"} class="btn btn-primary btn-next">
                    <Arrow />
                    Buy
                  </a>
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
