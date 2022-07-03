import { memoizedSum } from './sum.js';
import { memoizedFactorial } from './factorial.js';
import { testSum, testFactorial, getNumbers, start, end } from './test.js';

let numbers = getNumbers();

start('sum');
testSum('cold', numbers, memoizedSum);
testSum('cached', numbers, memoizedSum);
end();

numbers = getNumbers(10000);

start('factorial');
testFactorial('cold', numbers, memoizedFactorial);
testFactorial('cached', numbers, memoizedFactorial);
end();
