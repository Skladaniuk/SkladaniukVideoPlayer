import React, { useRef } from "react";
import usePlayerStore from "../../store/playerStore";

const WebCamButton = () => {
    const { currentSource, setSource } = usePlayerStore();
    const webcamStreamRef = useRef(null);

    const toggleCamera = async () => {
        if (currentSource === -1) {
            if (webcamStreamRef.current) {
                webcamStreamRef.current.getTracks().forEach((track) => track.stop());
                webcamStreamRef.current = null;
            }
            setSource(0);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamStreamRef.current = stream;
                setSource(-1);
            } catch (error) {
                console.error("Не вдалося отримати доступ до вебкамери:", error);
            }
        }
    };

    return (
        <button onClick={toggleCamera}>
            {currentSource === -1 ? "Показати відео" : "Увімкнути камеру"}
        </button>
    );
};

export default WebCamButton;
