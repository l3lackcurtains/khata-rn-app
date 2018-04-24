import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

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
function* getExpenses(action) {
  try {
    const getExpenses = yield AsyncStorage.getItem('@expenses');
    let getExpensesJSON = null;
    if (getExpenses !== null) {
      getExpensesJSON = JSON.parse(getExpenses);
    }
    yield put(getExpensesSuccess(getExpensesJSON));
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
    const expenseJSON = { expenseAmount, expenseFrom };

    const getExpenses = yield AsyncStorage.getItem('@expenses');
    let expenseString = '';
    if (getExpenses !== null) {
      const getExpensesJSON = JSON.parse(getExpenses);
      getExpensesJSON.push(expenseJSON);
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
  const { index } = action.query;
  try {
    const getExpenses = yield AsyncStorage.getItem('@expenses');
    if (getExpenses !== null) {
      const getExpensesJSON = JSON.parse(getExpenses);
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
    const { index, expenseAmount, expenseFrom } = action.query;
    const getExpenses = yield AsyncStorage.getItem('@expenses');
    if (getExpenses !== null) {
      const getExpensesJSON = JSON.parse(getExpenses);

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
