import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  // função para controlar os estados
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  /* aula de resolução de exercício de formulário - 11.2 - Aula colocada no Slack */
  validation = (email) => /\S+@\S+\.\S+/.test(email);

  // Função para habilitar o botão de entrar
  buttonDisabled = () => {
    const { email, senha } = this.state;
    const number = 5;
    /*  if (senha.length > number && this.validation(email)) {
      return false;
    }
    return true; */
    return !(senha.length > number && this.validation(email));
  }

  // Ao clicar no entrar, mudamos de página e salvamos o email no redux através do mapStateToProps
  send = () => {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    sendEmail(email);
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div className="login">
        <div className="form">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              data-testid="email-input"
              value={ email }
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              data-testid="password-input"
              value={ senha }
              name="senha"
              onChange={ this.handleChange }
            />
          </label>
          <div className="box-buttons">
            <button
              className="btn btn-efeito"
              disabled={ this.buttonDisabled() }
              onClick={ this.send }
              type="button"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

/*
Requisto 1

1 - Problema: a rota padrão deve ser para a página de login
1 - Solução:
- lá no APP.js tem que ter a ROUTER com o path '/' renderizando para o componente Login.

2 - Problema: Devemos ter um formulário de email com validação e senha com mais de 5 caracteres e um botão para entrar, que só será habilitado depois das validações.
2 - Solução:
-No componente Login vamos criar o fumulário com o email e senha, até aqui padrão!
-Vamos controlar os componentes de email e senha para serem exibidos na tela ao digitá-los.
-Com o email e senha já controlados, vamos fazer as validações para habilitar o botão.
-Nessa validação podemos fazer de dois modos:
  -colocando a função para retornar um true ou false e jogar isso no disabled do botão.
  -colocando um disabled no estado e modificando-o, segundo as validações, quando o botão for clicado.
     - Vamos fazer o primeiro modo. O botão ficará desabilitado quando ele pegar o estados e verificar se a senha tem mais de 5 caracteres e se o email é do tipo email kkk, com tudo isso dentro do if e retornando true, a função retorna o contrário do que está dentro do if, logo, retornará false. Com isso o disabled será falso.

3 - Problema: Salvar o email no REDUX
3 - Solução:
-Vamos precisar de uma função que dispache o estado local para o estado global:
  - Usaremos a mapDispatchToProps, que é uma função que retorna um objeto.
    - Esse objeto tem uma chave sendEmail que tem como valor uma função.
      - Essa função é responsável por mandar o estado local para o global, mas para isso precisa passar por uma action e depois pelo reducer.
      - A função dentro da chave do objeto vai retornar um dispatch, sendo que esse dispatch é uma outra função e é passado como parâmetro da mapDispatchToProps. E nesse retorno estará a função da action creater como parâmetro da dispatch.
        -Já a action creater recebe como parâmetro o que é passado também como parâmetro da função que é o valor do objeto do retorno da mapDispatchToProps. Tranquilo, nem é confuso.

            - Resumo: mapDispatchToProps função 1, o valor da chave sendEmail é a função 2, dispatch função 3 que recebe como parâmetroa  função action creator. Essa recebe como parâmetro o estado.

- Para chamar essa chave do retorno do objeto da mapDispatchToProps, ou seja, para chamar a sendEmail, transformá-la-emos em uma props.
   -Ela será uma props para ser invocada numa função oriunda de um click, onchange. Nessa invocação, ela poderá capturar uma informação que vem do estado e assim levar para a action, que vai levar para o reducer, que vai levar para o estado global.
   - Para fazer essa conexão entre a mapDispatch e a função que vai capturar uma infomação do estado, usaremos o connect()().No primeiro parênteses passamos a map e no segundo, o componente que vamos conectar o nosso estado local ao estado global.
       - Resumo: Ao fazer a mapDispatchToProps estamos planejando a elevação do estado.
                 Ao chamarmos a sendEmail estamos executando a elevação de estado.

4 - A rota deve ser mudada para '/carteira'
4 - Solução:
- Ao clicar, vamos pegar como props o history que é um array com o 'histórico' de navegação e passaremos para ele o endereço que queremos ir.
*/
