import React from 'react'
import { Isao, Madoka } from 'react-native-textinput-effects'

const PrimaryInput = props => (
	<Madoka
		borderColor="#000"
		inputStyle={{
			fontFamily: 'Roboto',
			color: '#f4a197'
		}}
		labelStyle={{
			fontFamily: 'Roboto',
			color: '#008445'
		}}
		{...props}
	/>
)

const SecondaryInput = props => (
	<Isao
		label="First Name"
		activeColor="#da7071"
		passiveColor="#dadada"
		inputStyle={{
			fontFamily: 'Roboto'
		}}
		labelStyle={{
			fontFamily: 'Roboto'
		}}
		{...props}
	/>
)

export { PrimaryInput, SecondaryInput }
