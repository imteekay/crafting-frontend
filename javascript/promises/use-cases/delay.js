const callback = () => {
  console.log(2);
  console.log(3);
};

console.log(1);

const delay = (time) => {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number'));
    }

    setTimeout(resolve, time);
  });
};

delay(1000)
  .then(callback)
  .catch((err) => console.error(err));

delay('not a number')
  .then(callback)
  .catch((err) => console.error(err));
