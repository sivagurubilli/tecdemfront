import React, { useContext, useEffect, useRef, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { CallAPI, post } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { decrypt, setUserData } from "../middleware/auth";
import "./login.css";
import learner from "../img/learner.svg";
import Mentor from "../img/Mentor.svg";
import university from "../img/university.svg";
import jobhunter from "../img/jobhunter.jpg";
import fogotPassImg from "../img/forgot_password.png";
import { USER_TYPES } from "./Config";
import { TecButton } from "./elements/elements";
import { useFormik } from "formik";
import { Box, Select, Text } from "@chakra-ui/react";
import { LoginPageValidations } from "./ValidationSchema";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { CLIENT_URL, getID, LINKEDIN_CLIENT_ID, setID } from "../siteConfig";
import { PurchasedListContext } from "../Context/PurchasedListContext";


import linkedlInImg from '../assets/images/linkedin.png'
import googleImg from '../assets/images/google-icon.png'
import logo from '../assets/images/logo.png'
import { useDispatch } from "react-redux";
import { setMenus, setUser } from "../Redux/userSlice";
import styles from "./SignIn.module.css"
import axios from "axios";

const SignInForm = ({ click, setToken }) => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [userDetails, setUserDetails] = useState({});
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    userType: "student",
  });
  const [resetEmail, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { context, setContext } = useContext(PurchasedListContext);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      userType: "",
      email: "",
      password: "",
    },
    validationSchema: LoginPageValidations,
    onSubmit: async (values) => {

      const { email, password, userType } = values;
      try {
        setLoading(true);
        const response = await post(endpoints?.businessloginData, {
          emailId: email,
          loginType: "system",
          password: password,
          userType: userType,
        })
        const { data } = response;
        const { status } = data;
        const { code } = status;
        if (code == 200) {
          dispatch(setUser(data?.data));
          dispatch(setMenus(data?.data?.menus));
          setUserData(
            response.data.session.token,
            response.data.data,
            navigate
          );
          const { id } = data?.data;
          setContext(prevContext => ({
            ...prevContext,
            userId: id
          }));
          setID("storedTimeFormat", data?.data?.time_format);
          setID("storedDateFormat", data?.data?.date_format);
          setID("storedTimeZone", data?.data?.time_zone);
          return;
        }
        setMessage(status?.message)
      } catch (error) {
        setMessage(error?.response?.data?.status?.message)
        toast.error(error?.response?.data?.status?.message, {
          pauseOnHover: false
        });
        console.log(error)
      } finally {
        setLoading(false)
      }


    }
    // }
  });



  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        const { email_verified } = userDetails;
        if (!email_verified) {
          navigate("/verify-email");
          return;
          // messageService.sendMessage("dashboardLayout", { show: true, userDetails }, "popup")
        }
        // navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!!message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message])

  const handleForgotPasswordChange = (evt) => {
    // setResetEmail(evt.target.value);
  };

  const handleResetPasswordChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "resetCode") {
      setResetCode(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  // const handleOnSubmit = (evt) => {
  //   evt.preventDefault();

  //   const { email, password, userType } = state;

  //   setLoading(true)

  // };

  const handleForgotPasswordSubmit = (evt) => {
    evt.preventDefault();
    post(endpoints.sendotp, { email: resetEmail })
      .then((response) => {
        toast.success(response.data.status.message, {
          pauseOnHover: false
        });
        setShowForgotPasswordForm(false);
        setShowResetPasswordForm(true);
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.status.message, {
          pauseOnHover: false
        });
      });
  };

  const handleResetPasswordSubmit = (evt) => {
    evt.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        pauseOnHover: false
      });
      return;
    }
    post(endpoints.resetPassword, {
      email: resetEmail,
      code: resetCode,
      newPassword: newPassword,
    })
      .then((response) => {
        toast.success(response.data.status.message, {
          pauseOnHover: false
        });
        setShowResetPasswordForm(false);
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error?.response?.data.status.message, {
          pauseOnHover: false
        });
      });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "876923538782-d55vqdnf0okib0jp2h19t5gipbhu94pa.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    const { userType } = state;
    setLoading(true);

    post(endpoints.businessloginData, {
      emailId: response.profileObj.email,
      loginType: "google",
    })
      .then(function (response) {
        setLoading(false);
        setUserData(
          response?.data?.session?.token,
          response?.data?.data,
          navigate
        );
        const { id } = response?.data?.data;
        setContext(prevContext => ({
          ...prevContext,
          userId: id
        }));
        setToken(response?.data?.session?.token);
      })
      .catch(function (error) {
        setMessage(error?.response?.data?.status?.message)
        setLoading(false);
      });
    // }
  };

  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  const onLogoutSuccess = () => {
    console.log("SUCCESS LOG OUT");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPasswordForm = (e) => {
    e.preventDefault();
    setShowForgotPasswordForm(!showForgotPasswordForm);
  };

  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);


  const popupRef = useRef(null);

  const handlogin = async () => {
    const clientId = LINKEDIN_CLIENT_ID;
    const redirectUri = `${CLIENT_URL}/linkedin`;
    const scope = "openid profile email";
    const state = 'someRandomString';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    // Open LinkedIn auth in a popup window
    popupRef.current = window.open(
      authUrl,
      'LinkedInLogin',
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,
       top=0,left=0,width=${window.screen.width},height=${window.screen.height}`
    );

    if (!popupRef.current) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }

    // Check if the popup was closed by the user
    const popupTimer = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(popupTimer);
      }
    }, 500);
  };

  useEffect(() => {
    const handleAuthMessage = async (event) => {
      if (event.origin !== `${CLIENT_URL}`) return;

      const { type, code } = event.data;
      if (type === 'linkedinAuth' && code) {
        setLoading(true);
        if (popupRef.current) {
          popupRef.current.close();
        }

        try {
          // const response = await axios.post('http://localhost:9011/api/business/linkedIn', { code, userType: state?.userType });
          const response = await CallAPI(endpoints?.linkedInLoginSignUp, { code, userType: state?.userType })
          // console.log(response)
          if (response?.status?.code == 200) {
            dispatch(setUser(response?.data));
            dispatch(setMenus(response?.data?.menus));
            // toast.success(response?.status?.message, {
            //   pauseOnHover: false
            // })
            setUserData(
              response?.session?.token,
              response?.data,
              navigate
            );
            // console.log(response)

            const { id } = response?.data;
            setContext(prevContext => ({
              ...prevContext,
              userId: id
            }));
            setToken(response?.session?.token);
            setLoading(false)
            return
          }

          // toast.error(response?.status?.message, {
          //   pauseOnHover: false
          // });
        } catch (error) {
          setLoading(false)
          // toast.error(error?.response?.status?.message, {
          //   pauseOnHover: false
          // });
          console.error("Login failed:", error);
        }
      }


    };

    window.addEventListener('message', handleAuthMessage);


    return () => window.removeEventListener('message', handleAuthMessage);
  }, []);





  return (
    <div className=" maindiv">
      <div className="logodata">
        <a
          onClick={() => {
            navigate("/homepage");
          }}
          className=""
        >
          <img
            src={logo}
            // style={{ margin: "26px 0px" ,width:'250px'}}
            className={`brand-svg ${styles?.logoContainer}`}
            alt="logo"
          />
        </a>
      </div>
      <div className="App ">
        <div className="logincontainer" id="container">
          <div className="overlay-container">
            <div className="overlay">
              <div
                className="overlay-panel overlay-right"
                style={{ gap: "30px" }}
              >

                {showForgotPasswordForm ? (
                  <>

                    <img
                      src={fogotPassImg}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                ) : (
                  values?.userType == "" && (
                    <>
                      <h1 style={{ color: "white" }}>Select your role</h1>
                      <img
                        src={learner}
                        className="img-thumbnail"
                        alt="learner"
                      ></img>
                    </>
                  )
                )}
                {values?.userType == "student" && (
                  <>
                    <h1 style={{ color: "white" }}>Student Login</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      src={learner}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {values?.userType == "mentor" && (
                  <>
                    <h1 style={{ color: "white" }}>Mentor Login</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      style={{ height: "350px" }}
                      src={Mentor}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {values?.userType == "university" && (
                  <>
                    <h1 style={{ color: "white" }}>University Login</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      style={{ height: "350px" }}
                      src={university}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {values?.userType == "admin" && (
                  <>
                    <h1 style={{ color: "white" }}>Admin Login</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      src={jobhunter}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {values?.userType == "department" && (
                  <>
                    <h1 style={{ color: "white" }}>Department Login</h1>
                    <h9 style={{ color: "white" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      style={{ height: "350px" }}
                      src={university}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {values?.userType == "guest" && (
                  <>
                    <h1 style={{ color: "white" }}>Guest Login</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      // src={enterprise}
                      className="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}

              </div>
              <div className="form-container sign-in-container padding-2">
                {!showForgotPasswordForm ? (
                  <form onSubmit={handleSubmit}>
                    {/* <h1>Sign in</h1> */}

                    <Box
                      width={"100%"}
                      position={"relative"}
                      marginBottom={"15px"}
                    >
                      <p className="Label">Select your role</p>
                      <Select
                        aria-label="Default select example"
                        id="userTypeid"
                        name="userType"
                        value={values?.userType}
                        onChange={(e) => {
                          handleChange(e);
                          setState((prev) => {
                            return { ...prev, userType: e.target.value };
                          });
                        }}
                        onBlur={handleBlur}
                        variant="filled"

                        focusBorderColor="purple.400"
                        size="md"
                        color={'#000'}
                      >
                        {USER_TYPES.map((items, indx) => {
                          return (
                            <option key={indx} value={items?.tag}>
                              {items?.name}
                            </option>
                          );
                        })}
                      </Select>
                      {!!errors["userType"] && !!touched["userType"] ? (
                        <Text className="errorFieldLogin">
                          {errors["userType"]}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box width={"100%"} position={"relative"}>
                      <p className="Label">Email</p>
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={values?.email}
                        onChange={(e) => {
                          handleChange(e);
                          setEmail(e.target.value);
                        }}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {!!errors["email"] && !!touched["email"] ? (
                        <Text className="errorFieldLogin">
                          {errors["email"]}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box width={"100%"} position={"relative"} marginTop="10px">
                      <p className="Label">Password</p>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={values?.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <i
                        className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "18px",
                          top: "35px",
                          // marginTop: "21%",
                          color: "#00000099",
                          cursor: "pointer",
                        }}
                      ></i>
                      {!!errors["password"] && !!touched["password"] ? (
                        <Text className="errorFieldLogin">
                          {errors["password"]}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>

                    <a
                      style={{ color: "#333", cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPasswordForm(!showForgotPasswordForm);
                        resetForm();
                      }}
                    >
                      Forgot your password?
                    </a>
                    <p id="acontpara">
                      Don't have an account yet?{" "}
                      <Link to="/usertype" className="dont_have_account">Sign Up</Link>
                    </p>
                    <TecButton
                      type="submit"
                      loading={loading}
                    >Login
                    </TecButton>
                    <p className="error marginTop-2">{message} </p>

                    <span>or use your account</span>
                    <div className="social-container">


                      <GoogleLogin
                        clientId="876923538782-d55vqdnf0okib0jp2h19t5gipbhu94pa.apps.googleusercontent.com"
                        // "37328393083-82ohsmb7r5m7mfhm456df6rgvmvgo1u0.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        render={(renderProps) => (
                          <div className="social">
                            <img
                              src={googleImg}
                              style={{ width: "25px" }}
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              alt="google-icon"
                            />
                          </div>
                        )}
                      />
                      <div className="social" onClick={handlogin}>
                        <img
                          src={linkedlInImg}
                          style={{ width: "25px" }}
                          alt="linkedin"
                        />
                      </div>
                    </div>
                  </form>

                ) : (
                  <ForgotPassword
                    setShowForgotPasswordForm={setShowForgotPasswordForm}
                    email={resetEmail}
                    setEmail={setEmail}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;



