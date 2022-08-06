import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { funcaoQueTraz, getCurrencies } from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    };
  }

componentDidMount = () => {
  const { moedasvindo } = this.props;
  moedasvindo();
}

handleChange = ({ target }) => {
  const { value, name } = target;
  this.setState({
    [name]: value,
  });
}

handleClick = () => {
  const { enviandoParaStore, expenses } = this.props;
  // console.log(moedas);
  const { value, description, currency, method, tag } = this.state;
  const info = {
    id: expenses.length,
    value,
    description,
    currency,
    method,
    tag,
  };
  /* estava mandando enviandoParaStore(this.state), porém não iria com a chave id de modo dinâmico  */
  enviandoParaStore(info);
  this.setState({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  });
}

render() {
  const { currencies } = this.props;
  // console.log(currencies);
  const { value, description, currency, method, tag } = this.state;
  // console.log(this.state);
  return (
    <div>
      <form>
        <input
          type="number"
          data-testid="value-input"
          placeholder="despesas:"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="descrição:"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />
        <label htmlFor="moeda">
          Moeda:
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              currencies.map((moedas, index) => (
                <option key={ index }>{moedas}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="formaDePagamento">
          método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="categoria">
          categoria:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
      <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // moedas: state.wallet.moedas,
});

const mapDispatchToProps = (dispatch) => ({
  moedasvindo: () => dispatch(getCurrencies()),
  enviandoParaStore: (form) => dispatch(funcaoQueTraz(form)),
});

WalletForm.propTypes = {
  moedasvindo: propTypes.func,
  enviandoParaStore: propTypes.func,
  currencies: propTypes.objectOf(propTypes.array),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
