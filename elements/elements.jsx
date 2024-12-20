import { memo, useState } from "react";
import Styles from "./element.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Box, Text } from "@chakra-ui/react";
import PasswordStrengthBar from "react-password-strength-bar";


export const BOLoading = ({ style }) => {
    return <div className={`${Styles?.loadingElement} fadeElement`} style={style}>
        <i className="fas fa-spinner"></i>
    </div>;
}

export const BOPhoneInput = (props) => {
    const { value, handleChange, className = "" } = props;
    return <div className={`${Styles?.phoneInputWrapper} ${className} fadeElement`}>
        <PhoneInput
            country={'us'}
            value={value}
            onChange={handleChange}
            autoFormat
        />
    </div>

}


const _TecButton = (props) => {
    const {
        onClick,
        children,
        className = "",
        title = "",
        type = "button",
        loading = false,
        popTitle = "",
        small = false,
        styling = {},
        icon = '',
        disabled = false,
        ref,
    } = props
    return (
        <button
            onClick={onClick}
            className={`${small ? "tec-button-small" : "tec-button"} ${className} ${disabled || loading ? Styles?.disabledButton : ""}`}
            type={type}
            disabled={disabled || loading}
            title={popTitle}
            style={styling}
            ref={ref}
        >
            {icon}  {!!title ? title : children}
            {loading && <BOLoading />}
        </button>)

}
export const TecButton = memo(_TecButton);



export const TecInput = ({
    value = "",
    placeHolder = "",
    onChange = null,
    onBlur = null,
    type = "text",
    label = "",
    name = "",
    error = "",
    className = "",
    autoFocus = false,
    strength = false
}) => {
    const [viewPassword, setViewPassword] = useState(type);

    const togglePasswordVisibility = () => {
        if (viewPassword === "text") {
            setViewPassword("password")
            return;
        }
        setViewPassword("text")
    };

    return <Box className={`${Styles?.inputWrapper} ${className}`}>

        {!!label && <h6>{label}</h6>}
        <input
            type={viewPassword}
            name={name}
            onChange={onChange}
            autoFocus={autoFocus}
            value={value}
            onBlur={onBlur}
        />
        {type === "password" && <i className={`${Styles?.viewPassword} fas ${viewPassword === "text" ? "fa-eye" : "fa-eye-slash"}`}
            onClick={togglePasswordVisibility}
        ></i>}
        {!!error ? <Text className={`${Styles?.fieldError} fadeElement`}>
            {error}
        </Text> : ""}
        {strength && <PasswordStrengthBar
            style={{ marginTop: "20px" }}
            password={value}
        />}
    </Box >

}