const { widget } = figma;
const { useSyncedState, usePropertyMenu, useSyncedMap } = widget;

import { Board } from "./components/compositions/board";
import { Modal } from "./components/compositions/modal";

function Widget() {
  const [gameStarted, setGameStarted] = useSyncedState("gameStarted", false);
  const [boardType, setBoardType] = useSyncedState("boardType", "standard");
  const players = useSyncedMap("players");

  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "ゲームをリセット",
        propertyName: "reset",
      },
      {
        itemType: "separator",
      },
      {
        itemType: "dropdown",
        propertyName: "boardType",
        tooltip: "ボードタイプを変更",
        selectedOption: boardType,
        options: [
          { option: "standard", label: "Standard" },
          { option: "dark", label: "Dark" },
          { option: "vintage", label: "Vintage" },
          { option: "cyberpunk", label: "CyberPunk" },
        ],
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "reset") {
        console.log("reset");
        // resetGame();
      } else if (propertyName === "boardType") {
        console.log(propertyValue);
        setBoardType(propertyValue as string);
      }
    }
  );

  if (gameStarted) {
    return <Board boardType={boardType} players={players} />;
  }

  return <Modal players={players} setGameStarted={setGameStarted} />;
}

widget.register(Widget);
