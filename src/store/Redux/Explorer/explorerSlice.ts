import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isUserInExplorer: boolean;
};

const initialState: InitialState = {
  isUserInExplorer: false,
};

const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    updateExplorerStatus: (state, action: PayloadAction<boolean>) => {
      state.isUserInExplorer = action.payload;
    },
  },
});

export const explorerReducer = explorerSlice.reducer;
export const explorerActions = explorerSlice.actions;
