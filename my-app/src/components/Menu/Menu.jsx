import React, { useState, useEffect } from 'react';
import styles from './Menu.module.scss';

export const Menu = () => {
    return (
        <nav className={styles.navigation}>
            <li className={styles.navigationItem}><a className={styles.navigationLink}>Home</a></li>
            <li className={styles.navigationItem}><a className={styles.navigationLink}>Videos</a></li>
            <li className={styles.navigationItem}><a className={styles.navigationLink}>Contact</a></li>
        </nav>
    )
}