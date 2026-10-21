import { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasksApi';

function Projects() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTasks();
      setTasks(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreate = async (taskData) => {
    setCreating(true);
    setCreateError(null);
    try {
      const result = await createTask(taskData);
      setTasks((prev) => [result.data, ...prev]);
      return true;
    } catch (err) {
      setCreateError(err.message);
      return false;
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id, completed) => {
    const result = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? result.data : t)));
  };

  const handleUpdate = async (id, updates) => {
    const result = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? result.data : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <section className="page-section projects-page">
      <h2>student@portfolio:~$ curl localhost:3000/api/tasks</h2>

      <TaskForm onCreate={handleCreate} creating={creating} createError={createError} />

      {loading && <LoadingSpinner label="fetching tasks..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={loadTasks} />}

      {!loading && !error && tasks.length === 0 && (
        <p className="empty-state">No tasks yet — add one above.</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Projects;
