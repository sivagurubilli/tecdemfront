import React from "react";
import Homepagefooter from "../Shared/Homepagefooter";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
} from "mdb-react-ui-kit";
// import Popover from "../PopOver/Popover";

export default function Business() {
  // const [showBasic, setShowBasic] = useState(false);

  return (
    <header className="height-500">
      <nav class="navbar navbar-expand-lg navbar-light bg-white text-dark">
        <div class="container-fluid">
          <button
            data-mdb-collapse-init
            class="navbar-toggler"
            type="button"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarExample01">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item active">
                <a class="nav-link" aria-current="page" href="#">
                  <button style={{ textDecoration: "outline 1px blue" }}>
                    <span style={{ color: "violet" }}>TecDemy</span>-Business
                  </button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Courses Offer
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Resources
                </a>
              </li>
            </ul>
            <MDBDropdown>
              <MDBDropdownToggle tag="a" className="btn btn-primary">
                Country
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link>India</MDBDropdownItem>
                <MDBDropdownItem link>USA</MDBDropdownItem>
                <MDBDropdownItem link>Canada</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
      </nav>
      <div className="main-div">
        <div
          id="imgs"
          className="p-15 text-start bg-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/slides/041.webp')",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-600">
              <div className="text-white">
                <h1 className="mb-3">Get your demo</h1>
                <h5 className="mb-4">
                  Best &amp; free guide of responsive web design
                </h5>
                <h3 className="mb-3">
                  Tell us your needs and we’ll start on a custom plan to drive
                  results.
                </h3>
                <h4 className="mb-2">
                  With Udemy as your learning partner, you can:
                </h4>
                <ul>
                  <li>
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="checkboxNoLabel"
                        value=""
                        aria-label="..."
                      />
                    </div>
                    Train your entire workforce with over 25,000+ courses in 15
                    languages Prep employees
                  </li>
                  <li>
                    Prep employees for over 200 industry-recognized
                    certification exams
                  </li>
                  <li>
                    Develop highly skilled tech teams in risk-free practice
                    environments
                  </li>
                  <li>
                    Identify emerging skills gaps, learning trends, and industry
                    benchmarks
                  </li>
                  <li>
                    Integrate content with your existing learning management
                    system
                  </li>
                </ul>

                <MDBBtn
                  className="m-5"
                  tag="a"
                  outline
                  size="lg"
                  rel="nofollow"
                  target="_blank"
                  href={"/Service"}
                >
                  Start tutorial
                </MDBBtn>
                <MDBBtn
                  className="m-2"
                  tag="a"
                  outline
                  size="lg"
                  target="_blank"
                  href="https://beta.Tecdemy.com"
                >
                  Download Courses details
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5 mx-5">
          <form class="row g-3">
            <div class="col-md-4">
              <div class="form-outline" data-mdb-input-init>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault01"
                  value="Mark"
                  required
                />
                <label for="validationDefault01" class="form-label">
                  First name
                </label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-outline" data-mdb-input-init>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault02"
                  value="Otto"
                  required
                />
                <label for="validationDefault02" class="form-label">
                  Last name
                </label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="input-group form-outline" data-mdb-input-init>
                <span class="input-group-text" id="inputGroupPrepend2">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefaultUsername"
                  aria-describedby="inputGroupPrepend2"
                  required
                />              
              </div>
                <label for="validationDefaultUsername" class="form-label">
                    Username
                </label> 
            </div>
            <div class="col-md-6">
              <div class="form-outline" data-mdb-input-init>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault03"
                  required
                />
                <label for="validationDefault03" class="form-label">
                  City
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-outline" data-mdb-input-init>
                <input
                  type="text"
                  class="form-control"
                  id="validationDefault05"
                  required
                />
                <label for="validationDefault05" class="form-label">
                  Zip
                </label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck2"
                  required
                />
                <label class="form-check-label" for="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
            <div class="col-12">
              <button
                class="btn btn-primary"
                type="submit"
                data-mdb-ripple-init
              >
                Submit form
              </button>
            </div>
          </form>
          <div className="my-4">
            <h7 style={{ color: "blue" }}>
              By signing up, you agree to our{" "}
              <span style={{ color: "red" }}>terms</span> and{" "}
              <span style={{ color: "red" }}>privacy policy</span>. You agree
              that we can contact you about TecDemy and use data from third
              parties to personalize your experience.
            </h7>
          </div>
        </div>
      </div>
      <div classNameName="my-10">
        <Homepagefooter />
      </div>
    </header>
  );
}
