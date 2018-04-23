import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-material-ui';

import { PText } from '../../components/Text';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 0
    },
    listItem: {
        paddingHorizontal: 16
    }
});

class MoreScreen extends Component {
    state = {
        //
    }

    selectCurrency = () => {
        //
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ListItem
                    style={{ contentViewContainer: styles.listItem }}
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Theme',
                        secondaryText: 'Choose the theme of your app.'
                    }}
                    rightElement={<PText>Light</PText>}
                    onPress={() => {}}
                />
                <ListItem
                    style={{ contentViewContainer: styles.listItem }}
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Language',
                        secondaryText: 'Choose your prefered Language.'
                    }}
                    rightElement={<PText>English</PText>}
                    onPress={() => {}}
                />
                <ListItem
                    style={{ contentViewContainer: styles.listItem }}
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Currency Symbol',
                        secondaryText: 'Choose your prefered currency symbol.'
                    }}
                    rightElement={<PText>Rs.</PText>}
                    onPress={() => this.selectCurrency()}
                />
                <ListItem
                    style={{ contentViewContainer: styles.listItem }}
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Export',
                        secondaryText: 'Export your khata records.'
                    }}
                    onPress={() => {}}
                />
                <ListItem
                    style={{ contentViewContainer: styles.listItem }}
                    divider
                    dense
                    centerElement={{
                        primaryText: 'Import',
                        secondaryText: 'Import khata records.'
                    }}
                    onPress={() => {}}
                />
            </View>
        );
    }
}

export default MoreScreen;
