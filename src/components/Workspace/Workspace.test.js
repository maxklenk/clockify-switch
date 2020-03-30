import React from 'react';
import { render } from '@testing-library/react';
import Workspace from './Workspace';

test('renders Workspace Header', () => {
  const workspace = {
    name: 'Name'
  };
  const { getByText } = render(<Workspace workspace={workspace}/>);
  const headerElement = getByText(/Name/i);
  expect(headerElement).toBeInTheDocument();
});
