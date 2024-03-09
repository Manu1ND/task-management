import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !status.trim()) {
      console.error('Title and status are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        status,
        id: Math.floor(Math.random() * 1000)
      });
      onTaskSubmit(response.data);
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
