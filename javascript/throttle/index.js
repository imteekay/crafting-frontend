function throttle(fn, time = 3000) {
  let withinFunctionCall = false;

  return (...args) => {
    if (withinFunctionCall) {
      return;
    }

    withinFunctionCall = true;

    setTimeout(() => {
      fn(...args);
      withinFunctionCall = false;
    }, time);
  };
}

function log(text) {
  console.log(text);
}

const throttledLog = throttle(log);

throttledLog('test');
throttledLog('test');
