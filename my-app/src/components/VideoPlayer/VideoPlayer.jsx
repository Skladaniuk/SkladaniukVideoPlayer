import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import usePlayerStore from '../../store/playerStore';

export const VideoJS = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const playerStore = usePlayerStore();
    const webcamStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, {
                width: playerStore.width,
                height: playerStore.height,
                autoplay: playerStore.autoplay,
                controls: playerStore.controls,
                sources: playerStore.currentSource === -1
                    ? []
                    : [playerStore.videoSources[playerStore.currentSource]],
            }));

            player.on('ended', () => {
                if (playerStore.currentSource !== -1) {
                    playerStore.setSource((playerStore.currentSource + 1) % playerStore.videoSources.length);
                }
            });

        } else {
            const player = playerRef.current;
            player.autoplay(playerStore.autoplay);
            player.controls(playerStore.controls);
            player.width(playerStore.width);
            player.height(playerStore.height);

            if (playerStore.currentSource === -1) {
                // Якщо джерело - вебкамера
                if (webcamStreamRef.current) {
                    const videoElement = player.tech().el(); // Отримуємо HTML-елемент відео
                    videoElement.srcObject = webcamStreamRef.current;
                    videoElement.play();
                }
            } else {
                // Джерело - відеофайл
                const videoElement = player.tech().el();
                videoElement.srcObject = null; // Відключаємо потік вебкамери
                player.src(playerStore.videoSources[playerStore.currentSource]);
            }
        }
    }, [playerStore]);

    useEffect(() => {
        return () => {
            const player = playerRef.current;
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
            if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const toggleCamera = async () => {
        if (playerStore.currentSource === -1) {
            // Перемикання на відео
            if (webcamStreamRef.current) {
                // Зупиняємо потік вебкамери
                webcamStreamRef.current.getTracks().forEach((track) => track.stop());
                webcamStreamRef.current = null;
            }
            playerStore.setSource(0); // Повертаємося до відеофайлів
        } else {
            // Увімкнення вебкамери
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamStreamRef.current = stream;
                playerStore.setSource(-1); // Перемикаємо на вебкамеру
            } catch (error) {
                console.error('Не вдалося отримати доступ до вебкамери:', error);
            }
        }
    };

    const startRecording = () => {
        if (webcamStreamRef.current && !mediaRecorderRef.current) {
            mediaRecorderRef.current = new MediaRecorder(webcamStreamRef.current);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log('AAAAAAAAAAAAAAa', event.data.size)
                    recordedChunksRef.current.push(event.data);
                    console.log('----------', recordedChunksRef.current.length);
                }
            };
            mediaRecorderRef.current.start();
        }
    };

    const stopRecording = async () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();

            // Очікування завершення запису
            await new Promise(resolve => {
                mediaRecorderRef.current.onstop = resolve;
            });

            mediaRecorderRef.current = null;

            if (recordedChunksRef.current.length > 0) {
                const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
                recordedChunksRef.current = []; // Очистка записаних даних після запису

                if (blob.size > 0) {
                    const url = URL.createObjectURL(blob);
                    const downloadButton = document.createElement('button');
                    downloadButton.innerText = 'Завантажити';
                    downloadButton.onclick = () => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `video-${new Date().toISOString()}.mp4`;
                        a.click();
                        URL.revokeObjectURL(url);
                    };

                    document.body.appendChild(downloadButton);
                }
            }
        }
    };


    return (
        <div data-vjs-player>
            <div ref={videoRef}></div>
            <button onClick={toggleCamera}>
                {playerStore.currentSource === -1 ? 'Показати відео' : 'Увімкнути камеру'}
            </button>
            {playerStore.currentSource === -1 && (
                <>
                    <button onClick={startRecording}>Записати відео</button>
                    <button onClick={stopRecording}>Зупинити запис</button>
                </>
            )}
        </div>
    );
};

export default VideoJS;