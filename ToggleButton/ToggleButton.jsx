import React, { useEffect, useState } from 'react';
import styles from "./ToggleButton.module.css"
import { styled } from '@chakra-ui/react';

const ToggleButton = (props) => {
    const { onToggle, label = "Autoplay", selectedAll = false, style } = props;
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
        onToggle(!isOn);
    };

    useEffect(() => {
        setIsOn(selectedAll)
    }, [selectedAll])

    return (
        <div className={styles?.toggleContainer} style={style} onClick={toggle}>
            <div className={`${styles?.toggleSwitch} ${isOn ? styles?.on : styles?.off}`}>
                <div className={styles?.toggleHandle}></div>
            </div>
            {!!label && <h6>{label}</h6>}
        </div>
    );
};

export default ToggleButton;
