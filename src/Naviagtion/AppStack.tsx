import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen, { HOME_SCREEN } from '../screens/HomeScreen';
import PestHome, { PEST_HOME } from '../screens/Pest Identification/PestHome';
import PredictionScreen,{PREDICTION_SCREEN} from '../screens/Pest Identification/PredictionScreen';
import PaddyPredictionScreen, {PADDY_PREDICTION_SCREEN} from '../screens/Paddy Classification/PaddyPredictionScreen'; 
import ClassificationHome,{CLASSIFICATION_HOME} from '../screens/Paddy Classification/ClassificationHome';
import { NavigatorParamList } from './types';
import RootNaviagtor,{TAB_STACK} from './RootNaviagtor'
import HomeScreen , {DISEASE_HOME_SCREEN} from '../screens/Disease Diagnosis/HomeScreen';
import DiagnosisScreen, {DIAGNOSIS_SCREEN} from '../screens/Disease Diagnosis/DiagnosisScreen';
import RemedyScreen, {REMEDY_SCREEN} from '../screens/Disease Diagnosis/RemedyScreen';

export const HOME_STACK = 'HOME_STACK';
const Stack = createStackNavigator<NavigatorParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false,  }}>
            <Stack.Screen name={TAB_STACK} component={RootNaviagtor} />
            <Stack.Screen name={PEST_HOME} component={PestHome} />
            <Stack.Screen name={CLASSIFICATION_HOME} component={ClassificationHome} />
            <Stack.Screen name={PREDICTION_SCREEN} component={PredictionScreen} />
            <Stack.Screen name={PADDY_PREDICTION_SCREEN} component={PaddyPredictionScreen} />
            <Stack.Screen name={DISEASE_HOME_SCREEN} component= {HomeScreen}/>
            <Stack.Screen name={DIAGNOSIS_SCREEN} component={DiagnosisScreen} />
            <Stack.Screen name={REMEDY_SCREEN} component={RemedyScreen} />
        </Stack.Navigator>
    );
}
