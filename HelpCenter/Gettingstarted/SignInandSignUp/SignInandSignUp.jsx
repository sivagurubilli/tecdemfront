import React from 'react'
import Styles from "./SignInandSignUp.module.css"
import Leftbar from '../../LeftBar/Leftbar'
import { Image, Text } from '@chakra-ui/react'
import gettingstarted from "../../../../img/gettingstarted.png"
import usertype from "../../../../img/usertype.png"
import signin from "../../../../img/signIn.png"
import email from "../../../../img/email.png"
import verifyemail from "../../../../img/verifyemail.png"
import emailverification from "../../../../img/emailverification.png"
import Dashboard from "../../../../img/dashboard.png"
import login from "../../../../img/login.png"
import dashboard1 from "../../../../img/dashboard1.png"
import forgotpassword from "../../../../img/forgotpassword.png"
import resetpassword from "../../../../img/resetpassword.png"
import loginemail from "../../../../img/loginemail.png"

import { Link } from 'react-router-dom'


const SignInSignUp = () => {
  return (
    <div className={Styles?.container}>
        <div className={Styles?.header}>
        <div className={Styles.breadcrumbs}>
          <Link to={"/support"}>
          Home 
          </Link>
          &nbsp;&gt;&nbsp; 
          <Link to={"/gettingstarted"}>
          Getting Started
          </Link>
        </div>
          <div className={Styles?.Search}>
          <h1 className={Styles?.title}>Getting Started</h1>
          <input 
            type="text"
            className={Styles?.searchBar}
            placeholder="Search..."
            />
          </div>
        </div>
      <div className={Styles?.accountContainer}>
      <Leftbar />
        <div className={Styles?.content}>
          <h2>How to SignIn and SignUp into Tecdemy</h2>
          <ul className={Styles?.topicList}>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>This article explains how you can sign up for Tecdemy, while accessing Tecdemy on a desktop or laptop browser, and begin your learning experience today.</Text>
          <Link  className={Styles?.topicLink}>Sign up with an email and password</Link>
          <Text paddingBottom={"20px"}>Click <b>Get Started</b> button at the top right of your desktop or laptop browser.</Text>
          <Image src={gettingstarted} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>You will be redirected to <b>User type</b> Page. There are 4 types of users. Choose a type of user.</Text>
          <Image src={usertype} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"} paddingTop={"20px"}>After choosing the user type, you will be redirected to Sign-up page.</Text>
          <Image src={signin} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>Enter your First Name, Last name, Email id, Password & Confirm password and click <b>Sign</b> Up button. After entering the details, a mail will be sent to the mail id you entered. </Text>
          <Text paddingBottom={"20px"}><b>Please note:</b> To maintain a secure and reliable platform, we require email validation when signing up for a new account.  Please enter proper email id.</Text>
          <Image src={email} paddingBottom={"20px"}/>
          <Image src={verifyemail} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>Click the Verify Email link in the mail.  You will be redirected to Email Verification Success page. After that click the <b>Go to Dashboard</b> button. You will be redirected to your Dashboard page.</Text>
          <Image src={emailverification} paddingBottom={"20px"}/>
          <Image src={Dashboard} paddingBottom={"20px"}/>
          <Link  className={Styles?.topicLink}>Login with an email and password</Link>
          <Text paddingBottom={"20px"}>If you have already registered with us, you can login with Click <b>Login</b> button at the top right of your desktop or laptop browser before <b>Get started</b> button.</Text>
          <Image src={gettingstarted} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>You will be redirected to login page.</Text>
          <Image src={login} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>Select your role (Student/ University/ Mentor/Department/ admin). Enter your email id and password and click <b>Login</b> button. You will be redirected to the Dashboard page.</Text>
          <Image src={dashboard1} paddingBottom={"20px"}/>
          <Link  className={Styles?.topicLink}>Forgot Password ?</Link>
          <Text paddingBottom={"20px"}>If you can’t remember the password for your Tecdemy account, you can request a reset password email from the login page.</Text>
          <Image src={gettingstarted} paddingBottom={"20px"}/>
          <Image src={login} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>Please click <b>Forgot your password?</b> Link. You will be redirected to Forgot Password page. </Text>
          <Image src={forgotpassword} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>Enter your email id in the given text box, now click on Send Reset Code Button. You will be redirected to Reset Password page.  Check your inbox for the reset password email. The mail will have Reset code. </Text>
          <Text paddingBottom={"20px"}><b>Important:</b>  Sometimes, the email might be directed to your spam or junk folder. If you don't see the email in your inbox, please check there as well.</Text>
          <Image src={resetpassword} paddingBottom={"20px"}/>
          <Text paddingBottom={"20px"}>You can add the reset code (sent in mail), new password and confirm new password and then click <b>Reset Password</b> button. Password will be reset and you can login. After logging in, you will be redirected to your Dashboard page.</Text>
          <Image src={Dashboard} paddingBottom={"20px"}/>
          <Link  className={Styles?.topicLink}>Can’t find the reset password email?</Link>
          <Text paddingBottom={"20px"}>Sometimes, the email might be directed to your spam or junk folder. If you don't see the email in your inbox, please check there as well.</Text>
          <Link  className={Styles?.topicLink}>How to login using Google?</Link>
          <Text paddingBottom={"20px"}>Click the Google icon in the login page. A pop-up window will open with your Google accounts. Choose an account and you will be redirected to your Dashboard page.</Text>
          <Image src={login} paddingBottom={"20px"}/>
          <Image src={loginemail} paddingBottom={"20px"}/>
          
      </ul>
        </div>
      </div>
    </div>
  )
}

export default SignInSignUp