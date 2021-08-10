import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import Form from './form';

expect.extend(toHaveNoViolations);

test('accessible forms pass axe', async () => {
  const { container } = render(<Form />);
  expect(await axe(container)).toHaveNoViolations();
});