import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  profile: {
    name: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setProfile(state, action: PayloadAction<{name: string; email: string}>) {
      state.profile = action.payload;
    },
    logout(state) {
      state.token = null;
      state.profile = null;
    },
  },
});

export const {setToken, setProfile, logout} = authSlice.actions;

export default authSlice.reducer;
