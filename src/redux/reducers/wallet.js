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
