import React from 'react';
import { render } from '@testing-library/react';
import Tag from './Tag';

test('renders Tag Name', () => {
  const { getByText } = render(<Tag name={'MyTask'}/>);
  const nameElement = getByText(/MyTask/i);
  expect(nameElement).toBeInTheDocument();
});
