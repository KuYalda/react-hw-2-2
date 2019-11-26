import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Controls({ operation }) {
  const [sum, setSum] = useState('');
  const handleChange = ({ target }) => setSum(Number(target.value));
  const handleDeposit = () => {
    operation(sum, 'Deposit');
    setSum('');
  };
  const handleWithdraw = () => {
    operation(sum, 'Withdraw');
    setSum('');
  };

  return (
    <>
      <input
        type="number"
        min="0.01"
        name="amount"
        // placeholder="0
        value={sum}
        onChange={handleChange}
      />
      <button
        onClick={handleDeposit}
        type="button"
        style={{ cursor: 'pointer' }}
      >
        Deposit
      </button>
      <button
        onClick={handleWithdraw}
        type="button"
        style={{ cursor: 'pointer' }}
      >
        Withdraw
      </button>
    </>
  );
}

Controls.propTypes = PropTypes.shape({
  operation: PropTypes.func,
}).isRequired;

export default Controls;
