import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace state with new feed data
    },
    clearFeed: () => {
      return [];
    },
  },
});

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
