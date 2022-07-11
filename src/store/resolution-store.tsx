import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const store = createSlice({
  name: 'resolution',
  initialState: {
    width: 512,
    height: 288
  },
  reducers: {
    changeWidth(state: IState, context: PayloadAction<number>){
      state.width = context.payload;
    },
    changeHeight(state: IState, context: PayloadAction<number>){
      state.height = context.payload;
    }
  },
})

export type IState = {
  width: number,
  height: number
}

export const { changeWidth, changeHeight } = store.actions;
export default store.reducer;
