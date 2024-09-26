import { useGetFlippedPieces } from "./useGetFlippedPieces";

// 有効な手を取得するためのフック
export function useGetValidMoves(board: string[][], player: string) {
  const validMoves: [number, number][] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        board[row][col] === null &&
        useGetFlippedPieces(row, col, player, board).length > 0
      ) {
        validMoves.push([row, col]);
      }
    }
  }
  return validMoves;
}
