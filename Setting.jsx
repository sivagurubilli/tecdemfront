import React, { useState } from "react";
import Homepagefooter from "../Shared/Homepagefooter";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#0056b3"; // Change background color on hover
    e.target.style.color = "#f3f3fb"; // Change text color on hover
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#007bff"; // Revert background color on mouse leave
    e.target.style.color = "initial"; // Revert text color on mouse leave
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData === "") {
      alert("please fill the data");
    } else {
      localStorage.setItem("data", JSON.stringify(formData));
    }
    setFormData("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2
        style={{
          padding: "10px",
          "margin-bottom": "20px",
          "text-align": "center",
          "text-decoration": "none",
        }}
      >
        Account Settings
      </h2>
      {/* <div
        id="imgs"
        className="p-15 bg-image"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg?size=626&ext=jpg')",
        }}
      > */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          "border-radius": "5px",
          "justify-content": "center",
          "text-align": "center",
          "margin-left": "10px",
        }}
      >
        <div style={{ "margin-bottom": "15px", "text-align": "center" }}>
          <label style={{ "font-weight": "bold", "text-align": "center" }}>
            UserName:
          </label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: "40%",
              padding: "10px",
              border: "1px solid #007bff",
              "border-radius": "15px",
              " text-align": "center",
              "-webkit-border-radius": "15px",
              "-moz-border-radius": "15px",
              "-ms-border-radius": "15px",
              "-o-border-radius": "15px",
            }}
          />
        </div>
        <div style={{ "margin-bottom": "15px", "text-align": "center" }}>
          <label style={{ "font-weight": "bold", "text-align": "center" }}>
            UserEmail:
          </label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "40%",
              padding: "10px",
              border: "1px solid #007bff",
              "border-radius": "15px",
              " text-align": "center",
              "-webkit-border-radius": "15px",
              "-moz-border-radius": "15px",
              "-ms-border-radius": "15px",
              "-o-border-radius": "15px",
            }}
          />
        </div>
        <div style={{ "margin-bottom": "15px", "text-align": "center" }}>
          <label style={{ "font-weight": "bold", "text-align": "center" }}>
            Password:
          </label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "40%",
              padding: "10px",
              border: "1px solid #007bff",
              "border-radius": "15px",
              " text-align": "center",
              "-webkit-border-radius": "15px",
              "-moz-border-radius": "15px",
              "-ms-border-radius": "15px",
              "-o-border-radius": "15px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            "background-color": "#007bff",
            color: "black",
            padding: "10px 20px",
            border: "none",
            "border-radius": "15px",
            cursor: "pointer",
            "-webkit-border-radius": "15px",
            "-moz-border-radius": "15px",
            "-ms-border-radius": "15px",
            "-o-border-radius": "15px",
            "text-align": "center",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Save Changes
        </button>
      </form>
      {/* </div> */}
      <div className="my-4">
        <Homepagefooter />
      </div>
    </div>
  );
};

export default SettingsPage;
