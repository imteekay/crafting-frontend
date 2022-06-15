function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve('success');
    } else {
      reject('error');
    }
  });
}

job(true)
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .then((data) => {
    if (data !== 'victory') {
      throw 'Defeat';
    }

    return job(true);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    return job(false);
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((error) => {
    console.log(error);
    return 'Error caught';
  })
  .then((data) => {
    console.log(data);
    return new Error('test');
  })
  .then((data) => {
    console.log('Success:', data.message);
  })
  .catch((data) => {
    console.log('Error:', data.message);
  });

/**
  TLDR; logs `success`, `Defeat`, `error`, `Error caught`, `Success: test`

  Promise workflow:
    1. Calls the job function and passes a `true` value
    2. The job promise resolves returning a `success` data
    3. Triggers the first `then` and logs the `success` data
    4. Calls a new job promise and passes a `true` value
    5. The job promise resolves returning a `success` data
    6. Triggers the second `then`, data is different than 'victory' ('success') and throws the `Defeat` error
    7. Triggers the first `catch`, logs `Defeat` and calls a new job passing a `false` value
    8. Triggers the second `catch`, logs `error` and return string `Error caught`
    9. Triggers the fifth `then`, logs `Error caught`, and return a new Error
    10. Triggers the sixth `then`, logs the `Success: test`
**/
