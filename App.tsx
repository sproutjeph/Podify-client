import React from 'react';
import {Provider} from 'react-redux';
import store from '@store/index';
import AppNavigator from '@navigation/index';
import AppContainer from '@components/AppContainer';
import {ReactQueryProvider} from '@utils/reactQuery';

const App = () => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </ReactQueryProvider>
    </Provider>
  );
};

export default App;
