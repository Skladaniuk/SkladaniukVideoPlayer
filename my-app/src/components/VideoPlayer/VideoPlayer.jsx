import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import usePlayerStore from '../../store/playerStore';
import styles from './VideoPlayer.module.scss';
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg';

export const VideoPlayer = () => {


    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { currentSource, setSource, videoSources, width, height, autoplay, controls, volume } = usePlayerStore();
    const webcamStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, {
                width,
                height,
                autoplay,
                controls,
                volume,
                sources: currentSource === -1 ? [] : [videoSources[currentSource]],
            }, () => {
                videojs.log('player is ready');
                player.volume(volume);
            }));

            player.on('ended', () => {
                if (currentSource !== -1) {
                    setSource((currentSource + 1) % videoSources.length);
                }
            });
        } else {
            const player = playerRef.current;
            player.autoplay(autoplay);
            player.controls(controls);
            player.width(width);
            player.height(height);
            player.volume(volume);

            if (currentSource === -1) {
                if (webcamStreamRef.current) {
                    const videoElement = player.tech().el();
                    videoElement.srcObject = webcamStreamRef.current;
                    videoElement.play();
                }
            } else {
                const videoElement = player.tech().el();
                videoElement.srcObject = null;
                player.src(videoSources[currentSource]);
            }
        }
    }, [currentSource]);

    useEffect(() => {
        return () => {
            const player = playerRef.current;
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
            if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleCamera = async () => {
        if (currentSource === -1) {
            if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach(track => track.stop());
                webcamStreamRef.current = null;
            }
            setSource(0);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamStreamRef.current = stream;
                setSource(-1);
            } catch (error) {
                console.error('Unable to access the webcam:', error);
            }
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current = null;
                setIsRecording(false);
            }
        } else {
            if (webcamStreamRef.current && !mediaRecorderRef.current) {
                mediaRecorderRef.current = new MediaRecorder(webcamStreamRef.current);
                mediaRecorderRef.current.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                    }
                };
                mediaRecorderRef.current.start();
                setIsRecording(true);
            }
        }
    };

    const downloadRecordedVideo = () => {
        if (recordedChunksRef.current.length > 0) {
            const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
            recordedChunksRef.current = [];
            if (blob.size > 0) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `video-${new Date().toISOString()}.mp4`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } else {
            console.error('No recorded video to download.');
        }
    };

    return (
        <div data-vjs-player>
            <div ref={videoRef}></div>
            <button className={`${styles.button} ${styles.toggleCameraButton}`} onClick={toggleCamera}>
                {currentSource === -1 ? 'Show video list' : 'Turn on Camera'}
            </button>
            {currentSource === -1 && (
                <>
                    <button
                        className={`${styles.button} ${styles.recordButton} ${isRecording ? styles.recording : ''}`}
                        onClick={toggleRecording}
                    >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <button className={`${styles.button} ${styles.downloadButton}`} onClick={downloadRecordedVideo}>
                        Download Video
                    </button>
                </>
            )}
            {currentSource !== -1 && (
                <div className={styles.controlsButtons}>
                    <button className={`${styles.button} ${styles.prevButton}`} onClick={() => setSource((currentSource - 1 + videoSources.length) % videoSources.length)}>
                        <Arrow />
                        <span>Previous</span>
                    </button>
                    <button className={`${styles.button} ${styles.nextButton}`} onClick={() => setSource((currentSource + 1) % videoSources.length)}>
                        <span>Next</span>
                        <Arrow />
                    </button>
                </div>
            )}
        </div>
    );
};