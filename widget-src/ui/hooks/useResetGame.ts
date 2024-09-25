import { GameState } from '../../types/game';

export const useResetGame = (
  setBoard: (board: string[][]) => void,
  setCurrentPlayer: (player: string) => void,
  setScores: (scores: { black: number; white: number }) => void,
  setPassCount: (count: number) => void,
  setGameState: (state: GameState) => void,
  setWinner: (winner: string | null) => void,
  initializeBoard: () => string[][]
) => {
  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer("black");
    setScores({ black: 2, white: 2 });
    setPassCount(0);
    setGameState("reset");
    setWinner(null);
  };

  return resetGame;
}
