import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const IncomeExpenses = () => {
  const context = useContext(GlobalContext);

  const { transactions } = context;

  const minusAmount = transactions.filter(item => item.amount < 0);
  const expense = Math.abs(
    minusAmount.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
  ).toFixed(2);

  const plusAmount = transactions.filter(item => item.amount > 0);
  const income = Math.abs(
    plusAmount.reduce((acc, curr) => acc + curr.amount, 0)
  ).toFixed(2);

  return (
    <div className='IncomeExpenses'>
      <div className='inc-exp-container'>
        <div>
          <h4>Income</h4>
          <p className='money plus'>${numberWithCommas(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className='money minus'>-${numberWithCommas(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
