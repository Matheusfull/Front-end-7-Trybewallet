import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // console.log(expenses);
    /* const array = expenses.map((element) => element.value);
    // console.log(array);
    const number = array.map((ele) => Number(ele));
    // console.log(number);
    const total = number.reduce((acc, curr) => acc + curr, 0); */
    // console.log(total);
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {expenses.reduce((acc, cur) => {
            const conversao = Number(cur.value * cur.exchangeRates[cur.currency].ask);
            acc += conversao;
            // console.log(Number(acc).toFixed(2));
            return Number(acc);
          }, 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
};

Header.propTypes = {
  /* user: PropTypes.objectOf(PropTypes.string).isRequired, */
  email: propTypes.objectOf(propTypes.string),
  expenses: propTypes.arrayOf(propTypes.object),
}.isRequerid;

export default connect(mapStateToProps, null)(Header);
