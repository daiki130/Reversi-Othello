// ボードを初期化するためのフック
export const useInitializeBoard = () => {
  const newBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  newBoard[3][3] = newBoard[4][4] = "white";
  newBoard[3][4] = newBoard[4][3] = "black";
  return newBoard;
};

export const cellSize = 50;
export const boardSize = cellSize * 8 + 20 + 2 * 7;
