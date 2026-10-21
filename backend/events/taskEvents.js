const EventEmitter = require("events");

class TaskEmitter extends EventEmitter {}
const taskEmitter = new TaskEmitter();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulates slow background work (sending an email, push notification, etc.)
async function sendNotification(task, mode = "ASYNC") {
  console.log(`[${mode}] Handler STARTED   at ${new Date().toISOString()}`);

  await sleep(3000); // pretend this takes 3 seconds

  console.log("----- NOTIFICATION -----");
  console.log(`Task title    : ${task.title}`);
  console.log(`Assigned user : ${task.assignedTo || "Unassigned"}`);
  console.log(`Timestamp     : ${new Date().toISOString()}`);
  console.log("------------------------");
  console.log(`[${mode}] Handler FINISHED  at ${new Date().toISOString()}`);
}

// Listener: setImmediate defers the work until after the current request
// finishes, so the response is never blocked.
taskEmitter.on("task-created", (task) => {
  setImmediate(() => {
    sendNotification(task, "ASYNC").catch((err) =>
      console.error("Notification failed:", err.message)
    );
  });
});

module.exports = { taskEmitter, sendNotification };