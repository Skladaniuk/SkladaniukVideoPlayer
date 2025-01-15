import React, { useRef, useEffect } from 'react';
import { VideoHeader } from '../VideoHeader/VideoHeader';
import VideoJS from '../VideoPlayer/VideoPlayer';
import Playlist from '../Playlist/Playlist';
import { VideoDescription } from '../VideoDescription/VideoDescription';
import styles from './Video.module.scss';
import Feedback from '../Feedback/Feedback';




export const Video = () => {
    return (
        <section name="video_section">
            <VideoHeader />
            <div className={styles.videoContainer}>
                <div className={styles.container}>
                    <VideoJS/>
                    <Feedback />
                </div>
                <Playlist />
            </div>
            <VideoDescription />
        </section>
    )
};