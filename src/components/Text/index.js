// @flow
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    p: {
        fontSize: 16,
    },
    h1: {
        fontSize: 32,
        fontWeight: '500'
    }
});

const PText = props => (
    <Text
        style={styles.p}
        {...props}
    />
);

const H1Text = props => (
    <Text
        style={styles.h1}
        {...props}
    />
);

export { PText, H1Text };
