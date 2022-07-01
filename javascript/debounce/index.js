function debounce(fn, timeout = 3000) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}

function log(text) {
  console.log(text);
}

const debouncedLog = debounce(log);
