import { memoizedSum } from './sum.js';
import { testSum, getNumbers, start, end } from './test.js';

const numbers = getNumbers();

start('sum');
testSum('cold', numbers, memoizedSum);
testSum('cached', numbers, memoizedSum);
end();

start('sum');
testSum('cold', numbers, memoizedSum);
testSum('cached', numbers, memoizedSum);
end();
