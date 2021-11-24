import { createSlice } from "@reduxjs/toolkit";

const initialPollsState = {
  items: [],
}

const pollsSlice = createSlice({
  name: 'polls',
  initialState: initialPollsState,
  reducers: {

  }
})

export const pollsActions = pollsSlice.actions;

export default pollsSlice;