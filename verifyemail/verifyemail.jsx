import { Container } from "@chakra-ui/react";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TecButton } from "../elements/elements";
import { clearUserData, getUserData } from "../../middleware/auth";
import styles from "./verifyemail.module.css"
import endpoints from "../../middleware/endpoint";
import { toastError, toastSuccess } from "../../util_helper";
import { CallAPI } from "../../middleware/api";
import { RESEND_EMAIL_TIME, SERVER_URL } from "../../siteConfig";
import axios from "axios";
import { useDispatch } from "react-redux";

const VerifyEmail = ({ showVerifyEmail }) => {
  // const [user, setUser] = useState({});
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const userData = getUserData().userdata;
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const buttonRef = useRef(null);
  const intervalRef = useRef(null);
  const [buttonText, setButtonText] = useState("")
  const [resend, setResend] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(!!token)
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      startCountdown();
      return () => clearInterval(intervalRef.current); // Cleanup on unmount
    } catch (error) {
      console.error(error);
    }
  }, []);


  const startCountdown = () => {
    let countdownTime = RESEND_EMAIL_TIME;
    setResend(false)
    const updateButtonText = () => {
      const minutes = Math.floor(countdownTime / 60);
      const seconds = countdownTime % 60;
      setButtonText(`Resend Email (${minutes}:${seconds
        .toString()
        .padStart(2, "0")})`)
    };

    updateButtonText(); // Set initial text
    intervalRef.current = setInterval(() => {
      countdownTime--;
      updateButtonText();

      if (countdownTime <= 0) {
        clearInterval(intervalRef.current); // Clear interval
        setButtonText("Resend Email")
        setResend(true)
      }
    }, 1000);
  };

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/business/verify-email?token=${token}`);
      setMessage(response.status === 200 ?
        "Congratulations! Your email has been successfully verified."
        :
        "Email verification failed. Please try again."
      );
      setVerified(true)
    }
    catch (error) {
      console.error(error);
      setMessage("Email verification failed. Please try again.");
    } finally {
      setLoadingVerify(false);
    }
  }

  const handleSignUpPage = () => {
    try {
      navigate('/usertype');
      clearUserData(dispatch)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitEmail = async () => {
    try {
      setLoading(true);
      const res = await CallAPI(endpoints?.emailVerify, { email: userData?.bus_email });
      if (res?.status?.code === 200) {
        startCountdown();
        setMessage("")
        toastSuccess(res?.status?.message);
      } else {
        toastError(res?.status?.message);
      }
    } catch (error) {
      toastError(error?.response?.status?.message);
    } finally {
      setLoading(false);
    }
  }

  const handleUserLogin = () => {
    try {
      clearUserData(dispatch)
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container className={styles?.verifyContainer}>
      <form className={`marginTop-2 ${styles?.formContainer}`}>
        <h6>{message}</h6>
        {!!!message && <h4>Please check your email to verify the email.</h4>}
        {!verified && <Input placeholder="Enter your email" disabled value={userData?.bus_email} />}
        {!verified ? <TecButton
          className="tecPrimaryButton"
          title={buttonText}
          onClick={handleSubmitEmail}
          loading={loading}
          disabled={!resend}
          type='button'
        /> :
          <TecButton
            className="tecPrimaryButton"
            title={"Login"}
            onClick={handleUserLogin}
            type='button'
          />}
        <h5 onClick={handleSignUpPage}>Sign Up using another email</h5>
      </form>
    </Container>
  );
}



export default VerifyEmail;