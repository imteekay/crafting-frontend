import { memoize } from '../index.js';

export function factorial(number) {
  if (number < 0) return -1;
  if (number === 0) return 1;
  return number * factorial(number - 1);
}

export const memoizedFactorial = memoize(factorial);
