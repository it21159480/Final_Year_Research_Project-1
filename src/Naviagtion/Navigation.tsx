// src/navigation/RootNavigator.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import type { RootState } from '../store/store';

export default function Navigator() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user ? <AppStack /> : <AuthStack />}
    </>
  );
}
