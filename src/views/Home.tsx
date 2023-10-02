import LatestUploads from '@components/LastestUploads';
import colors from '@utils/Colors';
import React from 'react';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <View style={styles.container}>
      <LatestUploads />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  space: {
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
