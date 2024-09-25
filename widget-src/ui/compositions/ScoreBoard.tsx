const { widget } = figma;
const { AutoLayout, Text, useStickable, Ellipse } = widget;

import { PlayerScore } from "../primitives/PlayerScore";
export function ScoreBoard({
  boardStyle,
  players,
  currentPlayer,
  scores,
  gameState,
  winner,
}: {
  boardStyle: any;
  players: any;
  currentPlayer: string;
  scores: any;
  gameState: any;
  winner: any;
}) {
  useStickable();
  const playersArray = Array.from(players.entries()) as [string, { icon: string, stone: string }][];
  const currentPlayerName = playersArray.find(player => player[1].stone === currentPlayer)?.[0] || "";
  const blackPlayer = playersArray.find(player => player[1].stone === "black");
  const whitePlayer = playersArray.find(player => player[1].stone === "white");

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
          icon={blackPlayer ? blackPlayer[1].icon : ""}
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
            {gameState === "finished"
              ? winner === "draw"
                ? "Draw"
                : `Winner: ${winner}`
              : `${currentPlayerName}'s turn`}
          </Text>
        </AutoLayout>
        <PlayerScore
          icon={whitePlayer ? whitePlayer[1].icon : ""}
          score={scores.white}
          stoneColor="white"
          boardStyle={boardStyle}
        />
      </AutoLayout>
    </AutoLayout>
  );
}
