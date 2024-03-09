// TaskList.integration.test.js

import React from 'react';
import { render } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList Integration Tests', () => {
  it('renders task list correctly with mock data', () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
      { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' },
    ];

    const { getByText } = render(<TaskList tasks={mockTasks} />);

    // Check if task titles are rendered
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
    expect(getByText('Task 3')).toBeInTheDocument();

    // Check if task statuses are rendered
    expect(getByText('To Do')).toBeInTheDocument();
    expect(getByText('In Progress')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();
  });

  it('renders "No tasks" message when no tasks are provided', () => {
    const { getByText } = render(<TaskList tasks={[]} />);

    // Check if "No tasks" message is rendered
    expect(getByText('No tasks')).toBeInTheDocument();
  });
});
