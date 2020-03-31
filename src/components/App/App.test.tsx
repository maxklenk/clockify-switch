import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Clockify Switch Header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Clockify Switch/i);
  expect(headerElement).toBeInTheDocument();
});
