import incomeRe from './incomeRe';
import expenseRe from './expenseRe';
import savingRe from './savingRe';

const rootReducers = {
    ...incomeRe,
    ...expenseRe,
    ...savingRe
};

export default rootReducers;
