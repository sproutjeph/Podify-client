/* eslint-disable react/react-in-jsx-scope */
import {FC, useEffect, useRef, useState} from 'react';
import colors from '@utils/Colors';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface VerificationProps {}

const otpFields = new Array(6).fill('');

const Verification: FC<VerificationProps> = ({}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeField, setActiveField] = useState(0);

  const inputRef = useRef<TextInput>(null);

  const handleChange = (key: string, index: number) => {
    const newOtp = [...otp];
    if (key === 'Backspace') {
      if (!newOtp[index]) {
        setActiveField(index - 1);
      }
      newOtp[index] = '';
    } else {
      setActiveField(index + 1);
      newOtp[index] = key;
    }

    setOtp([...newOtp]);
  };

  const handlePaste = (key: string) => {
    if (key.length === 6) {
      Keyboard.dismiss();
      const newOtp = key.split('');
      setOtp([...newOtp]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeField]);

  return (
    <AuthFormContainer heading="Please check your Email">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otpFields.map((_, index) => (
            <OTPField
              key={index}
              placeholder="*"
              ref={activeField === index ? inputRef : null}
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              keyboardType="numeric"
              onChangeText={handlePaste}
              value={otp[index] || ''}
            />
          ))}
        </View>

        <AppButton title="Send Link" />

        <View style={styles.linksContainer}>
          <AppLink title="Resend OTP" />
        </View>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linksContainer: {
    width: '100%',
    color: colors.ERROR,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
});

export default Verification;
