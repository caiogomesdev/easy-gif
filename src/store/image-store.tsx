import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Frame } from "../components/contracts";

const store = createSlice({
  name: 'image',
  initialState: {
    data: [] as Frame[],
    currentIndex: 0,
    length: 0,
    interval: 1000
  },
  reducers: {
    addFrame(state: IState, context: PayloadAction<Frame>){
      const index = state.data.length;
      state.data = [...state.data, context.payload]
      state.currentIndex = index;
      state.length = state.data.length;
    },
    changeFrame(state: IState, context: PayloadAction<number>){
      state.currentIndex = context.payload
    },
    removeFrame(state: IState, context: PayloadAction<number>){
      const index = context.payload;
      state.data.splice(index, 1);
      state.length = state.data.length;
      let currentIndex = state.length;
      if (index === currentIndex){
        currentIndex--;
      }else {
        currentIndex = index;
      }
      state.currentIndex = currentIndex;
    },
    changeScale(state: IState, context: PayloadAction<ChangeScale>){
      const { index, value} = context.payload;
      state.currentIndex = index;
      state.data[index].scale = value;
    },
    changeCurrentFrame(state: IState, context: PayloadAction<number>){
      state.currentIndex = context.payload;
    },
    changeInterval(state: IState, context: PayloadAction<number>){
      state.interval = context.payload;
    }
  },
})

type ChangeScale = {
  index: number;
  value: number;
}
export type IState = {
  data: Frame[],
  currentIndex: number,
  length: number,
  interval: number
}

export const {
  addFrame,
  changeFrame,
  removeFrame,
  changeScale,
  changeCurrentFrame,
  changeInterval
 } = store.actions;
export default store.reducer;
