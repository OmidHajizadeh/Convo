import { Friend } from "@/lib/Models/Friend";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  friendsList: Friend[];
};

const initialState: InitialState = {
  friendsList: [],
};

const friendsSlice = createSlice({
  name: "friendsList",
  initialState,
  reducers: {
    setInitialFriendChats: (state, action: PayloadAction<Friend[]>) => {
      state.friendsList = action.payload.map((friendObj) => {
        return {
          friend: friendObj.friend,
          messages: friendObj.messages,
        } as Friend;
      });
    },
    addNewFriendChat: (state, action: PayloadAction<Friend>) => {
      state.friendsList.push(action.payload);
    },
    updateFriendChat: (
      state,
      action: PayloadAction<{ friendId: string; message: Message }>
    ) => {
      state.friendsList = state.friendsList.map((friendObject) => {
        if (friendObject.friend.id === action.payload.friendId) {
          const existingMessageIndex = friendObject.messages.findIndex(
            (message) => message.id === action.payload.message.id
          );

          if (existingMessageIndex !== -1) {
            const newMessageArray = friendObject.messages.slice();
            newMessageArray[existingMessageIndex] = action.payload.message;
            return {
              ...friendObject,
              messages: newMessageArray,
            } as Friend;
          } else {
            return {
              ...friendObject,
              messages: [action.payload.message, ...friendObject.messages],
            } as Friend;
          }
        }

        return friendObject;
      });
    },
  },
});

export const friendsReducer = friendsSlice.reducer;
export const friendsActions = friendsSlice.actions;

// optimisticallyUpdateFriendChat: (
//   state,
//   action: PayloadAction<{
//     friendId: string;
//     message: Message;
//     messageStatus: "error" | "pending" | "seen" | "unseen" | "success";
//   }>
// ) => {
//   state.friendsList = state.friendsList.map((friendObject) => {
//     if (friendObject.friend.id === action.payload.friendId) {
//       return {
//         ...friendObject,
//         messages: [
//           {
//             ...action.payload.message,
//             status: action.payload.messageStatus,
//           },
//           ...friendObject.messages,
//         ],
//       } as Friend;
//     }
//     return friendObject;
//   });
// },
