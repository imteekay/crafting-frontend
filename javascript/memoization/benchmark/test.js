export function getNumbers() {
  let numbers = [];

  for (let i = 0; i < 1000000; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function test(numbers, callback) {
  for (let index = 0; index < numbers.length; index++) {
    callback(numbers[index], numbers[index]);
  }
}
