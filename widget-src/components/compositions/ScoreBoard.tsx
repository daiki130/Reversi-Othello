const { widget } = figma;
const { AutoLayout, Text, useStickable } = widget;

import { PlayerScore } from "./PlayerScore";

export function ScoreBoard({
  boardStyle,
  players,
  currentPlayer,
  scores,
  gameOver,
}: {
  boardStyle: any;
  players: any;
  currentPlayer: string;
  scores: any;
  gameOver: any;
}) {
  useStickable();
  const playersArray = Array.from(players.entries()) as [string, string][];
  const currentPlayerName = playersArray[currentPlayer === "black" ? 0 : 1][0];

  return (
    <AutoLayout
      direction="vertical"
      spacing={4}
      padding={12}
      cornerRadius={9999}
      fill={boardStyle.fill}
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.3 },
        offset: { x: 0, y: 2 },
        blur: 4,
      }}
    >
      <AutoLayout
        direction="horizontal"
        spacing={16}
        verticalAlignItems="center"
        overflow="visible"
      >
        <PlayerScore
          icon={playersArray[0][1]}
          score={scores.black}
          stoneColor="black"
          boardStyle={boardStyle}
        />
        <Text fill={boardStyle.whiteStone} fontSize={14} fontWeight="bold">
          {gameOver ? "ゲーム終了" : `${currentPlayerName}のターン`}
        </Text>
        <PlayerScore
          icon={playersArray[1][1]}
          score={scores.white}
          stoneColor="white"
          boardStyle={boardStyle}
        />
      </AutoLayout>
    </AutoLayout>
  );
}
