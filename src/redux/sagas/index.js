import { all } from 'redux-saga/effects';

import {
    getIncomesSaga,
    addIncomeSaga,
    removeIncomeSaga,
    updateIncomeSaga
} from './incomeSaga';

import {
    getExpensesSaga,
    addExpenseSaga,
    removeExpenseSaga,
    updateExpenseSaga
} from './expenseSaga';

import {
    getSavingsSaga,
    addSavingSaga,
    removeSavingSaga,
    updateSavingSaga
} from './savingSaga';

import {
    getSettingsSaga,
    updateSettingSaga
} from './settingSaga';

// Yield all sagas
export default function* rootSagas() {
    yield all([
        // Income
        getIncomesSaga(),
        addIncomeSaga(),
        removeIncomeSaga(),
        updateIncomeSaga(),

        // Expense
        getExpensesSaga(),
        addExpenseSaga(),
        removeExpenseSaga(),
        updateExpenseSaga(),

        // Saving
        getSavingsSaga(),
        addSavingSaga(),
        removeSavingSaga(),
        updateSavingSaga(),

        // setting
        getSettingsSaga(),
        updateSettingSaga()
    ]);
}
