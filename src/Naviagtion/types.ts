// navigation/types.ts
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HOME_STACK } from './AppStack';
import { PROFILE_SCREEN } from '../screens/ProfileScreen';
import {HOME_SCREEN} from '../screens/HomeScreen';
import {PEST_HOME} from '../screens/Pest Identification/PestHome'; // Import the PestHome screen

export type NavigatorParamList = {
  [HOME_SCREEN]: undefined;
  [PEST_HOME]: undefined; // Add the PestHome screen
};

export type TabNavigatorParamList = {
  HOME_STACK: undefined;
  PROFILE_SCREEN: undefined;
};
export type HomeScreenProps = StackScreenProps<
  NavigatorParamList,
  typeof HOME_SCREEN
>;

export type PestHomeProps = StackScreenProps<
  NavigatorParamList,
  typeof PEST_HOME
  >;

export type HomeStackProps = BottomTabScreenProps<
  TabNavigatorParamList,
  typeof HOME_STACK
>;

export type ProfileScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  typeof PROFILE_SCREEN
>;