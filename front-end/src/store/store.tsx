import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    posts: gifReducer,
  }
})

function gifReducer(){
  return [];
}
