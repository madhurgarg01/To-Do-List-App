// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css'; // Global app styles
import { motion } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [searchTerm, setSearchTerm] = useState(''); // For future search
  const [filterPriority, setFilterPriority] = useState('All'); // For future filter

  const addTask = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]); // Add new tasks to the beginning
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Placeholder for filtered tasks - you'll expand this
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });


  return (
    <motion.div
      className="appContainer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="appHeader">
        <h1>🚀 Task Manager Pro</h1>
      </header>

      <TaskForm onAddTask={addTask} />

      <section className="controlsSection">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search tasks"
        />
        <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            aria-label="Filter by priority"
        >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
      </section>

      <div className="mainContent">
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />

        {/* Placeholder for Dashboard */}
        <motion.div
          className="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Dashboard Area</h3>
          <p>Task completion stats will go here.</p>
          <p>Currently showing {filteredTasks.filter(t => t.completed).length} completed out of {filteredTasks.length} tasks.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;