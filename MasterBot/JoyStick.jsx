import React, { useState, useRef, useEffect } from 'react';

const Joystick = ({ onLeftMove, onRightMove }) => {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.bottom - rect.width / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        newAngle = Math.max(-60, Math.min(60, newAngle));
        setAngle(newAngle);

        if (newAngle < -30) {
          onLeftMove();
          setIsDragging(false);
        } else if (newAngle > 30) {
          onRightMove();
          setIsDragging(false);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setAngle(0);
    };

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const containerElement = containerRef.current;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    containerElement.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      containerElement.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isDragging, onLeftMove, onRightMove]);

  return (
    <div style={styles.container}>
      <div ref={containerRef} style={styles.joystickContainer}>
        <div
          style={{
            ...styles.joystickRod,
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.9s ease',
          }}
        >
          <div style={styles.joystickBase}></div>
          <div
            style={{
              ...styles.joystickBall,
              transition: isDragging ? 'none' : 'transform 0.9s ease',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2vh',
    backgroundColor: 'white',
  },
  joystickContainer: {
    position: 'relative',
    width: '50px',
    height: '25px',
    overflow: 'visible',
    borderTop: '1px solid blue',
    borderRadius: '75px 75px 0 0',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    boxShadow: 'inset 0 0 10px blue',
    marginTop: '20px',
  },
  joystickRod: {
    position: 'absolute',
    top: '-60%',
    width: '5px',
    height: '20px',
    backgroundColor: 'navyblue',
    boxShadow: 'inset 0 0 5px blue',
    transformOrigin: 'center top',
    transition: 'transform 0.1s',
  },
  joystickBase: {
    width: '10px',
    height: '10px',
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  joystickBall: {
    cursor: 'pointer',
    width: '15px',
    height: '15px',
    backgroundColor: 'blue',
    borderRadius: '50%',
    boxShadow: '0 5px 5px rgba(0, 0, 0.1, 0, 0.5)',
    background: 'radial-gradient(circle at 30% 30%, red, red)',
    position: 'absolute',
    top: '-15px',
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
  },
};

export default Joystick;
