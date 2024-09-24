const { widget } = figma;
const { useSyncedState } = widget;

type GameState = "entry" | "playing" | "finished";

export function useGameState() {
  const [gameState, setGameState] = useSyncedState<GameState>("gameState", "entry");
  return [gameState, setGameState] as const;
}