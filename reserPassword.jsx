import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [state, setState] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios
      .post("http://localhost:8081/reset-password", {
        email: state.email,
        newPassword: state.newPassword,
        otp: state.otp,
      })
      .then((response) => {
        if (response.data.status === "success") {
          window.location.replace("/login");
          setSuccess(true);
          setError(null);
        } else {
          setError(response.data.message || "Failed to reset password.");
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to reset password. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={state.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          required
        />
        <input
          type="text"
          name="otp"
          value={state.otp}
          onChange={handleChange}
          placeholder="OTP"
          required
        />
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Password reset successfully!</div>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
