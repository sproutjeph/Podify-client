import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  avatar?: string;
  follwers: number;
  follwings: number;
}
interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  authLoadingState: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  authLoadingState: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(state, {payload}: PayloadAction<UserProfile | null>) {
      state.profile = payload;
    },
    updateLoggedIn(state, {payload}: PayloadAction<boolean>) {
      state.loggedIn = payload;
    },
    updateAuthLoadingState(state, {payload}: PayloadAction<boolean>) {
      state.authLoadingState = payload;
    },
  },
});

export const {updateLoggedIn, updateProfile, updateAuthLoadingState} =
  authSlice.actions;

export default authSlice.reducer;
