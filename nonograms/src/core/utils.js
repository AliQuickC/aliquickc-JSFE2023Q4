export function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function countSequencesInColumn(matrix) {
  const arr = [];

  for (let i = 0; i < matrix.length; i += 1) {
    arr[i] = [];
    let counter = 0;
    let subsequence = false;

    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[j][i]) {
        counter += 1;
        if (!subsequence) {
          subsequence = true;
        }
      } else if (subsequence) {
        arr[i].push(counter);
        counter = 0;
        subsequence = false;
      }
    }

    if (subsequence) {
      arr[i].push(counter);
    }
  }

  return arr;
}

export function countSequencesInRow(matrix) {
  const arr = [];

  for (let i = 0; i < matrix.length; i += 1) {
    arr[i] = [];
    let counter = 0;
    let subsequence = false;

    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[i][j]) {
        counter += 1;
        if (!subsequence) {
          subsequence = true;
        }
      } else if (subsequence) {
        arr[i].push(counter);
        counter = 0;
        subsequence = false;
      }
    }

    if (subsequence) {
      arr[i].push(counter);
    }
  }
  return arr;
}

export function getTimeString(time) {
  const secomds = (time % 60).toString(10).padStart(2, '0');
  const minuts = Math.floor(time / 60)
    .toString(10)
    .padStart(2, '0');
  return `${minuts}:${secomds}`; // 00:00-99:99
}
