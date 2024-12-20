import {
    ChakraProvider,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box,
    Divider,
    Grid,
    Text,
} from "@chakra-ui/react";
import styles from "./ChangePassword.module.css"
import { BOLoading, TecButton, TecInput } from "../elements/elements";
import messageService from "../MessageService/Index";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { changePasswordForm } from "../ValidationSchema";
import { getID } from "../../siteConfig";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import md5 from "md5";
import { toastError, toastSuccess } from "../../util_helper";
import PasswordStrengthBar from "react-password-strength-bar";
const ChangePassword = ({
    isShow = false
}) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
        initialValues: {
            current_password: "",
            new_password: "",
            confirm_password: ""
        },
        validationSchema: changePasswordForm,
        onSubmit: (values) => {
            setLoading(true)
            const userId = getID('userId');
            const formData = { ...values, user_id: userId }
            delete formData?.confirm_password
            formData['current_password'] = md5(formData?.current_password)
            formData['new_password'] = md5(formData?.new_password)
            CallAPI(endpoints?.changePassword, formData)
                .then((res) => {
                    setLoading(false)
                    if (res?.status?.code === 200) {
                        toastSuccess(res?.status?.message)
                        messageService.sendMessage("dashBoardProfile", { show: false }, "popupOpen");
                        resetForm();
                        return;
                    }
                    toastError("Current password is wrong!");
                })
        }
    })


    useEffect(()=> {
        resetForm();
    },[isShow])

    // const handleChange = (e) => {
    //     try {
    //         const { name, value } = e.target;
    //         setFormData((prev) => {
    //             return { ...prev, [name]: value }
    //         })

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    return (
        <ChakraProvider>
            <Drawer
                isOpen={isShow}
                placement="right"
                size={"lg"}
            >
                <DrawerOverlay />
                <form onSubmit={handleSubmit}>
                    <DrawerContent className={styles?.drawerContainer}>
                        <DrawerHeader textAlign={"left"}>
                            Change Password
                        </DrawerHeader>
                        <DrawerBody >
                            <Box>
                                {/* <h6>Current Password</h6> */}
                                {/* <input
                                    type="password"
                                    onBlur={handleBlur}
                                    value={values?.current_password}
                                    name="current_password"
                                    onChange={handleChange}
                                    autoFocus
                                />
                                {!!errors["current_password"] && !!touched["current_password"] ? (
                                    <Text className={`${styles?.errorField} fadeElement`}>
                                        {errors["current_password"]}
                                    </Text>
                                ) : (
                                    ""
                                )} */}
                                <TecInput
                                    label="Current Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.current_password}
                                    name="current_password"
                                    autoFocus
                                    type="password"
                                    error={!!errors["current_password"] && !!touched["current_password"] ? errors["current_password"] : ""}

                                />
                            </Box>
                            <Box width={"100%"} position={"relative"} marginTop="25px">
                                <TecInput
                                    label="New Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.new_password}
                                    name="new_password"
                                    
                                    type="password"
                                    error={!!errors["new_password"] && !!touched["new_password"] ? errors["new_password"] : ""}
                                    strength

                                />
                            </Box>
                            <Box width={"100%"} position={"relative"} marginTop="10px">
                                <TecInput
                                    label="Confirm Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.confirm_password}
                                    name="confirm_password"
                                    
                                    type="password"
                                    error={!!errors["confirm_password"] && !!touched["confirm_password"] ? errors["confirm_password"] : ""}
                                    

                                />
                            </Box>
                        </DrawerBody>
                        <DrawerFooter>
                            <TecButton
                                // title="Update"
                                type="submit"
                                className="tecPrimaryButton marginLeft-2"
                                onClick={() => {
                                }}
                            >
                                Update {loading && <BOLoading />}
                            </TecButton>
                            <TecButton
                                title="Close"
                                className="tecSecondaryButton marginLeft-2"
                                onClick={() => {
                                    resetForm();
                                    messageService.sendMessage("dashBoardProfile", { show: false }, "popupOpen");
                                }}
                            />
                        </DrawerFooter>


                    </DrawerContent>
                </form>

            </Drawer>
        </ChakraProvider>
    )
}

export default ChangePassword