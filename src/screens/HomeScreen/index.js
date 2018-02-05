import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { BottomNavigation } from 'react-native-material-ui'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

import WalletScreen from '../WalletScreen'
import ExpenseScreen from '../ExpenseScreen'
import IncomeScreen from '../IncomeScreen'

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		paddingBottom: 48,
	}
})

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Khata App',
	}

	state = {
		active: 'income',
	}

	render() {
		return (
			<View style={styles.main}>
				{
					this.state.active === 'wallet' ? <WalletScreen />
						: this.state.active === 'expense' ? <ExpenseScreen />
							: this.state.active === 'income' ? <IncomeScreen />
								: null
				}
				<BottomNavigation
					active={this.state.active}
					hidden={false}
					style={{
						container: {
							width: '100%',
							position: 'absolute',
							bottom: 0,
						}
					}}
				>
					<BottomNavigation.Action
						key="wallet"
						icon={<Entypo name="wallet" size={24} />}
						label="Wallet"
						onPress={() => this.setState({ active: 'wallet' })}
					/>
					<BottomNavigation.Action
						key="income"
						icon={<MaterialIcons name="add-circle-outline" size={24} />}
						label="Income"
						onPress={() => this.setState({ active: 'income' })}
					/>
					<BottomNavigation.Action
						key="expense"
						icon={<MaterialIcons name="remove-circle-outline" size={24} />}
						label="Expenses"
						onPress={() => this.setState({ active: 'expense' })}
					/>
					<BottomNavigation.Action
						key="savings"
						icon={<Entypo name="save" size={24} />}
						label="Savings"
						onPress={() => this.setState({ active: 'savings' })}
					/>
					<BottomNavigation.Action
						key="settings"
						icon={<MaterialIcons name="more-horiz" size={24} />}
						label="More"
						onPress={() => this.setState({ active: 'settings' })}
					/>
				</BottomNavigation>
			</View>
		)
	}
}

export default HomeScreen
