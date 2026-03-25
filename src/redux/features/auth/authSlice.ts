import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getStorageData } from "@/configs/storages";
import { ACCESS_TOKEN } from "@/constants";
import { type UserProfile } from "@/interfaces";

interface AuthState {
  isAuth: boolean;
  user: UserProfile | null;
  permissions: string[];
}

export interface SetAuthPayload {
  user: UserProfile;
  permissions?: string[];
}

const checkAuth = (): boolean => Boolean(getStorageData(ACCESS_TOKEN));

const initialState: AuthState = {
  isAuth: checkAuth(),
  user: null,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    setAuth(state, action: PayloadAction<SetAuthPayload>) {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions ?? [];
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, logout, login } = actions;

export default reducer;
