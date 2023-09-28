/* eslint-disable react/react-in-jsx-scope */
import AppInput from '@ui/AppInput';
import colors from '@utils/Colors';
import {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AuthInputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  errorMsg?: string;
}

const AuthInputField: FC<AuthInputFieldProps> = ({
  placeholder,
  label,
  value,
  errorMsg,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  containerStyle,
  onChange,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    color: colors.CONTRAST,
  },
  errorMsg: {
    color: colors.ERROR,
  },
});

export default AuthInputField;
