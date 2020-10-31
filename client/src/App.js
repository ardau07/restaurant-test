import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import configureStore, { history } from './store';
import theme from './theme';
import Routes from './routes';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <CssBaseline />
            <Routes />
          </SnackbarProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
