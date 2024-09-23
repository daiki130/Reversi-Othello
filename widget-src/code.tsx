const { widget } = figma;
const { AutoLayout, usePropertyMenu,useSyncedState, useSyncedMap } = widget;

import { Board } from "./components/compositions/board";
import { Modal } from "./components/compositions/modal";

function Widget() {
  const [gameStarted, setGameStarted] = useSyncedState("gameStarted", false);
  const [boardType, setBoardType] = useSyncedState("boardType", "standard");
  const players = useSyncedMap<string>("players");

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
  return (
    <AutoLayout
      direction="vertical"
      width="hug-contents"
      height="hug-contents"
    >
      <Board boardType={boardType} players={players} gameStarted={gameStarted} />
      {!gameStarted && (
        <Modal players={players} setGameStarted={setGameStarted} />
        // <AutoLayout
        //   positioning="absolute"
        //   x={0}
        //   y={0}
        //   width="fill-parent"
        //   height="fill-parent"
        //   fill={{ type: "solid", color: { r: 0, g: 0, b: 0, a: 0.5 } }}
        // >
          
        // </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
