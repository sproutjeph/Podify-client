/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import colors from '@utils/Colors';
import {View, StyleSheet} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import axiosInstance from '@api/client';
import {FormikHelpers} from 'formik';

interface LostPasswordProps {}

const LostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is Missing')
    .email('Invalid Email')
    .required('Email is requried'),
});
const initialValues = {
  email: '',
};

interface InitialValue {
  email: string;
}

const LostPassword: FC<LostPasswordProps> = ({}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: InitialValue,
    actions: FormikHelpers<InitialValue>,
  ) => {
    actions.setSubmitting(true);

    try {
      const {data} = await axiosInstance.post('/auth/forget-password', values);

      navigation.navigate('Verification', {userInfo: data?.user});
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(true);
    }
  };
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LostPasswordSchema}>
      <AuthFormContainer
        heading="Forget Password"
        subHeading="Enter your email address and we will send you a link to reset your password">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <SubmitBtn title="Send Link" />

          <View style={styles.linksContainer}>
            <AppLink
              title="Sign In"
              color
              onPress={() => {
                navigation.navigate('SignIn');
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

export default LostPassword;
