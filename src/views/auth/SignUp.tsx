/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import colors from '@utils/Colors';
import {Formik} from 'formik';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import AuthInputField from '@components/AuthInputField';
import * as yup from 'yup';

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

      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={signupSchema}>
        {({handleSubmit, values, handleChange, errors}) => (
          <View style={styles.formContainer}>
            <AuthInputField
              label="Name"
              placeholder="John Doe"
              onChange={handleChange('name')}
              value={values.name}
              errorMsg={errors.name}
            />
            <AuthInputField
              label="Email"
              placeholder="john@gmail.com"
              autoCapitalize="none"
              keyboardType="email-address"
              onChange={handleChange('email')}
              value={values.email}
              errorMsg={errors.email}
            />
            <AuthInputField
              label="Password"
              placeholder="************"
              secureTextEntry={true}
              autoCapitalize="none"
              onChange={handleChange('password')}
              value={values.password}
              errorMsg={errors.password}
            />
            <Button
              onPress={() => handleSubmit()}
              title="Sign Up"
              color={colors.SECONDARY}
            />
          </View>
        )}
      </Formik>

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
