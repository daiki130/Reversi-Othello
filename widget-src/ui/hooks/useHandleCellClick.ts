import {
  useGetFlippedPieces,
  useGetValidMoves,
  useScores,
  useSwitchTurn,
} from "../hooks";

// セルをクリックしたときの処理を行うためのフック
export const useHandleCellClick = (
  row: number,
  col: number,
  gameState: string,
  board: any,
  currentPlayer: string,
  setBoard: any,
  setScores: any,
  setPassCount: any,
  setCurrentPlayer: any,
  setGameState: any,
  setWinner: any,
) => {

  // ゲームが終了しているか、すでにそのセルが埋まっている場合は何もしない
  if (gameState === "finished" || board[row][col] !== null) return;

  // 選択したセルに基づいてひっくり返すべきピースを取得
  const flippedPieces = useGetFlippedPieces(row, col, currentPlayer, board);
  // ひっくり返すピースがない場合は何もしない
  if (flippedPieces.length === 0) return;

  // 新しいボードを作成
  const newBoard = board.map((row: any) => [...row]);
  // 選択したセルに現在のプレイヤーのマークを追加
  newBoard[row][col] = currentPlayer;
  // ひっくり返すピースを更新
  flippedPieces.forEach(([r, c]: any) => {
    newBoard[r][c] = currentPlayer;
  });

  // 新しいスコアを計算
  const newScores = useScores(newBoard);

  // ボード、スコア、プレイヤーを同時に更新
  setBoard(newBoard);
  setScores(newScores);
  setPassCount(0);

  // ターンを切り替える
  useSwitchTurn(
    newBoard,
    currentPlayer,
    setCurrentPlayer,
    newScores,
    setGameState,
    setWinner,
    setPassCount,
    useGetValidMoves
  );
};
