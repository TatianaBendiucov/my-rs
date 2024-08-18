import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/types/user";

const initialState: User[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
