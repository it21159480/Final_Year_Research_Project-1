// src/navigation/AuthStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen, { LOGIN_SCREEN } from '../screens/onboarding/LoginScreen';
import SignUpScreen, { SIGNUP_SCREEN } from '../screens/onboarding/SignUpScreen';
import { NavigatorParamList } from './types';

export const AUTH_STACK = 'AUTH_STACK';

const Stack = createStackNavigator<NavigatorParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
