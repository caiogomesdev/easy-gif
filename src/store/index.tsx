import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './image-store';
import resolutionReducer from './resolution-store';

export const store = configureStore({
  reducer: {
    image: imageReducer,
    resolution: resolutionReducer,
  }
})

export type rootState = ReturnType<typeof store.getState>;
