import { memoizedSum } from './sum.js';
import { memoizedFactorial } from './factorial.js';
import { testSum, getNumbers, start, end } from './test.js';

let numbers = getNumbers();

start('sum');
testSum('cold', numbers, memoizedSum);
testSum('cached', numbers, memoizedSum);
end();

numbers = getNumbers(10000);

start('factorial');
testSum('cold', numbers, memoizedFactorial);
testSum('cached', numbers, memoizedFactorial);
end();
