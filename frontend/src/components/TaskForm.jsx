import { useState } from 'react';

function TaskForm({ onCreate, creating, createError }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const success = await onCreate({ title: title.trim(), description: description.trim() });
    if (success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={creating}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={creating}
      />
      <button type="submit" disabled={creating}>
        {creating ? 'Adding...' : '[ add task ]'}
      </button>

      {createError && <p className="inline-error">{createError}</p>}
    </form>
  );
}

export default TaskForm;
