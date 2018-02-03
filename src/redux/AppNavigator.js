import { StackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const AppNavigator = StackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Login: {
			screen: LoginScreen
		},
		Register: {
			screen: RegisterScreen
		}
	},
	{
		initialRouteName: 'Login',
	}
);

export default AppNavigator
