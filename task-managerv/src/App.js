// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterDropdown from './components/FilterDropdown';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmitTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateStatus = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      const nextStatus = getNextStatus(taskToUpdate.status);
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: nextStatus,
      });
      const updatedTask = { ...taskToUpdate, status: response.data.status };
      const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To Do':
        return 'In Progress';
      case 'In Progress':
        return 'Done';
      case 'Done':
        return 'To Do';
      default:
        return currentStatus;
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm onTaskSubmit={handleSubmitTask} />
      <FilterDropdown value={filter} onChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default App;
