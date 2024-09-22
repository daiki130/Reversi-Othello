const { widget } = figma;
const { AutoLayout, Text, useStickable, Ellipse } = widget;

import { PlayerScore } from "../primitives/PlayerScore";
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
  const blackPlayer = playersArray[0];
  const whitePlayer = playersArray[1];

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
          icon={blackPlayer[1]}
          score={scores.black}
          stoneColor="black"
          boardStyle={boardStyle}
        />
        <AutoLayout
          direction="horizontal"
          spacing={4}
          verticalAlignItems="center"
        >
          {currentPlayer === "black" ? (
            <AutoLayout
              direction="horizontal"
              spacing={4}
              padding={4}
              cornerRadius={4}
              fill={boardStyle.stonePreviewBackground}
            >
              <Ellipse
                width={14}
                height={14}
                fill={boardStyle.blackStone}
                effect={boardStyle.blackStoneEffect}
              />
            </AutoLayout>
          ) : (
            <AutoLayout
              direction="horizontal"
              spacing={4}
              padding={4}
              cornerRadius={4}
              fill={boardStyle.stonePreviewBackground}
            >
              <Ellipse
                width={14}
                height={14}
                fill={boardStyle.whiteStone}
                effect={boardStyle.whiteStoneEffect}
              />
            </AutoLayout>
          )}
          <Text fill={boardStyle.textFill} fontSize={14} fontWeight="bold">
            {gameOver ? "Game Over" : `${currentPlayerName}'s turn`}
          </Text>
        </AutoLayout>
        <PlayerScore
          icon={whitePlayer[1]}
          score={scores.white}
          stoneColor="white"
          boardStyle={boardStyle}
        />
      </AutoLayout>
    </AutoLayout>
  );
}
