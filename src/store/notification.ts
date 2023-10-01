import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type notificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
  message: string;
  type: notificationType;
}

const initialState: NotificationState = {
  message: '',
  type: 'success',
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(
      state,
      {payload}: PayloadAction<{message: string; type: notificationType}>,
    ) {
      state.message = payload.message;
      state.type = payload.type;
    },
  },
});

export const {updateNotification} = notificationSlice.actions;

export default notificationSlice.reducer;
