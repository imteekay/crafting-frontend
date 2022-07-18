class Promis {
  Statuses = {
    Pending: 'pending',
    Fulfilled: 'fulfilled',
    Rejected: 'rejected',
  };

  constructor(resolver) {
    this.status = this.Statuses.Pending;
    this.data = null;
    this.onFulfillmentCallbacks = [];
    this.onRejectionCallbacks = [];

    try {
      resolver(
        (data) => this.resolve(data),
        (error) => this.reject(error)
      );
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfillment, onRejection) {
    return new Promis((resolve, reject) => {
      if (this.status === this.Statuses.Fulfilled) {
        try {
          const onFulfillmentReturnedData = onFulfillment(this.data);

          if (onFulfillmentReturnedData instanceof Promis) {
            onFulfillmentReturnedData.then(resolve, reject);
          } else {
            resolve(onFulfillmentReturnedData);
          }
        } catch (err) {
          reject(err);
        }
      }

      if (this.status === this.Statuses.Rejected) {
        try {
          const onRejectionReturnedData = onRejection(this.data);

          if (onRejectionReturnedData instanceof Promis) {
            onRejectionReturnedData.then(resolve, reject);
          } else {
            reject(onRejectionReturnedData);
          }
        } catch (err) {
          reject(err);
        }
      }

      if (this.status === this.Statuses.Pending) {
        this.onFulfillmentCallbacks.push(() => {
          try {
            const onFulfillmentReturnedData = onFulfillment(this.data);

            if (onFulfillmentReturnedData instanceof Promis) {
              onFulfillmentReturnedData.then(resolve, reject);
            } else {
              resolve(onFulfillmentReturnedData);
            }
          } catch (err) {
            reject(err);
          }
        });

        this.onRejectionCallbacks.push(() => {
          try {
            const onRejectionReturnedData = onRejection(this.data);

            if (onRejectionReturnedData instanceof Promis) {
              onRejectionReturnedData.then(resolve, reject);
            } else {
              reject(onRejectionReturnedData);
            }
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  }

  resolve(data) {
    if (this.status === this.Statuses.Pending) {
      this.status = this.Statuses.Fulfilled;
      this.data = data;

      this.onFulfillmentCallbacks.forEach((onFulfillment) =>
        onFulfillment(data)
      );
    }
  }

  reject(data) {
    if (this.status === this.Statuses.Pending) {
      this.status = this.Statuses.Rejected;
      this.data = data;

      this.onRejectionCallbacks.forEach((onRejection) => onRejection(data));
    }
  }

  static all() {}
  static allSettled() {}
  static any() {}
  static race() {}
  static reject() {}
  static resolve() {}

  catch() {}
  finally() {}
}

// ============ // ============
// Testing the Promis class.

const getPromis = (condition) =>
  new Promis((resolve, reject) => {
    if (condition) {
      resolve('success');
    } else {
      reject('error');
    }
  });

// ============ // ============
// Promis: resolving a promise
console.log('==== Promis: resolving a promise ====');

const promis1 = getPromis(true);

promis1.then(console.log);

console.log('==== // ====\n');

// ============ // ============
// Promis: rejecting a promise
console.log('==== Promis: rejecting a promise ====');

const promis2 = getPromis(false);

promis2.then(console.log, console.log);

console.log('==== // ====\n');

// ============ // ============
// wait promise-based function
console.log('==== Promis: wait promise-based function ====');

const wait = (ms) =>
  new Promis((resolve) => {
    setTimeout(() => {
      resolve(`done after ${ms}ms`);
    }, ms);
  });

wait(1000).then((data) => {
  console.log(data);
});

// ============ // ============

// Promis: resolving a promise
console.log('==== Promis: chaining .then ====');

const promis3 = getPromis(true);

promis3
  .then((data) => {
    console.log(data);
    return 'another success';
  })
  .then(console.log);

console.log('==== // ====\n');

// ============ // ============

// Promis: resolving a promise
console.log('==== Promis: chaining .then for rejection ====');

const promis4 = getPromis(true);

promis4
  .then((data) => {
    console.log(data);
    throw 'error';
  })
  .then(() => {}, console.log);

console.log('==== // ====\n');

// ============ // ============

// Promis: resolving a promise
console.log('==== Promis: chaining .then for rejection ====');

const promis5 = getPromis(true);

promis5
  .then((data) => {
    console.log(data);
    return wait(1000);
  })
  .then(console.log);

console.log('==== // ====\n');
