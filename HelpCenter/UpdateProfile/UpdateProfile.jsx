import React from 'react'
import Styles from "./UpdateProfile.module.css"
import Leftbar from '../LeftBar/Leftbar'
import { Image, Text } from '@chakra-ui/react'
import image2 from "../../../img/image2.png"
import image1 from "../../../img/image4.png"
import image3 from "../../../img/image5.png"
import { Link } from 'react-router-dom'


const UpdateProfile = () => {
  return (
    <div className={Styles?.container}>
        <div className={Styles?.header}>
        <div className={Styles.breadcrumbs}>
          <Link to={"/support"}>
          Home 
          </Link>
          &nbsp;&gt;&nbsp; 
          <Link to={"/accountandprofile"}>
          Account & Profile
          </Link>
        </div>
          <div className={Styles?.Search}>
          <h1 className={Styles?.title}>Account & Profile</h1>
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
          <h2>How to update Email</h2>
          <ul className={Styles?.topicList}>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>Note: Email edit will be verified by sending OTP. On clicking the edit icon next to the email textbox, a pop-up will open, you can add the new email id and click the Send OTP button.  A mail will be sent to your new email id with OTP. Enter the OTP within 120 seconds and click the verify button. New email will be updated.</Text>
          <Image src={image2}/>
          <Image src={image3} marginTop={"30px"}/>
          <Image src={image1} marginTop={"30px"}/>

      </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile