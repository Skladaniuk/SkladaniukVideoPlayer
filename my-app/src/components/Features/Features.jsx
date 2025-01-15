import { useRef } from 'react';
import usePlayerStore from '../../store/playerStore';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiOutlineVideoCamera } from "react-icons/hi2";
import styles from './Features.module.scss';

export const Features = () => {
    const playerStore = usePlayerStore();
    const inputRef = useRef(null);

    const addVideoSource = () => {
        const newSource = inputRef.current?.value.trim();

        if (validateVideoSource(newSource)) {
            playerStore.setVideoSources([
                ...playerStore.videoSources,
                { src: newSource, poster: `${newSource}.jpg` }
            ]);
            inputRef.current.value = '';
        } else {
            alert('Invalid video source URL. The video must have an extension .mp4 or .webm.');
        }
    };

    const validateVideoSource = (source) =>
        source && /\.(mp4|webm)$/i.test(source);

    return (
        <div className={styles.utilityContainer}>
            <div className={styles.validationCointainer}>
                <input
                    ref={inputRef}
                    placeholder="Enter the source link..."
                    className={styles.validateInput}
                    type="text"
                />
                <button
                    className={styles.inputButton}
                    type="button"
                    onClick={addVideoSource}
                >
                    <FaRegCheckCircle className={styles.check} />
                </button>
            </div>
        </div>
    );
};
