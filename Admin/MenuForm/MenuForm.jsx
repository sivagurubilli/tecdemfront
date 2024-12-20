import styles from "./MenuForm.module.css"

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ChakraProvider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cleanMenuConfig, setMenuConfig, updateAdminMenu } from "../../../Redux/adminSlice";
import { CallAPI } from "../../../middleware/api";
import endpoints from "../../../middleware/endpoint";
import ToggleButton from "../../ToggleButton/ToggleButton";
import { TecButton } from "../../elements/elements";
import { MenuFormValidation } from "../../ValidationSchema";

const MenuForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { menuFormConfig = {
        name: "",
        classNameOfIcon: "",
        classNameOfIconActive: "",
        path: "",
        status: "",
        isSideMenu: "",
        parentClassName: "",
        className: ""
    } } = useSelector(store => store.Admin)
    const dispatch = useDispatch();
    const { values, errors, handleSubmit, handleChange, touched, handleBlur, setValues, resetForm } = useFormik({
        initialValues: {
            name: "",
            classNameOfIcon: "",
            classNameOfIconActive: "",
            path: "",
            status: "",
            isSideMenu: "",
            parentClassName: "",
            className: "",
        },
        validationSchema: MenuFormValidation,
        onSubmit: async (values) => {
            console.log('submit :>> ', values);
        }
    });


    // console.log('menuFormConfig :>> ', menuFormConfig);

    useEffect(() => {
        resetForm();
        if (!!menuFormConfig) {
            onOpen();
            setValues(menuFormConfig)
            return;
        } else {
            onClose();
            dispatch(cleanMenuConfig())
        }
    }, [menuFormConfig])


    const handleToggleUser = async (activeUser, menu, toggleType) => {
        try {
            const { id } = menu;
            console.log('activeUser, menu, toggleType :>> ', activeUser, menu, toggleType);
            const response = await CallAPI(endpoints?.updateMenu, { id, [toggleType]: activeUser })
            if (response.status.code) {
                dispatch(updateAdminMenu({ ...menu, [toggleType]: activeUser }))
                dispatch(setMenuConfig({ ...menu, [toggleType]: activeUser }))

            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <ChakraProvider>
            <Drawer
                isOpen={isOpen}
                placement="right"
                size={"lg"}
                onClose={() => {
                    onClose();
                    dispatch(cleanMenuConfig())

                }}
            >
                <DrawerOverlay />
                <DrawerContent className={styles?.drawerContainer}>
                    <DrawerHeader>
                        Menu
                    </DrawerHeader>
                    <DrawerBody >
                        <div className={styles.container} >
                            <form>
                                <div className={`${styles.formGroup} marginBottom-2`}>
                                    <div className="tec-flex tec-align-center">
                                        <label className={styles.label}>Icon</label>
                                        <span
                                            className={`marginBottom-2 marginLeft-2`}
                                            dangerouslySetInnerHTML={{
                                                __html: values?.classNameOfIcon,
                                            }}
                                        />
                                    </div>

                                    {/* <br /> */}
                                    <Textarea name="classNameOfIcon" value={values?.classNameOfIcon} onChange={handleChange} onBlur={handleBlur} />
                                    {touched.classNameOfIcon && errors.classNameOfIcon && <div className={styles.error}>{errors.classNameOfIcon}</div>}
                                </div>
                                <div className={`${styles.formGroup} marginBottom-2`}>
                                    <div className="tec-flex tec-align-center">
                                        <label className={styles.label}>Active Icon</label>
                                        <span
                                            className={`marginBottom-2 marginLeft-2`}
                                            dangerouslySetInnerHTML={{
                                                __html: values?.classNameOfIconActive,
                                            }}
                                        />
                                    </div>
                                    <Textarea name="classNameOfIconActive" value={values?.classNameOfIconActive} onChange={handleChange} onBlur={handleBlur} />
                                    {touched.classNameOfIconActive && errors.classNameOfIconActive && <div className={styles.error}>{errors.classNameOfIconActive}</div>}
                                </div>
                                <div className="tec-flex tec-align-center">
                                    <div className={`${styles.formGroup} marginBottom-2`}>
                                        <label className={styles.label}>Name</label>
                                        <Input name="name" value={values?.name} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.name && errors.name && <div className={styles.error}>{errors.name}</div>}
                                    </div>
                                    <div className={`${styles.formGroup} marginLeft-2 marginBottom-2`}>
                                        <label className={styles.label}>Path</label>
                                        <Input name="path" value={values?.path} onChange={handleChange} onBlur={handleBlur} />
                                        {touched.path && errors.path && <div className={styles.error}>{errors.path}</div>}
                                    </div>

                                </div>


                                <div className="tec-flex tec-align-center" style={{ gap: '10px' }}>
                                    <div className={`${styles.formGroup} marginBottom-2`}>
                                        <label className={styles.label}>Menu Status</label><br />
                                        <ToggleButton
                                            selectedAll={!!values?.status}
                                            onToggle={(isTrue) => handleToggleUser(isTrue, menuFormConfig, 'status')}
                                            label={!!values?.status ? "Active" : "Inactive"}
                                            style={{ justifyContent: 'flex-start' }}
                                        />
                                    </div>
                                    <div className={`${styles.formGroup} marginLeft-2 marginBottom-2`}>
                                        <label className={styles.label}>Side Menu</label><br />
                                        <ToggleButton
                                            selectedAll={!!values?.isSideMenu}
                                            onToggle={(isTrue) => handleToggleUser(isTrue, menuFormConfig, 'isSideMenu')}
                                            label={!!values?.isSideMenu ? "Active" : "Inactive"}
                                            style={{ justifyContent: 'flex-start' }}
                                        />
                                    </div>
                                </div>



                                <div className={`${styles.formGroup} marginBottom-2`}>
                                    <label className={styles.label}>Parent Class Name</label>

                                    <Input name="parentClassName" value={values?.parentClassName} onChange={handleChange} onBlur={handleBlur} />
                                    {touched.parentClassName && errors.parentClassName && <div className={styles.error}>{errors.parentClassName}</div>}
                                </div>
                                <div className={`${styles.formGroup} marginBottom-2`}>
                                    <label className={styles.label}>Icon Class Name</label>
                                    <Input name="className" value={values?.className} onChange={handleChange} onBlur={handleBlur} />
                                    {touched.className && errors.className && <div className={styles.error}>{errors.className}</div>}
                                </div>
                                {/* <FormControl>
                                    <label>Menu Name:</label>
                                    <Input type="text" name="name" value={values.name} onChange={handleChange}
                                        onBlur={handleBlur} />
                                    {touched.name && errors.name && <div>{errors.name}</div>}
                                </FormControl> */}

                            </form>
                        </div >
                    </DrawerBody>
                    <DrawerFooter className="">
                        <TecButton
                            title="Update"
                            type="submit"
                            className="tecPrimaryButton marginRight-1"
                            onClick={handleSubmit}

                        />
                        <TecButton
                            title="Close"
                            className="tecSecondaryButton"
                            onClick={() => {
                                onClose();
                                dispatch(cleanMenuConfig())
                            }}
                        />
                    </DrawerFooter>
                </DrawerContent>



            </Drawer>
        </ChakraProvider>
    )
}

export default MenuForm;