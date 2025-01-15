import styles from './Container.module.scss';
import React from 'react';

export const Container = (props) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}