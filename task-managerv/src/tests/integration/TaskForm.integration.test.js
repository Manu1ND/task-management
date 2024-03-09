// Example integration test for TaskForm component
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

test('submits form data correctly', () => {
  const onSubmit = jest.fn();
  const { getByText, getByPlaceholderText } = render(<TaskForm onSubmit={onSubmit} />);

  // Simulate user input
  fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Task Title' } });
  fireEvent.change(getByPlaceholderText('Description'), { target: { value: 'Task Description' } });
  fireEvent.change(getByPlaceholderText('Select Status'), { target: { value: 'To Do' } });

  // Simulate form submission
  fireEvent.click(getByText('Add Task'));

  // Check if onSubmit function is called with correct data
  expect(onSubmit).toHaveBeenCalledWith({
    title: 'Task Title',
    description: 'Task Description',
    status: 'To Do'
  });
});
