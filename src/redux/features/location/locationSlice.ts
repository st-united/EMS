import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Location } from "@/interfaces";

interface LocationState {
  selectedLocation: Location | null;
}

const initialState: LocationState = {
  selectedLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocation(state, action: PayloadAction<Location>) {
      state.selectedLocation = action.payload;
    },
    clearSelectedLocation(state) {
      state.selectedLocation = null;
    },
  },
});

const { reducer, actions } = locationSlice;

export const { setSelectedLocation, clearSelectedLocation } = actions;

export default reducer;
