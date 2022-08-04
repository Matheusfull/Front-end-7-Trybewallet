import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends React.Component {
componentDidMount = () => {
  const { moedasvindo } = this.props;
  moedasvindo();
}

render() {
  const { currencies } = this.props;
  console.log(currencies);
  return (
    <div>
      <form>
        <input type="number" data-testid="value-input" placeholder="despezas:" />
        <input type="text" data-testid="description-input" placeholder="descrição:" />
        <label htmlFor="moeda">
          Moeda:
          <select name="moeda" data-testid="currency-input">
            {
              currencies.map((moedas, index) => (
                <option key={ index }>{moedas}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="metodo">
          método de pagamento:
          <select data-testid="method-input" name="metodo">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          categoria:
          <select data-testid="tag-input" name="categoria">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  moedasvindo: () => dispatch(getCurrencies()),
});

WalletForm.propTypes = {
  moedasvindo: propTypes.func,
  currencies: propTypes.objectOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
