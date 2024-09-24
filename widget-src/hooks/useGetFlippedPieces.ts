export const useGetFlippedPieces = (row: number, col: number, player: string, board: string[][]) => {
    const opponent = player === "black" ? "white" : "black";
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

    const flippedPieces: [number, number][] = [];

    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      const tempFlipped: [number, number][] = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        tempFlipped.push([x, y]);
        x += dx;
        y += dy;
      }

      if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        flippedPieces.push(...tempFlipped);
      }
    });

    return flippedPieces;
  }
