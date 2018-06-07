// @flow
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './sagas';
import rootReducers from '../redux/reducers';
import AppNavigator from './AppNavigator';
import { getSettingsReq } from './actions/settingAc';

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Home')
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

const middlewares = [sagaMiddleware, navMiddleware];

const appReducer = combineReducers({
  ...rootReducers,
  nav: navReducer
});

const store = createStore(appReducer, applyMiddleware(...middlewares));

// Run Saga Middleware
sagaMiddleware.run(rootSagas);

// Dispatch the settings
const query = {};
store.dispatch(getSettingsReq(query));

class ReduxNavigation extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }
  onBackButtonPressAndroid = () => {
    if (this.isSelectionModeEnabled()) {
      this.disableSelectionMode();
      return true;
    }
    return false;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    });
    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);

// remove memory error yellow box
console.ignoredYellowBox = ['Setting a timer'];

export { store, AppWithNavigationState };
