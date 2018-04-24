import A from './index';

/*
 ***************************************
 * Get Incomes
 * *************************************
*/
export const getIncomesReq = query => ({
  type: A.REQ_INCOMES,
  query
});

export const getIncomesSuccess = data => ({
  type: A.REC_INCOMES,
  data
});

export const getIncomesErr = data => ({
  type: A.REC_INCOMES_ERR,
  data
});

export const getIncomesReset = () => ({
  type: A.RESET_INCOMES
});

/*
 ***************************************
 * Add Income
 * *************************************
*/
export const addIncomeReq = query => ({
  type: A.REQ_ADD_INCOME,
  query
});

export const addIncomeSuccess = data => ({
  type: A.REC_ADD_INCOME,
  data
});

export const addIncomeErr = data => ({
  type: A.REC_ADD_INCOME_ERR,
  data
});

export const addIncomeReset = () => ({
  type: A.RESET_ADD_INCOME
});

/*
 ***************************************
 * Remove Income
 * *************************************
*/
export const removeIncomeReq = query => ({
  type: A.REQ_REMOVE_INCOME,
  query
});

export const removeIncomeSuccess = data => ({
  type: A.REC_REMOVE_INCOME,
  data
});

export const removeIncomeErr = data => ({
  type: A.REC_REMOVE_INCOME_ERR,
  data
});

export const removeIncomeReset = () => ({
  type: A.RESET_REMOVE_INCOME
});

/*
 ***************************************
 * Update Income
 * *************************************
*/
export const updateIncomeReq = query => ({
  type: A.REQ_UPDATE_INCOME,
  query
});

export const updateIncomeSuccess = data => ({
  type: A.REC_UPDATE_INCOME,
  data
});

export const updateIncomeErr = data => ({
  type: A.REC_UPDATE_INCOME_ERR,
  data
});

export const updateIncomeReset = () => ({
  type: A.RESET_UPDATE_INCOME
});
