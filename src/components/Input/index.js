// @flow
import React from 'react';
import { Madoka } from 'react-native-textinput-effects';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'Roboto',
    color: '#444'
  },
  labelStyle: {
    fontFamily: 'Roboto',
    color: '#666'
  }
});

const borderColor = '#90A4AE';

const TextField = props => (
  <Madoka
    borderColor={borderColor}
    inputStyle={styles.inputStyle}
    labelStyle={styles.labelStyle}
    {...props}
  />
);

const TextAreaField = props => (
  <Madoka
    borderColor={borderColor}
    inputStyle={styles.inputStyle}
    labelStyle={styles.labelStyle}
    height={120}
    multiline
    {...props}
  />
);

export { TextField, TextAreaField };
