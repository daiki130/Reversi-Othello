const { widget } = figma;
const { AutoLayout, usePropertyMenu,useSyncedState, useSyncedMap } = widget;

import { Board } from "./components/compositions/board";
import { Modal } from "./components/compositions/modal";
import { usePlayer } from "./hooks/usePlayer";

function Widget() {
  const [gameStarted, setGameStarted] = useSyncedState("gameStarted", false);
  const players = usePlayer();

  return (
    <AutoLayout
      direction="vertical"
      width="hug-contents"
      height="hug-contents"
    >
      <Board players={players} gameStarted={gameStarted} />
      {!gameStarted && (
        <Modal players={players} setGameStarted={setGameStarted} />
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
