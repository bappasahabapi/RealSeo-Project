'use client';
import { createTheme } from '@mui/material/styles';
export const NAV_COLOR = '#86937F';
const theme = createTheme({
  cssVariables: true,
  palette: { primary: { main: NAV_COLOR }, background: { default: '#F4F5F6' } },
  shape: { borderRadius: 12 },
  typography: { fontFamily: ['Inter','system-ui','Segoe UI','Roboto','Helvetica','Arial','sans-serif'].join(','), h6: { fontWeight: 700 } },
  components: {
    MuiAppBar: { styleOverrides: { root: { backgroundColor: NAV_COLOR } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 12 } } },
  }
});
export default theme;
