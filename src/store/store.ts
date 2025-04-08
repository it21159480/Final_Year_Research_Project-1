// /src/store/store.ts
import { Store, Action } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import rootReducer from './reducer'; // Import the rootReducer you just created
import { AppState } from './reducer'; // Import your AppState type
import { legacy_createStore as createStore } from 'redux';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage in React Native
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with proper types for state and actions
const store: Store<AppState, Action> = createStore(persistedReducer);

// Create the persistor to handle persistence
const persistor = persistStore(store);

export { store, persistor };
