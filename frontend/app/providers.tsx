'use client';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../lib/theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}
