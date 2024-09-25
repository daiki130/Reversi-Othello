const { widget } = figma;
const { useSyncedState } = widget;

type GameState = "entry" | "playing" | "finished";

export const useGameState = () => {
  const [gameState, setGameState] = useSyncedState<GameState>("gameState", "entry");
  return [gameState, setGameState] as const;
}