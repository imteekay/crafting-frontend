const resolveBody = () => {
  const body = document.querySelector('body');
  body.innerHTML = 'Resolved!';
};

const callback = (resolve) => {
  document.addEventListener('readystatechange', function () {
    if (document.readyState != 'loading') {
      resolve();
    }
  });
};

const ready = () => new Promise(callback);

ready().then(resolveBody);
