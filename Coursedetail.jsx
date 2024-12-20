// import React from "react";

// import Bucketlist from "./Bucketlist";
// import Arrow from "./arrow";
// function Coursedetail() {
//   let Outline = [
//     {
//       id: 1,
//       title: "Introduction to Business Intelligence",
//       link: "/coursevideo",
//     },
//     {
//       id: 1,
//       title: "Self-Service Business Intelligence (SSBI)",
//       link: "/coursevideo",
//     },
//     {
//       id: 1,
//       title: "Uses of Power BI",
//       link: "/coursevideo",
//     },
//     {
//       id: 1,
//       title: "Power BI vs. Tableau vs. QlikView",
//       link: "/coursevideo",
//     },
//     {
//       id: 1,
//       title: " Traditional BI vs. Power BI",
//       link: "/coursevideo",
//     },
//     {
//       id: 1,
//       title: "Data model and importance of Data Modeling",
//       link: "/coursevideo",
//     },
//   ];
//   return (
//     <div class="content-wrapper">
//       <div class="container-fluid flex-grow-1 container-p-y">
//         <div class="row">
//           <div class="col-md-12 col-lg-8 mb-4">
//             <div class="nav-align-top pills-style">
//               <ul class="nav nav-pills nav-justified mb-3" role="tablist">
//                 <li class="nav-item" role="presentation">
//                   <button
//                     type="button"
//                     class="nav-link active"
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-pills-top-home"
//                   >
//                     Home
//                   </button>
//                 </li>
//                 <li class="nav-item" role="presentation">
//                   <button
//                     type="button"
//                     class="nav-link"
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-pills-top-profile"
//                     tabindex="-1"
//                   >
//                     Announcements
//                   </button>
//                 </li>
//                 <li class="nav-item" role="presentation">
//                   <button
//                     type="button"
//                     class="nav-link"
//                     role="tab"
//                     data-bs-toggle="tab"
//                     data-bs-target="#navs-pills-top-messages"
//                     tabindex="-1"
//                   >
//                     Messages
//                   </button>
//                 </li>
//               </ul>
//               <div class="tab-content">
//                 <div
//                   class="tab-pane fade active show"
//                   id="navs-pills-top-home"
//                   role="tabpanel"
//                 >
//                   <div class="material-accord">
//                     <div class="accordion has-left-arrow" id="course-overview">
//                       <div class="card accordion-item active">
//                         <h2 class="accordion-header">
//                           <button
//                             type="button"
//                             class="accordion-button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#course-overview-one"
//                           >
//                             Introduction to Power BI
//                           </button>
//                         </h2>

//                         <div
//                           id="course-overview-one"
//                           class="accordion-collapse collapse show"
//                           data-bs-parent="#course-overview"
//                         >
//                           <div class="accordion-body">
//                             <div class="material-list">
//                               <ul>
//                                 {Outline &&
//                                   Outline.map((ival, i) => {
//                                     return (
//                                       <>
//                                         {i === 0 ? <Arrow /> : ""}
//                                         <li>
//                                           <a href={ival.link}>
//                                             <i class="bx bx-file"></i>
//                                             {ival.title}
//                                           </a>
//                                         </li>
//                                       </>
//                                     );
//                                   })}

//                                 {/* <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       <i class="bx bx-file"></i>
//                                       Course Outline
//                                     </a>
//                                   </li> */}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card accordion-item">
//                         <h2 class="accordion-header">
//                           <button
//                             type="button"
//                             class="accordion-button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#course-overview-two"
//                           >
//                             Power BI Desktop and Data Transformation
//                           </button>
//                         </h2>

//                         <div
//                           id="course-overview-two"
//                           class="accordion-collapse collapse "
//                           data-bs-parent="#course-overview"
//                         >
//                           <div class="accordion-body">
//                             <div class="material-list">
//                               <ul>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Business Intelligence
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Self-Service Business Intelligence (SSBI)
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Traditional BI vs. Power BI
//                                   </a>
//                                 </li>

//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Power BI vs.
//                                     Tableau vs. QlikView
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Uses of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>The Flow of Work
//                                     in Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Working with Power
//                                     BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Basic Components
//                                     of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Comparison of
//                                     Power BI Version
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Introduction to
//                                     Building Blocks of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Data model and
//                                     importance of Data Modeling
//                                   </a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card accordion-item">
//                         <h2 class="accordion-header">
//                           <button
//                             type="button"
//                             class="accordion-button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#course-overview-three"
//                           >
//                             Data Analysis Expression (DAX)
//                           </button>
//                         </h2>

//                         <div
//                           id="course-overview-three"
//                           class="accordion-collapse collapse "
//                           data-bs-parent="#course-overview"
//                         >
//                           <div class="accordion-body">
//                             <div class="material-list">
//                               <ul>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Business Intelligence
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Self-Service Business Intelligence (SSBI)
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Traditional BI vs. Power BI
//                                   </a>
//                                 </li>

//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Power BI vs.
//                                     Tableau vs. QlikView
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Uses of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>The Flow of Work
//                                     in Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Working with Power
//                                     BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Basic Components
//                                     of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Comparison of
//                                     Power BI Version
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Introduction to
//                                     Building Blocks of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Data model and
//                                     importance of Data Modeling
//                                   </a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card accordion-item">
//                         <h2 class="accordion-header">
//                           <button
//                             type="button"
//                             class="accordion-button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#course-overview-four"
//                           >
//                             Data Visualization
//                           </button>
//                         </h2>

//                         <div
//                           id="course-overview-four"
//                           class="accordion-collapse collapse "
//                           data-bs-parent="#course-overview"
//                         >
//                           <div class="accordion-body">
//                             <div class="material-list">
//                               <ul>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Business Intelligence
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Self-Service Business Intelligence (SSBI)
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Traditional BI vs. Power BI
//                                   </a>
//                                 </li>

//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Power BI vs.
//                                     Tableau vs. QlikView
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Uses of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>The Flow of Work
//                                     in Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Working with Power
//                                     BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Basic Components
//                                     of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Comparison of
//                                     Power BI Version
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Introduction to
//                                     Building Blocks of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Data model and
//                                     importance of Data Modeling
//                                   </a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="card accordion-item">
//                         <h2 class="accordion-header">
//                           <button
//                             type="button"
//                             class="accordion-button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#course-overview-four"
//                           >
//                             Data Visualization
//                           </button>
//                         </h2>

//                         <div
//                           id="course-overview-four"
//                           class="accordion-collapse collapse "
//                           data-bs-parent="#course-overview"
//                         >
//                           <div class="accordion-body">
//                             <div class="material-list">
//                               <ul>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Business Intelligence
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Self-Service Business Intelligence (SSBI)
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Introduction to Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>
//                                     Traditional BI vs. Power BI
//                                   </a>
//                                 </li>

//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Power BI vs.
//                                     Tableau vs. QlikView
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Uses of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>The Flow of Work
//                                     in Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Working with Power
//                                     BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Basic Components
//                                     of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Comparison of
//                                     Power BI Version
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Introduction to
//                                     Building Blocks of Power BI
//                                   </a>
//                                 </li>
//                                 <li>
//                                   <a href="#">
//                                     <i class="bx bx-file"></i>Data model and
//                                     importance of Data Modeling
//                                   </a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   class="tab-pane fade"
//                   id="navs-pills-top-profile"
//                   role="tabpanel"
//                 >
//                   <p>
//                     Donut dragée jelly pie halvah. Danish gingerbread bonbon
//                     cookie wafer candy oat cake ice cream. Gummies halvah
//                     tootsie roll muffin biscuit icing dessert gingerbread.
//                     Pastry ice cream cheesecake fruitcake.
//                   </p>
//                   <p class="mb-0">
//                     Jelly-o jelly beans icing pastry cake cake lemon drops.
//                     Muffin muffin pie tiramisu halvah cotton candy liquorice
//                     caramels.
//                   </p>
//                 </div>
//                 <div
//                   class="tab-pane fade"
//                   id="navs-pills-top-messages"
//                   role="tabpanel"
//                 >
//                   <p>
//                     Oat cake chupa chups dragée donut toffee. Sweet cotton candy
//                     jelly beans macaroon gummies cupcake gummi bears cake
//                     chocolate.
//                   </p>
//                   <p class="mb-0">
//                     Cake chocolate bar cotton candy apple pie tootsie roll ice
//                     cream apple pie brownie cake. Sweet roll icing sesame snaps
//                     caramels danish toffee. Brownie biscuit dessert dessert.
//                     Pudding jelly jelly-o tart brownie jelly.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="col-md-12 col-lg-4">
//             <div class="card mb-4">
//               <div class="card-body">
//                 <div class="progress-wrap mb-4">
//                   <div class="progress-title">
//                     <h6>Trainings Programs</h6>
//                     <span>80</span>
//                   </div>
//                   <div class="progress">
//                     <div
//                       class="progress-bar"
//                       role="progressbar"
//                       style={{ width: "25%" }}
//                     ></div>
//                   </div>
//                 </div>
//                 <div class="progress-wrap mb-4">
//                   <div class="progress-title">
//                     <h6>Wishlist</h6>
//                     <span>15</span>
//                   </div>
//                   <div class="progress">
//                     <div
//                       class="progress-bar"
//                       role="progressbar"
//                       style={{ width: "50%" }}
//                     ></div>
//                   </div>
//                 </div>
//                 <div class="progress-wrap">
//                   <div class="progress-title">
//                     <h6>Appointments Booking & Cancellation</h6>
//                     <span>114</span>
//                   </div>
//                   <div class="progress">
//                     <div
//                       class="progress-bar"
//                       role="progressbar"
//                       style={{ width: "75%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <div class="card mb-4">
//               <div class="card-body">
//                 <div class="d-flex icon-box-1 icon-box-lg">
//                   <div class="me-3">
//                     <span class="rounded">
//                       <img src="assets/img/custom/completed.svg" class="icon-img" />
//                     </span>
//                   </div>
//                   <div class="box-content">
//                     <p>Learners' Wish List /<br /> Bucket List</p>
//                     <span>List of skils to acquire & Target Timeline</span>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//             <Bucketlist type="img" />
//             <div class="card refer-tab mb-4">
//               <div class="card-header">
//                 <h4>Refer and Earn</h4>
//               </div>
//               <div class="card-body">
//                 <form>
//                   <div class="input-group">
//                     <input
//                       type="emai"
//                       class="form-control"
//                       placeholder="Enter the Email id"
//                     />
//                     <button class="btn" type="button" id="button-addon2">
//                       Refer Now
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="content-backdrop fade"></div>
//     </div>
//   );
// }

// export default Coursedetail;
