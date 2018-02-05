import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Card } from 'react-native-material-ui'

import { PText } from '../../components/Text'

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	dialogBox: {
		alignSelf: 'center',
		width: '92%',
	},
	dialogBoxTitle: {
		padding: 16,
		backgroundColor: '#e5f6c1',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	dialogBoxContent: {
		padding: 16,
	},
	actionButtons: {
		justifyContent: 'space-between',
		flexDirection: 'row'
	}
})

const ModalBox = (props) => {
	const {
		children,
		title,
		action,
		primaryAction,
		secondaryAction,
		...otherProps
	} = props
	return (
		<Modal
			{...otherProps}
		>
			<View style={styles.modalView}>
				<Card
					style={{ container: styles.dialogBox }}
				>
					<View style={styles.dialogBoxTitle}>
						<PText>{title}</PText>
						<MaterialIcons name="close" size={24} onPress={otherProps.onRequestClose} />
					</View>
					<View style={styles.dialogBoxContent}>
						{children}
						<View style={styles.actionButtons}>
							{!!primaryAction && primaryAction}
							{!!secondaryAction && secondaryAction}
						</View>
					</View>
				</Card>
			</View>
		</Modal>
	)
}
export default ModalBox
