import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { retirandoAction } from '../redux/actions';

class Table extends Component {
  retirandoDoEstado = (id) => {
    console.log('fui clicado', id);
    const { expenses, retirandoDespesaEspecfica } = this.props;
    /* const newEspenses = expenses.splice(id, 0);
    retirandoDespesaEspecfica(newEspenses); */
    // console.log(expenses);
    const novoArray = expenses.filter((expense) => expense.id !== id);
    retirandoDespesaEspecfica(novoArray);
  }

  render() {
    const { expenses } = this.props;
    // const { description, tag, method, currency, value } = expenses;
    // const { exchangeRates.currency.name } = expenses;
    console.log(expenses);
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
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
                <td>
                  <button
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.retirandoDoEstado(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  retirandoDespesaEspecfica: (id) => dispatch(retirandoAction(id)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object),
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
