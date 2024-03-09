import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  const handleUpdateStatus = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        status: getNextStatus(id),
      });
      onUpdateStatus(response.data.id, response.data.status);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getNextStatus = (id) => {
    const task = tasks.find((task) => task.id === id);
    switch (task.status) {
      case 'To Do':
        return 'In Progress';
      case 'In Progress':
        return 'Done';
      case 'Done':
        return 'To Do';
      default:
        return '';
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </div>
          <div>
            <button key={`update-${task.id}`} onClick={() => handleUpdateStatus(task.id)}>Update Status</button>
            <button key={`delete-${task.id}`} onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
