// In-memory "database" — resets every time the server restarts.
// A shared counter (nextId) guarantees unique ids as tasks are created.

let tasks = [
  {
    id: 1,
    title: 'Setup project repository',
    description: 'Initialize git repo and folder structure',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Design database schema',
    description: 'Plan tables/collections for future DB integration',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

function getNextId() {
  return nextId++;
}

module.exports = { tasks, getNextId };