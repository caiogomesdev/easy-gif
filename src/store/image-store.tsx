import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const store = createSlice({
  name: 'image',
  initialState: {
    data: [],
    currentIndex: 0,
  },
  reducers: {
    addImage(state: IState, context: PayloadAction<string>){
      const index = state.data.length;
      state.data = [...state.data, context.payload]
      state.currentIndex = index;
    },
    changeImage(state: IState, context: PayloadAction<number>){
      state.currentIndex = context.payload
      console.log('mudou',context.payload)
    },
  },
})

type IState = {
  data: string[],
  currentIndex: number,
}

export const { addImage, changeImage } = store.actions;
export default store.reducer;
