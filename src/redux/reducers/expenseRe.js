import A from '../actions/index';

const initState = {
  isReceived: false,
  data: {},
  error: false,
  isLoading: false
};

/*
 ***************************************
 * Expenses reducer
 * *************************************
*/
const getExpensesRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_EXPENSES:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_EXPENSES:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_EXPENSES_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_EXPENSES:
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
 * Expense add reducer
 * *************************************
*/
const addExpenseRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_ADD_EXPENSE:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_ADD_EXPENSE:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_ADD_EXPENSE_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_ADD_EXPENSE:
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
 * Expense remove reducer
 * *************************************
*/
const removeExpenseRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_REMOVE_EXPENSE:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_REMOVE_EXPENSE:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_REMOVE_EXPENSE_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_REMOVE_EXPENSE:
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
 * Expense update reducer
 * *************************************
*/
const updateExpenseRe = (state = initState, action) => {
  switch (action.type) {
    case A.REQ_UPDATE_EXPENSE:
      return {
        ...state,
        isReceived: false,
        isLoading: true
      };
    case A.REC_UPDATE_EXPENSE:
      return {
        ...state,
        isReceived: true,
        data: action.data,
        isLoading: false
      };
    case A.REC_UPDATE_EXPENSE_ERR:
      return {
        ...state,
        error: true,
        data: action.data,
        isLoading: false
      };
    case A.RESET_UPDATE_EXPENSE:
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
  getExpenses: getExpensesRe,
  addExpense: addExpenseRe,
  removeExpense: removeExpenseRe,
  updateExpense: updateExpenseRe
};
