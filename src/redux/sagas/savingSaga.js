import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import A from '../actions/index';
import {
  getSavingsSuccess,
  getSavingsErr,
  addSavingSuccess,
  addSavingErr,
  removeSavingSuccess,
  removeSavingErr,
  updateSavingSuccess,
  updateSavingErr
} from '../actions/savingAc';

/*
 ***************************************
 * Get Savings
 * *************************************
*/
function* getSavings(action) {
  try {
    const getSavings = yield AsyncStorage.getItem('@savings');
    let getSavingsJSON = null;
    if (getSavings !== null) {
      getSavingsJSON = JSON.parse(getSavings);
    }
    yield put(getSavingsSuccess(getSavingsJSON));
  } catch (error) {
    yield put(getSavingsErr(error.toString()));
  }
}

export function* getSavingsSaga() {
  yield takeEvery(A.REQ_SAVINGS, getSavings);
}

/*
 ***************************************
 * Add Saving
 * *************************************
*/

function* addSaving(action) {
  try {
    const { savingAmount, savingFrom } = action.query;
    const savingJSON = { savingAmount, savingFrom };

    const getSavings = yield AsyncStorage.getItem('@savings');
    let savingString = '';
    if (getSavings !== null) {
      const getSavingsJSON = JSON.parse(getSavings);
      getSavingsJSON.push(savingJSON);
      savingString = JSON.stringify(getSavingsJSON);
    } else {
      savingString = JSON.stringify([savingJSON]);
    }
    yield AsyncStorage.setItem('@savings', savingString);

    yield put(addSavingSuccess(action));
  } catch (error) {
    yield put(addSavingErr(error.toString()));
  }
}

export function* addSavingSaga() {
  yield takeEvery(A.REQ_ADD_SAVING, addSaving);
}

/*
 ***************************************
 * Remove Saving
 * *************************************
*/

function* removeSaving(action) {
  const { index } = action.query;
  try {
    const getSavings = yield AsyncStorage.getItem('@savings');
    if (getSavings !== null) {
      const getSavingsJSON = JSON.parse(getSavings);
      if (index !== -1) getSavingsJSON.splice(index, 1);
      const savingString = JSON.stringify(getSavingsJSON);
      yield AsyncStorage.setItem('@savings', savingString);
    }

    yield put(removeSavingSuccess(action));
  } catch (error) {
    yield put(removeSavingErr(error.toString()));
  }
}

export function* removeSavingSaga() {
  yield takeEvery(A.REQ_REMOVE_SAVING, removeSaving);
}

/*
 ***************************************
 * Update Saving
 * *************************************
*/

function* updateSaving(action) {
  try {
    const { index, savingAmount, savingFrom } = action.query;
    const getSavings = yield AsyncStorage.getItem('@savings');
    if (getSavings !== null) {
      const getSavingsJSON = JSON.parse(getSavings);

      getSavingsJSON[index].savingAmount = savingAmount;
      getSavingsJSON[index].savingFrom = savingFrom;

      const savingString = JSON.stringify(getSavingsJSON);
      yield AsyncStorage.setItem('@savings', savingString);
    }
    yield put(updateSavingSuccess(action));
  } catch (error) {
    yield put(updateSavingErr(error.toString()));
  }
}

export function* updateSavingSaga() {
  yield takeEvery(A.REQ_UPDATE_SAVING, updateSaving);
}
