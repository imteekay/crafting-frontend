function getRepeated(string) {
  // {
  //   h: {
  //     start: 0
  //     end: 0
  //   },
  //   l: {
  //     start: 2
  //     end: 8
  //   },
  // }

  const charsPositions = new Map();

  for (let index = 0; index < string.length; index++) {
    let char = string[index];

    if (charsPositions.has(char)) {
      charsPositions.set(char, {
        start: charsPositions.get(char).start,
        end: index,
      });
    } else {
      charsPositions.set(char, {
        start: index,
        end: index,
      });
    }
  }

  const positions = [];

  for (let [_, { start, end }] of charsPositions) {
    if (start !== end) positions.push([start, end]);
  }

  return positions;
}

// ===== repeated chars =====

const input = 'hellooooloo';
const output = getRepeated(input);

console.log(output); // [(2,3), (4,7), (9,10)]
