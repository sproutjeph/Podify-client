/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import colors from '@utils/Colors';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcometSubText}>
          Let's get started by creating your account.
        </Text>
      </View>

      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={signupSchema}>
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
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <SubmitBtn title="Sign Up" />
        </View>
      </Form>

      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={{color: colors.ERROR}}>I Lost My Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: colors.SECONDARY}}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: '20%',
  },
  welcomeText: {
    color: colors.SECONDARY,
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcometSubText: {
    color: colors.CONTRAST,
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 20,
  },
  btn: {
    backgroundColor: colors.SECONDARY,
    height: 45,
    color: colors.CONTRAST,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.CONTRAST,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: colors.ERROR,
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export default SignUp;
