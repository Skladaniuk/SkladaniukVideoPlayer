import React, { useRef } from 'react';
import usePlayerStore from '../../store/playerStore';

const WebCamButton = () => {
    const playerStore = usePlayerStore();
    const webcamStreamRef = useRef(null);

    const toggleCamera = async () => {
        if (playerStore.currentSource === -1) {
            // Зупиняємо камеру, якщо вона активна
            if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach((track) => track.stop());
                webcamStreamRef.current = null;
            }
            playerStore.setSource(0); // Повертаємо до першого джерела
        } else {
            // Увімкнення камери
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamStreamRef.current = stream;
                playerStore.setSource(-1); // Встановлюємо спеціальне джерело для вебкамери
            } catch (error) {
                console.error('Не вдалося отримати доступ до вебкамери:', error);
            }
        }
    };

    return (
        <button onClick={toggleCamera}>
            {playerStore.currentSource === -1 ? 'Показати відео' : 'Увімкнути камеру'}
        </button>
    );
};

export default WebCamButton;
