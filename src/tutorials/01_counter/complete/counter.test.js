import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './index';

test('It should mount the component', () => {
  const { container } = render(<Counter />);

  expect(container).toBeInTheDocument();
});

test('It should start from 0', () => {
  const { getByLabelText } = render(<Counter />);

  const count = getByLabelText('count');
  expect(count).toHaveTextContent('0');
});

test('It should increment when increased button is clicked', () => {
  const { getByLabelText } = render(<Counter />);

  const count = getByLabelText('count');
  const decreaseButton = getByLabelText('decrease');

  fireEvent.click(decreaseButton);

  expect(count).toHaveTextContent('1');
});

test('It should decrement when decreased button is clicked', () => {
  const { getByLabelText } = render(<Counter />);

  const count = getByLabelText('count');
  const increseButton = getByLabelText('increase');
  const decreaseButton = getByLabelText('decrease');

  fireEvent.click(decreaseButton);
  fireEvent.click(decreaseButton);
  expect(count).toHaveTextContent('2');
  fireEvent.click(increseButton);
  expect(count).toHaveTextContent('1');
});

test('It should not decrement when count is zero', () => {
  const { getByLabelText } = render(<Counter />);

  const count = getByLabelText('count');
  const increseButton = getByLabelText('increase');

  fireEvent.click(increseButton);
  expect(count).toHaveTextContent('0');
});

test('It should disable the decrease button when count is zero', () => {
  const { getByLabelText } = render(<Counter />);

  const increseButton = getByLabelText('increase');
  const decreaseButton = getByLabelText('decrease');

  expect(increseButton).toBeDisabled();
  fireEvent.click(decreaseButton);
  expect(increseButton).not.toBeDisabled();
  fireEvent.click(increseButton);
  expect(increseButton).toBeDisabled();
});
