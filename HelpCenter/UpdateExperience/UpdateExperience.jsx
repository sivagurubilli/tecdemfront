import React from 'react'
import Styles from "./UpdateExperience.module.css"
import Leftbar from '../LeftBar/Leftbar'
import { Image, Text } from '@chakra-ui/react'
import image1 from "../../../img/image11.png"
import image2 from "../../../img/image13.png"
import image3 from "../../../img/image14.png"
import { Link } from 'react-router-dom'


const UpdateExperience = () => {
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
          <h2>How to Add/Update Experience</h2>
          <ul className={Styles?.topicList}>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>You can access and add your experience by following the below steps.</Text>
          <Text paddingBottom={"20px"}>Click the plus symbol next to Add Experience (Right corner). A pop-up will open. You can add your role in the Enter Role textbox, add your organization name in the Enter Organization Name textbox. You can also add the relevant period of working in From and To columns using the date picker icon or you can add dates in dd-mm-yyyy format in the corresponding text boxes. Click the Save button to save the information. Click the Cancel button to close the pop-up window.</Text>
          <Image src={image1}/>
          <Image src={image2} marginTop={"30px"}/>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>Your Experience will be added in the Experience section. You can edit your Experience by clicking the edit icon next to the Role. A pop-up will open with the details you entered already. You can edit and click the save button. The information will be updated.</Text>
          <Image src={image3} marginTop={"30px"}/>
      </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdateExperience