import React, { useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import cardImg from "../../img/img5.jpg";
import Styles from "./MyCourseCard.module.css";
import { placeHolderImage } from "../Config";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const MyCourseCard = (props) => {


    const navigate = useNavigate();
    const { className = "",
        thumbnail = "",
        profile = "",
        value = {},
        flag,
        isMyCourse = false,
        // videoProgress = 0,
        videoProgress = 0,
        totalVideoLength = 0,
        isCompleted = false,
        myCourse = false,
        isCart = false,
        inProgress = false,
        course,
        cartCourses,
        getCartItems,
        cartItems,
        setCartItems,
        uploadByMe = false,
        handleAddToCart,
        removeFromCart,
        addToWishList,
        removeFromWishList,
        loading = false,
        userData,
        title,
        name

    } = props;

    //calculate percentage of videoProgress from total totalVideoLength;
    const videoProgressPercentage = (Number(videoProgress) / Number(totalVideoLength)) * 100 || 0
    const { isOpen, onOpen, onClose } = useDisclosure()
    const certificateRef = useRef();
    const [certificateDetails, setCertificateDetails] = useState({});
    const [certificateLoading, setCertificateLoading] = useState(false);

    const totalVideoLengthHours = convertSeconds(totalVideoLength);


    const handleOpen = (course) => {
        try {
            handleGetCertificate(course?.id, getID('userId'));
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
            download(dataUrl, `certificate.${extension}`);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    const handleDownload = (format) => {
        if (certificateRef.current) {
            downloadImage(certificateRef.current, format);
        }
    };



    const { discounted_price = "", actual_price = "", reviews = [] } = course;
    const discountedPrice = Number(discounted_price).toFixed(2);
    const actualPrice = Number(actual_price).toFixed(2);
    const isPriceEqual = discountedPrice === actualPrice || discountedPrice === "0.00";
    const allRatingStars = reviews?.map((items) => Number(items?.stars));
    const sum = allRatingStars.reduce((total, rating) => total + rating, 0);
    const averageRating = sum / allRatingStars.length;
    const totalAverage = averageRating.toFixed(1);


    const handlePDFDownload = async () => {
        const certificateElement = certificateRef.current;
        const canvas = await html2canvas(certificateElement);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [certificateElement.offsetWidth, certificateElement.offsetHeight]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, certificateElement.offsetWidth, certificateElement.offsetHeight);
        pdf.save('certificate.pdf');
    };


    const handleScroll = () => {
        try {
            window.scrollTo({
                top: 0,
                behavior: "smooth", // This makes the scrolling smooth
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetCertificate = (course_id, user_id) => {
        try {
            setCertificateLoading(true);
            CallAPI(endpoints?.getCertificate, { user_id, course_id, type: "certificate" })
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
                <NavLink
                    to={`/coursevideo/${course?.uuid}`}
                    onClick={() => {
                        handleScroll();
                    }}
                >

                    <LazyLoadImage
                        src={!!thumbnail ? thumbnail : cardImg}
                        alt={course.course_title}
                        effect="blur"
                        placeholderSrc="/placeholder.png"
                        className={`${Styles?.thumbImageCard} ${Styles?.textSelectedStop}`}
                        threshold={100}
                        width="100%"
                        height="auto"
                    />
                  

                </NavLink>


                <div className={`card-body ps-1 ${Styles?.cardContainer} `}>
                    <NavLink
                        to={`/coursevideo/${course?.uuid}`}
                        onClick={() => {
                            handleScroll();
                        }}
                    >
                        <h6 className={`${Styles?.courseTitle} ${Styles?.textSelectedStop}`} >{props.title}</h6>

                    </NavLink>

                    <div className="d-flex" style={{ justifyContent: "space-between" }}>

                        <div className={Styles?.profileContainer}>
                            <img
                                src={!!profile ? profile : placeHolderImage}
                                alt=""
                                width={35}
                                style={{ marginRight: "10px" }}
                            />
                            <p className="text-start">{props.name}</p>
                        </div>

                        <div className={Styles?.priceContainer}>

                            <div className={Styles?.actualPrice}>
                                <span className={`${Styles?.actualPriceText} ${!isPriceEqual ? `${Styles?.lineThrough} ${Styles?.greyText}` : ""}`}>{APP_CURRENCY}{actualPrice}</span>
                            </div>
                            {!isPriceEqual && <div className={Styles?.discountedPrice}>
                                <span className={Styles?.discountedPriceText}>{APP_CURRENCY}{discountedPrice}</span>
                            </div>}
                        </div>

                        {/* {isCart && <Button onClick={() => addCourseToCart(course)}>
                            <i className="fas fa-cart-shopping"></i>
                        </Button>}

                        {location.pathname === "/cart" && <Button onClick={() => RemoveCartItem(cartCourses.id)}>
                            Remove
                        </Button>}

                        {inProgress && <Button onClick={() => {
                            navigate(`/coursevideo/${value?.uuid}`)
                        }}>
                            Visit Course
                        </Button>}


                        {!isCart && !inProgress && <Button onClick={() => {
                            navigate(`/coursevideo/${value?.uuid}`)
                            handleScroll();
                        }}>
                            <i className="far fa-eye"></i>
                        </Button>}


                        {inProgress && <Button onClick={() => {
                            navigate(`/coursevideo/${value?.uuid}`)
                            handleScroll();
                        }}>
                            <i className="far fa-eye"></i>
                        </Button>

                        }
                        {uploadByMe && <Button onClick={() => {
                            navigate(`/courseupload/${value?.uuid}`)
                            handleScroll();
                        }}>
                            <i className="fas fa-pen"></i>
                        </Button>} */}
                    </div>
                    <div className={Styles?.buttonContainer}>
                        <div className={Styles?.reviewBlock}>
                            <span>{reviews.length > 0 ? totalAverage : 0}</span>
                            <StarRating average={reviews.length > 0 ? totalAverage : 0} />
                        </div>
                        <div className={Styles?.buttonBlock}>
                            {uploadByMe ?
                                <>
                                    <TecButton
                                        onClick={() => {
                                            navigate(`/coursevideo/${course?.uuid}`)
                                        }}
                                        popTitle="Go to Course"
                                        // loading={loading}
                                        className="tecPrimaryButton">
                                        <i className="far fa-eye"></i>
                                    </TecButton>
                                    <TecButton
                                        onClick={() => {
                                            navigate(`/courseupload/${course?.uuid}`)
                                        }}
                                        popTitle="Edit Course"
                                        // loading={loading}
                                        className="tecPrimaryButton">
                                        <i className="fas fa-pen"></i>
                                    </TecButton>
                                </>
                                :
                                <>
                                    {isCompleted && <TecButton
                                        onClick={() => handleOpen(course)}
                                        className="tecSecondaryButton">

                                        {certificateLoading ? <BOLoading /> : < PiCertificateDuotone />}
                                    </TecButton>}
                                    <TecButton
                                        onClick={() => {
                                            navigate(`/coursevideo/${course?.uuid}`)
                                        }}
                                        popTitle="Go to Course"
                                        // loading={loading}
                                        className="tecPrimaryButton">
                                        <i className="far fa-eye"></i>
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
                                    <div ref={certificateRef} >
                                        <Certificate
                                            title={title}
                                            userData={userData}
                                            name={name}
                                            totalVideoLengthHours={`${totalVideoLengthHours}hrs`}
                                            todayDate={moment().format("DD-MM-YYYY")}
                                            certificateDetails={certificateDetails}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <TecButton className={`thirdButtonPrimary marginRight-2`} onClick={() => handleDownload('png')}>
                                        <RxDownload /> PNG
                                    </TecButton>
                                    <TecButton className={`thirdButtonPrimary marginRight-2`} onClick={() => handleDownload('jpeg')}>
                                        <RxDownload /> JPEG
                                    </TecButton>
                                    <TecButton className={`tecSecondaryButton marginRight-2`} onClick={onClose}>
                                        Cancel
                                    </TecButton>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>


                    </div>
                    {!!!uploadByMe && <div className={Styles?.progressContainer}>
                        <span>{`${videoProgressPercentage.toFixed(0)}% complete`}</span>
                        {<progress className={Styles?.cardVideoProgress} value={videoProgress || 0} max={totalVideoLength || 0}></progress>}
                    </div>}

                </div>
            </div>
        </div >

    );
};

export default MyCourseCard;
