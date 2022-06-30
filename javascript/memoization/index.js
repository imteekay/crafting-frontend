function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

function sum(a, b) {
  return a + b;
}

const memoizedSum = memoize(sum);

let result;

result = memoizedSum(1, 1); // 2
console.log(result);

result = memoizedSum(1, 1); // 2
console.log(result);
