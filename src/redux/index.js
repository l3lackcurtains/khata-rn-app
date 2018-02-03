// @flow
import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { combineReducers, createStore } from 'redux'
import { connect } from 'react-redux'

import AppNavigator from './AppNavigator'

// flow types
type Props = {
	dispatch: Function,
	nav: Object,
};

const navReducer = (state, action) => {
	const nextState = AppNavigator.router.getStateForAction(action, state);
	return nextState || state;
};

const appReducer = combineReducers({
	nav: navReducer,
});

const store = createStore(appReducer);

class ReduxNavigation extends Component<Props> {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}
	onBackPress = () => {
		const { dispatch, nav } = this.props;
		if (nav.index === 0) {
			return false;
		}
		dispatch(NavigationActions.back());
		return true;
	};

	render() {
		const { dispatch, nav } = this.props;
		const navigation = addNavigationHelpers({
			dispatch,
			state: nav
		});

		return <AppNavigator navigation={navigation} />
	}
}
const mapStateToProps = state => ({
	nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation)

export { store, AppWithNavigationState }

