import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: false,
  user: null,
  loading: true
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setIsAuthorized, setUser, setLoading } = UserSlice.actions;
export default UserSlice.reducer;
