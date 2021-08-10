import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';

const setup = () => {
  const utils = render(<Input />);

  const components = {
    container: utils.getByLabelText('container'),
    nameHeading: utils.getByLabelText('name-heading'),
    titleHeading: utils.getByLabelText('title-heading'),
    nameInput: utils.getByLabelText('name-input'),
    titleInput: utils.getByLabelText('title-input'),
    btnClear: utils.getByLabelText('clear'),
  };

  return {
    components,
    ...utils,
  };
};

test('It should mount the component', () => {
  const utils = setup();
  const { container } = utils.components;

  expect(container).toBeInTheDocument();
});

test('It should start with default name and title', () => {
  const utils = setup();
  const { nameHeading, titleHeading, nameInput, titleInput } = utils.components;

  expect(nameHeading).toHaveTextContent('Name');
  expect(titleHeading).toHaveTextContent('Title');

  expect(nameInput).toHaveValue('');
  expect(titleInput).toHaveValue('');
});

test('It should update name when name input changes', () => {
  const utils = setup();
  const { nameInput, nameHeading } = utils.components;

  fireEvent.change(nameInput, { target: { value: 'Denis' } });

  expect(nameInput).toHaveValue('Denis');
  expect(nameHeading).toHaveTextContent('Denis');
});

test('It should update title when title input changes', () => {
  const utils = setup();
  const { titleInput, titleHeading } = utils.components;

  fireEvent.change(titleInput, { target: { value: 'Denis' } });

  expect(titleInput).toHaveValue('Denis');
  expect(titleHeading).toHaveTextContent('Denis');
});

test('It should clear name and title', () => {
  const utils = setup();
  const {
    nameHeading,
    titleHeading,
    nameInput,
    titleInput,
    btnClear,
  } = utils.components;

  fireEvent.change(nameInput, { target: { value: 'Denis' } });
  fireEvent.change(titleInput, { target: { value: 'FrontEnd' } });

  expect(nameInput).toHaveValue('Denis');
  expect(titleInput).toHaveValue('FrontEnd');

  expect(nameHeading).toHaveTextContent('Denis');
  expect(titleHeading).toHaveTextContent('FrontEnd');

  fireEvent.click(btnClear);

  expect(nameInput).toHaveValue('');
  expect(titleInput).toHaveValue('');

  expect(nameHeading).toHaveTextContent('Name');
  expect(titleHeading).toHaveTextContent('Title');
});
