import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import md5 from 'react-native-md5';

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
function* getSavings() {
  try {
    const getSavingString = yield AsyncStorage.getItem('@savings');
    let getSavingsJSON = [];
    if (getSavingString !== null) {
      getSavingsJSON = JSON.parse(getSavingString);
    }
    const sortedSavingJson = getSavingsJSON.sort(
      (left, right) => moment(right.createdAt).format('X') - moment(left.createdAt).format('X')
    );
    yield put(getSavingsSuccess(sortedSavingJson));
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
    const createdAt = moment()
      .locale('en')
      .format();
    const id = md5.hex_md5(createdAt);

    const savingJSON = {
      savingAmount,
      savingFrom,
      createdAt,
      id
    };

    const getSavingString = yield AsyncStorage.getItem('@savings');
    let savingString = '';
    if (getSavingString !== null) {
      const getSavingsJSON = JSON.parse(getSavingString);
      getSavingsJSON.unshift(savingJSON);
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
  const { id } = action.query;
  try {
    const getSavingString = yield AsyncStorage.getItem('@savings');
    if (getSavingString !== null) {
      const getSavingsJSON = JSON.parse(getSavingString);
      const index = getSavingsJSON.findIndex(o => o.id === id);
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
    const { id, savingAmount, savingFrom } = action.query;
    const getSavingString = yield AsyncStorage.getItem('@savings');
    if (getSavingString !== null) {
      const getSavingsJSON = JSON.parse(getSavingString);
      const index = getSavingsJSON.findIndex(o => o.id === id);

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
