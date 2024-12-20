import React from "react";
import Styles from "./PaymentSuccess.module.css";
import { TecButton } from "../elements/elements";
import { useNavigate } from "react-router-dom";

const Paymentsuccessful = () => {
  const navigate = useNavigate()
  return (
    <div className={Styles?.Container}>
      <div className={Styles?.Icon}>
        <i className="far fa-circle-check"></i>
      </div>
      <div className={Styles?.Thank}>Thank You</div>
      <div className={Styles?.Para}>
        Purchase has been completed successfully.
      </div>
      <TecButton 
      title="My Courses"
      className="tecSecondaryButton marginRight-1 marginTop-2"
      onClick={() => {
            navigate("/mycourse")                        
      }}/>
    </div>
  );
};

export default Paymentsuccessful;
