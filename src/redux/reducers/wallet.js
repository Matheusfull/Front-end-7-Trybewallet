// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCIE_SUCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIE_SUCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
