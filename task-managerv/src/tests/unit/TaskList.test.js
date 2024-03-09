import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { fireEvent } from '@testing-library/react';

describe('TaskList', () => {
  const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
  ];

  test('renders task list correctly', () => {
    render(<TaskList tasks={tasks} />);
    
    // Assert that the task list is rendered
    const taskListElement = screen.getByTestId('task-list');
    expect(taskListElement).toBeInTheDocument();

    // Assert that the tasks are rendered
    const taskElements = screen.getAllByTestId('task');
    expect(taskElements.length).toBe(tasks.length);
  });

  test('calls onUpdateStatus when task status is updated', () => {
    const onUpdateStatus = jest.fn();
    render(<TaskList tasks={tasks} onUpdateStatus={onUpdateStatus} />);
    
    // Simulate updating task status
    const taskCheckbox = screen.getAllByTestId('task-checkbox')[0];
    fireEvent.click(taskCheckbox);

    // Assert that onUpdateStatus is called with the correct parameters
    expect(onUpdateStatus).toHaveBeenCalledWith(1, true);
  });

  test('calls onDelete when task is deleted', () => {
    const onDelete = jest.fn();
    render(<TaskList tasks={tasks} onDelete={onDelete} />);
    
    // Simulate deleting a task
    const deleteButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(deleteButton);

    // Assert that onDelete is called with the correct parameters
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
