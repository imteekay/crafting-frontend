export function getNumbers(limit = 1000000) {
  let numbers = [];

  for (let i = 0; i < limit; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function testSum(label, numbers, callback) {
  console.time(label);
  for (let index = 0; index < numbers.length; index++) {
    callback(numbers[index], numbers[index]);
  }
  console.timeEnd(label);
}

export function testFactorial(label, numbers, callback) {
  console.time(label);
  for (let index = 0; index < numbers.length; index++) {
    callback(numbers[index]);
  }
  console.timeEnd(label);
}

export const start = (label) => console.log(`-------- ${label} --------`);
export const end = () => {
  console.log('-------- // --------');
  console.log();
};
