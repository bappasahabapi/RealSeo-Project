'use client';
import { configureStore } from '@reduxjs/toolkit';
import auth from '../state/authSlice';
import clients from '../state/clientsSlice';
export const store = configureStore({ reducer: { auth, clients } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
