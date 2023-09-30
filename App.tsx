import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from '@navigation/AuthNavigator';
import {Provider} from 'react-redux';
import store from 'src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
