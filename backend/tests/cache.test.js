const { cache, cacheTasks, invalidateTasks, TASKS_KEY } = require("../middleware/cache");

// Minimal fake Express response object
function mockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    set(key, value) {
      this.headers[key] = value;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    on(event, callback) {
      if (event === "finish") this.finish = callback;
    },
  };
}

beforeEach(() => cache.flushAll());
afterAll(() => cache.close());

describe("GET /tasks caching", () => {
  test("first request is a cache MISS and the response gets stored", () => {
    const res = mockRes();
    const next = jest.fn();

    cacheTasks({}, res, next);
    expect(next).toHaveBeenCalled(); // goes on to the database handler

    res.json([{ title: "Task A" }]); // route handler sends its response
    expect(res.headers["X-Cache"]).toBe("MISS");
    expect(cache.get(TASKS_KEY)).toEqual([{ title: "Task A" }]);
  });

  test("second request is a cache HIT and skips the database", () => {
    cache.set(TASKS_KEY, [{ title: "Task A" }]);
    const res = mockRes();
    const next = jest.fn();

    cacheTasks({}, res, next);

    expect(res.headers["X-Cache"]).toBe("MISS");
    expect(res.body).toEqual([{ title: "Task A" }]);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("cache invalidation on writes", () => {
  test("a successful write clears the cache", () => {
    cache.set(TASKS_KEY, [{ title: "Task A" }]);
    const res = mockRes();
    res.statusCode = 201;

    invalidateTasks({}, res, jest.fn());
    res.finish(); // simulate the response finishing

    expect(cache.get(TASKS_KEY)).toBeUndefined();
  });

  test("a failed write keeps the cache", () => {
    cache.set(TASKS_KEY, [{ title: "Task A" }]);
    const res = mockRes();
    res.statusCode = 400;

    invalidateTasks({}, res, jest.fn());
    res.finish();

    expect(cache.get(TASKS_KEY)).toEqual([{ title: "Task A" }]);
  });
});
