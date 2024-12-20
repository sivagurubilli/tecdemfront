import React from 'react'
import Styles from "./UpdateLinks.module.css"
import Leftbar from '../LeftBar/Leftbar'
import { Image, Text } from '@chakra-ui/react'
import image1 from "../../../img/image8.png"
import image2 from "../../../img/image9.png"
import image3 from "../../../img/image12.png"
import { Link } from 'react-router-dom'


const UpdateLinks = () => {
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
          <h2>How to update Social Links</h2>
          <ul className={Styles?.topicList}>
          <Text paddingTop={"30px"} paddingBottom={"20px"}>You can include your social links in your profile. You can include Facebook, YouTube, Twitter, LinkedIn and Instagram links by following the steps below.
          Mouse hover the social media icon and click edit icon. A text box will appear. You can add your social media link and click the tick icon next to the text box. If you want to close the text box, click the cross icon next to the tick icon. Your link will be updated</Text>
          <Image src={image1}/>
          <Image src={image2} marginTop={"30px"}/>
          <Image src={image3} marginTop={"30px"}/>
      </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdateLinks