import { memoizedSum } from './sum.js';
import { test, getNumbers } from './test.js';

const numbers = getNumbers();

console.log('-------- sum --------');

console.time('cold');
test(numbers, memoizedSum);
console.timeEnd('cold');

console.time('cached');
test(numbers, memoizedSum);
console.timeEnd('cached');

console.log('-------- // --------');
console.log();

console.log('-------- sum --------');

console.time('cold');
test(numbers, memoizedSum);
console.timeEnd('cold');

console.time('cached');
test(numbers, memoizedSum);
console.timeEnd('cached');

console.log('-------- // --------');
console.log();
