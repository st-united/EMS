import { createSlice } from "@reduxjs/toolkit";

import { type RootState } from "@/redux/store";

export interface TriggerState {
  collapsed: boolean;
}

const initialState: TriggerState = {
  collapsed: false,
};

const triggleSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    openSidebar(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { openSidebar } = triggleSlice.actions;

export const selectTrigger = (state: RootState) => state.trigger;

export default triggleSlice.reducer;
