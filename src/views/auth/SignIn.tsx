/* eslint-disable react/react-in-jsx-scope */
import {FC, useState} from 'react';
import colors from '@utils/Colors';
import {View, StyleSheet} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisiblityIcon from '@ui/PasswordVisiblityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';

interface SignInProps {}

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is Missing')
    .email('Invalid Email')
    .required('Email is requried'),
  password: yup
    .string()
    .trim('Password is Missing')
    .min(8, 'Password is too short')
    .required('Password is requried'),
});
const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<SignInProps> = ({}) => {
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordVisiblity = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
      }}
      validationSchema={signInSchema}>
      <AuthFormContainer heading="Welcome Back">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <AuthInputField
            name="password"
            label="Password"
            placeholder="************"
            secureTextEntry={secureEntry}
            autoCapitalize="none"
            rightIcon={<PasswordVisiblityIcon privateIcon={secureEntry} />}
            onRightIconPressed={() => {
              togglePasswordVisiblity();
            }}
          />

          <SubmitBtn title="Sign In" />

          <View style={styles.linksContainer}>
            <AppLink title="I Lost My Password?" color />
            <AppLink title="Sign Up" />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: colors.ERROR,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default SignIn;
