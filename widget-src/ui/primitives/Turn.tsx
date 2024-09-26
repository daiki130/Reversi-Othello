const { widget } = figma;
const { AutoLayout, Text, Ellipse } = widget;

import { GameState } from "../../types/game";

export const Turn = ({
  boardStyle,
  currentPlayer,
  gameState,
  winner,
  currentPlayerName,
}: {
  boardStyle: any;
  currentPlayer: string;
  gameState: GameState;
  winner: any;
  currentPlayerName: string;
}) => {
  return (
    <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
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
      <Text
        fill={boardStyle.textFill}
        fontSize={14}
        fontWeight={boardStyle.fontWeight}
        fontFamily={boardStyle.fontFamily}
      >
        {gameState === "finished"
          ? winner === "draw"
            ? "Draw"
            : `Winner: ${winner}`
          : `${currentPlayerName}'s turn`}
      </Text>
    </AutoLayout>
  );
};
