import { put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import A from '../actions/index';
import {
  getSettingsSuccess,
  getSettingsErr,
  updateSettingSuccess,
  updateSettingErr
} from '../actions/settingAc';

/*
 ***************************************
 * Get Settings
 * *************************************
*/
function* getSettings() {
  try {
    // AsyncStorage.removeItem('@settings');
    const getSettings = yield AsyncStorage.getItem('@settings');
    let getSettingsJSON = null;
    if (getSettings !== null) {
      getSettingsJSON = JSON.parse(getSettings);
    } else {
      getSettingsJSON = {
        currencyCode: 'Rs.'
      };
      const settingString = JSON.stringify(getSettingsJSON);
      yield AsyncStorage.setItem('@settings', settingString);
    }
    yield put(getSettingsSuccess(getSettingsJSON));
  } catch (error) {
    yield put(getSettingsErr(error.toString()));
  }
}

export function* getSettingsSaga() {
  yield takeEvery(A.REQ_SETTINGS, getSettings);
}

/*
 ***************************************
 * Update Setting
 * *************************************
*/
function* updateSetting(action) {
  const { query } = action;
  try {
    const getSettings = yield AsyncStorage.getItem('@settings');
    if (getSettings !== null) {
      let getSettingsJSON = JSON.parse(getSettings);

      getSettingsJSON = { ...getSettingsJSON, ...query };

      const settingString = JSON.stringify(getSettingsJSON);
      yield AsyncStorage.setItem('@settings', settingString);
    }
    yield put(updateSettingSuccess(action));
  } catch (error) {
    yield put(updateSettingErr(error.toString()));
  }
}

export function* updateSettingSaga() {
  yield takeEvery(A.REQ_UPDATE_SETTING, updateSetting);
}
