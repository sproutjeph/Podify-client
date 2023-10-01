import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
