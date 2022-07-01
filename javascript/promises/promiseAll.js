function promiseAll(promises) {
  let result = [];
  let promisesCount = 0;

  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      promise
        .then((data) => {
          result.push(data);
          promisesCount++;

          if (promisesCount === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

let promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises).then(console.log); // [1, 2, 3]

promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject('Error'),
  Promise.resolve(3),
  Promise.resolve(4),
];

promiseAll(promises).catch(console.log); // Error

const asyncPromise = new Promise((resolve) => {
  setTimeout(() => resolve(4), 100);
});

promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  asyncPromise,
];

promiseAll(promises).then(console.log); // [1, 2, 3, 4]
