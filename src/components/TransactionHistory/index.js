import React from 'react';
import PropTypes from 'prop-types';

const TransactionHistory = ({ transactions }) =>
  transactions.map(el => (
    <tr key={el.id}>
      <td>{el.type}</td>
      <td>{el.amount}$</td>
      <td>{el.date}</td>
    </tr>
  ));

TransactionHistory.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
  }),
).isRequired;

export default TransactionHistory;
