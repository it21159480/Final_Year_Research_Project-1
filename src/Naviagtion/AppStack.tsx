import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen, { HOME_SCREEN } from '../screens/HomeScreen';
import PestHome, { PEST_HOME } from '../screens/Pest Identification/PestHome';
import { NavigatorParamList } from './types';

export const HOME_STACK = 'HOME_STACK';
const Stack = createStackNavigator<NavigatorParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={PEST_HOME} component={PestHome} />
        </Stack.Navigator>
    );
}
