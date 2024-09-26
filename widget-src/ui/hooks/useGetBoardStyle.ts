const { widget, loadFontAsync } = figma;
const { useSyncedState, useEffect } = widget;

// ボードのスタイルを取得し、ボードのスタイルを返すためのフック
export const useGetBoardStyle = (type: string) => {
  const [fontLoaded, setFontLoaded] = useSyncedState("fontLoaded", false);
  useEffect(() => {
    const loadFont = async () => {
      await loadFontAsync({
        family: "Pacifico",
        style: "Regular",
      });
      setFontLoaded(true);
    };
    loadFont();
  });

  // vintageボードのフォントをPacificoに設定
  const vintageFontFamily = fontLoaded ? "Pacifico" : "Inter";

  switch (type) {
    case "standard":
      return {
        fill: "#1E1E1E",
        cellFill: "#15803D",
        blackStone: "#000000",
        blackStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        whiteStone: "#FFFFFF",
        whiteStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        recommendFill: "#000000",
        stroke: "",
        strokeWidth: 0,
        strokeAlign: "inside" as const,
        fontFamily: "Radio Canada Big",
        fontWeight: 700,

        // スコアボードのカラー
        scoreBoardBackground: "#FFFFFF",
        stonePreviewBackground: "#E6E6E6",
        textFill: "#000000",
        playerScoreBackground: "#F5F5F5",
        scoreBoardDivider: "#E6E6E6",
      };
    default:
      return {
        fill: "#010713",
        cellFill: "#4a4a4a",
        blackStone: "#000000",
        blackStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        whiteStone: "#FFFFFF",
        whiteStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        recommendFill: "#808080",
        strokeWidth: 0,
        strokeAlign: "inside" as const,
        fontFamily: "Radio Canada Big",
        fontWeight: 700,
        
        // スコアボードのカラー
        scoreBoardBackground: "#010713",
        stonePreviewBackground: "#E6E6E6",
        textFill: "#FFFFFF",
        playerScoreBackground: "#222831",
        scoreBoardDivider: "#E6E6E6",
      };
    case "vintage":
      return {
        fill: "#004085",
        cellFill: "#F3F3E6",
        blackStone: "#033973",
        blackStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        whiteStone: "#E69500",
        whiteStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        recommendFill: "#808080",
        stroke: "",
        strokeWidth: 0,
        strokeAlign: "inside" as const,
        fontFamily: vintageFontFamily,
        fontWeight: 400,

        // スコアボードのカラー
        scoreBoardBackground: "#004085",
        stonePreviewBackground: "#FFFFFF",
        textFill: "#FFFFFF",
        playerScoreBackground: "#165BA5",
        scoreBoardDivider: "#E6E6E6",
      };
    case "cyberpunk":
      return {
        fill: "#0A0E27",
        cellFill: "#0A0E27",
        blackStone: "#FF00FF",
        blackStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        whiteStone: "#00FFFF",
        whiteStoneEffect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 0, y: 1 },
          blur: 0,
        },
        recommendFill: "#67E8F9",
        stroke: "#4EDBEF",
        strokeWidth: 1,
        strokeAlign: "inside" as const,
        fontFamily: "Orbitron",
        fontWeight: 600,

        // スコアボードのカラー
        scoreBoardBackground: "#0A0E27",
        stonePreviewBackground: "#FFFFFF",
        textFill: "#FFFFFF",
        playerScoreBackground: "#202546",
        scoreBoardDivider: "#E6E6E6",
      };
  }
};
