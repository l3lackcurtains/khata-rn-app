import A from '../actions/index';

const initState = {
  isReceived: false,
  data: [],
  error: false,
  isLoading: false
};

/*
 ***************************************
 * Incomes reducer
 * *************************************
*/
const getIncomesRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_INCOMES:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_INCOMES:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_INCOMES_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_INCOMES:
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
 * Income add reducer
 * *************************************
*/
const addIncomeRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_ADD_INCOME:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_ADD_INCOME:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_ADD_INCOME_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_ADD_INCOME:
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
 * Income remove reducer
 * *************************************
*/
const removeIncomeRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_REMOVE_INCOME:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_REMOVE_INCOME:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_REMOVE_INCOME_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_REMOVE_INCOME:
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
 * Income update reducer
 * *************************************
*/
const updateIncomeRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_UPDATE_INCOME:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_UPDATE_INCOME:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_UPDATE_INCOME_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_UPDATE_INCOME:
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
  getIncomes: getIncomesRe,
  addIncome: addIncomeRe,
  removeIncome: removeIncomeRe,
  updateIncome: updateIncomeRe
};
