import React from 'react'
import Styles from "./updateemail.module.css"
import Leftbar from '../LeftBar/Leftbar'
import { Image, Text } from '@chakra-ui/react'
import image1 from "../../../img/image6.png"
import image2 from "../../../img/image7.png"
import { Link } from 'react-router-dom'


const Updateemail = () => {
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
          <h2>How to update Profile Picture</h2>
          <ul className={Styles?.topicList}>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>Every Tecdemy account includes a profile page where you can share information about yourself. This article outlines how learners/students/mentors/University can create and edit their Tecdemy profile.</Text>
          <Text paddingBottom={"20px"}>1. After logging in to your account, you will be redirected to the dashboard page with a Welcome note. You can access your Profile page only after logging in to your account. Click on your name at the top right corner and then click My Profile in the drop-down menu. You will be redirected to My Profile page. </Text>
          <Text paddingBottom={"20px"}>To upload your profile picture, click Camera icon  (mouse over the Photo) on the left-hand side of your Profile page. Then choose an image from your computer to upload. Once it’s uploaded, you can view the image.</Text>
          <Image src={image2}/>
          <Text paddingBottom={"20px"} paddingTop={"20px"}>To edit (or delete) your profile picture, move the mouse over the Photo on the left-hand side of your Profile page. 
To edit the profile picture, click the edit icon and then choose an image from your computer to upload. To delete the profile picture, click the delete icon and then the photo will be deleted.
</Text>
          <Image src={image1}/>

      </ul>
        </div>
      </div>
    </div>
  )
}

export default Updateemail