'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';

type AuthState = { token: string | null; status: 'idle'|'loading'|'error'; error?: string };
const initialState: AuthState = { token: null, status: 'idle' };

export const loginThunk = createAsyncThunk('auth/login', async (payload: { email: string; password: string; }) => {
  const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
  return data.token as string;
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) { state.token = action.payload; if (typeof window !== 'undefined') localStorage.setItem('token', action.payload); },
    logout(state) { state.token = null; if (typeof window !== 'undefined') localStorage.removeItem('token'); }
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s)=>{s.status='loading'})
     .addCase(loginThunk.fulfilled, (s,a)=>{s.status='idle'; s.token=a.payload;})
     .addCase(loginThunk.rejected, (s,a)=>{s.status='error'; s.error=String(a.error.message)});
  }
});
export const { setToken, logout } = slice.actions;
export default slice.reducer;
