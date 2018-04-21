import { all } from 'redux-saga/effects';

import {
    getIncomesSaga,
    addIncomeSaga,
    removeIncomeSaga,
    updateIncomeSaga
} from './incomeSaga';

// Yield all sagas
export default function* rootSagas() {
    yield all([
        getIncomesSaga(),
        addIncomeSaga(),
        removeIncomeSaga(),
        updateIncomeSaga()
    ]);
}
