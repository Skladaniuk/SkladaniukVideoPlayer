import { create } from 'zustand';
import videoSources from '../videoSources.json';

const usePlayerStore = create((set) => ({
    autoplay: true,
    controls: true,
    width: 640,
    height: 360,
    volume: 0.5,
    currentSource: 0, // -1 для вебкамери, індекс для відео
    videoSources: videoSources,
    setAutoplay: (autoplay) => set({ autoplay }),
    setControls: (controls) => set({ controls }),
    setWidth: (width) => set({ width }),
    setHeight: (height) => set({ height }),
    setVolume: (volume) => set({ volume }),
    setSource: (index) => set({ currentSource: index }),
}));

export default usePlayerStore;
