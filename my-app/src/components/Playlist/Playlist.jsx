import { useState, useEffect } from "react";
import usePlayerStore from "../../store/playerStore";
import { FaPlay } from "react-icons/fa";
import { Features } from "../Features/Features";
import styles from "./Playlist.module.scss";

export const Playlist = () => {

    
    const { videoSources, setSource, currentSource } = usePlayerStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextVideo = () => {
        if (currentIndex < videoSources.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSource(nextIndex);
        }
    };

    useEffect(() => {
        const videoElement = document.querySelector("video");

        if (videoElement) {
            videoElement.addEventListener("ended", nextVideo);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener("ended", nextVideo);
            }
        };
    }, [currentIndex, videoSources.length]);

    useEffect(() => {

        if (currentIndex !== currentSource) {
            setCurrentIndex(currentSource);
        }
    }, [currentSource]);


    return (
        <div className={styles.playlist}>
            <Features />
            <ul className={styles.videoList}>
                {videoSources.map((video, index) => (
                    <li
                        key={index}
                        className={`${styles.playlistItem} ${currentIndex === index ? styles.active : ""}`}
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
                        <span className={styles.videoName}>{video.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
