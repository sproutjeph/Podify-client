/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {FC} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import Loader from './Loader';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
}

const AppButton: FC<AppButtonProps> = ({title, onPress, loading}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {loading ? <Loader /> : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});

export default AppButton;
