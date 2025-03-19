import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen, { HOME_SCREEN } from '../screens/HomeScreen';
import PestHome, { PEST_HOME } from '../screens/Pest Identification/PestHome';
import PredictionScreen,{PREDICTION_SCREEN} from '../screens/Pest Identification/PredictionScreen';
import { NavigatorParamList } from './types';
import RootNaviagtor,{TAB_STACK} from './RootNaviagtor'

export const HOME_STACK = 'HOME_STACK';
const Stack = createStackNavigator<NavigatorParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false,  }}>
            <Stack.Screen name={TAB_STACK} component={RootNaviagtor} />
            <Stack.Screen name={PEST_HOME} component={PestHome} />
            <Stack.Screen name={PREDICTION_SCREEN} component={PredictionScreen} />
        </Stack.Navigator>
    );
}
