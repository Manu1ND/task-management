import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  test('should call onSubmit with the entered task when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const taskInput = getByLabelText('Task');
    const submitButton = getByText('Submit');
    
    fireEvent.change(taskInput, { target: { value: 'Test task' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('Test task');
  });
});
