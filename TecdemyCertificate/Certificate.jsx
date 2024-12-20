import React from 'react';
import certificate from "../../img/Certificate Line (3).png";
import logo from "../../img/Logo1.png";
import line from "../../img/Certificate Line (2).png"
import styles from './Certificate.module.css'


const Certificate = ({ title, userData, name, totalVideoLengthHours = 0, todayDate, isWelcome, certificateDetails = {} }) => {


  return (
    <div className={styles.container} >
      <div  className={styles.certificateContainer}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.header}>
          <p className={styles.certificateNumber}>{`Certificate No. ${certificateDetails?.certificateNumber}`}</p>
          <h1 className={styles.headerH1}>CERTIFICATE</h1>
          {isWelcome ?
            <h2 className={styles.headerH2}>FOR MEMBERSHIP</h2>
            :
            <h2 className={styles.headerH2}>OF COMPLETION</h2>
          }
        </div>
        <div className={styles.body}>
          <img src={line} className={styles.line} alt='line' />

          {isWelcome ? <p className={styles.bodyP}>WELCOME TO THE TECDEMY FAMILY</p> : ""}
          <h2 className={styles.bodyH2}>{certificateDetails?.student_name}</h2>
          {/* <p style={styles.courseP}>Certificate of Achievement in</p> */}
        </div>
        <div className={styles.course}>
          {isWelcome ? "" : <p className={styles.courseP}>
            Completed <strong>{certificateDetails?.course_name}, </strong> verified by Tecdemy.
            {/* for his/her completion in the field of <b>{certificateDetails?.course_name}</b> and proves that he is competent in his/her field. */}
          </p>}
        </div>
        <div className={styles.footer}>
          <div>
            <p className={styles.signatureP}>{certificateDetails?.mentor_name}</p>
            <p className={styles.Designation}>Mentor</p>
          </div>
          <img src={certificate} className={styles.logo} alt="Certificate" />
          <div>
            <p className={styles.detailsP}>
              Date: <b>{certificateDetails?.createdDate}</b>
            </p>
            <p className={styles.detailsP}>
              Course Length: <b>{`${totalVideoLengthHours}`}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
