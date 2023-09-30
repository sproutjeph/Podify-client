import React from 'react';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
