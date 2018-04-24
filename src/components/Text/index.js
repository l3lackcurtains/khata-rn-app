// @flow
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  p: {
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  h1: {
    fontSize: 32,
    fontWeight: '500',
    fontFamily: 'lato-regular'
  },
  h2: {
    fontSize: 24,
    fontFamily: 'lato-regular'
  }
});

const PText = props => <Text style={styles.p} {...props} />;

const H1Text = props => <Text style={styles.h1} {...props} />;

const H2Text = props => <Text style={styles.h2} {...props} />;

export { PText, H1Text, H2Text };
