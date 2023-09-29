/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface AppInputProps extends TextInputProps {}

const AppInput: FC<AppInputProps> = AppInputProps => {
  return (
    <TextInput
      {...AppInputProps}
      style={[styles.input, AppInputProps.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    color: colors.CONTRAST,
    borderRadius: 25,
    padding: 10,
  },
});

export default AppInput;
