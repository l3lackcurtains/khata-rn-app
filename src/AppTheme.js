import React, { Component } from 'react';
import { connect } from 'react-redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { AppWithNavigationState } from './redux';
import { getSettingsReq } from './redux/actions/settingAc';

// App theme config.
const lightTheme = {
  palette: {
    primaryColor: COLOR.red500
  }
};

const darkTheme = {
  palette: {
    // main theme colors
    primaryColor: COLOR.red500,
    accentColor: COLOR.red500,
    // text color palette
    primaryTextColor: '#fff',
    secondaryTextColor: '#f3f3f3',
    alternateTextColor: '#191919',
    // backgournds and borders
    canvasColor: '#191919',
    borderColor: '#e3e3e3',
    disabledColor: '#e3e3e3',
    disabledTextColor: '#e3e3e3',
    activeIcon: '#e3e3e3',
    inactiveIcon: '#e3e3e3'
    // pickerHeaderColor: cyan500,
    // clockCircleColor: faintBlack,
    // shadowColor: fullBlack,
  }
};

class AppTheme extends Component {
  componentDidMount = () => {
    // Dispatch the settings
    const query = {};
    this.props.dispatch(getSettingsReq(query));
  };

  render() {
    const { isDarkTheme } = this.props;
    console.log(isDarkTheme);
    if (isDarkTheme) {
      return (
        <ThemeProvider uiTheme={darkTheme}>
          <AppWithNavigationState />
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider uiTheme={lightTheme}>
        <AppWithNavigationState />
      </ThemeProvider>
    );
  }
}

export default connect(state => ({
  isDarkTheme: state.getSettings.data.theme === 'dark'
}))(AppTheme);
