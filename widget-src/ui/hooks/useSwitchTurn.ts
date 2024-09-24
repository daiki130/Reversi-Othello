// ターンを切り替えるためのフック
type GameState = "entry" | "playing" | "finished";

export const useSwitchTurn = (
  newBoard: string[][],
  currentPlayer: string,
  setCurrentPlayer: (player: string) => void,
  scores: { black: number; white: number },
  setGameState: (state: GameState) => void,
  setWinner: (winner: string | null) => void,
  setPassCount: (passCount: number | ((currValue: number) => number)) => void,
  useGetValidMoves: (board: string[][], player: string) => [number, number][]
) => {
  const nextPlayer = currentPlayer === "black" ? "white" : "black";
  const nextPlayerMoves = useGetValidMoves(newBoard, nextPlayer);

  if (nextPlayerMoves.length > 0) {
    setCurrentPlayer(nextPlayer);
  } else {
    const currentPlayerMoves = useGetValidMoves(newBoard, currentPlayer);
    if (currentPlayerMoves.length > 0) {
      setCurrentPlayer(currentPlayer);
      console.log(`${nextPlayer} has no valid moves. Passing...`);
      setPassCount((prev: number) => {
        const newPassCount = prev + 1;
        if (newPassCount >= 2) {
          setGameState("finished");
          const winner =
            scores.black > scores.white
              ? "black"
              : scores.white > scores.black
              ? "white"
              : "draw";
          setWinner(winner);
          console.log("Game Over");
        }
        return newPassCount;
      });
    } else {
      // 両方のプレイヤーに効な手がない場合、ゲームオーバーにする
      setGameState("finished");
      const winner =
        scores.black > scores.white
          ? "black"
          : scores.white > scores.black
          ? "white"
          : "draw";
      setWinner(winner);
      console.log("Game Over");
    }
  }
};
