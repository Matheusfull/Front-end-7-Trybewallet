// Coloque aqui suas actions
// Coloque aqui suas actions
export const CURRENCIE_SUCESS = 'CURRENCIE_SUCESS';
export const CURRENCIE_FAILURE = 'CURRENCIE_FAILURE';
export const LOGIN = 'LOGIN';

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

export function getCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).map((moeda) => moeda)
      .filter((moeda) => moeda !== 'USDT');
    dispatch(currenciesSucess(currencies));
  };
}
