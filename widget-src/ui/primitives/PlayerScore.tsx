const { widget } = figma;
const { AutoLayout, Text } = widget;

import { EllipseWithImage } from "./EllipseWithImage";

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
        width={32}
        height={32}
        src={icon}
        stroke={
          stoneColor === "black" ? boardStyle.blackStone : boardStyle.whiteStone
        }
        strokeWidth={2}
        strokeAlign="outside"
        isStrokeDash={true}
      />
      <Text
        fill={
          // stoneColor === "black" ? boardStyle.blackText : boardStyle.whiteText
          boardStyle.textFill
        }
        fontSize={14}
      >
        {score}
      </Text>
    </AutoLayout>
  );
}
