import React, { useEffect, useState } from 'react'
import Styles from "./SettingsAccount.module.css"
import { IoPersonOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { TecButton } from '../../elements/elements';
import { BsExclamationTriangle } from "react-icons/bs";
import { getID } from '../../../siteConfig';
import { decrypt } from '../../../middleware/auth';
import messageService from '../../MessageService/Index';


const SettingsAccount = () => {
  const [userDetails, setUserDetails] = useState({})


  useEffect(() => {
    const userData = getID("userData")
    if(userData) {
      const UserDetails = JSON.parse(decrypt(userData))
      if(UserDetails) {
        setUserDetails(UserDetails)
      }
    }
  },[])
  return (
    <div className={Styles?.Container}>
      <div className={Styles?.User}>
        <div className={Styles?.UserLeft}><IoPersonOutline size={"20px"} /> User-email</div>
        <div >
            <div>
              {userDetails?.bus_email}
            </div>
      </div>
      </div>
      <div className={Styles?.User}>
        <div className={Styles?.UserLeft}><MdLockOutline size={"20px"} />Update Password</div>
        <div >
            <div>
              <TecButton
                title="Update Password"
                className="thirdButtonPrimary marginRight-1"
                onClick={() => {
                  messageService.sendMessage("dashBoardProfile", { show: true }, "popupOpen")
                }}
              />
            </div>
            
      </div>
      </div>
      <div className={Styles?.User}>
      <div className={Styles?.UserLeft}><RiShieldUserLine size={"25px"} /><div>2-Step authentication<p>Extra securitylayer foryour accountwith a secondauthenticator app</p></div></div>
      <div className={Styles?.Userright}>
            <div className={Styles?.leftCont}>2-Step authentication is off 
              <TecButton
                title="Activate authentication"
                className="tecPrimaryButton marginRight-1"
                onClick={() => {}}
              />
            </div>
            <div className={Styles?.authentication}><BsExclamationTriangle size="20px" color="orange"/> If we detect a sign-in from an unknown device or browser, we'll ask for a password and a verification code</div>
      </div>
      </div>
      <div className={Styles?.User}>
      <div className={Styles?.UserLeft}><MdBlock size={"20px"}/>Deactivate</div>
      <div className={Styles?.Userright}>
            <div className={Styles?.leftCont}>You can reactivate whenever you want 
              <TecButton
                title="Deactivate account"
                className="tecDangerButton marginRight-1"
                onClick={() => {
                  
                }}
              />
            </div>
      </div>
      </div>
    </div>
  )
}

export default SettingsAccount