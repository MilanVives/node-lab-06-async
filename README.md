# Lab 06: Asynchronous JavaScript

Rewrite callback-based code with promises and async/await.

## Getting started

```bash
npm install
npm test
npm start          # runs notifyCustomer(1): takes about 12 seconds
```

`npm test` runs the same checks as the autograder (the tests fake the timers, so they run instantly). Run a single requirement with `npm test -- --test-name-pattern="^R1:"`.

All code is in `exercise.js`. Every function waits 4 seconds with `setTimeout` to simulate a slow database or mail server. Keep the 4-second delays.

## Requirements

### R1: getCustomer returns a promise
**2 points**

`getCustomer(id)` takes only the id and returns a `Promise` that resolves with `customers[id]` after 4 seconds: `return new Promise((resolve) => setTimeout(() => resolve(...), 4000))`.

### R2: getTopBooks returns a promise
**2 points**

`getTopBooks()` takes no parameters and returns a `Promise` that resolves with `['book1', 'book2']` after 4 seconds.

### R3: sendEmail returns a promise
**2 points**

`sendEmail(email, books)` returns a `Promise` that resolves after 4 seconds.

### R4: notifyCustomer uses async/await
**3 points**

Make `notifyCustomer(id)` an `async function`. It awaits `getCustomer`, then `getTopBooks`, then `sendEmail`, and returns `{ customer, books, emailSent: true }`. Use `await`, not `.then()` and no callbacks.

### R5: notifyCustomer skips customers who are not gold
**1 point**

When the customer is not gold (`isGold: false`, customer 2), do not fetch books or send an email: return `{ customer, books: [], emailSent: false }`.

## Submitting

Commit your work and run `npm run submit`. Your score and feedback appear under **Releases** after a few minutes. You can submit as often as you like; the latest submission counts.
