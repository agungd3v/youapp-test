import { createSlice } from "@reduxjs/toolkit";

export interface IFormState {
  formAbout: boolean;
}

const initialState: IFormState = {
  formAbout: false,
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormAboutState: (state, action) => {
      state.formAbout = action.payload;
    },
  }
});

export const { setFormAboutState } = formSlice.actions;
export const formReducer = formSlice.reducer;