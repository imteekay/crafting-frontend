const Types = {
  string: 'string',
  boolean: 'boolean',
  number: 'number',
  array: 'array',
  object: 'object',
};

const primitives = [Types.string, Types.boolean, Types.number];

function getType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (primitives.includes(typeof value)) {
    return typeof value;
  }

  return 'object';
}

function deepEqual(valueOne, valueTwo) {
  const valueOneType = getType(valueOne);
  const valueTwoType = getType(valueTwo);

  if (valueOneType !== valueTwoType) {
    return false;
  }

  if (primitives.includes(valueOneType)) {
    return valueOne === valueTwo;
  }

  if (valueOneType === Types.array) {
    // handle array

    if (valueOne.length !== valueTwo.length) {
      return false;
    }

    let isDeepEqual = true;

    for (let index = 0; index < valueOne.length; index++) {
      if (!deepEqual(valueOne[index], valueTwo[index])) {
        isDeepEqual = false;
        break;
      }
    }

    return isDeepEqual;
  }

  let isDeepEqual = true;

  for (let key of Object.keys(valueOne)) {
    if (!valueTwo[key]) {
      isDeepEqual = false;
      break;
    }

    if (!deepEqual(valueOne[key], valueTwo[key])) {
      isDeepEqual = false;
      break;
    }
  }

  for (let key of Object.keys(valueTwo)) {
    if (!valueOne[key]) {
      isDeepEqual = false;
      break;
    }

    if (!deepEqual(valueOne[key], valueTwo[key])) {
      isDeepEqual = false;
      break;
    }
  }

  return isDeepEqual;
}

// get type of
console.log(getType(1));
console.log(getType('a'));
console.log(getType(true));
console.log(getType([1, 2, 3]));
console.log(getType({ hey: 1 }));

// primitives
console.log(deepEqual(1, '1'));
console.log(deepEqual(1, true));
console.log(deepEqual('a', true));
console.log(deepEqual(1, 2));
console.log(deepEqual(1, 1));
console.log(deepEqual('1', '2'));
console.log(deepEqual('1', '1'));
console.log(deepEqual(false, true));
console.log(deepEqual(true, true));

// array
console.log(deepEqual([1, 2, 3], [1, 2, 3]));
console.log(deepEqual([1, 2], [1, 2, 3]));
console.log(deepEqual([1, 2, 3], [1, 2]));
console.log(deepEqual([1, 2, [1, 2]], [1, 2, [1, 2]]));
console.log(deepEqual([1, 2, [1, 2, 3]], [1, 2, [1, 2]]));
console.log(deepEqual([1, 2, [1, 2]], [1, 2, [1, 2, 3]]));
console.log(deepEqual([1, 2, { 1: [1, 2, 3] }], [1, 2, { 1: [1, 2, 3] }]));

// object
console.log(deepEqual({}, {}));
console.log(deepEqual({ 1: 1 }, { 1: 1 }));
console.log(deepEqual({ 1: 1 }, { 1: 2 }));
console.log(deepEqual({ 2: 1 }, { 1: 1 }));
console.log(deepEqual({ 2: 1 }, { 1: 2 }));
console.log(deepEqual({ 2: [1, 2, 3] }, { 2: [1, 2, 3] }));
console.log(deepEqual({ 2: [1, 2, 3] }, { 2: [1, 2] }));
console.log(deepEqual({ 2: [1, 2] }, { 2: [1, 2, 3] }));
console.log(deepEqual({ 2: { 1: 1 } }, { 2: { 1: 1 } }));
console.log(deepEqual({ 2: { 1: 1 } }, { 2: { 1: 2 } }));
