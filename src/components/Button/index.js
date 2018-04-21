// @flow
import React from 'react';
import { Button } from 'react-native-material-ui';

const PrimaryButton = props => (
    <Button
        raised
        style={{
            container: {
                backgroundColor: '#fff',
            },
            text: {
                color: '#000'
            }
        }}
        {...props}
    />
);

const SecondaryButton = props => (
    <Button
        {...props}
    />
);

export { PrimaryButton, SecondaryButton };

