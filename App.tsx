import React,{useEffect} from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate for redux-persist
import { PaperProvider } from 'react-native-paper'; // Import PaperProvider for React Native Paper
import { store, persistor } from './src/store/store'; // Import your store and persistor
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import HomeStack from './src/Naviagtion/AppStack';
import Navigator from './src/Naviagtion/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'; // 👈 Import splash screen


export default function App() {

  useEffect(() => {
    SplashScreen.hide(); // 👈 Hides the splash screen
  }, []);

  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Provider store={store}> {/* Wrap your app with the Redux provider */}
            <PersistGate loading={null} persistor={persistor}> {/* Wait for persisted state */}
              <PaperProvider>
                <BottomSheetModalProvider>

                  <StatusBar
                    // backgroundColor={colors.transparent}
                    barStyle="light-content"
                  // translucent={true}
                  />
                  {/* <RootNavigator />  */}
                  <NavigationContainer>
                    {/* <HomeStack /> */}
                    <Navigator />
                  </NavigationContainer>
                </BottomSheetModalProvider>

              </PaperProvider>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </MenuProvider>
  );
}
