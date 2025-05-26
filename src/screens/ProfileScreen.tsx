import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import type { AppDispatch } from '../store/store';
import { ProfileScreenProps } from '../Naviagtion/types';
import { LOGIN_SCREEN } from './onboarding/LoginScreen';

export const PROFILE_SCREEN = 'PROFILE_SCREEN';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    // Clear auth state
    dispatch(logout());
    // Navigate to the Login screen
    navigation.navigate(LOGIN_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 30
  },
  button: {
    width: '80%',
    borderRadius: 8
  },
  buttonContent: {
    height: 48
  }
});

export default ProfileScreen;
