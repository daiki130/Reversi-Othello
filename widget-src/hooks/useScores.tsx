export const useScores = (boardState: string[][]) => {
  const newScores = { black: 0, white: 0 };
  boardState.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "black") newScores.black++;
      if (cell === "white") newScores.white++;
    });
  });
  return newScores;
};
