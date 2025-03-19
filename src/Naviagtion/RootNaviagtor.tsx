/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import HomeStack,{HOME_STACK} from './AppStack';
import {TabNavigatorParamList} from './types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();



// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
//     <Stack.Screen name={PEST_HOME} component={PestHome} /> {/* Add the Details screen here */}
//   </Stack.Navigator>
// );
const RootNaviagtor = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,

          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size, focused }) => {
        let iconName: string = '';
        if (route.name === 'HOME_STACK') {
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
        <Tab.Screen name="HOME_STACK" component={HomeStack} />
        <Tab.Screen name="PROFILE_SCREEN" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootNaviagtor