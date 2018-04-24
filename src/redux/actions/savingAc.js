import A from './index';

/*
 ***************************************
 * Get Savings
 * *************************************
*/
export const getSavingsReq = query => ({
  type: A.REQ_SAVINGS,
  query
});

export const getSavingsSuccess = data => ({
  type: A.REC_SAVINGS,
  data
});

export const getSavingsErr = data => ({
  type: A.REC_SAVINGS_ERR,
  data
});

export const getSavingsReset = () => ({
  type: A.RESET_SAVINGS
});

/*
 ***************************************
 * Add Saving
 * *************************************
*/
export const addSavingReq = query => ({
  type: A.REQ_ADD_SAVING,
  query
});

export const addSavingSuccess = data => ({
  type: A.REC_ADD_SAVING,
  data
});

export const addSavingErr = data => ({
  type: A.REC_ADD_SAVING_ERR,
  data
});

export const addSavingReset = () => ({
  type: A.RESET_ADD_SAVING
});

/*
 ***************************************
 * Remove Saving
 * *************************************
*/
export const removeSavingReq = query => ({
  type: A.REQ_REMOVE_SAVING,
  query
});

export const removeSavingSuccess = data => ({
  type: A.REC_REMOVE_SAVING,
  data
});

export const removeSavingErr = data => ({
  type: A.REC_REMOVE_SAVING_ERR,
  data
});

export const removeSavingReset = () => ({
  type: A.RESET_REMOVE_SAVING
});

/*
 ***************************************
 * Update Saving
 * *************************************
*/
export const updateSavingReq = query => ({
  type: A.REQ_UPDATE_SAVING,
  query
});

export const updateSavingSuccess = data => ({
  type: A.REC_UPDATE_SAVING,
  data
});

export const updateSavingErr = data => ({
  type: A.REC_UPDATE_SAVING_ERR,
  data
});

export const updateSavingReset = () => ({
  type: A.RESET_UPDATE_SAVING
});
