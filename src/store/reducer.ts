import { Reducer } from 'redux';

// Define the state interface
interface PestManagementState {
  pestType: string;
  treatment: string;
  status: string;
}

export interface AppState {
  images: any[];
  pestManagement: PestManagementState;
}

// Define the action types
interface Action {
  type: string;
  payload?: any;
}

// Define the initial state
const initialState: AppState = {
  images: [],
  pestManagement: {
    pestType: '',
    treatment: '',
    status: ''
  }
};

// Define the reducer
const rootReducer: Reducer<AppState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    case 'UPDATE_PEST_MANAGEMENT':
      return {
        ...state,
        pestManagement: {
          ...state.pestManagement,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default rootReducer;