import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import md5 from 'react-native-md5';

import A from '../actions/index';
import {
    getIncomesSuccess,
    getIncomesErr,
    addIncomeSuccess,
    addIncomeErr,
    removeIncomeSuccess,
    removeIncomeErr,
    updateIncomeSuccess,
    updateIncomeErr
} from '../actions/incomeAc';

/*
 ***************************************
 * Get Incomes
 * *************************************
*/
function* getIncomes() {
    try {
        const getIncomes = yield AsyncStorage.getItem('@incomes');
        let getIncomesJSON = null;
        if (getIncomes !== null) {
            getIncomesJSON = JSON.parse(getIncomes);
        }

        const sortedIncomeJson = getIncomesJSON.sort((left, right) => moment(right.createdAt).format('X') - moment(left.createdAt).format('X'));
        yield put(getIncomesSuccess(sortedIncomeJson));
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
        const { incomeAmount, incomeFrom } = action.query;
        const createdAt = moment().format();
        const id = md5.hex_md5(createdAt);

        const incomeJSON = {
            incomeAmount,
            incomeFrom,
            createdAt,
            id,
        };

        const getIncomes = yield AsyncStorage.getItem('@incomes');
        let incomeString = '';
        if (getIncomes !== null) {
            const getIncomesJSON = JSON.parse(getIncomes);
            getIncomesJSON.unshift(incomeJSON);
            incomeString = JSON.stringify(getIncomesJSON);
        } else {
            incomeString = JSON.stringify([incomeJSON]);
        }
        yield AsyncStorage.setItem('@incomes', incomeString);

        yield put(addIncomeSuccess(action));
    } catch (error) {
        yield put(addIncomeErr(error.toString()));
    }
}

export function* addIncomeSaga() {
    yield takeEvery(A.REQ_ADD_INCOME, addIncome);
}

/*
 ***************************************
 * Remove Income
 * *************************************
*/

function* removeIncome(action) {
    const { id } = action.query;
    try {
        const getIncomes = yield AsyncStorage.getItem('@incomes');
        if (getIncomes !== null) {
            const getIncomesJSON = JSON.parse(getIncomes);
            const index = getIncomesJSON.findIndex(o => o.id === id);
            if (index !== -1) getIncomesJSON.splice(index, 1);
            const incomeString = JSON.stringify(getIncomesJSON);
            yield AsyncStorage.setItem('@incomes', incomeString);
        }

        yield put(removeIncomeSuccess(action));
    } catch (error) {
        yield put(removeIncomeErr(error.toString()));
    }
}

export function* removeIncomeSaga() {
    yield takeEvery(A.REQ_REMOVE_INCOME, removeIncome);
}

/*
 ***************************************
 * Update Income
 * *************************************
*/

function* updateIncome(action) {
    try {
        const { id, incomeAmount, incomeFrom } = action.query; 
        const getIncomes = yield AsyncStorage.getItem('@incomes');
        if (getIncomes !== null) {
            const getIncomesJSON = JSON.parse(getIncomes);
            const index = getIncomesJSON.findIndex(o => o.id === id);

            getIncomesJSON[index].incomeAmount = incomeAmount;
            getIncomesJSON[index].incomeFrom = incomeFrom;

            const incomeString = JSON.stringify(getIncomesJSON);
            yield AsyncStorage.setItem('@incomes', incomeString);
        }
        yield put(updateIncomeSuccess(action));
    } catch (error) {
        yield put(updateIncomeErr(error.toString()));
    }
}

export function* updateIncomeSaga() {
    yield takeEvery(A.REQ_UPDATE_INCOME, updateIncome);
}
