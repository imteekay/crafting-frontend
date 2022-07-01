const Types = {
  string: 'string',
  boolean: 'boolean',
  number: 'number',
  array: 'array',
  object: 'object',
  NaN: 'NaN',
  null: 'null',
  undefined: 'undefined',
};

const primitives = [Types.string, Types.boolean, Types.number];

function getType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'number' && isNaN(value)) {
    return Types.NaN;
  }

  if (primitives.includes(typeof value)) {
    return typeof value;
  }

  if (value === null) {
    return Types.null;
  }

  if (value === undefined) {
    return Types.undefined;
  }

  return 'object';
}

function deepEqual(valueOne, valueTwo) {
  const valueOneType = getType(valueOne);
  const valueTwoType = getType(valueTwo);

  if (valueOneType === Types.NaN && valueTwoType === Types.NaN) return true;
  if (valueOneType === Types.null && valueTwoType === Types.null) return true;
  if (valueOneType === Types.undefined && valueTwoType === Types.undefined)
    return true;

  if (primitives.includes(valueOneType)) return valueOne === valueTwo;

  if (valueOneType === Types.array && valueTwoType === Types.array) {
    if (valueOne.length !== valueTwo.length) return false;

    for (let index = 0; index < valueOne.length; index++) {
      if (!deepEqual(valueOne[index], valueTwo[index])) {
        return false;
      }
    }

    return true;
  }

  for (let key of Object.keys(valueOne)) {
    if (!valueTwo[key] || !deepEqual(valueOne[key], valueTwo[key])) {
      return false;
    }
  }

  for (let key of Object.keys(valueTwo)) {
    if (!valueOne[key] || !deepEqual(valueOne[key], valueTwo[key])) {
      return false;
    }
  }

  return true;
}

// get type of
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(NaN));
console.log(getType(1));
console.log(getType('a'));
console.log(getType(true));
console.log(getType([1, 2, 3]));
console.log(getType({ hey: 1 }));
console.log();

// primitives
console.log(deepEqual(null, null) === true);
console.log(deepEqual(undefined, undefined) === true);
console.log(deepEqual(NaN, NaN) === true);
console.log(deepEqual(1, '1') === false);
console.log(deepEqual(1, true) === false);
console.log(deepEqual('a', true) === false);
console.log(deepEqual(1, 2) === false);
console.log(deepEqual(1, 1) === true);
console.log(deepEqual('1', '2') === false);
console.log(deepEqual('1', '1') === true);
console.log(deepEqual(false, true) === false);
console.log(deepEqual(true, true) === true);
console.log();

// array
console.log(deepEqual([1, 2, 3], [1, 2, 3]) === true);
console.log(deepEqual([1, 2], [1, 2, 3]) === false);
console.log(deepEqual([1, 2, 3], [1, 2]) === false);
console.log(deepEqual([1, 2, [1, 2]], [1, 2, [1, 2]]) === true);
console.log(deepEqual([1, 2, [1, 2, 3]], [1, 2, [1, 2]]) === false);
console.log(deepEqual([1, 2, [1, 2]], [1, 2, [1, 2, 3]]) === false);
console.log(
  deepEqual([1, 2, { 1: [1, 2, 3] }], [1, 2, { 1: [1, 2, 3] }]) === true
);
console.log();

// object
console.log(deepEqual({}, {}) === true);
console.log(deepEqual({ 1: 1 }, { 1: 1 }) === true);
console.log(deepEqual({ 1: 1 }, { 1: 2 }) === false);
console.log(deepEqual({ 2: 1 }, { 1: 1 }) === false);
console.log(deepEqual({ 2: 1 }, { 1: 2 }) === false);
console.log(deepEqual({ 2: [1, 2, 3] }, { 2: [1, 2, 3] }) === true);
console.log(deepEqual({ 2: [1, 2, 3] }, { 2: [1, 2] }) === false);
console.log(deepEqual({ 2: [1, 2] }, { 2: [1, 2, 3] }) === false);
console.log(deepEqual({ 2: { 1: 1 } }, { 2: { 1: 1 } }) === true);
console.log(deepEqual({ 2: { 1: 1 } }, { 2: { 1: 2 } }) === false);
