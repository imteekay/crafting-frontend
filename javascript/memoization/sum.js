import { memoize } from './index.js';

export function sum(a, b) {
  return a + b;
}

export const memoizedSum = memoize(sum);
