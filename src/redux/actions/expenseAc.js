import A from './index';

/*
 ***************************************
 * Get Expenses
 * *************************************
*/
export const getExpensesReq = query => ({
    type: A.REQ_EXPENSES,
    query,
});

export const getExpensesSuccess = data => ({
    type: A.REC_EXPENSES,
    data,
});

export const getExpensesErr = data => ({
    type: A.REC_EXPENSES_ERR,
    data,
});

export const getExpensesReset = () => ({
    type: A.RESET_EXPENSES,
});

/*
 ***************************************
 * Add Expense
 * *************************************
*/
export const addExpenseReq = query => ({
    type: A.REQ_ADD_EXPENSE,
    query,
});

export const addExpenseSuccess = data => ({
    type: A.REC_ADD_EXPENSE,
    data,
});

export const addExpenseErr = data => ({
    type: A.REC_ADD_EXPENSE_ERR,
    data,
});

export const addExpenseReset = () => ({
    type: A.RESET_ADD_EXPENSE,
});

/*
 ***************************************
 * Remove Expense
 * *************************************
*/
export const removeExpenseReq = query => ({
    type: A.REQ_REMOVE_EXPENSE,
    query
});

export const removeExpenseSuccess = data => ({
    type: A.REC_REMOVE_EXPENSE,
    data,
});

export const removeExpenseErr = data => ({
    type: A.REC_REMOVE_EXPENSE_ERR,
    data,
});

export const removeExpenseReset = () => ({
    type: A.RESET_REMOVE_EXPENSE,
});

/*
 ***************************************
 * Update Expense
 * *************************************
*/
export const updateExpenseReq = query => ({
    type: A.REQ_UPDATE_EXPENSE,
    query,
});

export const updateExpenseSuccess = data => ({
    type: A.REC_UPDATE_EXPENSE,
    data,
});

export const updateExpenseErr = data => ({
    type: A.REC_UPDATE_EXPENSE_ERR,
    data,
});

export const updateExpenseReset = () => ({
    type: A.RESET_UPDATE_EXPENSE,
});
