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
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
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
  },
});

export const {updateLoggedIn, updateProfile} = authSlice.actions;

export default authSlice.reducer;
