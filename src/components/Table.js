import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    // const { description, tag, method, currency, value } = expenses;
    // const { exchangeRates.currency.name } = expenses;
    console.log(expenses);
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {
            expenses.map((expense, index) => (
              <tr key={ index }>
                <td>
                  {/* Descrição: */}
                  { expense.description }
                </td>
                <td>
                  {/* Tag: */}
                  { expense.tag }
                </td>
                <td>
                  {/* Método de pagamento: */}
                  { expense.method }
                </td>
                <td>
                  {/* Valor: */}
                  { parseFloat(expense.value).toFixed(2) }
                </td>
                <td>
                  {/* Moeda: */}
                  { expense.exchangeRates[expense.currency].name }
                </td>
                <td>
                  {/* Câmbio utilizado: */}
                  {/* { expense.currency } eu estava colocando o símbolo da moeda */}
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {/* Valor convertido: */}
                  { ((expense.value)
                  * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                </td>
                <td>
                  {/* Moeda de conversão: */}
                  Real
                </td>
                <td>Editar</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object),
}.isRequerid;

export default connect(mapStateToProps, null)(Table);
