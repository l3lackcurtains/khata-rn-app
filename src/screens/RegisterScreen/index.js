import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card } from 'react-native-material-ui';
import { LinearGradient } from 'expo';

import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { TextField } from '../../components/Input'
import { PText } from '../../components/Text'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: '40%',
    },
    cardStyle: {
        margin: 16,
        height: 350
    },
    belowLogin: {
        paddingTop: 36,
        paddingHorizontal: 4,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    }
    render() {
        return (
            <LinearGradient style={styles.screen} colors={['#4c669f', '#3b5998', '#192f6a']}>
                <Card>
                    <View style={styles.cardStyle}>
                        <TextField
                            label="Email"
                            keyboardType="email-address"
                        />
                        <TextField
                            label="Password"
                            secureTextEntry
                        />
                        <TextField
                            label="Retype Password"
                            secureTextEntry
                        />
                        <PrimaryButton text="register" />
                        <View style={styles.belowLogin}>
                            <PText>Already a member?</PText>
                            <SecondaryButton
                                text="Login Here"
                                onPress={() => this.props.navigation.navigate('Login')}
                            />
                        </View>
                    </View>
                </Card>
            </LinearGradient>
        )
    }
}

export default RegisterScreen
