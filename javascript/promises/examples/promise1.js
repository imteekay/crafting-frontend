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
    return job(false);
  })
  .catch((error) => {
    console.log(error);
    return 'Error caught';
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((error) => {
    console.log(error);
  });

/**
  TLDR; logs `success`, `error`, `Error caught`

  Promise workflow:
    1. Calls the job function and passes a `true` value
    2. The job promise resolves returning a `success` data
    3. Triggers the first `then` and logs the `success` data
    4. Calls a new job promise and passes a `false` value
    5. The job promise rejects returning an `error` data
    6. Triggers the first `catch`, logs `error`, and return `Error caught`
    7. Triggers the second `then`, logs `Error caught` and calls a new job
    8. The job promise resolves returning a `success` data
**/
