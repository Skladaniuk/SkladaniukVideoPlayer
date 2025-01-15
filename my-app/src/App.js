import React from 'react';
import './App.css';
import VideoJS from './components/VideoPlayer/VideoPlayer';
import videojs from 'video.js';
import Playlist from './components/Playlist/Playlist';
import { Header } from './components/Header/Header';
import { Video } from './components/Video/Video';
import { Container } from './components/Container/Container';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useMantineColorScheme, useComputedColorScheme, Button } from '@mantine/core';

function App() {

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <Header />
      <Container>
        <Button onClick={toggleColorScheme} className='toggleColorScheme'>
          <p className='toggleButtonText'>Change color theme</p>
          {computedColorScheme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>

        <Video />
      </Container>
    </>
  );
}

export default App;
