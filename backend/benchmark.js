const URL = "http://localhost:3000/tasks";

async function time(label) {
  const start = performance.now();
  const res = await fetch(URL);
  await res.json();
  const ms = (performance.now() - start).toFixed(2);
  console.log(`${label.padEnd(10)} ${ms} ms  (X-Cache: ${res.headers.get("x-cache")})`);
}

async function clearCache() {
  // A write forces invalidation, so the next GET is a guaranteed MISS
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "benchmark temp task" }), // adjust to your schema
  });
  const t = await r.json();
  await fetch(`${URL}/${t._id}`, { method: "DELETE" });
}

(async () => {
  console.log("--- Without cache (MISS) ---");
  for (let i = 1; i <= 3; i++) {
    await clearCache();
    await time(`Reading ${i}`);
  }
  console.log("--- With cache (HIT) ---");
  for (let i = 1; i <= 3; i++) await time(`Reading ${i}`);
})();