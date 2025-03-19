import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Use Stack.Navigator instead of Tab.Navigator
import { NavigationContainer } from '@react-navigation/native';
import PricePredictionScreen from '../screens/PricePredictionScreen';  // Updated name
import PredictionScreen from '../screens/PredictionScreen';  // Updated name

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PricePrediction" // Set the initial screen
        // screenOptions={{ headerShown: false }} // Disable the header for all screens
      >
        <Stack.Screen name="PricePrediction" component={PricePredictionScreen} />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import PricePredictionScreen from '../screens/PricePredictionScreen';  // Updated name
// import PredictionScreen from '../screens/PredictionScreen';  // Updated name

// const Tab = createBottomTabNavigator();

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName = '';
//             if (route.name === 'Home') {
//               iconName = 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = 'person-outline';
//             } else if (route.name === 'PricePrediction') {
//               iconName = 'bar-chart-outline';  // Icon for PricePrediction
//             } else if (route.name === 'Prediction') {
//               iconName = 'stats-chart-outline';  // Icon for Prediction
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="PricePrediction" component={PricePredictionScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Prediction" component={PredictionScreen} options={{ headerShown: false }} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { createStackNavigator } from '@react-navigation/stack';
// import PricePredictionScreen from '../screens/PricePredictionScreen';  // Updated name
// import PredictionScreen from '../screens/PredictionScreen';  // Updated name

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Stack Navigator for PricePredictionScreen and PredictionScreen
// const PricePredictionStackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="PricePrediction">
//       <Stack.Screen name="PricePrediction" component={PricePredictionScreen} />
//       <Stack.Screen name="Prediction" component={PredictionScreen} />
//     </Stack.Navigator>
//   );
// };

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName = '';
//             if (route.name === 'Home') {
//               iconName = 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = 'person-outline';
//             } else if (route.name === 'Prediction') {
//               iconName = 'bar-chart-outline'; // Add an appropriate icon for the prediction tab
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         <Tab.Screen name="Prediction" component={PricePredictionStackNavigator} /> {/* Updated tab for prediction */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Tab = createBottomTabNavigator();

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({ color, size }) => {
//             let iconName = '';
//             if (route.name === 'Home') {
//               iconName = 'home-outline';
//             } else if (route.name === 'Profile') {
//               iconName = 'person-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default RootNavigator;
