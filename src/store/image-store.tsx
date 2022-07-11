import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Frame } from "../components/contracts";

const store = createSlice({
  name: 'image',
  initialState: {
    data: [] as Frame[],
    currentIndex: 0,
    length: 0,
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
      console.log(context.payload)
      state.data[index].scale = value;
    }
  },
})

type ChangeScale = {
  index: number;
  value: number;
}
type IState = {
  data: Frame[],
  currentIndex: number,
  length: number,
}

export const { addFrame, changeFrame, removeFrame, changeScale } = store.actions;
export default store.reducer;
