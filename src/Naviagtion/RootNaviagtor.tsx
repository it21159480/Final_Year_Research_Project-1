/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen, { PROFILE_SCREEN } from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import HomeStack,{HOME_STACK} from './AppStack';
import {TabNavigatorParamList} from './types';
import HomeScreen, { HOME_SCREEN } from '../screens/HomeScreen';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TAB_STACK = 'TAB_STACK';
const RootNaviagtor = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,

          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size, focused }) => {
        let iconName: string = '';
        if (route.name === HOME_SCREEN) {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'PROFILE_SCREEN') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName ?? ''} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.GR700,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Tab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      </Tab.Navigator>
  )
}

export default RootNaviagtor