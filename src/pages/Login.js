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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  /* aula de resolução de exercício de formulário - 11.2 - Aula colocada no Slack */
  validation = (email) => /\S+@\S+\.\S+/.test(email);

  buttonDisabled = () => {
    const { email, senha } = this.state;
    const number = 6;
    console.log(this.validation(email));
    if (senha.length > number && this.validation(email)) {
      return false;
    }
    /* return senha.length > number && this.validation(email); */
  }

  send = () => {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    sendEmail(email);
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div>
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
        <button
          disabled={ this.buttonDisabled() }
          onClick={ this.send }
          type="button"
        >
          Entrar
        </button>
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
