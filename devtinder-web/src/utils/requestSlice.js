import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    data: null, // store requests list here
  },
  reducers: {
    addRequests: (state, action) => {
      state.data = action.payload; // correctly sets the new data
    },
    removeRequests: (state) => {
      state.data = null; // resets requests
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;