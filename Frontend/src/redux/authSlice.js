import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false,
    user:null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});

export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;


// login(state, action) {
//   state.isLoggedIn = true;
//   state.user = action.payload;
// },
// logout(state) {
//   state.isLoggedIn = false;
//   state.user = null;
// },