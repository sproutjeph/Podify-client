import React from 'react';
import {FC, ReactNode} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AppNotification from './AppNotification';

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNotification />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
