import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { retirandoAction } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
  }

  retirandoDoEstado = (id) => {
    // console.log('fui clicado', id);
    const { expenses, retirandoDespesaEspecfica } = this.props;
    /* const newEspenses = expenses.splice(id, 0);
    retirandoDespesaEspecfica(newEspenses); */
    // console.log(expenses);
    const novoArray = expenses.filter((expense) => expense.id !== id);
    retirandoDespesaEspecfica(novoArray);
  }

  editandoDoEstado = (id) => {
    this.setState((prevSate) => ({
      edit: !prevSate.edit,
    }));
    const { edit } = this.state;
    const { renderCondicional, idCondicional } = this.props;
    renderCondicional(edit);
    idCondicional(id);
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    // const { description, tag, method, currency, value } = expenses;
    // const { exchangeRates.currency.name } = expenses;
    return (
      <table className="table">
        <thead>
          <tr className="thead">
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
              <tr key={ expense.id } className="tr">
                <div className="description">
                  <td>
                    {/* Descrição: */}
                    { expense.description }
                  </td>
                </div>
                <td className="tag">
                  {/* Tag: */}
                  { expense.tag }
                </td>
                <td className="method">
                  {/* Método de pagamento: */}
                  { expense.method }
                </td>
                <td className="value">
                  {/* Valor: */}
                  { parseFloat(expense.value).toFixed(2) }
                </td>
                <td className="currency">
                  {/* Moeda: */}
                  { expense.exchangeRates[expense.currency].name }
                </td>
                <td className="cambio">
                  {/* Câmbio utilizado: */}
                  {/* { expense.currency } eu estava colocando o símbolo da moeda */}
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td className="conversao">
                  {/* Valor convertido: */}
                  { ((expense.value)
                  * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
                </td>
                <td className="moeda">
                  {/* Moeda de conversão: */}
                  Real
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editandoDoEstado(expense.id) }
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
  retirandoDespesaEspecfica: (novasDespesas) => dispatch(retirandoAction(novasDespesas)),
  renderCondicional: (estado) => dispatch(renderAction(estado)),
  idCondicional: (id) => dispatch(idAction(id)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object),
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Table);

/*
Requisito 6
1 - Vamos criar a 'cabeça' da nossa tabela. Teremos uma criação normal com o thead, tr e th e os nomes de cada coluna.
*/

/*
Requisito 7
Para cada coluna que criamos, vamos alimentar com um dado que está salvo no estado global
1 - Para pegar esses dados, vamos usa a função mapStateToProps que fora explicada em outro requisito. Mas de forma geral ela é uma função que retorna um objeto e ele contém os dados que vêm do estado global. Para trazer esses dados é preciso pegá-lo pela orientação a objeto (state.wallet.expenses, ou seja, vai ao estado, depois ao reducer e depois à chave expenses)
2 - Vamos trazer tudo que está no estado em forma de objeto. Basta então desestruturá-lo para cada coluna que queremos alimentar.
*/
/*
Requisito 8
1 - Vamos pegar o id da despesa clicada
2 - Com esse id vamos fazer um filtro em que teremos um novo array com todas as despesas, exceto por aquela que contém o id que foi clicado.
3 - Joga esse array na mapDispatchToProps.
obs: Vale ressaltar que esse dispatch recebe um parâmetro, que no caso será o novo array filtrado
*/
