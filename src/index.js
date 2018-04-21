import React from 'react';
import { Provider } from 'react-redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, AppWithNavigationState, persistor } from './redux';

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
};

const MainApp = () => (
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider uiTheme={uiTheme}>
                <AppWithNavigationState />
            </ThemeProvider>
        </Provider>
    </PersistGate>
);
export default MainApp;
