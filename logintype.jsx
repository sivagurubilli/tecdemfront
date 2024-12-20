import Styles from "./logintype.module.css";
import { Link, useNavigate } from "react-router-dom";
import { USER_TYPES } from "./Config";
import { setID } from "../siteConfig";
import appLogo from "../assets/images/logo.png"

export default function Logintype() {
  const navigate = useNavigate();

  return (
    <div className="maindiv">
      <div className="logodata">
        <a onClick={() => {
          navigate("/homepage")
        }} className="">
          <img
            src={appLogo}
            style={{ margin: "26px 0px" ,width:'250px'}}
            className="brand-svg"
            alt="Logo"
          />
        </a>
      </div>
      <div className={Styles.userTypeContainer}>
      
          {USER_TYPES.map((items, idx) => {
            return items.tag !== "" &&
              <Link key={idx} to="/signUp" onClick={()=>{ setID("signUpAs", items?.tag) }} state={{ type: items?.tag }}>
                   <div  className={Styles.userTypeCard} >
                  <img
                    src={items?.img}
                    className={Styles.userTypeImage}
                    alt="..."
                   
                  />
                  <div className="card-body">
                    <h2  className={Styles.userTypeTitle}>{items?.name}</h2>
                  </div>
            
            
                  </div>
              </Link>
          })}
      
      </div>
    </div>
  );
}
