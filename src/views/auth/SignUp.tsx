/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {FormikHelpers} from 'formik';
import {axiosInstance} from '@api/client';
import catchAxiosError from '@utils/catchAxiosError';
import {updateNotification} from '@store/notification';
import {useAppDispatch} from '@store/hooks';

interface SignUpProps {}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

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
  const dispatch = useAppDispatch();
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordVisiblity = () => {
    setSecureEntry(!secureEntry);
  };

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);

    try {
      const {data} = await axiosInstance.post('/auth/create', values);

      navigation.navigate('Verification', {userInfo: data?.user});
    } catch (error) {
      const errorMessage = catchAxiosError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    } finally {
      actions.setSubmitting(true);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
            <AppLink
              title="I Lost My Password?"
              color
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default SignUp;
