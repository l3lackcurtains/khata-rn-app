import A from '../actions/index';

const initState = {
  isReceived: false,
  data: {},
  error: false,
  isLoading: false
};

/*
 ***************************************
 * Settings reducer
 * *************************************
*/
const getSettingsRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_SETTINGS:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_SETTINGS:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_SETTINGS_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_SETTINGS:
      return {
        isReceived: false,
        data: {},
        error: false,
        isLoading: false
      };
    default:
      return state;
  }
};

/*
 ***************************************
 * Setting update reducer
 * *************************************
*/
const updateSettingRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_UPDATE_SETTING:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_UPDATE_SETTING:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_UPDATE_SETTING_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_UPDATE_SETTING:
      return {
        isReceived: false,
        data: {},
        error: false,
        isLoading: false
      };
    default:
      return state;
  }
};

export default {
  getSettings: getSettingsRe,
  updateSetting: updateSettingRe
};
