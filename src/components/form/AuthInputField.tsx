/* eslint-disable react/react-in-jsx-scope */
import AppInput from '@ui/AppInput';
import colors from '@utils/Colors';
import {useFormikContext} from 'formik';
import {FC, ReactNode, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AuthInputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
  onRightIconPressed?: () => void;
}

const AuthInputField: FC<AuthInputFieldProps> = ({
  name,
  placeholder,
  label,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  containerStyle,
  rightIcon,
  onRightIconPressed,
}) => {
  const inputTransformValue = useSharedValue(0);
  const {handleChange, values, errors, touched, handleBlur} = useFormikContext<{
    [key: string]: string;
  }>();
  const errorMsg = touched[name] && errors[name] ? errors[name] : '';
  const shakUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, {duration: 50}),
      withSpring(0, {
        damping: 8,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: inputTransformValue.value}],
    };
  });

  useEffect(() => {
    if (errorMsg) {
      shakUI();
    }
  }, [errorMsg]);

  return (
    <Animated.View style={[containerStyle, inputStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <View>
        <AppInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange(name)}
          value={values[name]}
          onBlur={handleBlur(name)}
        />
        {rightIcon ? (
          <Pressable style={styles.rightIcon} onPress={onRightIconPressed}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  rightIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthInputField;
