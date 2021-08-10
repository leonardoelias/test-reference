import React from 'react';
import { render, fireEvent, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 as uuid } from 'uuid';

import Todo from './index';

const initialState = [
  { id: uuid(), task: 'Ler doc. Vue', isDone: false },
  { id: uuid(), task: 'Ir ao mercado e comprar frutas', isDone: true },
  { id: uuid(), task: 'Ouvir uma boa música', isDone: true },
  { id: uuid(), task: 'Reunião as 14hrs', isDone: false },
];

test('It should display todo list', () => {
  render(<Todo initialTodos={initialState} />);
});

test('It should add an item to todo list', () => {
  const { getByRole, getAllByTestId } = render(
    <Todo initialTodos={initialState} />
  );

  const options = getAllByTestId('listitem');

  expect(options).toHaveLength(4);

  const textBox = getByRole('textbox');
  const addButton = getByRole('button', { name: /add/i });

  fireEvent.change(textBox, { target: { value: 'Comprar Bananas' } });
  fireEvent.click(addButton);

  const newOptions = getAllByTestId('listitem');
  expect(newOptions).toHaveLength(5);

  expect(newOptions[4]).toHaveTextContent('Comprar Bananas');
});

test('It should remove an item from todo list', () => {
  const { getAllByTestId, getByRole } = render(
    <Todo initialTodos={initialState} />
  );
  const indexFromList = 1;

  const list = getByRole('list');
  const listItem = within(list).getAllByTestId('listitem');

  let options = listItem;
  const textItemRemoved = options[indexFromList].textContent;
  const textItemAfterOfRemoved = options[indexFromList + 1].textContent;
  expect(options).toHaveLength(4);

  const removeButton = within(list).getAllByRole('button', { name: /delete/i });
  fireEvent.click(removeButton[indexFromList]);

  options = getAllByTestId('listitem');
  expect(options[indexFromList]).not.toHaveTextContent(textItemRemoved);
  expect(options[indexFromList]).toHaveTextContent(textItemAfterOfRemoved);
  expect(options).toHaveLength(3);
});

test('It should remove all completed items from todo list when Limpar Completos button clicked', () => {
  const { getByRole, queryAllByRole } = render(
    <Todo initialTodos={initialState} />
  );
  const buttonLimparCompletos = getByRole('button', {
    name: /limpar completos/i,
  });
  let allItems = queryAllByRole('checkbox');
  let checkedItems = allItems.filter((item) => {
    return item.checked;
  });
  const countNoCheckedItems = allItems.length - checkedItems.length;

  fireEvent.click(buttonLimparCompletos);

  allItems = queryAllByRole('checkbox');

  checkedItems = allItems.filter((item) => {
    return item.checked;
  });

  const newCountNoCheckedItems = allItems.length - checkedItems.length;

  expect(checkedItems).toHaveLength(0);
  expect(countNoCheckedItems).toBe(newCountNoCheckedItems);
});

test('It should show only the completes when click on the completes tab', () => {
  const { getByRole, queryAllByRole } = render(
    <Todo initialTodos={initialState} />
  );

  const tabComplete = getByRole('tab', { name: 'completo' });

  fireEvent.click(tabComplete);

  const allItems = queryAllByRole('checkbox');
  const nonCheckedItems = allItems.filter((item) => item.checked === false);

  expect(nonCheckedItems).toHaveLength(0);
});

test('It should show only the incompletes when click on the incompletes tab', () => {
  const { getByRole, queryAllByRole } = render(
    <Todo initialTodos={initialState} />
  );

  const tabComplete = getByRole('tab', { name: 'incompleto' });

  fireEvent.click(tabComplete);

  const allItems = queryAllByRole('checkbox');
  const checkedItems = allItems.filter((item) => item.checked === true);

  expect(checkedItems).toHaveLength(0);
});

test('It should toggle check item', () => {
  const { getAllByRole } = render(<Todo initialTodos={initialState} />);
  const indexItemFromList = 0;

  const checkboxList = getAllByRole('checkbox');
  fireEvent.click(checkboxList[indexItemFromList]);

  const checkedItem = checkboxList[indexItemFromList];
  expect(checkedItem).toBeChecked();

  fireEvent.click(checkboxList[indexItemFromList]);

  expect(checkedItem).not.toBeChecked();
});

test('It should unchecked one checked item', () => {
  const { getAllByRole } = render(<Todo initialTodos={initialState} />);
  const indexItemFromList = 1;

  const checkboxList = getAllByRole('checkbox');
  fireEvent.click(checkboxList[indexItemFromList]);

  const checkedItem = checkboxList[indexItemFromList];
  expect(checkedItem).not.toBeChecked();
});

test('It should not include empty item', () => {
  const { getByRole, getAllByTestId } = render(
    <Todo initialTodos={initialState} />
  );

  const textBox = getByRole('textbox');
  const addButton = getByRole('button', { name: /add/i });

  userEvent.type(textBox, ' ');
  userEvent.click(addButton);

  const listItems = getAllByTestId('listitem');
  expect(listItems).not.toHaveLength(5);
});
