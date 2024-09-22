const { widget } = figma;
const {
  AutoLayout,
  Text,
  useStickable,
} = widget;

import { EllipseWithImage } from "./EllipseWithImage";

export function ScoreBoard({ boardStyle, players, currentPlayer, scores, gameOver }: { boardStyle: any, players: any, currentPlayer: string, scores: any, gameOver: any }) {
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
        {playersArray.map(([player, icon], index) => (
          <AutoLayout
            key={index}
            direction="horizontal"
            spacing={8}
            verticalAlignItems="center"
            overflow="visible"
          >
            <EllipseWithImage
              src={icon as string}
              stroke={
                index === 0 ? boardStyle.blackStone : boardStyle.whiteStone
              }
              strokeWidth={2}
              strokeAlign="outside"
            />
            <Text fill={boardStyle.whiteStone} fontSize={14}>
              {index === 0 ? scores.black : scores.white}
            </Text>
            {index === 0 && (
              <Text
                fill={boardStyle.whiteStone}
                fontSize={14}
                fontWeight="bold"
              >
                {gameOver ? "ゲーム終了" : `${currentPlayerName}のターン`}
              </Text>
            )}
          </AutoLayout>
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}