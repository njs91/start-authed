import { CreateAccountForm } from '../components/account/CreateAccountForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('create account tests', () => {
    let inputs, labels;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
        ];
        labels = document.querySelectorAll('form label');
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render all labels', () => {
        labels.forEach((label) => {
            expect(label).toBeInTheDocument();
        });
    });

    it('should show errors with invalid inputs', async () => {
        const [email, password, confirmPassword] = inputs;

        userEvent.type(email, 'wrong@input');
        userEvent.type(confirmPassword, 'a');
        userEvent.click(password);
        userEvent.click(email);

        const errors = [
            await screen.findByText('Enter a valid email address'),
            await screen.findByText('Enter a password'),
            await screen.findByText('Passwords must match'),
        ];

        errors.forEach((error) => expect(error).toBeInTheDocument());
    });

    // next: create mock with MSW and test form submitting and receiving correct (mocked) response
});
