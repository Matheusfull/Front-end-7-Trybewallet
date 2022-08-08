// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;

/*
-No reducer, pegamos cada caso de um tipo de action, ou seja, lembra lá da action que tinha um type bem específico para ela, então ele é capturado aqui no reducer.
-Depois dessa captura, o reducer fazer algo para aquela action específica. Ai varia, depende da lógica implementada. Às vezes a informação que a action manda para o reducer, é colocada aqui na lógica, seja para incrementar uma chave, modificar, atualizar. Ou seja, no reducer que vai ter as chaves do estados que queremos usar.
*/
