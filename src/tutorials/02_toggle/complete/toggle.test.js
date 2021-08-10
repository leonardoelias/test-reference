import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Toggle from './index';

test('It should mount the component', () => {
  const { container } = render(<Toggle />);

  expect(container).toBeInTheDocument();
});

test('It should start from toggled off', () => {
  const { getByLabelText } = render(<Toggle />);

  const lampada = getByLabelText('lampada');
  const label = getByLabelText('label');

  expect(lampada).not.toBeChecked();
  expect(label).toHaveTextContent('OFF');
});

test('It should toggle from off to on', () => {
  const { getByLabelText } = render(<Toggle />);

  const lampada = getByLabelText('lampada');
  const label = getByLabelText('label');

  fireEvent.click(lampada)

  expect(lampada).toBeChecked()
  expect(label).toHaveTextContent('ON')
});

test('It should toggle from on to off', () => {
  const { getByLabelText } = render(<Toggle />);

  const lampada = getByLabelText('lampada');
  const label = getByLabelText('label');

  fireEvent.click(lampada)
  fireEvent.click(lampada)

  expect(lampada).not.toBeChecked()
  expect(label).toHaveTextContent('OFF')
})
