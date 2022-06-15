class Promis {
  Statuses = {
    Pending: 'pending',
    Fulfilled: 'fulfilled',
    Rejected: 'rejected',
  };

  constructor(resolver) {
    this.status = this.Statuses.Pending;
    this.data = null;

    try {
      resolver(
        (data) => this.resolve(data),
        (error) => this.reject(error)
      );
    } catch (error) {
      this.reject(error);
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
  then(onFulfillment, onRejection) {
    if (this.status === this.Statuses.Fulfilled) {
      onFulfillment(this.data);
    }

    if (this.status === this.Statuses.Rejected) {
      onRejection(this.data);
    }
  }

  resolve(data) {
    if (this.status === this.Statuses.Pending) {
      this.status = this.Statuses.Fulfilled;
      this.data = data;
    }
  }

  reject(data) {
    if (this.status === this.Statuses.Pending) {
      this.status = this.Statuses.Rejected;
      this.data = data;
    }
  }
}

/*
  Testing the Promis class.
*/

const getPromis = (condition) =>
  new Promis((resolve, reject) => {
    if (condition) {
      resolve('success');
    } else {
      reject('error');
    }
  });

const promis1 = getPromis(true);

promis1.then(
  (data) => {
    console.log('success', data);
  },
  (error) => {
    console.log('failure', error);
  }
);

const promis2 = getPromis(false);

promis2.then(
  (data) => {
    console.log('success', data);
  },
  (error) => {
    console.log('failure', error);
  }
);

const wait = (ms) =>
  new Promis((resolve, reject) => {
    setTimeout(() => {
      resolve(`done after ${ms}ms`);
    }, ms);
  });

wait(1000).then((data) => {
  console.log(data);
});
