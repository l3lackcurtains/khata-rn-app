// @flow
import React from 'react';
import { Button } from 'react-native-material-ui';

const PrimaryButton = props => (
  <Button
    raised
    style={{
      container: {
        backgroundColor: '#0984e3'
      },
      text: {
        color: '#fff',
        fontFamily: 'Roboto'
      }
    }}
    {...props}
  />
);

const SecondaryButton = props => <Button {...props} />;

export { PrimaryButton, SecondaryButton };
