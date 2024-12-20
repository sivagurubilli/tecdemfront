import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
// import apiUrl from '../middleware/api'
import endpoints from '../middleware/endpoint'
import { getUserData } from '../middleware/auth';

const OTPPage = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const handleOTPChange = (index, value) => {
    if (value.match(/^[0-9]$/) && index >= 0 && index <= 5) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      // Automatically focus on the next input
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "" && index >= 0 && index <= 5) {
      // If backspace is pressed or the input is empty, focus on the previous input and clear its value
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
        if (newOTP[index - 1] === "") {
          newOTP[index - 1] = "";
          setOTP(newOTP);
        }
      }
    }

  };
  const handleVerifyOTP = () => {
    const otpValue = otp.join("");
    if (otpValue.length > 5) {
      axios.post(endpoints.verifyemailOtp, {
        "userId": getUserData().userData.id,
        "otp": otpValue
      })
        .then(function (response) {
          toast.success(response.data.status.message, {
            pauseOnHover: false
          });
        })
        .catch(function (error) {
          toast.error(error.response.data.status.message, {
            pauseOnHover: false
          })
        });
    } else {
      toast.error('please enter the valid otp', {
        pauseOnHover: false
      })
    }
  };
  return (
    <div className="maindiv">
      <div className="logodata">
        <a href="" className="">
          <img src="/assets/images/logo.png" style={{ margin: "26px 0px" }} className="brand-svg" />
        </a>
      </div>

      <div className="top-contains">
        <div className="otp-container">
          <h2>Enter OTP</h2>
          <div className="otp-inputs">
            {otp.map((value, index) => (
              <input
                className="otpclassinput"
                id={`otp-input-${index}`}
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                maxLength="1"
              />
            ))}
          </div>
          <button className="otpbutton" style={{ marginTop: "20px" }} onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
