import React from 'react';
import { render } from '@testing-library/react';
import Project from './Project';

test('renders Project Header', () => {
  const project = {
    name: 'Name'
  };
  const { getByText } = render(<Project project={project} />);
  const nameElement = getByText(/Name/i);
  expect(nameElement).toBeInTheDocument();
});
