import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Dialogs from './components/dialogs';
import Views from './routes/Views';
import { store } from './store';
import Theme from './theme';
import { BrowserRouter } from 'react-router-dom';

const rootID = document.getElementById('root')
const root = ReactDOM.createRoot(rootID);
const theme = createTheme(Theme)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Dialogs />
          <Views />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
