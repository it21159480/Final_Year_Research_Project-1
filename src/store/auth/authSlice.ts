/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  email: string;
  access_token: string; // JWT token
}

interface SignupInfo {
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  signupInfo: SignupInfo | null;
  registrationSuccess: boolean; // Registration status flag
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  signupInfo: null, // Store signup info if needed
  registrationSuccess: false, // Initially false, set to true on successful registration
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk<
  User, // return type
  { email: string; password: string }, // argument type
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://agrifontier.grfubbdzfzedb6gh.centralindia.azurecontainer.io:1034/login', credentials);
    // Assuming response.data = { id, email, name, token }
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Async thunk for register
export const register = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (data, thunkAPI) => {
  try {
    const response = await axios.post('http://agrifontier.grfubbdzfzedb6gh.centralindia.azurecontainer.io:1034/signup', data);
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.registrationSuccess = false; // Reset registration success flag
      state.signupInfo = null; // clear signup info on logout
    },
    clearError(state) {
      state.error = null;
    },
    clearRegistrationSuccess(state) {
      state.registrationSuccess = false;
    },
    clearSignupInfo(state) {
      state.signupInfo = null;
    },
  },
  extraReducers: (builder) => {
    // login handlers
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = {
        email: action.meta.arg.email, // email from the dispatched thunk args
        access_token: action.payload.access_token, // token from API response
      };

      state.loading = false;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    });

    // register handlers
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registrationSuccess = true; // Set registration success flag
      state.loading = false;
      state.error = null;
      const { name, email } = (action.meta as { arg: { name: string; email: string } }).arg;
      state.signupInfo = { name, email };
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed';
    });
  },
});

export const { logout, clearError, clearRegistrationSuccess, clearSignupInfo } = authSlice.actions;

export default authSlice.reducer;
