import { Box, Button, Heading, Image, Input } from "@chakra-ui/react";
import Styles from "./Profile.module.css";
import ProfileImage from "../img/profilePicture.jpg";
import { useState } from "react";
import { placeHolderImage } from "./Config";

const ProfileWidget = (props) => {
  const { userData, profileImage, profileName, fullName } = props;
  const [profileFiles, setProfiles] = useState([]);

  const handleOpenFileInput = () => {
    try {
      document.getElementById("fileInput").click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileImage = (e) => {
    try {
      const _files = Array.from(e.target.files);

      const profileImage = _files.map((file) => URL.createObjectURL(file));
      setProfiles(profileImage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p="3" className={Styles?.profileMainContainer}>
      <Box className={Styles?.wrapper}>
        <Input
          type="file"
          id="fileInput"
          accept=".jpg, .png, .jpeg"
          onChange={handleProfileImage}
          style={{ opacity: "0", height: "0px" }}
        />
        {/* {profileFiles.length > 0 ? (
          profileFiles.map((items) => {
            return <Image src={items} />;
          })
        ) : ( */}
        <Image src={userData.profile_url || placeHolderImage} />
        {/* )} */}
        <Heading as={"h6"}>
          {!!userData
            ? userData.first_name + " " + userData.last_name
            : "Profile Name"}
        </Heading>
      </Box>
    </Box>
  );
};

export default ProfileWidget;
