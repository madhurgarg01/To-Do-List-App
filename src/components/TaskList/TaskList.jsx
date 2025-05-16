// src/components/TaskList/TaskList.jsx
import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { AnimatePresence, motion } from 'framer-motion';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
  if (!tasks.length) {
    return <motion.p
      className={styles.emptyMessage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      No tasks yet. Add one above! ✨
    </motion.p>;
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each child
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Tasks</h2>
      <motion.ul
        className={styles.taskList}
        variants={listVariants}
        initial="hidden"
        animate="visible"
        layout // This helps animate reordering if you implement sorting
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

export default TaskList;    