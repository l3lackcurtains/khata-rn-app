import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { ThemeProvider } from 'react-native-material-ui';

import { store, AppWithNavigationState } from './redux';

// App theme config.
const uiTheme = {
  fontFamily: 'Roboto',
  palette: {
    primaryColor: '#2c3e50',
    accentColor: '#e67e22',
    primaryTextColor: '#18232d',
    secondaryTextColor: '#666',
    alternateTextColor: '#FAFAFA',
    canvasColor: '#fff',
    borderColor: '#e3e3e3',
    disabledColor: '#888',
    disabledTextColor: '#888',
    activeIcon: '#18232d',
    inactiveIcon: '#888'
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
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <AppWithNavigationState />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default MainApp;
