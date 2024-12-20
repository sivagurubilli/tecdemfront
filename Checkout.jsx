import React from "react";

import Arrow from "./arrow";

export default function CheckoutPage() {
  return (
    <>
      <div class="content-wrapper">
        <div class="container-fluid flex-grow-1 container-p-y">
          <div class="row">
            <div class="col-md-12 col-lg-8">
              {/* <h5 class="card-title">Payment Method</h5> */}
              <div class="card mb-4 course-name-card">
                <div class="card-body">
                  <p>
                    <span class="text-primary fs-4">1</span> Course(s) in Cart
                  </p>
                  <h5 class="card-title mb-3">Order Details</h5>
                  <ul class="list-group">
                    <li class="list-group-item p-0 border-0">
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
                                  Microsoft Power BI Certification Training
                                  Course
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
                  </ul>
                </div>
              </div>
              <div class="accordion mt-3 mb-3" id="accordionExample">
                <div class="card accordion-item active">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      type="button"
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordionOne"
                    >
                      Credit / Debit Card
                    </button>
                  </h2>
                  <div
                    id="accordionOne"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="row g-3">
                        <div class="col-12">
                          <label class="form-label w-100" for="paymentCard">
                            Card Number
                          </label>
                          <div class="input-group input-group-merge">
                            <input
                              id="paymentCard"
                              name="paymentCard"
                              class="form-control credit-card-mask"
                              type="text"
                              placeholder="1356 3215 6548 7898"
                            />
                            <span
                              class="input-group-text cursor-pointer p-1"
                              id="paymentCard2"
                            >
                              <span class="card-type"></span>
                            </span>
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <label class="form-label" for="paymentCardName">
                            Name
                          </label>
                          <input
                            type="text"
                            id="paymentCardName"
                            class="form-control"
                            placeholder="John Doe"
                          />
                        </div>
                        <div class="col-6 col-md-3">
                          <label class="form-label" for="paymentCardExpiryDate">
                            Exp. Date
                          </label>
                          <input
                            type="text"
                            id="paymentCardExpiryDate"
                            class="form-control expiry-date-mask"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div class="col-6 col-md-3">
                          <label class="form-label" for="paymentCardCvv">
                            CVV Code
                          </label>
                          <div class="input-group input-group-merge">
                            <input
                              type="text"
                              id="paymentCardCvv"
                              class="form-control cvv-code-mask"
                              maxlength="3"
                              placeholder="654"
                            />
                            <span
                              class="input-group-text cursor-pointer"
                              id="paymentCardCvv2"
                            >
                              <i
                                class="bx bx-help-circle text-muted"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                aria-label="Card Verification Value"
                                data-bs-original-title="Card Verification Value"
                              ></i>
                            </span>
                          </div>
                        </div>
                        <div class="col-12">
                          <label class="switch">
                            <input type="checkbox" class="switch-input" />
                            <span class="switch-toggle-slider">
                              <span class="switch-on"></span>
                              <span class="switch-off"></span>
                            </span>
                            <span class="switch-label">
                              &nbsp;&nbsp;Save card for future billing?
                            </span>
                          </label>
                        </div>
                        {/* <div class="col-12">
                                                    <button type="button" class="btn btn-primary btn-next me-sm-3 me-1">Submit</button>
                                                    <button type="reset" class="btn btn-label-secondary">Cancel</button>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="card accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionTwo">Cash on Delivery(COD)</button>
                                    </h2>
                                    <div id="accordionTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="tab-pane fade active show" id="pills-cod" role="tabpanel">
                                                <p>Cash on Delivery is a type of payment method where the recipient make payment for the order at the time of delivery rather than in advance.</p>
                                                <button type="button" class="btn btn-primary btn-next">Pay On Delivery</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                {/* <div class="card accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionThree">Gift Card</button>
                                    </h2>
                                    <div id="accordionThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div class="row g-3">
                                                <div class="col-12">
                                                    <label class="form-label w-100" for="paymentCard">Card Number</label>
                                                    <div class="input-group input-group-merge">
                                                        <input id="paymentCard" name="paymentCard" class="form-control credit-card-mask" type="text" placeholder="1356 3215 6548 7898">
                                                            <span class="input-group-text cursor-pointer p-1" id="paymentCard2">
                                                                <span class="card-type"></span>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="paymentCardName">Name</label>
                                                    <input type="text" id="paymentCardName" class="form-control" placeholder="John Doe">
                                                </div>
                                                <div class="col-6 col-md-3">
                                                    <label class="form-label" for="paymentCardExpiryDate">Exp. Date</label>
                                                    <input type="text" id="paymentCardExpiryDate" class="form-control expiry-date-mask" placeholder="MM/YY">
                                                </div>
                                                <div class="col-6 col-md-3">
                                                    <label class="form-label" for="paymentCardCvv">CVV Code</label>
                                                    <div class="input-group input-group-merge">
                                                        <input type="text" id="paymentCardCvv" class="form-control cvv-code-mask" maxlength="3" placeholder="654">
                                                            <span class="input-group-text cursor-pointer" id="paymentCardCvv2">
                                                                <i class="bx bx-help-circle text-muted" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Card Verification Value" data-bs-original-title="Card Verification Value"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <label class="switch">
                                                        <input type="checkbox" class="switch-input">
                                                            <span class="switch-toggle-slider">
                                                                <span class="switch-on"></span>
                                                                <span class="switch-off"></span>
                                                            </span>
                                                            <span class="switch-label">Save card for future billing?</span>
                                                    </label>
                                                </div>
                                                <div class="col-12">
                                                    <button type="button" class="btn btn-primary btn-next me-sm-3 me-1">Submit</button>
                                                    <button type="reset" class="btn btn-label-secondary">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>
            </div>
            <div class="mb-4 col-md-12 col-lg-4">
              <div class="border rounded p-4 mb-3 pb-3 bg-white">
                <h4>Summary</h4>
                <dl class="row mb-0">
                  <dt class="col-6 fw-normal">Original Price :</dt>
                  <dd class="col-6 text-end">$299.99</dd>
                </dl>
                <hr class="mx-n4" />
                <dl class="row mb-0">
                  <dt class="col-sm-6 fw-normal">Subtotal</dt>
                  <dd class="col-6 text-end">$299.99</dd>

                  <dt class="col-6 fw-normal">Tax Charge</dt>
                  <dd class="col-6 text-end">$0</dd>

                  {/* <dt class="col-6 fw-normal">Delivery Charges</dt>
                                    <dd class="col-6 text-end"><s class="text-muted">$5.00</s> <span class="badge bg-label-success ms-1">Free</span></dd> */}
                </dl>

                <hr class="mx-n4" />
                <dl class="row mb-0">
                  <dt class="col-6">Total</dt>
                  <dd class="col-6 fw-medium text-end mb-0">$299.99</dd>
                </dl>

                <hr class="mx-n4" />
                <h6>List of puchased item</h6>
                <ol class="list-group list-group-flush list-group-numbered">
                  <li class="list-group-item">Program - 1</li>
                  {/* <li class="list-group-item">Mentor Session - 1</li>
                                    <li class="list-group-item">Hands on Training Session - 1</li>
                                    <li class="list-group-item">Tech Support - 1</li> */}
                </ol>

                <hr class="mx-n4" />
                <h6>Offer</h6>
                <div class="row g-3 mb-3">
                  <div class="col-8 col-xxl-8 col-xl-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Promo Code"
                      aria-label="Enter Promo Code"
                    />
                  </div>
                  <div class="col-4 col-xxl-4 col-xl-12">
                    <div class="d-grid">
                      <button type="button" class="btn btn-primary">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                <hr class="mx-n4" />
                <p>
                  By completing your purchase you are agreeing to our{" "}
                  <a href="/">Terms of Service</a>
                </p>
                <div class="d-grid">
                  <a href={"/orderconfirm"} class="btn btn-primary btn-next">
                    <Arrow /> Pay now{" "}
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
