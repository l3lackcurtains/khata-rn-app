import incomeRe from './incomeRe';
import expenseRe from './expenseRe';
import savingRe from './savingRe';
import settingRe from './settingRe';

const rootReducers = {
  ...incomeRe,
  ...expenseRe,
  ...savingRe,
  ...settingRe
};

export default rootReducers;
