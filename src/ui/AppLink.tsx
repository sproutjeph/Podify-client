/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {FC} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

interface AppLinkProps {
  title: string;
  onPress?: () => void;
  color?: boolean;
}

const AppLink: FC<AppLinkProps> = ({title, onPress, color}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={color ? styles.error : styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.SECONDARY,
  },
  error: {
    color: colors.ERROR,
  },
});

export default AppLink;
