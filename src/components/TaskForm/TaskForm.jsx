// src/components/TaskForm/TaskForm.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './TaskForm.module.css';
import { motion } from 'framer-motion';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState(''); // Optional description

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert('Task name cannot be empty!');
      return;
    }
    const newTask = {
      id: uuidv4(),
      name: taskName.trim(),
      priority,
      deadline,
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    onAddTask(newTask);
    setTaskName('');
    setPriority('Medium');
    setDeadline('');
    setDescription('');
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.form
      className={styles.taskForm}
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Add New Task</h2>
      <div className={styles.formGroup}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="e.g., Finish project report"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description (Optional):</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about the task"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
    </motion.form>
  );
};

export default TaskForm;