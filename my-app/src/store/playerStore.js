import { create } from 'zustand';
import videoSources from '../videoSources.json';

const usePlayerStore = create((set) => ({
    autoplay: true,
    controls: true,
    width: 640,
    height: 360,
    volume: 0.5,
    currentSource: 0, 
    videoSources: videoSources,
    reviews: new Array(videoSources.length).fill([]),
    ratings: new Array(videoSources.length).fill(0),
    webcamStream: null,
    setAutoplay: (autoplay) => set({ autoplay }),
    setControls: (controls) => set({ controls }),
    setWidth: (width) => set({ width }),
    setHeight: (height) => set({ height }),
    setVolume: (volume) => set({ volume }),
    setSource: (index) => set({ currentSource: index }),
    setVideoSources: (newSources) => set({ videoSources: newSources }),
    addReview: (index, review) => set((state) => {
        const updatedReviews = [...state.reviews];
        updatedReviews[index] = [...updatedReviews[index], review];
        return { reviews: updatedReviews };
    }),
    addRating: (index, rating) => set((state) => {
        const updatedRatings = [...state.ratings];
        const currentReviews = state.reviews[index].length;
        const newRating = (updatedRatings[index] * currentReviews + rating) / (currentReviews + 1);
        updatedRatings[index] = newRating.toFixed(1);
        return { ratings: updatedRatings };
    }),
    setWebcamStream: (stream) => set({ webcamStream: stream })
}));

export default usePlayerStore;
