import React from 'react';
import {Provider} from 'react-redux';
import store from '@store/index';
import AppNavigator from '@navigation/index';
import AppContainer from '@components/AppContainer';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;
