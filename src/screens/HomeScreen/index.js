import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { PrimaryButton } from '../../components/Button'

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
	}
	render() {
		return (
			<View style={{ padding: 16 }}>
				<Text>hello i am home sceen.</Text>
				<PrimaryButton
					text="Go to Login"
					onPress={() => this.props.navigation.navigate('Login')}
				/>
			</View>
		)
	}
}

export default HomeScreen
