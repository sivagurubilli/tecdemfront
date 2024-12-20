import React from "react";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Styles from "./Arrow.module.css"

export default function Arrow(params) {
  let st = null;
  let show = true;
  let dash = false;
  const location = useLocation();
  const pagefun = () => {
    let page = JSON.parse(localStorage.getItem("page"));
    page &&
      page.map((ival, i) => {
        if (ival.pages === location.pathname) {
          ival.status = true;
        }
        return ival.status;
      });
    if (location.pathname === "/Dashboard") {
      let d = page && page.filter((a) => a.status === false);
      if (d && d.length) {
        dash = "course";
        page.map((ival) => {
          if (ival.pages === "/Dashboard") {
            ival.status = true;
          }
          return ival.status;
        });
      } else {
        dash = "course";
      }
    }
    localStorage.setItem("page", JSON.stringify(page));
    let d = page && page.filter((a) => a.status === false);
    if (d.length === 0) {
      localStorage.setItem("demo", "no");
    }
  };
  if (localStorage.getItem("demo") !== "no") {
    localStorage.setItem("demo", "yes");
    if (location.pathname === "/course-detail") {
      // st = { top: "-65px", left: "-30px" }
    } else {
      st = null;
    }
    let pages = localStorage.getItem("page");
    if (pages) {
      pagefun();
    } else {
      localStorage.setItem(
        "page",
        JSON.stringify([
          { index: 1, pages: "/", status: false },
          { index: 2, pages: "/Innertechpage", status: false },
          { index: 3, pages: "/cart", status: false },
          { index: 4, pages: "/checkout", status: false },
          { index: 5, pages: "/orderconfirm", status: false },
          { index: 6, pages: "/mycourse", status: false },
          { index: 7, pages: "/course-detail", status: false },
          { index: 8, pages: "/course-video", status: false },
          { index: 9, pages: "/Dashboard", status: false },
        ])
      );
      pagefun();
    }
    if (params && params.id && location.pathname !== "/Dashboard") {
      show = false;
    }
    if (location.pathname === "/Dashboard") {
      if (dash === "dashboard" && params.id === "dashboard") {
        return (
          <div className="box1">
            <div className="boxss" style={st}>
              <button
                type="button"
                className={`btn rounded-pill btn-icon ${Styles?.btnprimary} animated tada`}
                data-bs-toggle="tooltip"
                data-bs-offset="0,4"
                data-bs-placement="bottom"
                data-bs-html="true"
                data-bs-original-title="Click Here"
              >
                <FaHeart color="red" />
              </button>
            </div>
          </div>
          // <div class="box1"><div class="boxss" style={st}><span>click here</span></div></div>
        );
      } else if (dash === "course" && params.id === "course") {
        return (
          <div className="box1">
            <div className="boxss" style={{ marginLeft: -50 }}>
              {" "}
              <button
                type="button"
                className={`btn rounded-pill btn-icon ${Styles?.btnprimary} animated tada`}
                data-bs-toggle="tooltip"
                data-bs-offset="0,4"
                data-bs-placement="bottom"
                data-bs-html="true"
                data-bs-original-title="Click Here"
              >
                <FaHeart color="red" />
              </button>
            </div>
          </div>

          // <div class="box1"><div class="boxss" style={st}><span>click here</span></div></div>
        );
      }
    } else {
      return show ? (
        <div className="box1">
          <div className="boxss" style={st}>
            {" "}
            <button
              type="button"
              className={`btn rounded-pill btn-icon ${Styles?.btnprimary} animated tada`}
              data-bs-toggle="tooltip"
              data-bs-offset="0,4"
              data-bs-placement="bottom"
              data-bs-html="true"
              data-bs-original-title="Click Here"
            >
              <FaHeart color="red" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      );
    }
  } else {
    return <></>;
  }
}
