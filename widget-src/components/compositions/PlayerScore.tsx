const { widget } = figma;
const { AutoLayout, Text } = widget;

import { EllipseWithImage } from "../primitives/EllipseWithImage";

export function PlayerScore({
  icon,
  score,
  stoneColor,
  boardStyle,
}: {
  icon: string;
  score: number;
  stoneColor: "black" | "white";
  boardStyle: any;
}) {
  return (
    <AutoLayout
      direction="horizontal"
      spacing={8}
      verticalAlignItems="center"
      overflow="visible"
    >
      <EllipseWithImage
        src={icon}
        stroke={
          stoneColor === "black" ? boardStyle.blackStone : boardStyle.whiteStone
        }
        strokeWidth={2}
        strokeAlign="outside"
      />
      <Text fill={boardStyle.whiteStone} fontSize={14}>
        {score}
      </Text>
    </AutoLayout>
  );
}
