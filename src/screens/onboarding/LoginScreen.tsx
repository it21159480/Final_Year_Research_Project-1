import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/auth/authSlice'; // Adjust path if needed
import type { RootState, AppDispatch } from '../../store/store';
import { loginScreenProps } from '../../Naviagtion/types';
import logo from '../../assets/logo.png';
import { SIGNUP_SCREEN } from './SignUpScreen';
import { TAB_STACK } from '../../Naviagtion/RootNaviagtor';

export const LOGIN_SCREEN = 'LOGIN_SCREEN';

// type RootStackParamList = {
//   Login: undefined;
//   SignUp: undefined;
//   Welcome: undefined;
//   ForgotPassword: undefined;
// };


const LoginScreen: React.FC<loginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (authState.error) {
      Alert.alert('Login Error', authState.error, [
        {
          text: 'OK',
          onPress: () => dispatch(clearError()),
        },
      ]);
    }
  }, [authState.error, dispatch]);

  useEffect(() => {
    if (authState.user) {
      navigation.navigate(TAB_STACK);
    }
  }, [authState.user, navigation]);

  // Optional: Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const customTheme = {
    colors: {
      primary: 'white',
      background: 'transparent',
      onSurfaceVariant: 'white',
    },
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} style={{ width: 200, height: 150 }} />
      </View>
      <View>
        <TextInput
          style={styles.input}
          theme={customTheme}
          label="Email"
          underlineColor="#545454"
          textColor="white"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          theme={customTheme}
          label="Password"
          textColor="white"
          underlineColor="#545454"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              color={passwordVisible ? 'white' : '#898891'}
              onPress={togglePasswordVisibility}
            />
          }
          value={password}
          onChangeText={setPassword}
        />

        {authState.error ? (
          <Text style={{ color: 'red', marginTop: 5 }}>Email or Password is incorrect!</Text>
        ) : null}

        <Pressable
          onPressOut={() => navigation.navigate(SIGNUP_SCREEN)}
          style={{ alignItems: 'flex-end' }}
        >
          <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }}>Forgot Password?</Text>
        </Pressable>

        <Button
          buttonColor="#ffd482"
          textColor="black"
          mode="contained"
          onPress={handleLogin}
          loading={authState.loading}
          disabled={authState.loading || !email || !password}
          style={{ width: '100%', borderRadius: 10, marginTop: 50 }}
          contentStyle={{ height: 50, paddingHorizontal: 20 }}
          labelStyle={{ fontSize: 20 }}
        >
          Sign In
        </Button>
      </View>
      <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Don't have an account?</Text>
            <Pressable onPressOut={() => navigation.navigate(SIGNUP_SCREEN)}>
              <Text
                style={{
                  color: '#ffd482',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  marginLeft: 5,
                }}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  input: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#545454',
  },
});

export default LoginScreen;
