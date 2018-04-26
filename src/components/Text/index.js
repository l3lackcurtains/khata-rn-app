// @flow
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  p: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#18232d'
  },
  lp: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#FAFAFA'
  },
  h1: {
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'lato-regular',
    color: '#222'
  },
  lh1: {
    fontSize: 32,
    fontWeight: '500',
    fontFamily: 'lato-regular',
    color: '#FFF'
  },
  h2: {
    fontSize: 24,
    fontFamily: 'lato-regular',
    color: '#222'
  }
});

const PText = props => {
  const { style, ...otherProps } = props;
  return <Text style={[styles.p, !!style && style]} {...otherProps} />;
};

const H1Text = props => {
  const { style, ...otherProps } = props;
  return <Text style={[styles.h1, !!style && style]} {...otherProps} />;
};

const H2Text = props => {
  const { style, ...otherProps } = props;
  return <Text style={[styles.h2, !!style && style]} {...otherProps} />;
};

const LPText = props => {
  const { style, ...otherProps } = props;
  return <Text style={[styles.lp, !!style && style]} {...otherProps} />;
};

const LH1Text = props => {
  const { style, ...otherProps } = props;
  return <Text style={[styles.lh1, !!style && style]} {...otherProps} />;
};

export { PText, H1Text, H2Text, LPText, LH1Text };
