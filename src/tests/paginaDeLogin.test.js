import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('Teste da página de lógin', () => {
  it('teste de existências de inputs e botão', () => {
    renderWithRouterAndRedux(<App />)
    const email = screen.getByLabelText(/Email:/i)
    const senha = screen.getByLabelText(/Senha:/i)
    const botao = screen.getByRole('button')

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
    expect(botao).toHaveTextContent('Entrar');
  });

  it('ver se os campos são digitáveis', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText(/Email:/i);
    userEvent.type(email, 'teste@email.com');
    expect(email).toHaveValue('teste@email.com');

  });

  it('ver se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const botao = screen.getByRole('button', { name: /entrar/i  } )
    expect(botao.disabled).toBe(true)

  });
  it('ver se o botão redireciona para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText(/Email:/i)
    const senha = screen.getByLabelText(/Senha:/i)
    const botao = screen.getByRole('button')
    
    userEvent.type(email, 'teste@trybe.com')
    userEvent.type(senha, 'senhaforte')
    userEvent.click(botao)

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira')
  });

  it('ver se o email foi salvo na store', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText(/Email:/i)
    const senha = screen.getByLabelText(/Senha:/i)
    const botao = screen.getByRole('button')
    
    userEvent.type(email, 'teste@trybe.com')
    userEvent.type(senha, 'senhaforte')
    userEvent.click(botao)

    const emailDaStore = store.getState().user.email;
    expect(emailDaStore).toBe('teste@trybe.com');
  });
});

/*
1:
a - ver a existência dos inputs e botão
b - ver se são digitáveis
c - ver se o botão está desabilitado
d - clicar e ver se foi redirecionado
e - ver se o email foi para o redux

*/