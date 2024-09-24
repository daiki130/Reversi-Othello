import { useInitializeBoard } from "./useInitializeBoard";

type GameState = "entry" | "playing" | "finished";

export const useResetGame = (
  setBoard: (board: string[][]) => void,
  setCurrentPlayer: (player: string) => void,
  setGameOver: (over: boolean) => void,
  setScores: (scores: { black: number; white: number }) => void,
  setPassCount: (count: number) => void,
  setGameState: (state: GameState) => void,
  setWinner: (winner: string | null) => void,
  initializeBoard: () => string[][]
) => {
  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer("black");
    setGameOver(false);
    setScores({ black: 2, white: 2 });
    setPassCount(0);
    setGameState("entry");
    setWinner(null);
  };

  return resetGame;
}
