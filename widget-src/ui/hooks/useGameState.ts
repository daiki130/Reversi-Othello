const { widget } = figma;
const { useSyncedState } = widget;
import { GameState } from "../../types/game";

// ゲームの状態を取得するためのフック
export const useGameState = () => {
  const [gameState, setGameState] = useSyncedState<GameState>(
    "gameState",
    "entry"
  );
  return [gameState, setGameState] as const;
};
