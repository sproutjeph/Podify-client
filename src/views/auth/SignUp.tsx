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

interface SignUpProps {}

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is Missing')
    .min(3, 'Name must be more than 2 chars')
    .required('Name is requried'),
  email: yup
    .string()
    .trim('Email is Missing')
    .email('Invalid Email')
    .required('Email is requried'),
  password: yup
    .string()
    .trim('Password is Missing')
    .min(8, 'Password is too short')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password is too simple',
    )
    .required('Password is requried'),
});
const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<SignUpProps> = ({}) => {
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
      validationSchema={signupSchema}>
      <AuthFormContainer
        heading="Welcome!"
        subHeading="Let's get started by creating your account">
        <View style={styles.formContainer}>
          <AuthInputField name="name" label="Name" placeholder="John Doe" />
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

          <SubmitBtn title="Sign Up" />

          <View style={styles.linksContainer}>
            <AppLink title="I Lost My Password?" color />
            <AppLink title="Sign in" />
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

export default SignUp;
