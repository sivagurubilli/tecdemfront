import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../middleware/api";
import { toast } from "react-toastify";
import endpoints from "../../middleware/endpoint";
import Styles from "./forgotpassword.module.css";
import { BOLoading } from "../elements/elements";
import { useFormik } from "formik";
import { ForgotPasswordValidation } from "../ValidationSchema";
import { Box, Text } from "@chakra-ui/react";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import PasswordStrengthBar from "../PasswordStrengthBar/PasswordStrengthBar";
import { getID } from "../../siteConfig";
import { decrypt, getUserData } from "../../middleware/auth";

const ForgotPassword = (props) => {
  const { setShowForgotPasswordForm, email, setEmail } = props;
  const [loading, setLoading] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [resetEmail, setResetEmail] = useState(email);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [userDetails, setUserDetails] = useState({})

  const navigate = useNavigate();

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
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ForgotPasswordValidation,
    onSubmit: (values) => {
      handleResetPasswordSubmit(values);
    },
  });



  useEffect(() => {
    try {
      if (getID('userData')) {
        const userDetails = getUserData().userdata;
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    console.log(userDetails)
  }, [])

  const handleForgotPasswordSubmit = (e) => {
    try {
      e.preventDefault();
      if (resetEmail === "") {
        return toast.error("Email is required!", {
          pauseOnHover: false
        });
      } else {
        setLoading(true);
        post(endpoints.sendotp, { email: resetEmail })
          .then((response) => {
            setLoading(false);
            toast.success(response.data.status.message, {
              pauseOnHover: false
            });
            // setShowForgotPasswordForm(false);
            setShowResetPasswordForm(true);
          })
          .catch((error) => {
            toast.error(error.response.data.status.message, {
              pauseOnHover: false
            });
            setLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPasswordChange = (evt) => {
    try {
      const { name, value } = evt.target;
      if (name === "resetCode") {
        setResetCode(value);
      } else if (name === "newPassword") {
        setNewPassword(value);
      } else if (name === "confirmPassword") {
        setConfirmPassword(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPasswordSubmit = (values) => {
    try {
      const { resetCode, newPassword, confirmPassword } = values;

      setLoading(true);
      post(endpoints.updatepassword, {
        email: resetEmail,
        otp: resetCode,
        newPassword: newPassword,
      })
        .then((response) => {
          setLoading(false);
          toast.success(response.data.status.message, {
            pauseOnHover: false
          });
          post(endpoints.sendemailupdate, {
            email: resetEmail,
          }).then((response) => {
            console.log(response);
          });
          setShowResetPasswordForm(false);
          setShowForgotPasswordForm(false);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response.data.status.message, {
            pauseOnHover: false
          });
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPasswordChange = (evt) => {
    setResetEmail(evt.target.value);
  };

  const togglePasswordVisibility = (name) => {
    try {
      setShowPassword((prev) => {
        return { ...prev, [name]: !prev[name] };
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      resetForm();
      setEmail("");
    };
  }, []);

  return (
    <>
      {showResetPasswordForm ? (
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} gap={'20px'} alignItems={'center'} width={{ base: '100%', md: '80%' }}>
            <h1 style={{ color: "black" }}>Reset Password</h1>
            <Box width={"100%"} position={"relative"}>
              <p className={Styles?.Label}>Reset Code</p>
              <input
                style={{ color: "black" }}
                type="text"
                name="resetCode"
                placeholder="Enter reset code"
                value={values?.resetCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {!!errors["resetCode"] && !!touched["resetCode"] ? (
                <Text className={Styles?.errorFieldLogin}>
                  {errors["resetCode"]}
                </Text>
              ) : (
                ""
              )}
            </Box>

            <Box width={"100%"} position={"relative"} className={Styles?.Box}>
              <p className={Styles?.Label}>New Password</p>
              <div className={Styles.passwordContainter}>

           
              <input
                style={{ color: "black" }}
                type={showPassword?.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={values?.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <i
                className={`fas ${showPassword?.newPassword ? "fa-eye" : "fa-eye-slash"} ${Styles?.Passwordeye}`}
                onClick={() => {
                  togglePasswordVisibility("newPassword");
                }}
              ></i>
                 </div>
              {!!errors["newPassword"] && !!touched["newPassword"] ? (
                <Text className={Styles?.errorFieldLogin}>
                  {errors["newPassword"]}
                </Text>
              ) : (
                ""
              )}

              <PasswordStrengthBar


                password={values?.newPassword}
              />
            </Box>

            <Box width={"100%"} position={"relative"}>
              <p className={Styles?.Label}>Confirm New Password</p>
              <div className={Styles.passwordContainter}>


                <input
                  type={showPassword?.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={values?.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className={`fas ${showPassword?.confirmPassword ? "fa-eye" : "fa-eye-slash"} ${Styles?.Passwordeye}`}
                  onClick={() => { togglePasswordVisibility("confirmPassword") }}></i>
              </div>
              {!!errors["confirmPassword"] && !!touched["confirmPassword"] ? (
                <Text className={Styles?.errorFieldLogin}>
                  {errors["confirmPassword"]}
                </Text>
              ) : (
                ""
              )}
            </Box>

            <div className={Styles?.forgotformButtons}>
              <button type="submit">
                {loading ? <BOLoading /> : "RESET PASSWORD"}
              </button>
              <button
                onClick={() => {
                  setShowForgotPasswordForm(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </Box>
        </form>
      ) : (




        <form onSubmit={handleForgotPasswordSubmit}>
          <Box display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} gap={'20px'} alignItems={'center'} width={{ base: '100%', md: '80%' }} >
            <h1>Forgot Password</h1>
            <input
              style={{ color: "black", width: '100%' }}
              type="email"
              placeholder="Enter your email"
              name="resetEmail"
              value={resetEmail}
              autocomplete="off"
              onChange={handleForgotPasswordChange}
            />
            <div className={Styles?.formButtons}>
              <button type="submit">
                {loading ? <BOLoading /> : "SEND RESET CODE"}
              </button>
              <button
                onClick={() => {
                  setShowForgotPasswordForm(false);
                  setResetEmail("");
                }}
                type="button"
              >
                Back
              </button>
            </div>
            <p>
              <b>Important:</b> Sometimes, the email might be directed to your
              spam or junk folder. If you don't see the email in your inbox,
              please check there as well.
            </p>
          </Box>
        </form >

      )}
    </>
  );
};

export default ForgotPassword;
