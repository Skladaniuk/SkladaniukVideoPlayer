import React, { useState, useEffect } from 'react';
import styles from './Location.module.scss';
import { IoHomeSharp } from "react-icons/io5";

export const Location = () => {
    return (
        <>
            <ul className={styles.locationList}>
                <li className={styles.locationItem}><a href='#'><IoHomeSharp className={styles.home} /></a></li>
                <li className={styles.locationItem}><a href='#'>Videos</a></li>
                <li className={styles.locationItem}><a href='#'>Name of film</a></li>
            </ul>
        </>
    )
}