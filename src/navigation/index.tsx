import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import AuthNavigator from './AuthNavigator';
import {useAppSelector} from '@store/hooks';
import BottomBar from './BottomBar';

interface indexProps {}

const AppNavigator: FC<indexProps> = ({}) => {
  const {loggedIn} = useAppSelector(state => state.auth);
  return (
    <NavigationContainer>
      {loggedIn ? <BottomBar /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
