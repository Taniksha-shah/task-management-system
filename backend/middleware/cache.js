const NodeCache = require("node-cache");

// stdTTL = 60 seconds, checkperiod = purge expired keys every 120s
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const TASKS_KEY = "all_tasks";

// Middleware for GET /tasks
const cacheTasks = (req, res, next) => {
  const cached = cache.get(TASKS_KEY);
  if (cached) {
    res.set("X-Cache", "HIT");
    return res.json(cached);
  }

  // Intercept res.json to store the response before sending it
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode === 200) cache.set(TASKS_KEY, body);
    res.set("X-Cache", "MISS");
    return originalJson(body);
  };
  next();
};

// Call this on POST / PUT / DELETE
const invalidateTasks = (req, res, next) => {
  res.on("finish", () => {
    // Only clear if the write succeeded
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.del(TASKS_KEY);
      console.log("Cache invalidated");
    }
  });
  next();
};

module.exports = { cache, cacheTasks, invalidateTasks, TASKS_KEY };