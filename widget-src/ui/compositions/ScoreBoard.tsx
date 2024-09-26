const { widget } = figma;
const { AutoLayout, useStickable, Rectangle } = widget;

import { PlayerScore } from "../primitives/PlayerScore";
import { Turn } from "../primitives/Turn";
import { GameState } from "../../types/game";

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
  gameState: GameState;
  winner: any;
}) {
  useStickable();
  const playersArray = Array.from(players.entries()) as [
    string,
    { icon: string; stone: string }
  ][];
  const currentPlayerName =
    playersArray.find((player) => player[1].stone === currentPlayer)?.[0] || "";
  const blackPlayer = playersArray.find(
    (player) => player[1].stone === "black"
  );
  const whitePlayer = playersArray.find(
    (player) => player[1].stone === "white"
  );

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={12}
      cornerRadius={8}
      fill={boardStyle.scoreBoardBackground}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      minWidth={210}
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.3 },
        offset: { x: 0, y: 2 },
        blur: 4,
      }}
      overflow="visible"
    >
      <Turn
        boardStyle={boardStyle}
        currentPlayer={currentPlayer}
        gameState={gameState}
        winner={winner}
        currentPlayerName={currentPlayerName}
      />
      <Rectangle
        width={"fill-parent"}
        height={1}
        fill={boardStyle.scoreBoardDivider}
      />
      <AutoLayout
        direction="horizontal"
        spacing={4}
        verticalAlignItems="center"
      >
        <PlayerScore
          icon={blackPlayer ? blackPlayer[1].icon : ""}
          score={scores.black}
          stoneColor="black"
          boardStyle={boardStyle}
          isCurrentPlayer={currentPlayer === "black"}
        />
        <PlayerScore
          icon={whitePlayer ? whitePlayer[1].icon : ""}
          score={scores.white}
          stoneColor="white"
          boardStyle={boardStyle}
          isCurrentPlayer={currentPlayer === "white"}
        />
      </AutoLayout>
    </AutoLayout>
  );
}
