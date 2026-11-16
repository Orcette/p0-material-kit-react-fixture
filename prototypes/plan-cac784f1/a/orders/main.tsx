import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { OrdersPage } from './orders-page';

const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrdersPage />
    </ThemeProvider>
  </StrictMode>
);
