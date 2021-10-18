import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "commons/interfaces";
import { loginUser, signupUser, logoutUser, userData } from "services/Login";

interface UserState {
  data: IUser | null;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState = {
  data: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (userData: IUser) => {
    await signupUser(userData);
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData: IUser) => {
    const response = await loginUser(userData);
    return response.user;
  }
);

export const userLogout = createAsyncThunk("user/logout", async () => {
  const response = await logoutUser();
  return response;
});

export const getUserData = createAsyncThunk("user/data", async () => {
  const response = await userData();
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.error = null;
      state.status = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
        state.isLoggedIn = true;
      });
  },
});

export const { setStatus, setData } = userSlice.actions;

export default userSlice.reducer;
