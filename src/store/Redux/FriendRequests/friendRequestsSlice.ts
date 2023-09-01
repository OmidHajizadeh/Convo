import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  friendRequestsCount: number;
  friendRequestsList: User[];
};

const initialState: InitialState = {
  friendRequestsCount: 0,
  friendRequestsList: [],
};

const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState,
  reducers: {
    setInitialFriendRequests: (state, action: PayloadAction<Array<User>>) => {
      state.friendRequestsList = action.payload;
      state.friendRequestsCount = action.payload.length;
    },
    setNewFriendRequest: (state, action: PayloadAction<User>) => {
      state.friendRequestsList.push(action.payload);
      state.friendRequestsCount++;
    },
    handledFriendRequest: (state, action: PayloadAction<string>) => {
      state.friendRequestsList = state.friendRequestsList.filter(request => {
        return request.id !== action.payload;
      });
      state.friendRequestsCount--;
    },
  },
});

export const friendRequestsReducer = friendRequestsSlice.reducer;
export const friendRequestsActions = friendRequestsSlice.actions;
