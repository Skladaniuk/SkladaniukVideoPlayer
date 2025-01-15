import { useRef } from 'react';
import usePlayerStore from '../../store/playerStore';
import { FaRegCheckCircle } from 'react-icons/fa';
import styles from './Features.module.scss';
import { HiOutlineVideoCamera } from "react-icons/hi2"

export const Features = () => {
    const playerStore = usePlayerStore();
    const inputRef = useRef(null);
    console.log('123456', playerStore.webcamStream)
    const addVideoSource = () => {
        const newSource = inputRef.current.value.trim();
        const isValid = validateVideoSource(newSource);

        if (isValid) {
            playerStore.setVideoSources([...playerStore.videoSources, { src: newSource, poster: `${newSource}.jpg` }]);
            inputRef.current.value = '';
        } else {
            alert('Invalid video source URL');
        }
    };

    const validateVideoSource = (source) => {

        return source && (source.endsWith('.mp4') || source.endsWith('.webm'));
    };

    return (
        <div className={styles.utilityContainer}>
            <div className={styles.validationCointainer}>
                <input
                    ref={inputRef}
                    placeholder='Enter the source link... '
                    className={styles.validateInput}
                    type="text"
                />
                <button className={styles.inputButton} type='button' onClick={addVideoSource}>
                    <FaRegCheckCircle className={styles.check} />
                </button>
            </div>
            <button className={styles.cameraButton}>
                <HiOutlineVideoCamera className={styles.camera} />
            </button>
        </div>
    );
};
