/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import AppInput from '@ui/AppInput';
import colors from '@utils/Colors';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.welcometSubText}>
          Let's get started by creating your account.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.label}>Name</Text>
          <AppInput placeholder="John Doe" />
        </View>

        <View>
          <Text style={styles.label}>Email</Text>
          <AppInput placeholder="john@gmail.com" autoCapitalize="none" />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <AppInput placeholder="******" secureTextEntry />
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    color: colors.CONTRAST,
    borderRadius: 25,
    padding: 10,
  },
  label: {
    color: colors.CONTRAST,
    marginLeft: 16,
    marginBottom: 5,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 30,
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
