import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    pin: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, pin, newPassword, confirmPassword } = state;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        pauseOnHover: false
      });
      return;
    }

    post(endpoints.resetPassword, {
      email: email,
      pin: pin,
      newPassword: newPassword,
    })
      .then(function (response) {
        toast.success(response.data.status.message, {
          pauseOnHover: false
        });
        navigate("/signin");
      })
      .catch(function (error) {
        toast.error(error.response.data.status.message, {
          pauseOnHover: false
        });
      });
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleOnSubmit} style={{ display: "row" }}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Reset Pin"
          name="pin"
          value={state.pin}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={state.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
