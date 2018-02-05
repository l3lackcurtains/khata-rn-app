import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Card } from 'react-native-material-ui'

import { PText, H1Text } from '../../components/Text'
import WalletImage from '../../assets/images/wallet.png'

const styles = StyleSheet.create({
	wrapper: {
		padding: 8,
	},
	walletCard: {
		padding: 16,
		flexDirection: 'row'
	},
	walletImage: {
		height: 80,
		width: 80,
		marginRight: 32
	}
})

class WalletScreen extends Component {
	state = {
		// x
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<Card>
					<View style={styles.walletCard}>
						<Image style={styles.walletImage} source={WalletImage} />
						<View>
							<PText>You have</PText>
							<H1Text>Rs. 35000</H1Text>
							<PText>in your wallet.</PText>
						</View>
					</View>
				</Card>
			</View>
		)
	}
}

export default WalletScreen
