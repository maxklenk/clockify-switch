import React from 'react';
import { render } from '@testing-library/react';
import Task from './Task';

test('renders Task Name', () => {
  const { getByText } = render(<Task name={'MyTask'}/>);
  const nameElement = getByText(/MyTask/i);
  expect(nameElement).toBeInTheDocument();
});
