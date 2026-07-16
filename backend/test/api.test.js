const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;

function startServer() {
  return new Promise((resolve) => {
    server = app.listen(0, () => resolve(server.address().port));
  });
}

test('GET /api/status returns the expected contract', async () => {
  const port = await startServer();
  const response = await fetch(`http://127.0.0.1:${port}/api/status`);
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.status, 'online');
  assert.equal(payload.service, 'DevOps Platform API');
  assert.equal(payload.version, '1.0.0');

  await new Promise((resolve) => server.close(resolve));
});

test('GET /api/health returns the expected contract', async () => {
  const port = await startServer();
  const response = await fetch(`http://127.0.0.1:${port}/api/health`);
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.status, 'healthy');
  assert.ok(typeof payload.uptime === 'number');
  assert.ok(typeof payload.timestamp === 'string');

  await new Promise((resolve) => server.close(resolve));
});
