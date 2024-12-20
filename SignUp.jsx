import React, { useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
import { CallAPI, post } from "../middleware/api";
import endpoints from "../middleware/endpoint";
import { toast } from "react-toastify";
import { decrypt, getUserData, setUserData } from "../middleware/auth";
import { GoogleLogin } from "react-google-login";
import "./login.css";
import { CLIENT_URL, getID, LINKEDIN_CLIENT_ID, removeID } from "../siteConfig";
import { BOLoading, TecButton } from "./elements/elements";
import { useFormik } from "formik";
import { SignupValidations } from "./ValidationSchema";
import { Box, Input, Text } from "@chakra-ui/react";
import learner from "../img/learner.svg";
import Mentor from "../img/Mentor.svg";
import university from "../img/university.svg";
import jobhunter from "../img/jobhunter.jpg";
// import enterprise from "../img/enterprise.svg";
import labelConfig from "./Config/labelConfig";

import linkedImg from '../assets/images/linkedin.png'
import logo from '../assets/images/logo.png'
import googleImg from '../assets/images/google-icon.png'
import { useDispatch } from "react-redux";
import { setMenus, setUser } from "../Redux/userSlice";
import { LinkedIn } from 'react-linkedin-login-oauth2';
import PasswordStrengthBar from "./PasswordStrengthBar/PasswordStrengthBar";


function SignUpForm({ click, setToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const usertype = location.state?.type;
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState([]);
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: getID("signUpAs"),
  });
  // const handleChange = (evt) => {
  //   const value = evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value,
  //   });
  // };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignupValidations,
      onSubmit: (values) => {
        setLoading(true);
        setError('')
        post(endpoints.businesssignUpData, {
          bus_email: values?.email,
          firstName: values?.firstname,
          lastName: values?.lastname,
          providerToken: "",
          loginType: "system",
          password: values?.password,
          roles: state?.roles,
        })
          .then(function (response) {
            const { data } = response;
            const { status, } = data;
            const { menus } = data.data
            delete data.data.menus;
            const { code } = status;
            dispatch(setMenus(menus));
            dispatch(setUser(data.data))
            setUserData(response.data.session.token, response.data.data, () => {
              navigate(`/verify-email`);
            });
            setToken(response?.data?.session?.token);
            setLoading(false);
            removeID("signUpAs");
          })
          .catch(function (error) {
            toast.error(error, {
              pauseOnHover: false
            });
            setError(error?.response?.data?.status?.message)
            setLoading(false);
          });
      },
    });


  useEffect(() => {
    if (!!error) {
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }, [error])

  useEffect(() => {
    try {
      if (getID("userData")) {
        const userDetails = JSON.parse(decrypt(getID("userData")));
        const { email_verified } = userDetails;
        if (!email_verified) {
          navigate("/homepage");
          return;
          // messageService.sendMessage("dashboardLayout", { show: true, userDetails }, "popup")
        }
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          // "37328393083-82ohsmb7r5m7mfhm456df6rgvmvgo1u0.apps.googleusercontent.com",
          "876923538782-d55vqdnf0okib0jp2h19t5gipbhu94pa.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    try {
      setLoading(true);
      post(endpoints.businesssignUpData, {
        bus_email: response.profileObj.email,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        providerToken: response.profileObj.googleId,
        loginType: "google",
        roles: state?.roles,
      })
        .then(function (response) {
          // navigate("/dashboard");
          // dispatch(setMenus(response.data.data));
          dispatch(setMenus(response.data.data.menus));
          delete response.data.data.menus
          dispatch(setUser(response.data.data));
          setUserData(
            response.data.session.token,
            response.data.data,
            navigate
          );
          setToken(response?.data?.session?.token);

          setLoading(false);
          removeID("signUpAs");
        })
        .catch(function (error) {
          toast.error(error.response.data.status.message, {
            pauseOnHover: false
          });
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const onFailure = (response) => {
    toast.error("FAILED", {
      pauseOnHover: false
    });
    setLoading(false);
  };
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const handleSuccess = (code) => {
    console.log("Authorization code:", code);

    // Send the authorization code to your backend
    fetch('http://localhost:9011/api/user/LinkedIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }), // Send the code to backend
    })
      .then(response => response.json())
      .then(data => {
        console.log("User data received:", data);
        // Proceed with your application logic, like redirecting the user or storing user data
      })
      .catch(error => {
        console.error("Error during LinkedIn authentication:", error);
      });
  };


  const popupRef = useRef(null);

  const handlogin = async () => {
    const clientId = LINKEDIN_CLIENT_ID;
    const redirectUri = `${CLIENT_URL}/linkedin`;
    const scope = "openid profile email";
    const state = 'someRandomString';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;


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

    const popupTimer = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(popupTimer);
        console.log("Popup closed by the user");
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
          const response = await CallAPI(endpoints?.linkedInLoginSignUp, { code, userType: state?.roles })

          if (response?.status?.code == 200) {
            toast.success(response?.status?.message, {
              pauseOnHover: false
            })
            setUserData(
              response?.session?.token,
              response?.data,
              navigate
            );
            dispatch(setMenus(response?.data?.menus))
            delete response?.data?.menus;
            dispatch(setUser(response?.data))
            const { id } = response?.data;
            setContext(prevContext => ({
              ...prevContext,
              userId: id
            }));
            setToken(response?.session?.token);
            setLoading(false)
            return
          }
          toast.error(response?.status?.message, {
            pauseOnHover: false
          });
        } catch (error) {
          setLoading(false)
          toast.error(error?.response?.status?.message, {
            pauseOnHover: false
          });
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
            style={{ margin: "26px 0px", width: '250px' }}
            className="brand-svg"
            alt=".."
          />
        </a>
      </div>
      <div className="App ">
        <div className="logincontainer right-panel-active" id="container">
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                {getID("signUpAs") == "student" && (
                  <>
                    <h1 style={{ color: "white" }}>Student Registration </h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      {labelConfig?.lbl_signup_page_title}
                    </h9>
                    <img
                      src={learner}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {getID("signUpAs") == "mentor" && (
                  <>
                    <h1 style={{ color: "white" }}>Mentor Registration</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      style={{ height: "350px" }}
                      src={Mentor}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {getID("signUpAs") == "university" && (
                  <>
                    <h1 style={{ color: "white" }}>University Registration</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      style={{ height: "350px" }}
                      src={university}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {getID("signUpAs") == "admin" && (
                  <>
                    <h1 style={{ color: "white" }}>Admin Registration</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      src={jobhunter}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {getID("signUpAs") == "department" && (
                  <>
                    <h1 style={{ color: "white" }}>Department Registration</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      src={""}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
                {getID("signUpAs") == "guest" && (
                  <>
                    <h1 style={{ color: "white" }}>Guest Registration</h1>
                    <h9 style={{ color: "white", marginBottom: "30px" }}>
                      Please enter your personal details and start journey with
                      us
                    </h9>
                    <img
                      src={""}
                      class="img-thumbnail"
                      alt="learner"
                    ></img>
                  </>
                )}
              </div>
              <div className={`form-container sign-up-container padding-2 `} >
                <form onSubmit={handleSubmit}>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    marginBottom={"10px"}
                  >
                    <Box width={"100%"} position={"relative"}>
                      <p className="Label">First Name</p>
                      <Input
                        type="text"
                        name="firstname"
                        value={values?.firstname}
                        onChange={handleChange}
                        placeholder="First name"
                        onBlur={handleBlur}
                        autocomplete="off"
                        backgroundColor={"#eee"}
                      />
                      {!!errors["firstname"] && !!touched["firstname"] ? (
                        <Text className="errorFieldSignup">
                          {errors["firstname"]}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box width={"100%"} position={"relative"}>
                      <p className="Label">Last Name</p>
                      <input
                        type="text"
                        name="lastname"
                        value={values?.lastname}
                        onChange={handleChange}
                        placeholder="Last name"
                        onBlur={handleBlur}
                        autocomplete="off"
                      />
                      {!!errors["lastname"] && !!touched["lastname"] ? (
                        <Text className="errorFieldSignup">
                          {errors["lastname"]}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>

                  <Box width={"100%"} position={"relative"}>
                    <p className="Label">Email</p>
                    <input
                      type="text"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      placeholder="Email"
                      onBlur={handleBlur}
                      autocomplete="off"
                    />
                    {!!errors["email"] && !!touched["email"] ? (
                      <Text className="errorFieldSignup">
                        {errors["email"]}
                      </Text>
                    ) : (
                      ""
                    )}
                  </Box>

                  <Box width={"100%"} position={"relative"}>
                    <p className="Label">Password</p>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values?.password}
                      onChange={handleChange}
                      placeholder="Password"
                      onBlur={handleBlur}
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "18px",
                        marginTop: "5%",
                        color: "#00000099",
                        cursor: "pointer",
                      }}
                    ></i>
                    {!!errors["password"] && !!touched["password"] ? (
                      <Text className="errorFieldSignup">
                        {errors["password"]}
                      </Text>
                    ) : (
                      ""
                    )}
                    {/* <PasswordStrengthBar
                      style={{ marginTop: "15px" }}
                      password={values?.password}
                    /> */}
                    <PasswordStrengthBar password={values?.password} />
                  </Box>

                  <Box width={"100%"} position={"relative"} marginBottom="5%">
                    <p className="Label">Confirm Password</p>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={values?.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      onBlur={handleBlur}
                    />
                    <i
                      className={`fas ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "18px",
                        marginTop: "5%",

                        color: "#00000099",
                        cursor: "pointer",
                      }}
                    ></i>
                    {!!errors["confirmPassword"] &&
                      !!touched["confirmPassword"] ? (
                      <Text className="errorFieldSignup">
                        {errors["confirmPassword"]}
                      </Text>
                    ) : (
                      ""
                    )}
                  </Box>

                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
                  <TecButton type="submit" loading={loading}>Sign up</TecButton>
                  {error && (<p className="error-message marginTop-2">{error}</p>)}

                  <p className="marginTop-2" style={{ display: 'block', margin: '100px 0px' }}>
                    {labelConfig?.lbl_already_account}{" "}
                    <Link to={'/login'} className="dont_have_account">
                      {labelConfig?.lbl_login_here}
                    </Link>
                  </p>
                  <span className="paddingTopBottom-2">{labelConfig?.lbl_or_user_email}</span>
                  <div className="social-container">
                    <GoogleLogin
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      render={(renderProps) => (
                        <div className="social">
                          <img
                            src={googleImg}
                            style={{ width: "25px" }}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            alt=".."
                          />
                        </div>
                      )}
                    />
                    <div className="social">
                      <img
                        onClick={handlogin}
                        src={linkedImg}
                        style={{ width: "25px" }}
                        alt="Sign up with Linked In"
                      />
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
