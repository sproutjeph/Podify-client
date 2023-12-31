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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {axiosInstance} from '@api/client';
import {FormikHelpers} from 'formik';
import {updateLoggedIn, updateProfile} from '@store/auth';
import {useAppDispatch} from '@store/hooks';
import {StoreKeys, saveToAsyncStorage} from '@utils/asyncStorage';
import catchAxiosError from '@utils/catchAxiosError';
import {updateNotification} from '@store/notification';

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
  const dispatch = useAppDispatch();
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const togglePasswordVisiblity = () => {
    setSecureEntry(!secureEntry);
  };

  interface SignUserData {
    email: string;
    password: string;
  }

  const handleSubmit = async (
    values: SignUserData,
    actions: FormikHelpers<SignUserData>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await axiosInstance.post('/auth/sign-in', values);

      await saveToAsyncStorage(StoreKeys.AUTH_TOKEN, data.token);

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedIn(true));
      dispatch(
        updateNotification({
          message: 'Signed In Successfully',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAxiosError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
            <AppLink
              title="I Lost My Password?"
              color
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign Up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
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
