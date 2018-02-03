import React from 'react'
import { Provider } from 'react-redux'
import { COLOR, ThemeProvider } from 'react-native-material-ui'
import { store, AppWithNavigationState } from './redux'

// App theme config.
const uiTheme = {
	palette: {
		primaryColor: COLOR.red500,
	},
	toolbar: {
		container: {
			height: 50,
		},
	},
}

const MainApp = () => (
	<Provider store={store}>
		<ThemeProvider uiTheme={uiTheme}>
			<AppWithNavigationState />
		</ThemeProvider>
	</Provider>
)

export default MainApp
