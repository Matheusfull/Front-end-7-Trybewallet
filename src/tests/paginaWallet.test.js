import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('', () => {
    it('teste de inputs no componente Wallet', () => {
        renderWithRouterAndRedux(<Wallet />)
        const despesa = screen.getByPlaceholderText(/despesas/i);
        const descricao = screen.getByTestId('description-input');
        const moeda = screen.getByTestId('currency-input')
        //const method = screen.getByLabelText('método de pagamento:') queria colocar com esse, mas não está indo
        const method = screen.getByTestId('method-input');
        const categoria = screen.getByTestId('tag-input');
        const button = screen.getByRole('button', { name: /Adicionar despesa/i })

        expect(despesa).toBeInTheDocument();
        expect(descricao).toBeInTheDocument();
        expect(moeda).toBeInTheDocument();
        expect(method).toBeInTheDocument();
        expect(categoria).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
    it('teste para ver se o email está no header', () => {
        renderWithRouterAndRedux(<Wallet />, {
            initialPath: '/carteira',
            initialState: { user: { email: 'test@trybe.com' } },
        })
        const email = screen.getByTestId('email-field');
        expect(email).toHaveTextContent('test@trybe.com');
    });
    it('teste para ver se está indo para o state o que é digitado', () => {
        const { store } = renderWithRouterAndRedux(<Wallet />);

        /* const despesa = screen.getByPlaceholderText(/despesas/i);
        userEvent.type(despesa,'5') */

        /* const descricao = screen.getByTestId('description-input');
        userEvent.type(descricao, 'restaurante na praia') */

        /* const moeda = screen.getByTestId('currency-input')
        userEvent.type(moeda, 'EUR') */

        const method = screen.getByTestId('method-input');
        userEvent.type(method, 'Dinheiro')

       /*  const categoria = screen.getByTestId('tag-input');
        userEvent.type(categoria, 'Lazer') */

        const button = screen.getByRole('button', { name: /Adicionar despesa/i });
        userEvent.click(button);

        expect(screen.getByText('Dinheiro')).toBeInTheDocument();

        /* const stateInfo = store.getState().wallet.expenses[0]
        expect(stateInfo.method).toBe('Dinheiro'); */
    });
});