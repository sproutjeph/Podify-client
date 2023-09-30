import React from 'react';
import colors from '@utils/Colors';
import {FC} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

interface AppLinkProps {
  title: string;
  onPress?: () => void;
  color?: boolean;
  active?: boolean;
}

const AppLink: FC<AppLinkProps> = ({title, onPress, color, active = true}) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{opacity: active ? 1 : 0.4}}>
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
