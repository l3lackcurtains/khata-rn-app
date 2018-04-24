import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import { Card } from 'react-native-material-ui';

import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { TextField } from '../../components/Input';
import { PText } from '../../components/Text';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: '50%'
  },
  cardStyle: {
    margin: 16,
    height: 280
  },
  belowLogin: {
    paddingTop: 36,
    paddingHorizontal: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  };
  render() {
    return (
      <LinearGradient style={styles.screen} colors={['#4c669f', '#3b5998', '#192f6a']}>
        <Card>
          <View style={styles.cardStyle}>
            <TextField label="Email" keyboardType="email-address" />
            <TextField label="Password" secureTextEntry />
            <PrimaryButton text="login" />
            <View style={styles.belowLogin}>
              <PText>Not Registered yet?</PText>
              <SecondaryButton
                text="Register Now"
                onPress={() => this.props.navigation.navigate('Register')}
              />
            </View>
          </View>
        </Card>
      </LinearGradient>
    );
  }
}

export default LoginScreen;
