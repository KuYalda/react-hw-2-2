import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Dashboard.module.css';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

const shortid = require('shortid');

toast.configure();

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  operation = e => {
    const { value } = e.target.parentElement.firstElementChild;
    e.target.parentElement.firstElementChild.value = null;
    const depType = e.target.textContent;
    const newTransaction = {
      id: shortid.generate(),
      type: depType,
      amount: Number(value),
      date: new Date().toLocaleString(),
    };
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

    this.setState(ps => {
      if (depType === 'Withdraw' && value > ps.balance) {
        error();
        return {};
      }
      if ((depType === 'Withdraw' || depType === 'Deposit') && value > 0) {
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
    // console.log('Dashbord.props :', this.props);
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
