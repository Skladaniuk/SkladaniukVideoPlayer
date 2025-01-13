import React from 'react';
import usePlayerStore from '../../store/playerStore';

const VideoControls = () => {
    const { togglePlay, setVolume, setTheme, theme } = usePlayerStore();

    return (
        <div>
            <button onClick={togglePlay}>Play/Pause</button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                onChange={(e) => setVolume(Number(e.target.value))}
            />
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </div>
    );
};

export default VideoControls;