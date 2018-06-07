import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import md5 from 'react-native-md5';

import A from '../actions/index';
import {
  getExpensesSuccess,
  getExpensesErr,
  addExpenseSuccess,
  addExpenseErr,
  removeExpenseSuccess,
  removeExpenseErr,
  updateExpenseSuccess,
  updateExpenseErr
} from '../actions/expenseAc';

/*
 ***************************************
 * Get Expenses
 * *************************************
*/
function* getExpenses() {
  try {
    const getExpenseString = yield AsyncStorage.getItem('@expenses');
    let getExpensesJSON = [];
    if (getExpenseString !== null) {
      getExpensesJSON = JSON.parse(getExpenseString);
    }
    const sortedExpenseJson = getExpensesJSON.sort(
      (left, right) => moment(right.createdAt).format('X') - moment(left.createdAt).format('X')
    );
    yield put(getExpensesSuccess(sortedExpenseJson));
  } catch (error) {
    yield put(getExpensesErr(error.toString()));
  }
}

export function* getExpensesSaga() {
  yield takeEvery(A.REQ_EXPENSES, getExpenses);
}

/*
 ***************************************
 * Add Expense
 * *************************************
*/

function* addExpense(action) {
  try {
    const { expenseAmount, expenseFrom } = action.query;
    const createdAt = moment()
      .locale('en')
      .format();
    const id = md5.hex_md5(createdAt);

    const expenseJSON = {
      expenseAmount,
      expenseFrom,
      createdAt,
      id
    };

    const getExpenseString = yield AsyncStorage.getItem('@expenses');
    let expenseString = '';
    if (getExpenseString !== null) {
      const getExpensesJSON = JSON.parse(getExpenseString);
      getExpensesJSON.unshift(expenseJSON);
      expenseString = JSON.stringify(getExpensesJSON);
    } else {
      expenseString = JSON.stringify([expenseJSON]);
    }
    yield AsyncStorage.setItem('@expenses', expenseString);

    yield put(addExpenseSuccess(action));
  } catch (error) {
    yield put(addExpenseErr(error.toString()));
  }
}

export function* addExpenseSaga() {
  yield takeEvery(A.REQ_ADD_EXPENSE, addExpense);
}

/*
 ***************************************
 * Remove Expense
 * *************************************
*/

function* removeExpense(action) {
  const { id } = action.query;
  try {
    const getExpenseString = yield AsyncStorage.getItem('@expenses');
    if (getExpenseString !== null) {
      const getExpensesJSON = JSON.parse(getExpenseString);
      const index = getExpensesJSON.findIndex(o => o.id === id);
      if (index !== -1) getExpensesJSON.splice(index, 1);
      const expenseString = JSON.stringify(getExpensesJSON);
      yield AsyncStorage.setItem('@expenses', expenseString);
    }

    yield put(removeExpenseSuccess(action));
  } catch (error) {
    yield put(removeExpenseErr(error.toString()));
  }
}

export function* removeExpenseSaga() {
  yield takeEvery(A.REQ_REMOVE_EXPENSE, removeExpense);
}

/*
 ***************************************
 * Update Expense
 * *************************************
*/

function* updateExpense(action) {
  try {
    const { id, expenseAmount, expenseFrom } = action.query;
    const getExpenseString = yield AsyncStorage.getItem('@expenses');
    if (getExpenseString !== null) {
      const getExpensesJSON = JSON.parse(getExpenseString);
      const index = getExpensesJSON.findIndex(o => o.id === id);

      getExpensesJSON[index].expenseAmount = expenseAmount;
      getExpensesJSON[index].expenseFrom = expenseFrom;

      const expenseString = JSON.stringify(getExpensesJSON);
      yield AsyncStorage.setItem('@expenses', expenseString);
    }
    yield put(updateExpenseSuccess(action));
  } catch (error) {
    yield put(updateExpenseErr(error.toString()));
  }
}

export function* updateExpenseSaga() {
  yield takeEvery(A.REQ_UPDATE_EXPENSE, updateExpense);
}
