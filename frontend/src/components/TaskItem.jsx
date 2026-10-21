import { useState } from 'react';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const [toggling, setToggling] = useState(false);
  const [toggleError, setToggleError] = useState(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleToggle = async () => {
    setToggling(true);
    setToggleError(null);
    try {
      await onToggle(task._id, !task.completed);
    } catch (err) {
      setToggleError(err.message);
    } finally {
      setToggling(false);
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    setSaving(true);
    setSaveError(null);
    try {
      await onUpdate(task._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete(task._id);
    } catch (err) {
      setDeleteError(err.message);
      setDeleting(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={saving}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={saving}
          />
          <div className="task-actions">
            <button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : '[ save ]'}
            </button>
            <button onClick={() => setIsEditing(false)} disabled={saving}>
              [ cancel ]
            </button>
          </div>
          {saveError && <p className="inline-error">{saveError}</p>}
        </div>
      ) : (
        <>
          <div className="task-main">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              disabled={toggling}
            />
            <div className="task-text">
              <span className="task-title">{task.title}</span>
              {task.description && (
                <span className="task-description">{task.description}</span>
              )}
            </div>
          </div>

          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>[ edit ]</button>
            <button onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : '[ delete ]'}
            </button>
          </div>

          {toggleError && <p className="inline-error">{toggleError}</p>}
          {deleteError && <p className="inline-error">{deleteError}</p>}
        </>
      )}
    </li>
  );
}

export default TaskItem;
