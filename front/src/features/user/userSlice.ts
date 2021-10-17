import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "commons/interfaces";
import { loginUser, signupUser, logoutUser } from "services/Login";

interface UserState {
  data: IUser | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState = {
  data: undefined,
  status: "idle",
  error: null,
};

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (userData: IUser) => {
    await signupUser(userData);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const { } = userSlice.actions;

export default userSlice.reducer;
