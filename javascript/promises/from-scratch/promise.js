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
    if (this.status === this.Statuses.Fulfilled) {
      onFulfillment(this.data);
    }

    if (this.status === this.Statuses.Rejected) {
      onRejection(this.data);
    }

    if (this.status === this.Statuses.Pending) {
      this.onFulfillmentCallbacks.push(onFulfillment);
      this.onRejectionCallbacks.push(onRejection);
    }
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

const promis1 = getPromis(true);

promis1.then(
  (data) => {
    console.log('success', data);
  },
  (error) => {
    console.log('failure', error);
  }
);

// ============ // ============
// Promis: rejecting a promise

const promis2 = getPromis(false);

promis2.then(
  (data) => {
    console.log('success', data);
  },
  (error) => {
    console.log('failure', error);
  }
);

// ============ // ============
// wait based-promise function

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
// Promis: .all

// Promis.all(prom);
