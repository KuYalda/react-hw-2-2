import React from 'react';
import PropTypes from 'prop-types';

const Balance = ({ balance, deposit, withdraw }) => (
  <>
    {/* eslint-disable-next-line */}
    <span>⬆️{deposit}$</span>
    {/* eslint-disable-next-line */}
    <span>⬇️{withdraw}$</span>
    <span>Balance: {balance}$</span>
  </>
);

Balance.propTypes = PropTypes.objectOf(PropTypes.number).isRequired;

export default Balance;
