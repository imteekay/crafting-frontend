function debounce(callback, delay, immediate = false) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    if (immediate && timerId == null) {
      callback.apply(this, args);
    }

    timerId = setTimeout(() => {
      if (!immediate) callback.apply(this, args);
      timerId = null;
    }, delay);
  };
}
