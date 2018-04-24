import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, AppWithNavigationState, persistor } from './redux';

// App theme config.
const uiTheme = {
  palette: {
    primaryColor: COLOR.red500
  }
};

class MainApp extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    /* eslint-disable */
    await Font.loadAsync({
      'cabin-regular': require('./assets/fonts/Cabin-Regular.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
    /* eslint-enable */
  }

  render() {
    if (!this.state.fontLoaded) return <View />;
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider uiTheme={uiTheme}>
            <AppWithNavigationState />
          </ThemeProvider>
        </Provider>
      </PersistGate>
    );
  }
}

export default MainApp;
