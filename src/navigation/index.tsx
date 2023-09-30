/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {FC} from 'react';
import AuthNavigator from './AuthNavigator';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import BottomBar from './BottomBar';
import {StoreKeys, getFromAsyncStorage} from '@utils/asyncStorage';
import axiosInstance from '@api/client';
import {
  updateAuthLoadingState,
  updateLoggedIn,
  updateProfile,
} from '@store/auth';
import Loader from '@ui/Loader';
import {View, StyleSheet} from 'react-native';
import colors from '@utils/Colors';

interface indexProps {}
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

const AppNavigator: FC<indexProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {loggedIn, authLoadingState} = useAppSelector(state => state.auth);

  const fetchAuthInfo = async () => {
    dispatch(updateAuthLoadingState(true));
    try {
      const token = await getFromAsyncStorage(StoreKeys.AUTH_TOKEN);
      if (!token) {
        return dispatch(updateAuthLoadingState(false));
      }
      const {data} = await axiosInstance.get('/auth/is-auth', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedIn(true));

      console.log('auth data', data);
    } catch (error) {
      console.log('Auth error', error);
    }
    dispatch(updateAuthLoadingState(false));
  };

  useEffect(() => {
    fetchAuthInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer theme={AppTheme}>
      {authLoadingState ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <BottomBar /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
