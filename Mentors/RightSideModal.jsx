import React from 'react';
import styles from './RightSideModal.module.css';

const RightSideModal = ({ isOpen, onClose, children }) => {
  return (
    <div>
    <div className={`${styles.overlay} ${isOpen ? styles.show : ''}`} onClick={onClose} >
      <div
        className={ `${styles?.rightmodalContainer} ${styles.modal } ${isOpen ? styles.slideIn : ''}`}
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className={styles.content}>
          {children}
        </div>
       
        <div className={styles.footer}>
          <button className={styles.saveButton} onClick={onClose}>
            Close
          </button>
        </div>
       
      </div>
    </div>
    </div>
  );
};

export default RightSideModal;
