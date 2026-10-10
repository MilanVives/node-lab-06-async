// Lab 06: rewrite these callback functions so they return promises,
// then implement notifyCustomer with async/await.
const customers = {
  1: { id: 1, name: 'Ada Lovelace', isGold: true, email: 'ada@example.com' },
  2: { id: 2, name: 'Alan Turing', isGold: false, email: 'alan@example.com' },
};

// TODO R1: getCustomer(id) should return a Promise instead of taking a callback
function getCustomer(id, callback) {
  setTimeout(() => callback(customers[id]), 4000);
}

// TODO R2: getTopBooks() should return a Promise
function getTopBooks(callback) {
  setTimeout(() => callback(['book1', 'book2']), 4000);
}

// TODO R3: sendEmail(email, books) should return a Promise
function sendEmail(email, books, callback) {
  setTimeout(() => callback(), 4000);
}

// TODO R4 and R5: rewrite with async/await. Return { customer, books, emailSent }.
// Only gold customers get the top books and an email; others get books [] and emailSent false.
function notifyCustomer(id) {
  getCustomer(id, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
      getTopBooks((books) => {
        console.log('Top books: ', books);
        sendEmail(customer.email, books, () => console.log('Email sent...'));
      });
    }
  });
}

if (require.main === module) notifyCustomer(1);

module.exports = { getCustomer, getTopBooks, sendEmail, notifyCustomer };
