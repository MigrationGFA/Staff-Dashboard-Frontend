import { createSlice } from "@reduxjs/toolkit";

const initialState = () => ({
  profile: null,
});

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState(),
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
