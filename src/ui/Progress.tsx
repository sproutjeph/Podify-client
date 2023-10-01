import colors from '@utils/Colors';
import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface ProgressProps {
  progress: number;
}

const Progress: FC<ProgressProps> = ({progress}) => {
  return (
    <>
      <Text style={styles.title}>{progress}%</Text>
      <View style={[styles.progressBar, {width: `${progress}%`}]} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    paddingVertical: 2,
    alignSelf: 'flex-end',
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.CONTRAST,
    borderRadius: 5,
  },
});

export default Progress;
