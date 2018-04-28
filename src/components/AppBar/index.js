import React from 'react';
import { View, Image } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import { LPText } from '../Text';
import logo from '../../assets/images/Khata-light.png';

const AppBar = () => (
  <Toolbar
    centerElement={
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ height: 35, width: 35 }} source={logo} />
        <LPText
          style={{ fontSize: 28, fontWeight: '500', fontFamily: 'cabin-regular', marginLeft: 12 }}
        >
          Khata
        </LPText>
      </View>
    }
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
