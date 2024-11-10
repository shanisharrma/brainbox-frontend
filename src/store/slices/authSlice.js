import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: null,
  roles: [],
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setRoles(state, action) {
      state.roles = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.roles = [];
      state.signupData = null;
      state.error = null;
    },
  },
});

export const {
  setToken,
  setLoading,
  setSignupData,
  setRoles,
  clearAuth,
  setError,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
