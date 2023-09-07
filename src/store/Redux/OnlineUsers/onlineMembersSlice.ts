import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  members: string[];
};

const initialState: InitialState = {
  members: [],
};

const onlineMembersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.members.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((id) => action.payload !== id);
    },
    set: (state, action: PayloadAction<string[]>) => {
      state.members = action.payload;
    },
  },
});

export const onlineMembersReducer = onlineMembersSlice.reducer;
export const onlineMembersActions = onlineMembersSlice.actions;
