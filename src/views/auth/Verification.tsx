/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import colors from '@utils/Colors';
import {View, StyleSheet} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface VerificationProps {}

const otpFields = new Array(6).fill('');

const Verification: FC<VerificationProps> = ({}) => {
  return (
    <AuthFormContainer heading="Please check your Email">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otpFields.map((_, index) => (
            <OTPField key={index} placeholder="*" />
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
