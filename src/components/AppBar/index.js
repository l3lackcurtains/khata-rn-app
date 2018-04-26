import React from 'react';
import { Toolbar } from 'react-native-material-ui';

const AppBar = () => (
  // TODO: Logo
  <Toolbar
    centerElement="Khata"
    style={{
      container: {
        backgroundColor: '#2c3e50',
        elevation: 0
      },
      titleText: {
        color: '#fff'
      }
    }}
  />
);
export default AppBar;
