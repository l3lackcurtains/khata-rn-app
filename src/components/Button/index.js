// @flow
import React from 'react';
import { Button } from 'react-native-material-ui';

const PrimaryButton = props => (
  <Button
    raised
    primary
    style={{
      text: {
        fontFamily: 'Roboto'
      }
    }}
    {...props}
  />
);

const SecondaryButton = props => <Button {...props} />;

export { PrimaryButton, SecondaryButton };
