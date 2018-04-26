import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';
import AppTheme from './AppTheme';

const MainApp = () => (
  <Provider store={store}>
    <AppTheme />
  </Provider>
);

export default MainApp;
