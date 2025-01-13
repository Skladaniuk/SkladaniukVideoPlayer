import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import usePlayerStore from '../../store/playerStore';

export const VideoJS = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const playerStore = usePlayerStore();

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, {
                width: playerStore.width,
                height: playerStore.height,
                autoplay: playerStore.autoplay,
                controls: playerStore.controls,
                sources: [playerStore.videoSources[playerStore.currentSource]]
            }, () => {
                videojs.log('player is ready');
                player.volume(playerStore.volume);
            });

            player.on('ended', () => {
                playerStore.setSource((playerStore.currentSource + 1) % playerStore.videoSources.length);
            });
        } else {
            const player = playerRef.current;
            player.autoplay(playerStore.autoplay);
            player.controls(playerStore.controls);
            player.width(playerStore.width);
            player.height(playerStore.height);
            player.volume(playerStore.volume);
            player.src(playerStore.videoSources[playerStore.currentSource]);
        }
    }, [playerStore]);

    useEffect(() => {
        return () => {
            const player = playerRef.current;
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
};

export default VideoJS;