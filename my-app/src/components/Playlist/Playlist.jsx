import React, { useState, useEffect } from 'react';
import usePlayerStore from '../../store/playerStore';
import styles from './Playlist.module.scss';
import { FaPlay } from 'react-icons/fa';
import { Features } from '../Features/Features';


const Playlist = () => {
    const { videoSources, setSource, currentSource } = usePlayerStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Функція для переходу на наступне відео
    const nextVideo = () => {
        if (currentIndex < videoSources.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSource(currentIndex + 1);
        }
    };

    useEffect(() => {
        // Додаємо слухача завершення відео
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.addEventListener('ended', nextVideo);
        }

        // Очищаємо слухача під час демонтажу компонента
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', nextVideo);
            }
        };
    }, [currentIndex]);

    return (
        <div className={styles.playlist}>
            <Features />
            <ul className={styles.videoList}>
                {videoSources.map((video, index) => (
                    <li
                        key={index}
                        className={`${styles.playlistItem} ${currentIndex === index ? styles.active : ''
                            }`}
                        onClick={() => {
                            setCurrentIndex(index);
                            setSource(index);
                        }}
                    >
                        <div className={styles.posterWrapper}>
                            <img
                                src={video.poster}
                                alt={`Poster for ${video.src}`}
                                className={styles.poster}
                            />
                            {currentIndex === index && (
                                <div className={styles.playIcon}>
                                    <FaPlay size={16} color="#fff" />
                                </div>
                            )}
                        </div>
                        <span className={styles.videoName}>
                            {videoSources[index].title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
