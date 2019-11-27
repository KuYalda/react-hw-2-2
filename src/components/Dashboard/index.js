import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Dashboard.module.css';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

const shortid = require('shortid');

toast.configure();

const toastSettings = {
  position: 'top-center',
  autoClose: 2500,
  pauseOnHover: false,
};
const error = () =>
  toast('На счету недостаточно средств для проведения операции!', {
    ...toastSettings,
    type: toast.TYPE.ERROR,
  });
const warning = () =>
  toast('Введите корректную сумму для проведения операции!', {
    ...toastSettings,
    type: toast.TYPE.WARNING,
  });
export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const oldState = localStorage.getItem('oldState');

    if (oldState) {
      this.setState({ ...JSON.parse(oldState) });
    }
    // oldState
    //   ? this.setState({ ...JSON.parse(oldState) })
    //   : console.log('false :', false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('oldState', JSON.stringify(this.state));
    }
    // prevState !== this.state &&
    //   localStorage.setItem('oldState', JSON.stringify(this.state));
  }

  operation = (sum, depType) => {
    const newTransaction = {
      id: shortid.generate(),
      type: depType,
      amount: sum,
      date: new Date().toLocaleString(),
    };
    this.setState(ps => {
      if (depType === 'Withdraw' && sum > ps.balance) {
        error();
        return {};
      }
      if ((depType === 'Withdraw' || depType === 'Deposit') && sum > 0) {
        return {
          transactions: [newTransaction, ...ps.transactions],
          balance:
            this.sumTransactionsOfType('Deposit', [
              newTransaction,
              ...ps.transactions,
            ]) -
            this.sumTransactionsOfType('Withdraw', [
              newTransaction,
              ...ps.transactions,
            ]),
        };
      }
      warning();
      return {};
    });
  };

  sumTransactionsOfType = (type, arr) => {
    const value = arr.reduce((acc, el) => {
      return el.type === type ? acc + el.amount : acc;
    }, 0);
    return value;
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className={s.dashboard}>
        <section className={s.controls}>
          <Controls operation={this.operation} />
        </section>
        <section className={s.controls}>
          <Balance
            balance={balance}
            deposit={this.sumTransactionsOfType('Deposit', transactions)}
            withdraw={this.sumTransactionsOfType('Withdraw', transactions)}
          />
        </section>
        {transactions.length > 0 ? (
          <table className={s.table}>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className={s.table}>
              <TransactionHistory transactions={transactions} />
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center' }}>You have no transactions</p>
        )}
      </div>
    );
  }
}
