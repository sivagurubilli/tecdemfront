import React, { useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cardImg from "../../img/img5.jpg";
import Styles from "./Certificate.module.css";
import { decrypt } from "../../middleware/auth";
import { CART_ICON, placeHolderImage } from "../Config";
import { APP_CURRENCY, getID } from "../../siteConfig";
import { BOLoading, TecButton } from "../elements/elements";
import StarRating from "../StarRating.js/StarRating";
import Certificate from "../TecdemyCertificate/Certificate";
import { PiCertificateDuotone } from "react-icons/pi";
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { RxDownload } from "react-icons/rx";
import moment from "moment";
import { CallAPI } from "../../middleware/api";
import endpoints from "../../middleware/endpoint";
import { convertSeconds, toastError } from "../../util_helper";


const CertificateCard = (props) => {
    const { certificateDetails = {}, totalVideoLength } = props;
    const { courseDetails = {} } = certificateDetails;
    const user_id = getID('userId');
    const [certificateDetail, setCertificateDetails] = useState({});
    const totalVideoLengthHours = convertSeconds(totalVideoLength);
    const [certificateLoading, setCertificateLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const certificateRef = useRef();



    const handleDownloadCertificate = () => {
        try {
            const { course_id } = certificateDetails;
            setCertificateLoading(true);
            CallAPI(endpoints?.getCertificate, { user_id, course_id, type : 'certificate' })
                .then((res) => {
                    setCertificateLoading(false);
                    if (res?.status?.code === 200) {
                        setCertificateDetails(res?.data);
                        onOpen();
                        return;
                    }
                    toastError("Something went wrong!");
                })
        } catch (error) {
            console.error(error);
        }
    }

    const handleDownload = (format) => {
        try {
            if (certificateRef.current) {
                downloadImage(certificateRef.current, format);
            }
        } catch (error) {
            console.error(error);
        }

    };

    const downloadImage = async (element, format = 'png') => {
        try {
            let dataUrl;
            if (format === 'jpeg') {
                dataUrl = await toJpeg(element, { quality: 0.95 });
            } else {
                dataUrl = await toPng(element);
            }
            const extension = format === 'jpeg' ? 'jpeg' : 'png';
            download(dataUrl, `${certificateDetails?.certificateNumber}.${extension}`);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    return (
        <div
            className={`${Styles?.Container} padding-3 shadowOnHover`}
            style={{
                width: "320px",
                // height: "auto",
                position: "relative",
            }}
        >
            <div className={``}>

                <img
                    src={courseDetails?.thumbnail || cardImg}
                    // width="560px"
                    // height="315px"
                    controls
                    className={`${Styles?.thumbImageCard} ${Styles?.textSelectedStop}`}
                />




                <div className={`card-body ps-1 ${Styles?.cardContainer} `}>


                    <div className="" style={{ justifyContent: "space-between" }}>
                        <h6>{courseDetails?.course_title}</h6>
                        <p>{certificateDetails?.student_name}</p>


                    </div>
                    <div className={Styles?.buttonContainer}>
                        <div className={Styles?.buttonBlock}>
                            {
                                <>
                                    <TecButton
                                        onClick={() => {
                                            handleDownloadCertificate();
                                        }}
                                        popTitle="Download Certificate"
                                        // loading={loading}
                                        className={`tecPrimaryButton ${Styles?.certificateButton}`}>
                                        {`Download Certificate`}
                                        {certificateLoading ? <BOLoading /> : < PiCertificateDuotone />}
                                    </TecButton>

                                </>
                            }
                        </div>
                        <Modal closeOnOverlayClick={false} size="4xl" isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Certificate</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody >
                                    <div ref={certificateRef}>
                                        <Certificate
                                            totalVideoLengthHours={`${totalVideoLengthHours}hrs`}
                                            certificateDetails={certificateDetails}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <TecButton className={`thirdButtonPrimary marginRight-2`} onClick={() => {
                                        handleDownload('png')

                                    }}>
                                        <RxDownload /> PNG
                                    </TecButton>
                                    <TecButton className={`thirdButtonPrimary marginRight-2`} onClick={() => {
                                        handleDownload('jpg')
                                    }}>
                                        <RxDownload /> JPEG
                                    </TecButton>
                                    <TecButton className={`tecSecondaryButton marginRight-2`} onClick={onClose}>
                                        Cancel
                                    </TecButton>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default CertificateCard;
