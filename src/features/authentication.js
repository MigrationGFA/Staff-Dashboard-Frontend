import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/authRoute";
import { setProfile } from "./profile";
import { useDispatch } from "react-redux";

// Initial state for authentication
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

// staff login
export const adminLogin = createAsyncThunk(
  "authLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.adminLogin({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// staff onboarding
export const completeOnboarding = createAsyncThunk(
  "auth/completeOnboarding",
  async (
    { accessToken, refreshToken, userId, payload },
    { rejectWithValue }
  ) => {
    const dispatch = useDispatch();

    try {
      const response = await api.onboarding({
        accessToken,
        refreshToken,
        userId,
        payload,
      });
      console.log("onboarding response:", response.data);
      dispatch(setProfile(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.message || error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // admin auth
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.refreshToken = action.payload.data.refreshToken;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(completeOnboarding.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(completeOnboarding.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
