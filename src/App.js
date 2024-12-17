import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/Tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const toggleTaskStatus = (id) => {
    fetch(`http://localhost:5000/api/Tasks/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
      })
      .catch((error) => console.error('Error updating task status:', error));
  };

  const filterTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <h2>All Tasks</h2>
      <div>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
            <button onClick={() => toggleTaskStatus(task.id)}>
              Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
          </li>
        ))}
      </div>
      <h2>Pending Tasks</h2>
      <div>
        {filterTasks('pending').map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </div>
      <h2>Completed Tasks</h2>
      <div>
        {filterTasks('completed').map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </div>
    </div>
  );
}

export default App;