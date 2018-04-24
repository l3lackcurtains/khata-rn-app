import A from './index';

/*
 ***************************************
 * Get Settings
 * *************************************
*/
export const getSettingsReq = query => ({
  type: A.REQ_SETTINGS,
  query
});

export const getSettingsSuccess = data => ({
  type: A.REC_SETTINGS,
  data
});

export const getSettingsErr = data => ({
  type: A.REC_SETTINGS_ERR,
  data
});

export const getSettingsReset = () => ({
  type: A.RESET_SETTINGS
});

/*
 ***************************************
 * Update Setting
 * *************************************
*/
export const updateSettingReq = query => ({
  type: A.REQ_UPDATE_SETTING,
  query
});

export const updateSettingSuccess = data => ({
  type: A.REC_UPDATE_SETTING,
  data
});

export const updateSettingErr = data => ({
  type: A.REC_UPDATE_SETTING_ERR,
  data
});

export const updateSettingReset = () => ({
  type: A.RESET_UPDATE_SETTING
});
