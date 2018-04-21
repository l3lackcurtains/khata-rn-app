// @flow
import React, { Component } from 'react';
import { BackHandler, AsyncStorage } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './sagas';
import rootReducers from '../redux/reducers';
import AppNavigator from './AppNavigator';

// flow types
type Props = {
  dispatch: Function,
  nav: Object,
};

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

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

const middlewares = [sagaMiddleware];

// Add middlewares and reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
)(createStore);

const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

const persistConfig = {
    key: 'firebase',
    storage: AsyncStorage,
};

const appReducer = combineReducers({
    ...rootReducers,
    nav: navReducer,
    firebase: persistReducer(persistConfig, firebaseReducer),
});

const initialState = {};
const store = createStoreWithFirebase(appReducer, initialState);
const persistor = persistStore(store);

// Run Saga Middleware
sagaMiddleware.run(rootSagas);

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
