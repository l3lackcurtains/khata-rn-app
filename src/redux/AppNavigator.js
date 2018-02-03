import { StackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'

const AppNavigator = StackNavigator({
	Main: {
		screen: HomeScreen
	},
});

export default AppNavigator
