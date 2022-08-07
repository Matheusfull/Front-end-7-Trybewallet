// Coloque aqui suas actions
// Coloque aqui suas actions
export const CURRENCIE_SUCESS = 'CURRENCIE_SUCESS';
export const CURRENCIE_FAILURE = 'CURRENCIE_FAILURE';

export const LOGIN = 'LOGIN';

export const INFORMACAO_DO_FORM = 'INFORMACAO_DO_FORM';

export const COTACAO = 'COTACAO';

export const RETIRANDO_DEPESA = 'RETIRANDO_DEPESA';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const currenciesSucess = (currencies) => ({
  type: CURRENCIE_SUCESS,
  currencies,
});

export const currenciesFailure = (error) => ({
  type: CURRENCIE_FAILURE,
  error,
});

export const infoForm = (form, data) => ({
  type: INFORMACAO_DO_FORM,
  expense: { ...form, exchangeRates: data },
});

/* export const cotação = (moedasInfo) => ({
  type: COTACAO,
  moedasInfo,
}); */

export const retirandoAction = (expenses) => ({
  type: RETIRANDO_DEPESA,
  expenses,
});

export function getCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    /* console.log(data);
    dispatch(cotação(data)); */
    const currencies = Object.keys(data).map((moeda) => moeda)
      .filter((moeda) => moeda !== 'USDT');
    // console.log(data);
    dispatch(currenciesSucess(currencies));
  };
}

/* ajuda do leo */
export function funcaoQueTraz(form) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(infoForm(form, data));
  };
}
