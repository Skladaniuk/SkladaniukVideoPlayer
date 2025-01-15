import { VideoHeader } from '../VideoHeader/VideoHeader';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { Playlist } from '../Playlist/Playlist';
import { VideoDescription } from '../VideoDescription/VideoDescription';
import styles from './VideoContainer.module.scss';
import { Feedback } from '../Feedback/Feedback';




export const VideoContainer = () => {
    return (
        <section name="video_section">
            <VideoHeader />
            <div className={styles.videoContainer}>
                <div className={styles.container}>
                    <VideoPlayer />
                    <Feedback />
                </div>
                <Playlist />
            </div>
            <VideoDescription />
        </section>
    )
};