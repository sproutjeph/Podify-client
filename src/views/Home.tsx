import {useFetchLatestAudios} from '@hooks/queries';
import React from 'react';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const {data} = useFetchLatestAudios();
  console.log(data);

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
