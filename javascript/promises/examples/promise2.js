function job() {
  return new Promise(function (_, reject) {
    reject();
  });
}

job()
  .then(() => {
    console.log('Success 1');
  })
  .then(() => {
    console.log('Success 2');
  })
  .then(() => {
    console.log('Success 3');
  })
  .catch(() => {
    console.log('Error 1');
  })
  .then(() => {
    console.log('Success 4');
  });

/**
  TLDR; logs `Error 1`, `Success 4`

  Promise workflow:
    1. Calls the job function
    2. The job promise rejects
    3. Triggers the `catch`, logs `Error 1`
    4. Triggers the last `then`, logs `Success 4`
**/
