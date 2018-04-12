// @flow
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { combineReducers, createStore, compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AppNavigator from './AppNavigator';

// flow types
type Props = {
  dispatch: Function,
  nav: Object,
};

const firebaseConfig = {
  apiKey: 'AIzaSyBxqJw-nOKP8KsCWFk4nZqsQQuEZGpx5fs',
  authDomain: 'khataapp-92a39.firebaseapp.com',
  databaseURL: 'https://khataapp-92a39.firebaseio.com/',
  storageBucket: 'gs://khataapp-92a39.appspot.com/'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  income: 'income'
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const persistConfig = {
  key: 'firebase',
  storage,
};

const appReducer = combineReducers({
  nav: navReducer,
  firebase: persistReducer(persistConfig, firebaseReducer),
});

const initialState = {};
const store = createStoreWithFirebase(appReducer, initialState);
const persistor = persistStore(store);

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

    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation);

// remove memory error yellow box
console.ignoredYellowBox = ['Setting a timer'];

export { store, AppWithNavigationState, persistor };

