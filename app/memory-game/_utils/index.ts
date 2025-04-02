const createBoard = () => {
  const numbers = new Array(36).fill(null);

  let i = 0;
  for (let n = 1; n <= 18; n++) {
    numbers[i++] = n;
    numbers[i++] = n;
  }

  for (let i = numbers.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i + 1);

    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

export { createBoard };
