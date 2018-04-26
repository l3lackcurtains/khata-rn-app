import A from '../actions/index';

const initState = {
  isReceived: false,
  data: [],
  error: false,
  isLoading: false
};

/*
 ***************************************
 * Savings reducer
 * *************************************
*/
const getSavingsRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_SAVINGS:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_SAVINGS:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_SAVINGS_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_SAVINGS:
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
 * Saving add reducer
 * *************************************
*/
const addSavingRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_ADD_SAVING:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_ADD_SAVING:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_ADD_SAVING_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_ADD_SAVING:
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
 * Saving remove reducer
 * *************************************
*/
const removeSavingRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_REMOVE_SAVING:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_REMOVE_SAVING:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_REMOVE_SAVING_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_REMOVE_SAVING:
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
 * Saving update reducer
 * *************************************
*/
const updateSavingRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_UPDATE_SAVING:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_UPDATE_SAVING:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_UPDATE_SAVING_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_UPDATE_SAVING:
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
  getSavings: getSavingsRe,
  addSaving: addSavingRe,
  removeSaving: removeSavingRe,
  updateSaving: updateSavingRe
};
