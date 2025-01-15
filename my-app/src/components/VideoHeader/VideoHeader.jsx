import React, { useState, useEffect } from 'react';
import { Location } from '../Location/Location';
import styles from './VideoHeader.module.scss';

export const VideoHeader = () => {
    return (
        <div className={styles.videoHeaderContainer}>
            <h1 className={styles.videoHeaderTitle}>Aprenda a programar</h1>
            <Location />
        </div>
    )
}