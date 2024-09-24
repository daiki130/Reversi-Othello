const { widget } = figma;
const { AutoLayout, usePropertyMenu,useSyncedState, useSyncedMap } = widget;

import { Board } from "./components/compositions/board";
import { Modal } from "./components/compositions/modal";
import {
  useGameState,
  usePlayer,
} from "./hooks";

function Widget() {
  const [gameState] = useGameState();
  const players = usePlayer();

  return (
    <AutoLayout
      direction="vertical"
      width="hug-contents"
      height="hug-contents"
    >
      <Board players={players} />
      {(gameState === 'entry' || gameState === 'finished') && (
        <Modal players={players} />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
