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
      <div className="header">
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p data-testid="total-field">
            Despeza total : R$
            {expenses.reduce((acc, cur) => {
              const conversao = Number(cur.value * cur.exchangeRates[cur.currency].ask);
              acc += conversao;
              // console.log(Number(acc).toFixed(2));
              return Number(acc);
            }, 0).toFixed(2)}
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
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

/*
Requisito 2
1 - Para exibir um elemento da pessoa usuária, vamos criar um parágrafo e alimentarmos com o email que foi salvo no redux
  - Para pegar esse email ( assim como qualquer informação no redux, usaremos a função mapStateToProps)
     - É uma função que renorna um objeto, sendo a chave o nome da prop que terá o informação que queremos e o valor dessa chave será o endereço onde está a informação. (no estado, na chave tal, da chave tal...)
        - Depois é só passar como props dentro do render para colocar no parágrafo criado acima

2 - Vamos criar mais um parágrafo para colocar a soma das despezas, que inicialmente é zero
3 - E mais um parágrafo para colocar o câmbio usado, que será BRL
*/
/*
Requisito 4
Aqui vamos fazer uma conversão da moeda escolhida para aplicar na soma des despesas.
obs: quero saber o quanto em reais eu gastei
1 - cur.value é o valor lá da moeda internacional que eu gastei
2 - cur.exchangeRates[cur.currency].ask é a taxa de conversão, onde cur.exchangeRates eu pego o array de câmbio, é a moeda que eu quero usar de referência, cur.exchangeRates[cur.currency] é a moeda que eu vou usar de referência encontrada no array de câmbio e ask é o valor  dela.
*/
