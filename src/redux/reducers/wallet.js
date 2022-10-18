// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCIE_SUCESS, INFORMACAO_DO_FORM, RETIRANDO_DEPESA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // moedas: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIE_SUCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
    /* ajuda do leo */
  case INFORMACAO_DO_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
    /* case COTACAO:
    return {
      ...state,
      moedas: action.moedasInfo,
    }; */
  case RETIRANDO_DEPESA:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;

/*
Requisito 3
- Quando o tipo for CURRENCIE_SUCESS, que é o mesmo 'sinal' do objeto que contém as moedas vindas na API, então preservaremos o estado e adicionaremos à chave que conterá o array com os moedas que vieram a api.
*/

/*
Requisito 4
Aqui, com o objeto expense vindo lá da action, vamos preservar o array expense e dicionar o novo objeto que veio na action. Com isso, ao clicar lá no funmulário, para enviar os dados, ele chega até aqui com a adição do câmbio e é salvo na store.
*/
