import {create} from 'zustand';

const usePlayerStore = create((set) => ({
    autoplay: true,
    controls: true,
    width: 640,
    height: 360,
    volume: 0.5,
    currentSource: 0,
    videoSources: [
        { src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
        { src: 'https://www.w3schools.com/html/movie.mp4', type: 'video/mp4' },
        { src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video/mp4', poster: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.jpg' },
    ],
    setAutoplay: (autoplay) => set({ autoplay }),
    setControls: (controls) => set({ controls }),
    setWidth: (width) => set({ width }),
    setHeight: (height) => set({ height }),
    setVolume: (volume) => set({ volume }),
    setSource: (index) => set((state) => ({
        currentSource: index,
        videoSources: [...state.videoSources]
    }))
}));

export default usePlayerStore;