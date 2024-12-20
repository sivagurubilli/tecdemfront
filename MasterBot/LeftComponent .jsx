import React from "react";
import Draggable from "react-draggable";
import imgRemote from "../../img/imgRemote.jpeg";

const LeftComponent = ({ handleImageClick }) => {
  return (
    <Draggable zindex={100}>
      <img
        src={imgRemote}
        alt="Remote Image"
        style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%",
          zIndex: 15,
          cursor: "pointer",
          animation: "vibrate 0.9s linear infinite",
        }}
        onClick={handleImageClick}
      />
    </Draggable>
  );
};

export default LeftComponent;
