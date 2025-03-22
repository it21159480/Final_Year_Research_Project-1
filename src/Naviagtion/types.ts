// navigation/types.ts
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import { HOME_STACK } from './AppStack';
import {PROFILE_SCREEN} from '../screens/ProfileScreen';
import {HOME_SCREEN} from '../screens/HomeScreen';
import {PEST_HOME} from '../screens/Pest Identification/PestHome'; // Import the PestHome screen
import {PREDICTION_SCREEN} from '../screens/Pest Identification/PredictionScreen';
import {TAB_STACK} from './RootNaviagtor';
import {CLASSIFICATION_HOME} from '../screens/Paddy Classification/ClassificationHome';
import {DISEASE_HOME_SCREEN} from '../screens/Disease Diagnosis/HomeScreen';
import {DIAGNOSIS_SCREEN} from '../screens/Disease Diagnosis/DiagnosisScreen';
import { REMEDY_SCREEN } from '../screens/Disease Diagnosis/RemedyScreen';

export type NavigatorParamList = {
  [TAB_STACK]: undefined;
  [PEST_HOME]: undefined; // Add the PestHome screen
  [PREDICTION_SCREEN]: {imageUri: string};
  [CLASSIFICATION_HOME]: undefined;
  [DISEASE_HOME_SCREEN]: undefined;
  [DIAGNOSIS_SCREEN]: undefined;
  [REMEDY_SCREEN]: {disease: string};
};

export type TabNavigatorParamList = {
  // HOME_STACK: undefined;
  [HOME_SCREEN]: undefined;
  [PROFILE_SCREEN]: undefined;
};
// stack navigation export
export type TabStackProps = StackScreenProps<
  NavigatorParamList,
  typeof TAB_STACK
>;

export type PestHomeProps = StackScreenProps<
  NavigatorParamList,
  typeof PEST_HOME
>;
export type PredictionScreenProps = StackScreenProps<
  NavigatorParamList,
  typeof PREDICTION_SCREEN
>;

export type ClassificationHomeProps = StackScreenProps<
  NavigatorParamList,
  typeof CLASSIFICATION_HOME
>;

export type DiseaseHomeScreenProps = StackScreenProps<
  NavigatorParamList,
  typeof DISEASE_HOME_SCREEN
>;

export type DiagnosisScreenProps = StackScreenProps<
  NavigatorParamList,
  typeof DIAGNOSIS_SCREEN
>;

export type RemedyScreenProps = StackScreenProps<
  NavigatorParamList,
  typeof REMEDY_SCREEN
>;

// export type HomeStackProps = BottomTabScreenProps<
//   TabNavigatorParamList,
//   typeof HOME_STACK
// >;

// tab navigation export
export type ProfileScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  typeof PROFILE_SCREEN
>;
export type HomeScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  typeof HOME_SCREEN
>;
