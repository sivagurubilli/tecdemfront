import React, { useEffect, useState } from "react";
import "./login.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import HomepageHeader from "../Shared/Homepageheader";
import { useLocation, Link, useNavigate } from "react-router-dom";

// export default  function LoginDatas(props) {
//   let { state } = useLocation();

//   const [typestud, settypestud] = useState(state);

//   const [type, setType] = useState("signIn");
// const handleOnClick = text => {
//   if (text !== type) {
//     setType(text)
//     return;
//   }
// };
//   if(state && state.type && state.type ==="student"  ){
//     state.type=null
//     handleOnClick("signUp")
//   }
//   if(state && state.type && state.type ==="Academy"  ){
//     state.type=null
//     handleOnClick("signUp")
//   }
//   console.log(typestud,'typestud===');
//   const containerClass =
//     "logincontainer " + (type === "signUp" ? "right-panel-active" : "");
//   return (
// <div className=" maindiv">
// <div className="logodata">
//       <a href="" className=""><img src="/assets/images/logo.svg" style={{'margin':'26px 0px'}} className="brand-svg" /></a>
//     </div>
// <div className="App ">
//   {/* <h2>Sign in/up Form</h2> */}
//   <div className={containerClass} id="container">
//     <SignUpForm click={()=>{handleOnClick("signIn")}}/>
//     <SignInForm click={()=>{handleOnClick("signUp")}}/>
//     <div className="overlay-container">
//       <div className="overlay">
//         <div className="overlay-panel overlay-left">
//           <h1>Welcome Back!</h1>
//           <p>
//             To keep connected with us please login with your personal info
//           </p>
//           <button
//             className="ghost"
//             id="signIn"
//             onClick={() => handleOnClick("signIn")}
//           >
//             Sign In
//           </button>
//         </div>
//         <div className="overlay-panel overlay-right">
//           <h1>Hello, Friend!</h1>
//           <p>Enter your personal details and start journey with us</p>
//           <a href="/logintype">
//           <button
//             className="ghost "
//             id="signUp"
//             // onClick={() => handleOnClick("signUp")}
//           >
//             Sign Up
//           </button>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
//   );
// }

export default function LoginDatas() {
  let { state } = useLocation();
  return <Main location={state} />;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "signIn",
      usertype: null,
    };
  }
  handleOnClick = (text) => {
    let { type } = this.state;
    if (text !== type) {
      // setType(text)
      this.setState({ type: text });
      return;
    }
  };
  componentDidMount() {
    //   if(state && state.type && state.type ==="student"  ){
    //     this.setState({usertype:state.type},()=>{
    //       state.type=null
    //       this.handleOnClick("signUp")})
    // }
    // if(state && state.type && state.type ==="Academy"  ){
    
    //   this.setState({usertype:state.type},()=>{
    //     state.type=null
    //     this.handleOnClick("signIn")})
    // }
    let state = this.props.location;
    if (state && state.type && state.type === "student") {
      this.setState({ usertype: state.type }, () => {
        //  state.type=null
        this.handleOnClick("signUp");
      });
    }
    if (state && state.type && state.type === "Academy") {
      this.setState({ usertype: state.type }, () => {
        // state.type=null
        this.handleOnClick("signUp");
      });
    }
  }
  render() {
    let { type, usertype } = this.state;
    let containerClass =
      "logincontainer " + (type === "signUp" ? "right-panel-active" : "");
    const navigate = useNavigate();
    return (
      <>
        <div className=" maindiv">
          <div className="logodata">
            <a href="" className="">
              <img
                src="/assets/images/logo.png"
                style={{ margin: "26px 0px" }}
                className="brand-svg"
              />
            </a>
          </div>
          <div className="App ">
            {/* <h2>Sign in/up Form</h2> */}
            <div className={containerClass} id="container">
              {/* <SignUpForm click={()=>{this.handleOnClick("signIn")}} usertype={usertype}/>
        <SignInForm click={()=>{this.handleOnClick("signUp")}}/> */}
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                    <p>Hello, Friend!</p>
                    <p>Enter your personal details and start journey with us</p>
                    <a onClick={() => {
                      navigate("/usertype")
                    }}>
                      <button
                        className="ghost "
                        id="signUp"
                      // onClick={() => handleOnClick("signUp")}
                      >
                        Sign Up
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
