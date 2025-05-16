// src/components/TaskItem/TaskItem.jsx
import React from 'react';
import styles from './TaskItem.module.css';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onToggleComplete, onDeleteTask }) => {
  const priorityClass = () => {
    switch (task.priority) {
      case 'High': return styles.priorityHigh;
      case 'Medium': return styles.priorityMedium;
      case 'Low': return styles.priorityLow;
      default: return '';
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''} ${priorityClass()}`}
      variants={itemVariants}
      layout // Animates layout changes smoothly
    >
      <div className={styles.taskContent} onClick={() => onToggleComplete(task.id)}>
        <div className={styles.taskName}>{task.name}</div>
        {task.description && <div className={styles.taskDescription}>{task.description}</div>}
        <div className={styles.taskMeta}>
          <span>Priority: {task.priority}</span>
          {task.deadline && <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>}
        </div>
      </div>
      <div className={styles.taskActions}>
        <motion.button
          onClick={() => onToggleComplete(task.id)}
          title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          className={styles.completeButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.completed ? '↩️' : '✔️'}
        </motion.button>
        <motion.button
          onClick={() => onDeleteTask(task.id)}
          title="Delete Task"
          className={styles.deleteButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🗑️
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TaskItem;