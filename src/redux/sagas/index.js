import { all } from 'redux-saga/effects';

import {
    getIncomesSaga,
    addIncomeSaga,
} from './incomeSaga';

// Yield all sagas
export default function* rootSagas() {
    yield all([
        getIncomesSaga(),
        addIncomeSaga(),
    ]);
}
