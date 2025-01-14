import React, { useState, useEffect } from 'react';
import usePlayerStore from '../../store/playerStore';
import styles from './Playlist.module.scss';

const Playlist = () => {
    const { videoSources, setSource } = usePlayerStore();
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

        // Очищаємо слухача під час демонтованого компонента
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', nextVideo);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    return (
        <div className={styles.playlist}>
            {videoSources.map((video, index) => (
                <div
                    key={index}
                    className={styles.playlistItem}
                    onClick={() => setSource(index)}
                >
                    <img src={video.poster || 'https://via.placeholder.com/640x360'} alt={`Video ${index + 1}`} />
                    <p>{`Video ${index + 1}`}</p>
                </div>
            ))}
        </div>
    );
};

export default Playlist;