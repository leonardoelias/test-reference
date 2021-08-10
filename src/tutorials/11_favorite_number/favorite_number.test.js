import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import FavoriteNumber from './index';

test('It should FavoriteNumber', async () => {
  const { getByTestId, getByRole, queryByRole, rerender } = render(
    <FavoriteNumber />
  );

  const input = getByTestId('content-input');

  fireEvent.change(input, { target: { value: 10 } });

  expect(getByRole('alert')).toHaveTextContent(/number is invalid/);

  rerender(<FavoriteNumber max={20} />);

  expect(queryByRole('alert')).toBeNull();
});
