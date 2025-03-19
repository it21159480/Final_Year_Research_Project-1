import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate for redux-persist
import { PaperProvider } from 'react-native-paper'; // Import PaperProvider for React Native Paper
import RootNavigator from './src/Naviagtion/RootNaviagtor'; // Fix typo from 'Naviagtor' to 'Navigator'
import { store, persistor } from './src/store/store'; // Import your store and persistor
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Provider store={store}> {/* Wrap your app with the Redux provider */}
            <PersistGate loading={null} persistor={persistor}> {/* Wait for persisted state */}
              <PaperProvider>
                <StatusBar
                  // backgroundColor={colors.transparent}
                  barStyle="light-content"
                  // translucent={true}
                />
                <RootNavigator /> {/* Your main navigator */}
              </PaperProvider>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </MenuProvider>
  );
}
