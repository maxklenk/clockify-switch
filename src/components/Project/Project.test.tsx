import React from 'react';
import {render} from '@testing-library/react';
import Project from './Project';

test('renders Project Header', () => {
    const project = {
        name: 'Name'
    };
    const workspace = {};
    const noop = () => {
    };
    const {getByText} = render(
        <Project
            project={project}
            runningEntry={null} setTag={noop}
            startTask={noop}
            stopTask={noop}
            typeTaskDescription={noop}
            updateTaskDescription={noop}
            workspace={workspace}
        />
    );
    const nameElement = getByText(/Name/i);
    expect(nameElement).toBeInTheDocument();
});
