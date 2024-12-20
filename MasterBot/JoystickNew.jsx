import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

const JoystickBase = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #8a0ee5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const Rod = styled.div`
  width: 4px;
  height: 35px;
  background-color: black;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 2px);
  transform-origin: bottom;
  cursor: pointer;
  transition: transform 0.1s ease-out;
`;

const Ball = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: calc(50% - 10px);
  cursor: grab;
`;

const JoystickNew = ({ handleJoystickMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const baseRef = useRef(null);
  const rodRef = useRef(null);
  const moveTimeoutRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleJoystickMove({ direction: "STOP" }); // Signal stop when dragging stops
    resetJoystick();
  };

  const handleMove = (e) => {
    if (moveTimeoutRef.current) {
      return; // Skip the movement if already processing
    }

    moveTimeoutRef.current = setTimeout(() => {
      const baseRect = baseRef.current.getBoundingClientRect();
      const baseCenterX = baseRect.left + baseRect.width / 2;

      const mouseX = e.clientX;
      const dx = mouseX - baseCenterX;

      let direction;
      let angle;

      if (dx > 10) {
        direction = "RIGHT";
        angle = 30;
      } else if (dx < -10) {
        direction = "LEFT";
        angle = -30;
      } else {
        direction = "CENTER";
        angle = 0;
      }

      handleJoystickMove({ direction });

      // Rotate the rod based on the angle
      rodRef.current.style.setProperty("--rotate-angle", `${angle}deg`);

      // Reset the rod position after a brief delay
      setTimeout(() => {
        resetJoystick();
      }, 100); // Adjust the delay as needed

      moveTimeoutRef.current = null; // Reset the timeout reference
    }, 200); // Adjust the delay as needed (300ms for example)
  };

  const resetJoystick = () => {
    // Reset rod position to straight
    rodRef.current.style.setProperty("--rotate-angle", `0deg`);
  };

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      resetJoystick();
    };
  }, []);

  return (
    <JoystickBase
      ref={baseRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Rod
        ref={rodRef}
        onMouseDown={handleMouseDown}
        style={{ transform: `rotate(var(--rotate-angle, 0deg))` }}
      >
        <Ball
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </Rod>
    </JoystickBase>
  );
};

export default JoystickNew;
