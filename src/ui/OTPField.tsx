/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface OTPFieldProps extends TextInputProps {
  ref: any;
}

const OTPField = forwardRef<TextInput, OTPFieldProps>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    textAlign: 'center',
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

export default OTPField;
