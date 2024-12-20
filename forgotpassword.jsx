import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [state, setState] = useState({
    email: "",
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
      .post("http://localhost:8081/generate-otp", {
        params: {
          email: state.email,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          setSuccess(true);
          window.location.replace("/reset-password");
          setError(null); // Reset any previous error
        } else {
          setError(response.data.message || "Failed to send OTP.");
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to send OTP. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {error && <div className="error">{error}</div>}
        {success && <div className="success">OTP sent successfully!</div>}
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
