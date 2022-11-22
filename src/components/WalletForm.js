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
    <div className="walletForm">
      <form>
        <input
          id="number"
          type="number"
          data-testid="value-input"
          placeholder="despesas:"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          id="description"
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
        <label htmlFor="formaDePagamento" id="method">
          método de pagamento:
          <select
            id="method_input"
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

        <label htmlFor="categoria" id="category">
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

/*
Requisito 3
1 - teremos um input number normal para colocar o valor
2 - a mesma coisa para descrição, porém com um input text
3 -
  1 - Os valores do select virão de um array e esse será populado pela requisição à API https://economia.awesomeapi.com.br/json/all. Ou seja:
  - Temos uma requsição a fazer, logo o melhor lugar para isso é no componentDidMount.
      - Basta então criar uma chave da mapDispatchToProps e chamá-la no didmount. Essa chave vai usar uma action creator aasíncrona , getCurrencies, a fim de que ela faça a requisição.
  - A função que irá fazer isso, vai guardar as informações vindas da API no estado global, para depois recuperar, logo, usaremos uma action assíncrona
  - Depois é só recuperar e exibir no formulário. Para isso, usaremos o mapStateToProps para trazer as moedas salvas no estado global.
4 - Aqui vai ser um campo de selection com as options já definidas
5 - A mesmo explicação acima.
*/
/*
Requisito 4
1 - Para salvar os dados que estão no formulário no estado global, vamos controlar cada um dos input e select com a criação de um estado específico, a função handleChange e pegar esse dados e jogar na prop enviandoParaStore que nada mais é que uma mapDispatchToProps que enviará esses dados para a store.
obs: Para fazer um id dinâmico, ele será numericamente igual ao tamanho de informações já salvas no array expenses.
2 - Depois vamos limpar os inputs e select.
*/
