/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice'; // your redux logout action
import type { RootState, AppDispatch } from '../store/store';
import logo from './../assets/logo.png';
import { LOGIN_SCREEN } from './onboarding/LoginScreen';
import { PredictedScreenProps } from '../Naviagtion/types';
import Container from '../components/Container';
import colors from '../theme/colors';
import LottieView from 'lottie-react-native';
import leafAni from '../assets/animations/ChooseLeaf.json'


export const PROFILE_SCREEN = 'PROFILE_SCREEN';


const ProfileScreen: React.FC<PredictedScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace(LOGIN_SCREEN); // or your auth stack initial screen
  };

  const customTheme = {
    colors: {
      primary: colors.GR700,
      background: 'transparent',
      onSurfaceVariant: 'black',
    },
  };

  return (
    <Container>
      <View style={styles.container}>
        {/* <Text style={{ color: '#ffd482' }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left-circle" size={30} />
      </Text> */}

        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={leafAni}  // your .json animation file path
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>

        <View>
        {/* <TextInput
          style={styles.input}
          theme={customTheme}
          label="Name"
          underlineColor="#2b2b2b"
          textColor="white"
          value={user?.name || ''}
          editable={false}
        /> */}
        <TextInput
          style={styles.input}
          theme={customTheme}
          label="Email"
          underlineColor="#2b2b2b"
          textColor="black" 
          value={user?.email || ''}
          editable={false}
        />
      </View>

        <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
          <Button
            buttonColor={colors.gGreen}
            textColor="white"
            icon="logout"
            mode="contained"
            onPress={handleLogout}
            style={{ width: '100%', borderRadius: 10, marginTop: 50 }}
            contentStyle={{ height: 50, paddingHorizontal: 20 }}
            labelStyle={{ fontSize: 20 }}
          >
            Log Out
          </Button>
        </View>
      </View>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Use a light background color
  },
  input: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white', // Use a light background color
  },
});

export default ProfileScreen;
