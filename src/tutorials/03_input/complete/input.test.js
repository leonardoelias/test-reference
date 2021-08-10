import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Input from './index';

const setup = () => {
  const utils = render(<Input />);

  const components = {
    container: utils.getByLabelText('container'),
    clearButton: utils.getByLabelText('clear'),
    nameHeading: utils.getByLabelText('name-heading'),
    titleHeading: utils.getByLabelText('title-heading'),
    nameInput: utils.getByLabelText('name-input'),
    titleInput: utils.getByLabelText('title-input'),
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

  fireEvent.change(nameInput, { target: { value: 'Leonardo' } });

  expect(nameInput).toHaveValue('Leonardo');
  expect(nameHeading).toHaveTextContent('Leonardo');
});

test('It should update title when title input changes', () => {
  const utils = setup();
  const { titleHeading, titleInput } = utils.components;
  fireEvent.change(titleInput, { target: { value: 'Leonardo' } });

  expect(titleInput).toHaveValue('Leonardo');
  expect(titleHeading).toHaveTextContent('Leonardo');
});

test('It should clear name and title', () => {
  const utils = setup()
  const {
    clearButton,
    nameHeading,
    nameInput,
    titleHeading,
    titleInput
  } = utils.components

  fireEvent.change(nameInput, {target: {value: "Leonardo"}})
  fireEvent.change(titleInput, {target: {value: "FrontEnd"}})

  expect(nameInput).toHaveValue('Leonardo')
  expect(titleInput).toHaveValue('FrontEnd')
  expect(nameHeading).toHaveTextContent('Leonardo')
  expect(titleHeading).toHaveTextContent('FrontEnd')

  fireEvent.click(clearButton)

  expect(nameInput).toHaveValue('')
  expect(titleInput).toHaveValue('')
  expect(nameHeading).toHaveTextContent('Name')
  expect(titleHeading).toHaveTextContent('Title')
})
