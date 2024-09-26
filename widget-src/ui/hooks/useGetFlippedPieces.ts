// 指定されたマスに置かれた石が、その石の色の反転にどの石を反転させるかを計算するためのフック
export const useGetFlippedPieces = (
  row: number,
  col: number,
  player: string,
  board: string[][]
) => {
  // 反転する石の色を計算
  const opponent = player === "black" ? "white" : "black";
  // 反転する石の色を計算
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // 反転する石の座標を格納する配列
  const flippedPieces: [number, number][] = [];

  // 方向ごとに反転する石を探す
  directions.forEach(([dx, dy]) => {
    // 反転する石の座標を計算
    let x = row + dx;
    let y = col + dy;
    const tempFlipped: [number, number][] = [];

    // 反転する石が相手の石である場合、反転する石の座標を配列に追加
    while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
      tempFlipped.push([x, y]);
      x += dx;
      y += dy;
    }

    // 反転する石が自分の石である場合、反転する石の座標を配列に追加
    if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
      flippedPieces.push(...tempFlipped);
    }
  });

  return flippedPieces;
};
