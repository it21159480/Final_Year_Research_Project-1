/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome'; // or MaterialCommunityIcons
import logo from '../../assets/logo.png';
import { signupScreenProps } from '../../Naviagtion/types';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearRegistrationSuccess } from '../../store/auth/authSlice'; // Adjust path
import type { RootState, AppDispatch } from '../../store/store';
import { LOGIN_SCREEN } from './LoginScreen';
import colors from '../../theme/colors';


export const SIGNUP_SCREEN = 'SIGNUP_SCREEN';
// type RootStackParamList = {
//   SignUp: undefined;
//   Welcome: undefined;
//   Login: undefined;
// };


const SignUpScreen: React.FC<signupScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isValidLowercase, setIsValidLowercase] = useState<boolean>(false);
  const [isValidUppercase, setIsValidUppercase] = useState<boolean>(false);
  const [isValidNumber, setIsValidNumber] = useState<boolean>(false);
  const [isValidLength, setIsValidLength] = useState<boolean>(false);

  // Handle validation of password
  const validatePassword = (input: string) => {
    setPassword(input);
    setIsValidLowercase(/[a-z]/.test(input));
    setIsValidUppercase(/[A-Z]/.test(input));
    setIsValidNumber(/[0-9]/.test(input));
    setIsValidLength(input.length >= 8);
  };

  // Listen for error changes to show alert & clear errors on dismiss
  // useEffect(() => {
  //   if (authState.error) {
  //     Alert.alert('Signup Error', authState.error, [
  //       { text: 'OK', onPress: () => dispatch(clearError()) },
  //     ]);
  //   }
  // }, [authState.error, dispatch]);

  // Navigate when signup successful (user object set)
  useEffect(() => {
    if (authState.registrationSuccess) {
      navigation.navigate(LOGIN_SCREEN);
      dispatch(clearRegistrationSuccess()); // Clear success state after navigation
    }
  }, [authState.registrationSuccess]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    dispatch(register({ name, email, password }));
  };

  const customTheme = {
    colors: {
      primary: colors.GR700,
      background: 'transparent',
      onSurfaceVariant: 'black',
    },
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust offset if you have headers
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={logo} style={{ width: 200, height: 150 }} resizeMode='contain' />
          </View>
          <View>
            <TextInput
              style={styles.input}
              theme={customTheme}
              label="Name"
              underlineColor={colors.GR700}
              textColor="black"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              theme={customTheme}
              label="Email"
              underlineColor={colors.GR700}
              textColor="black"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              theme={customTheme}
              label="Password"
              underlineColor={colors.GR700}
              textColor="black"
              secureTextEntry={!passwordVisible}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  color='black'
                  onPress={togglePasswordVisibility}
                />
              }
              onChangeText={validatePassword}
              value={password}
            />
            <TextInput
              style={styles.input}
              theme={customTheme}
              label="Confirm Password"
              underlineColor={colors.GR700}
              textColor="black"
              secureTextEntry={!passwordVisible}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  color='black'
                  onPress={togglePasswordVisibility}
                />
              }
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.rulesContainer}>
              <View>
                <Text style={{ color: isValidLowercase ? colors.GR700 : '#d0d0d0' }}>
                  <MaterialCommunityIcons
                    name={isValidLowercase ? 'check-circle' : 'refresh'}
                    size={20}
                  />{' '}
                  One lowercase character
                </Text>
                <Text style={{ color: isValidUppercase ? colors.GR700 : '#d0d0d0' }}>
                  <MaterialCommunityIcons
                    name={isValidUppercase ? 'check-circle' : 'refresh'}
                    size={20}
                  />{' '}
                  One uppercase character
                </Text>
              </View>
              <View>
                <Text style={{ color: isValidNumber ? colors.GR700 : '#d0d0d0' }}>
                  <MaterialCommunityIcons
                    name={isValidNumber ? 'check-circle' : 'refresh'}
                    size={20}
                  />{' '}
                  One number
                </Text>
                <Text style={{ color: isValidLength ? colors.GR700 : '#d0d0d0' }}>
                  <MaterialCommunityIcons
                    name={isValidLength ? 'check-circle' : 'refresh'}
                    size={20}
                  />{' '}
                  8 characters minimum
                </Text>
              </View>
            </View>

            <Button
              buttonColor={colors.GR700}
              textColor="white"
              mode="contained"
              onPress={handleSignUp}
              disabled={authState.loading}
              loading={authState.loading}
              style={{ width: '100%', borderRadius: 10, marginTop: 30 }}
              contentStyle={{ height: 50, paddingHorizontal: 20 }}
              labelStyle={{ fontSize: 20 }}
            >
              Sign Up
            </Button>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 15, color: 'black' }}>Have an account?</Text>
                <Pressable onPressOut={() => navigation.navigate(LOGIN_SCREEN)}>
                  <Text
                    style={{
                      color: colors.GR700,
                      fontSize: 15,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      marginLeft: 5,
                    }}
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>


    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Use a light background color
  },
  input: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5', // Use a light background color
  },
  rulesContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-evenly',
  },
});

export default SignUpScreen;
