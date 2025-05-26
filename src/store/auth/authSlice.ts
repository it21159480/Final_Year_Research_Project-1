// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  token: string; // JWT token
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
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
      // optionally clear token from storage here
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // login handlers
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
    builder.addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed';
    });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
