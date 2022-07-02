import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './image-store';

export const store = configureStore({
  reducer: {
    image: imageReducer,
  }
})

export type rootState = ReturnType<typeof store.getState>;
