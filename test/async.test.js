const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ex = require('../exercise.js');

let mock;
beforeEach((t) => { mock = t.mock; mock.timers.enable({ apis: ['setTimeout'] }); });
const flush = () => new Promise((resolve) => setImmediate(resolve));
async function advance(ms, times = 1) {
  for (let i = 0; i < times; i++) { mock.timers.tick(ms); await flush(); }
}
function isPromise(value, name) {
  assert.ok(value && typeof value.then === 'function', `${name} should return a Promise (no callback parameter)`);
}

describe('R1: getCustomer returns a promise', () => {
  it('resolves after 4 seconds with the customer', async () => {
    assert.equal(ex.getCustomer.length, 1, 'getCustomer should take only an id, no callback');
    const p = ex.getCustomer(1);
    isPromise(p, 'getCustomer(1)');
    await advance(4000);
    const customer = await p;
    assert.equal(customer.id, 1);
    assert.equal(customer.isGold, true, 'Customer 1 is a gold customer');
  });
});

describe('R2: getTopBooks returns a promise', () => {
  it('resolves after 4 seconds with the top books', async () => {
    assert.equal(ex.getTopBooks.length, 0, 'getTopBooks should take no parameters');
    const p = ex.getTopBooks();
    isPromise(p, 'getTopBooks()');
    await advance(4000);
    assert.deepEqual(await p, ['book1', 'book2']);
  });
});

describe('R3: sendEmail returns a promise', () => {
  it('resolves after 4 seconds', async () => {
    assert.equal(ex.sendEmail.length, 2, 'sendEmail should take (email, books), no callback');
    const p = ex.sendEmail('a@b.c', ['book1']);
    isPromise(p, 'sendEmail()');
    await advance(4000);
    await p;
  });
});

describe('R4: notifyCustomer uses async/await', () => {
  it('gets the customer, the top books and sends the email', async (t) => {
    t.mock.method(console, 'log', () => {});
    const p = ex.notifyCustomer(1);
    isPromise(p, 'notifyCustomer(1)');
    await advance(4000, 3);
    const result = await p;
    assert.equal(result.customer.id, 1);
    assert.deepEqual(result.books, ['book1', 'book2'], 'notifyCustomer should return the top books');
    assert.equal(result.emailSent, true, 'notifyCustomer should return emailSent: true for a gold customer');
  });
  it('is written with async/await, not callbacks or .then()', () => {
    const src = fs.readFileSync('exercise.js', 'utf8');
    assert.match(src, /async function notifyCustomer|notifyCustomer\s*=\s*async/, 'notifyCustomer should be an async function');
    assert.match(src, /await getCustomer/, 'notifyCustomer should await getCustomer');
    assert.doesNotMatch(src, /\.then\(/, 'Use await instead of .then()');
  });
});

describe('R5: notifyCustomer skips customers who are not gold', () => {
  it('does not fetch books or send an email for customer 2', async (t) => {
    t.mock.method(console, 'log', () => {});
    const p = ex.notifyCustomer(2);
    isPromise(p, 'notifyCustomer(2)');
    await advance(4000);
    const result = await p;
    assert.equal(result.customer.isGold, false, 'Customer 2 is not a gold customer');
    assert.deepEqual(result.books, [], 'books should be [] for a customer who is not gold');
    assert.equal(result.emailSent, false, 'emailSent should be false for a customer who is not gold');
  });
});
