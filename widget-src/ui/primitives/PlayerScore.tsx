const { widget } = figma;
const { AutoLayout, Text } = widget;

import { EllipseWithImage } from "./EllipseWithImage";

export function PlayerScore({
  icon,
  score,
  stoneColor,
  boardStyle,
  isCurrentPlayer,
}: {
  icon: string;
  score: number;
  stoneColor: "black" | "white";
  boardStyle: any;
  isCurrentPlayer: boolean;
}) {
  return (
    <AutoLayout
      direction="horizontal"
      spacing={4}
      padding={12}
      verticalAlignItems="center"
      overflow="visible"
      minWidth={94}
      fill={isCurrentPlayer ? boardStyle.playerScoreBackground : ""}
      cornerRadius={8}
    >
      <EllipseWithImage
        width={32}
        height={32}
        src={icon}
        strokeAlign="outside"
      />
      <Text
        fill={boardStyle.textFill}
        fontFamily={boardStyle.fontFamily}
        fontSize={14}
      >
        {score}
      </Text>
    </AutoLayout>
  );
}
