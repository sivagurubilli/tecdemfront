import React, { useState, useEffect } from "react";
import { post } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import { color } from "framer-motion";

function Bucketlist({ type }) {
  // const [fetchedData, setFetchedData] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleFetch = () => {
    post(endpoints.bucketlist + "/fetch", {
      course_id: 1,
    })
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.data.data &&
          response.data.data &&
          response.data != {}
        ) {
          setInputValue(response.data.data.data);
        } else {
          setInputValue("");
        }
        // setFetchedData(response.data);
        // localStorage.setItem('response.data', response.data);
      })
      .catch(function (error) {
        toast.error(error.response.data.status.message, {
          pauseOnHover: false
        });
      });
  };

  const handleSave = () => {
    post(endpoints.bucketlist + "/update", {
      course_id: 1,
      data: inputValue,
    })
      .then(function (response) {
        toast.success(
          response.data && response.data.status && response.data.status.message, {
          pauseOnHover: false
        }
        );
      })
      .catch(function (error) {
        toast.error(error.response.data.status.message, {
          pauseOnHover: false
        });
      });
  };
  // useEffect(() => {
  //   // const savedValue = localStorage.getItem('inputValue');
  //   // if (savedValue) {
  //   //   setInputValue(savedValue);
  //   // }
  // }, []);

  let wishlist = [
    {

      img: <i class="far fa-star"></i>,
      title: "Microsoft Power BI Certification Training Course",
      Project: "Project",
      Course: "Course",
      StartAt: "Start At",
    },
    {
      img: <i class="far fa-star"></i>,
      title: "Cloud Computing Training Course",
      Project: "Project",
      Course: "Course",
      StartAt: "Start At",
    },
    {
      img: <i class="far fa-star"></i>,
      title: "Cyber Securty Training Course",
      Project: "Project",
      Course: "Course",
      StartAt: "Start At",
    },
  ];
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // localStorage.setItem('inputValue', newValue);
  };
  if (type == "button") {
    return (
      <div>
        <button
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasStart"
          className="btn rounded-pill btn-icon btn-primary "
          data-bs-placement="top"
          title="BucketList"
          onClick={handleFetch}
        >
          <span className="tf-icons bx bx-notepad"></span>
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasStart"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasStartLabel" className="offcanvas-title">
              Bucket List
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body mx-0 flex-grow-1">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              className="form-control mb-3"
              id="exampleFormControlTextarea1"
              style={{ minWidth: "50px", minHeight: "500px" }}
            ></textarea>
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === "img") {
    return (
      <div>
        <div className="card mb-4">
          <div className="card-body" style={{ height: "115px" }}>
            <div className="d-flex icon-box-1 icon-box-lg">
              <div className="me-3">
                <button
                  type="img"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasStart"
                  data-bs-placement="top"
                  title="BucketList"
                  style={{ border: "none", background: "none" }}
                // onClick={handleFetch}
                >
                  <span className=" rounded">
                    <img
                      src="assets/img/custom/completed.svg"
                      className="icon-img"
                      alt="Completed icon"
                    />
                  </span>
                </button>

                <div
                  className="offcanvas offcanvas-end"
                  tabIndex="-1"
                  id="offcanvasStart"
                >
                  <div className="offcanvas-header">
                    <h5 id="offcanvasStartLabel" className="offcanvas-title">
                      Wish list
                    </h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body mx-0 flex-grow-1">
                    <table className="tabs-table">
                      <tbody>
                        {wishlist &&
                          wishlist.length &&
                          wishlist.map((ival, i) => {
                            return (
                              <tr>
                                <td>
                                  <figure className="user-avatar">
                                    <img
                                      src={ival.img}
                                      alt=""
                                    />
                                  </figure>
                                </td>
                                <td>
                                  <div className="user-live-details">
                                    <h6>{ival.title}</h6>
                                    <ul>
                                      <li>{ival.Project}</li>
                                      <li>{ival.Course}</li>
                                      <li>{ival.StartAt}</li>
                                    </ul>
                                  </div>
                                </td>
                                {/* <td>
                            <figure className="user-rec">
                              <img src="assets/img/custom/rec-img.svg" />
                            </figure>
                          </td> */}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    {/* <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    className="form-control mb-3"
                    id="exampleFormControlTextarea1"
                    style={{ minWidth: '50px', minHeight: '500px' }}
                  ></textarea> */}
                    {/* <button className="btn btn-primary" style={{ float: 'right' }} onClick={handleSave}>
                    Save
                  </button> */}
                  </div>
                </div>
              </div>
              {/* <div className="box-content">
                <p style={{ width: "150px" }}>
                  Learner's BucketList
                  {/* /<br /> Bucket List */}
              {/* </p> */}
              {/* <span>Customize Course</span> */}

              {/* </div> */} *

              <div className="box-content">
                <div className="d-flex flex-column icon-box-1 icon-box-2">
                  <h6 style={{ fontSize: "large" }} className="mb-0">
                    Learner's BucketList
                  </h6>
                  {/* <hr /> */}

                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2 box-content">
                    <span
                      className="mb-0"
                      style={{
                        color: "brown",
                        marginLeft: "40px",
                        marginBottom: "40px",
                      }}
                    >
                      <span style={{ color: "brown" }}>Your Customize Target pipeline </span>
                    </span>
                    <div style={{ alignItems: "end" }}>
                      <span className="d-flex justify-content-center">
                        <i className="fas fa-file-lines"></i>
                      </span>
                      <h6 style={{ color: "blue" }} className="is-pink">View-in-Details</h6>
                    </div>
                  </div>
                </div>
                {/* </div>
            </a> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
  // return (
  //   <>
  //     {type === 'button' ? (
  //       <div>
  //         <button type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasStart" className="btn rounded-pill btn-icon btn-primary" data-bs-placement="top" title='BucketList' onClick={handleFetch}>
  //           <span className="tf-icons bx bx-notepad"></span>
  //         </button>

  //         <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasStart">
  //           <div className="offcanvas-header">
  //             <h5 id="offcanvasStartLabel" className="offcanvas-title">BucketList</h5>
  //             <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  //           </div>
  //           <div className="offcanvas-body mx-0 flex-grow-1">
  //             <textarea
  //               value={inputValue}
  //               onChange={handleInputChange}
  //               className="form-control mb-3"
  //               id="exampleFormControlTextarea1"
  //               style={{ minWidth: '50px', minHeight: '500px' }}
  //             ></textarea>
  //             <button className="btn btn-primary" style={{ float: 'right' }} onClick={handleSave}>
  //               Save
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ) : type === 'img' ? (
  //       <div>
  //         <div className="card mb-4">
  //           <div className="card-body">
  //             <div className="d-flex icon-box-1 icon-box-lg">
  //               <div className="me-3">
  //                 <button type='img'
  //                   data-bs-toggle="offcanvas"
  //                   data-bs-target="#offcanvasStart"
  //                   data-bs-placement="top"
  //                   title='BucketList' style={{ border: "none", background: "none" }} onClick={handleFetch}>
  //                   <span className=" rounded">
  //                     <img src="assets/img/custom/completed.svg" className="icon-img" alt="Completed icon" />
  //                   </span>
  //                 </button>

  //                 <div className="offcanvas offcanvas-end" tabIndex="-1"
  //                   id="offcanvasStart"
  //                 >
  //                   <div className="offcanvas-header">
  //                     <h5 id="offcanvasStartLabel" className="offcanvas-title">Wish list</h5>
  //                     <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  //                   </div>
  //                   <div className="offcanvas-body mx-0 flex-grow-1">
  //                     {/* <textarea
  //                       value={inputValue}
  //                       onChange={handleInputChange}
  //                       className="form-control mb-3"
  //                       id="exampleFormControlTextarea1"
  //                       style={{ minWidth: '50px', minHeight: '500px' }}
  //                     ></textarea> */}
  //                     {/* <button className="btn btn-primary" style={{ float: 'right' }} onClick={handleSave}>
  //                       Save
  //                     </button> */}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="box-content">
  //                 <p>Learners' Wish List
  //                   {/* /<br /> Bucket List */}
  //                 </p>
  //                 <span>List of skils to acquire & Target Timeline</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //       </div>
  //     ) : null
  //     }
  //   </>
  // );
}

export default Bucketlist;