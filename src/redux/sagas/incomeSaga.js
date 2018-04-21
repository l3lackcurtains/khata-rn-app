import axios from 'axios';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import firebase from 'firebase';
import md5 from 'react-native-md5';

import A from '../actions/index';
import {
    getIncomesSuccess,
    getIncomesErr,
    addIncomeSuccess,
    addIncomeErr,
} from '../actions/incomeAc';

/*
 ***************************************
 * Get Incomes
 * *************************************
*/
function* getIncomes(action) {
    try {
        // later
        yield put(getIncomesSuccess(action));
    } catch (error) {
        yield put(getIncomesErr(error.toString()));
    }
}

export function* getIncomesSaga() {
    yield takeEvery(A.REQ_INCOMES, getIncomes);
}

/*
 ***************************************
 * Add Income
 * *************************************
*/

function* addIncome(action) {
    try {
        const incomeData = {
            incomeFrom: action.query.incomeFrom,
            incomeAmount: action.query.incomeAmount
        };
        const randomHash = md5.hex_md5(`${Date.now()}hex`);
        firebase.database().ref(`income/${randomHash}`).set(incomeData);
        yield put(addIncomeSuccess(action));
    } catch (error) {
        yield put(addIncomeErr(error.toString()));
    }
}

export function* addIncomeSaga() {
    yield takeEvery(A.REQ_ADD_INCOME, addIncome);
}
