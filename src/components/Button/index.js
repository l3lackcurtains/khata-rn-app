// @flow
import React from 'react'
import { Button } from 'react-native-material-ui'

const PrimaryButton = props => (
	<Button
		raised
		style={{
			container: {
				backgroundColor: 'yellow',
			},
			text: {
				color: '#000'
			}
		}}
		{...props}
	/>
)

const SecondaryButton = props => (
	<Button
		raised
		style={{
			container: {
				backgroundColor: 'red',
			},
			text: {
				color: '#000'
			}
		}}
		{...props}
	/>
)

export { PrimaryButton, SecondaryButton }

