/* eslint-disable react/react-in-jsx-scope */
import {FC, useEffect, useRef, useState} from 'react';
import colors from '@utils/Colors';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/@types/navigation';
import axiosInstance from '@api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type VerificationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Verification'
>;

const otpFields = new Array(6).fill('');

const Verification: FC<VerificationProps> = ({route}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeField, setActiveField] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {userInfo} = route.params;

  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) {
      return;
    }
    setIsLoading(true);

    try {
      const {data} = await axiosInstance.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      navigation.navigate('SignIn');
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

        <AppButton title="Submit" onPress={handleSubmit} loading={isLoading} />

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
