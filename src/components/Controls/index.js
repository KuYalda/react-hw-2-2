import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({ operation }) => (
  <>
    <input type="number" min="0.01" name="amount" placeholder="0" />
    <button onClick={operation} type="button" style={{ cursor: 'pointer' }}>
      Deposit
    </button>
    <button onClick={operation} type="button" style={{ cursor: 'pointer' }}>
      Withdraw
    </button>
  </>
);

Controls.propTypes = PropTypes.shape({
  operation: PropTypes.func,
}).isRequired;

export default Controls;
