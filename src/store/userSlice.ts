import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  auth: boolean;
  user: any;
  interests: string[];
}

const initialState: IUserState = {
  auth: false,
  user: null,
  interests: []
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.auth = action.payload;
    },
    setUserState: (state, action) => {
      state.user = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    }
  }
});

export const { setAuthState, setUserState, setInterests } = userSlice.actions;
export const userReducer = userSlice.reducer;