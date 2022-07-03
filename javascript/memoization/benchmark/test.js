export function getNumbers(limit = 1000000) {
  let numbers = [];

  for (let i = 0; i < limit; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function testSum(label, numbers, callback) {
  console.time(label);
  for (let number of numbers) {
    callback(number, number);
  }
  console.timeEnd(label);
}

export function testFactorial(label, numbers, callback) {
  console.time(label);
  for (let number of numbers) {
    callback(number);
  }
  console.timeEnd(label);
}

export const start = (label) => console.log(`-------- ${label} --------`);
export const end = () => {
  console.log('-------- // --------');
  console.log();
};
