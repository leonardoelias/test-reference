import React from 'react';
import { render } from '@testing-library/react';

import Pizza from './index';

test('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  const { getByText } = render(<Pizza ingredients={ingredients} />);

  for (const ingredient of ingredients) {
    expect(getByText(ingredient)).toBeInTheDocument();
  }
});
