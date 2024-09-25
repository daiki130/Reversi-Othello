// ゲームメニューを表示するフック
const { widget } = figma;
const { usePropertyMenu } = widget;

export function useGameMenu(
  resetGame: () => void,
  boardType: string,
  setBoardType: (type: string) => void,
  setIsBGMPlaying: (prev: (prev: boolean) => boolean) => void,
  isSoundPlaying: boolean
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
      {
        itemType: "toggle",
        tooltip: "Play sound effects",
        propertyName: "playSound",
        isToggled: isSoundPlaying,
        icon: isSoundPlaying
          ? `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.14 9.86011C41.8894 13.6107 43.9957 18.6968 43.9957 24.0001C43.9957 29.3034 41.8894 34.3896 38.14 38.1401M31.08 16.9201C32.9547 18.7954 34.0079 21.3385 34.0079 23.9901C34.0079 26.6417 32.9547 29.1848 31.08 31.0601M22 10.0001L12 18.0001H4V30.0001H12L22 38.0001V10.0001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
          : `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46 18L34 30M34 18L46 30M22 10L12 18H4V30H12L22 38V10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "reset") {
        resetGame();
      } else if (propertyName === "boardType") {
        setBoardType(propertyValue as string);
      } else if (propertyName === "playSound") {
        setIsBGMPlaying((prev) => !prev);
        console.log("BGM再生:", !isSoundPlaying);
      }
    }
  );
}
