import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../../components/Button'
import { PrimaryInput, SecondaryInput } from '../../components/Input'

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
	}
	render() {
		return (
			<View style={{ padding: 16 }}>
				<Text>hello i am home sceen.</Text>
				<PrimaryInput
					label="First Name"
				/>
				<SecondaryInput
					label="Line"
				/>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ width: '50%' }}><PrimaryButton text="hello" /></View>
					<View style={{ width: '50%' }}><SecondaryButton text="hello" /></View>
				</View>
			</View>
		)
	}
}

export default HomeScreen
