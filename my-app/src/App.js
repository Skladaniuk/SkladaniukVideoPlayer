import React from 'react';
import VideoJS from './components/VideoPlayer/VideoPlayer';
import videojs from 'video.js';
import Playlist from './components/Playlist/Playlist';

function App() {

  const playerRef = React.useRef(null);

  
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  return (
    <>
      <VideoJS onReady={handlePlayerReady} />
      <Playlist />

    </>
  );
}

export default App;