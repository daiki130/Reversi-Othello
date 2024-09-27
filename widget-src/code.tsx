const { widget } = figma;
const { AutoLayout } = widget;

import { Board } from "./ui/compositions/Board";
import { Modal } from "./ui/compositions/Modal";
import { useGameState, usePlayer, useResetGame } from "./ui/hooks";

function Widget() {
  const [gameState] = useGameState();
  const players = usePlayer();

  return (
    <AutoLayout direction="vertical" width="hug-contents" height="hug-contents" overflow="visible">
      <Board players={players} />
      {(gameState === "entry" || gameState === "finished") && (
        <Modal players={players} />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
