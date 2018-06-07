import React from 'react';
import { View, Image } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import Translate from '../../utils/Translate';
import { LPText } from '../Text';
import logo from '../../assets/images/Khata-light.png';

const AppBar = () => (
  <Toolbar
    centerElement={
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ height: 28, width: 28 }} source={logo} />
        <LPText
          style={{ fontSize: 24, fontWeight: '500', fontFamily: 'cabin-regular', marginLeft: 24 }}
        >
          <Translate id="khata">Khata</Translate>
        </LPText>
      </View>
    }
    style={{
      container: {
        backgroundColor: '#054757',
        elevation: 0
      },
      titleText: {
        color: '#fff'
      }
    }}
  />
);
export default AppBar;
