# Memoization

The API of the memoization function should be like this:

```javascript
const memoizedFn **=** memoize(fn);
```

The function receives a function as an input and returns the memoized function.

In the first function call, it's still "cold", so every function call will be executed and then the output value will be cached for the subsequent calls.

In any subsequent function call, the values are cached, so rather than executing the function body, it'll just return the cached value.

Let's go to the implementation first and then do some benchmarks.

The first thing is that the `memoize` function should receive a function as an input and return the memoized function. Simple steps:

```javascript
function memoize(fn) {
  return fn;
}
```

So now we can just call the `memoize` function passing a new function and it will return the same input function.

```javascript
const fn = (a, b) => a * b;
const memoizedFn = memoize(fn);

memoizedFn(1, 1); // 1 (first call: cold)
memoizedFn(1, 1); // 1 (not memoized: it'll execute the function again)
memoizedFn(1, 2); // 2 (first call: cold)
```

To memoize the function, I will use the `Map` as a cache object. So every time the function is called, we can access the cache object using the arguments as a key and get the output.

The cache object will look like this:

```javascript
const cache = new Map();

cache.set('1', 1);
cache.get('1'); // 1

cache.set('2', 2);
cache.get('2', 2);
```

The key of the cache object will be the arguments of the function and the value will be the output of the function call.

So the algorithm is pretty simple:

- get all the arguments and stringify them to build the key of the cache object
- and verify in the cache if the key exists in it. If it does, return the output value
- if it doesn't: call the function, store the output value in the cache, and return the output value

Now implement each part:

- get the arguments

```javascript
(...args) => {};
```

- stringify the arguments to build the key of the cache object

```javascript
const key = JSON.stringify(args);
```

- verify in the cache if the key exists in it. If it does, return the output value

```javascript
if (cache.has(key)) {
  return cache.get(key);
}
```

- if it doesn't: call the function, store the output value in the cache

```javascript
const result = fn(...args);
cache.set(key, result);
```

The final version:

```javascript
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
```

To do the benchmark and make sure our memoization function works, let's see the example of `sum` and `factorial` functions.

The sum is a pretty simple function and doesn't cost much, so we wouldn't see any significant improvements after caching the function calls.

```javascript
function sum(a, b) {
  return a + b;
}
```

And now calling it:

```javascript
const memoizedSum = memoize(sum);

memoizedSum(1, 1); // 2 (not cached)
memoizedSum(1, 1); // 2 (cached)
```

To do a better comparison and make sure the memoization speed up the function calls, I created two simple helper functions to build the testing case.

```javascript
function getNumbers(limit = 1000000) {
  let numbers = [];

  for (let i = 0; i < limit; i++) {
    numbers.push(i);
  }

  return numbers;
}

function testSum(label, numbers, callback) {
  console.time(label);
  for (let number of numbers) {
    callback(number, number);
  }
  console.timeEnd(label);
}
```

- `getNumbers` is a generator of all the numbers we want to test as inputs for the memoization function.
- `testSum` is a function to test the execution time of a given callback function.

So let's test it:

```javascript
const numbers = getNumbers();
```

Calling the `getNumbers`, we get an array of 1.000.000 numbers.

```javascript
testSum('cold', numbers, memoizedSum);
testSum('cached', numbers, memoizedSum);
```

Calling the `testSum` passing the memoized function:

- cold call
- cached call

Running in my machine (MacBook Pro (13-inch, M1, 2020), Chip Apple M1, Memory 16GB):

```bash
------- sum --------
cold: 495.026ms
cached: 371.011ms
------- // --------
```

As I mentioned earlier, the `sum` function is a simple function therefore its execution doesn't cost that much, so we won't see a lot of performance improvements in the cached version.

But now, let's see the `factorial` function being compared to its memoized version. As it's a somewhat more complex function, we'll probably see the memoized version sped up.

```javascript
function factorial(number) {
  if (number < 0) return -1;
  if (number === 0) return 1;
  return number * factorial(number - 1);
}
```

Without a caching mechanism, we can implement the `factorial` function using the recursion technique.

- if the number if smaller than zero: returns `-1`
- if the number if zero: returns `1`
- otherwise, return the number times the factorial of the `number - 1`

```javascript
const memoizedFactorial = memoize(factorial);
```

And this is the memoized version of the factorial. Let's call it and compare the cold and the cached versions.

Similar to the `testSum` function, I created a `testFactorial` function to handle the testing.

```javascript
function testFactorial(label, numbers, callback) {
  console.time(label);
  for (let number of numbers) {
    callback(number);
  }
  console.timeEnd(label);
}
```

It's very similar to the `testSum` function, the only difference is that the `callback` only receives one parameter.

Running this two times:

```javascript
testFactorial('cold', numbers, memoizedFactorial);
testFactorial('cached', numbers, memoizedFactorial);
```

We get this (running on a MacBook Pro (13-inch, M1, 2020), Chip Apple M1, Memory 16GB machine):

```javascript
------ factorial ------
cold: 572.349ms
cached: 1.919ms
--------- // ---------
```
