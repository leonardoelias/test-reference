import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { clientLogin } from './api';
import userEvent from '@testing-library/user-event';
import Login from './index';

jest.mock('./api.js')

const setup = () => {
  const utils = render(<Login />);
  const components = {
    emailInput: utils.getByLabelText('email-input'),
    passwordInput: utils.getByLabelText('password-input'),
    submitButton: utils.getByLabelText('submit-button'),
    togglePasswordVisibilityButton: utils.getByTestId('show-password-button'),
  };

  return {
    components,
    ...utils,
  };
};

afterEach(() => {
  jest.clearAllMocks()
})

test('Should render the form', () => {
  const utils = setup();
  const { emailInput, passwordInput, submitButton } = utils.components;

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('Should validate email and password on submit', () => {
  const utils = setup();
  const { submitButton } = utils.components;

  userEvent.click(submitButton);
  const emailErrorMessage = utils.getByText('Email é necessario');
  const passwordErrorMessage = utils.getByText('Password é necessario');

  expect(emailErrorMessage).toBeInTheDocument();
  expect(passwordErrorMessage).toBeInTheDocument();
});

test('Should have a valid email on submit', () => {
  const utils = setup();
  const { emailInput, submitButton } = utils.components;

  userEvent.type(emailInput, 'email incorreto');
  userEvent.click(submitButton);
  const emailErrorMessage = utils.getByText('Email incorreto');

  expect(emailErrorMessage).toBeInTheDocument();
});

test('Should toggle the password visibility when the show password button was clicked', () => {
  const utils = setup();
  const { passwordInput, togglePasswordVisibilityButton } = utils.components;

  expect(passwordInput).toHaveAttribute('type', 'password');

  userEvent.click(togglePasswordVisibilityButton);

  expect(passwordInput).toHaveAttribute('type', 'text');

  userEvent.click(togglePasswordVisibilityButton);

  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('Should send the form and receive a token', async () => {
  clientLogin.mockResolvedValueOnce({token: 'jujubinha'})

  const fakeLogin = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  }


  const utils = setup();
  const { emailInput, passwordInput, submitButton } = utils.components;

  userEvent.type(emailInput, fakeLogin.email);
  userEvent.type(passwordInput, fakeLogin.password);

  userEvent.click(submitButton);

  expect(clientLogin).toHaveBeenCalledTimes(1);
  expect(clientLogin).toHaveBeenCalledWith({
    ...fakeLogin
  })

  await waitFor(() => utils.getByText('Token: jujubinha'))
  
  const tokenMessage = utils.getByText('Token: jujubinha');
  expect(tokenMessage).toBeInTheDocument();
});

test('Should send the form and receive a error', async () => {
  clientLogin.mockRejectedValueOnce({ error: 'não é uma jujubinha' })

  const fakeLogin = {
    email: 'leonardo.elias4@gmail.com',
    password: 'cityslicka',
  }

  const utils = setup();
  const { emailInput, passwordInput, submitButton } = utils.components;

  userEvent.type(emailInput, fakeLogin.email);
  userEvent.type(passwordInput, fakeLogin.password);

  userEvent.click(submitButton);
  expect(submitButton).toBeDisabled();

  await waitFor(() => utils.getByText('não é uma jujubinha'))
  
  const errorMessage = utils.getByText('não é uma jujubinha');
  expect(errorMessage).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});