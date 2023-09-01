import { configureStore } from "@reduxjs/toolkit";
import { friendRequestsReducer } from "./FriendRequests/friendRequestsSlice";
import { friendsReducer } from "./friendsSlice/friendsSlice";
import { explorerReducer } from "./Explorer/explorerSlice";

export const store = configureStore({
  reducer: {
    friendRequests: friendRequestsReducer,
    friends: friendsReducer,
    explorer: explorerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
