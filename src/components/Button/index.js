// @flow
import React from 'react';
import { Button } from 'react-native-material-ui';

const PrimaryButton = props => (
    <Button
        raised
        style={{
            container: {
                backgroundColor: '#009494',
            },
            text: {
                color: '#fff'
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

