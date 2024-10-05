// ゲームメニューを表示するためのフック
const { widget } = figma;
const { usePropertyMenu } = widget;

export function useGameMenu(
  resetGame: () => void,
  boardType: string,
  setBoardType: (type: string) => void,
) {
  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Reset Game",
        propertyName: "reset",
      },
      {
        itemType: "separator",
      },
      {
        itemType: "dropdown",
        propertyName: "boardType",
        tooltip: "Change board type",
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
        resetGame();
      } else if (propertyName === "boardType") {
        setBoardType(propertyValue as string);
      }
    }
  );
}
