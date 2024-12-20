// src/StarRating.js
import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ average }) => {
    const _average = average === "NaN" ? 0 : average;
    const percentage = (_average / 5) * 100;

    return (
        <div className={`${styles?.stars}`} style={{ width: '120px', position: 'relative' }}>
            <div className={`${styles?.starsOuter}`}>
                <span>★★★★★</span>
            </div>
            <div className={`${styles?.starsInner}`} style={{ width: `${percentage}%` }}>
                <span>★★★★★</span>
            </div>
        </div>
    );
};

export default StarRating;
