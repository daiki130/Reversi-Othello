const { widget } = figma;
const { AutoLayout, Frame, Ellipse } = widget;

import {
  useInitializeBoard,
  useGetValidMoves,
  cellSize,
  boardSize,
  useGetBoardStyle,
  useGameMenu,
  useResetGame,
  useHandleCellClick,
  useGameSettings,
} from "../hooks";

import { ScoreBoard } from "./ScoreBoard";

export function Board({ players }: { players: SyncedMap<unknown> }) {
  // ゲームの状態を取得
  const {
    gameState,
    setGameState,
    boardType,
    setBoardType,
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    scores,
    setScores,
    passCount,
    setPassCount,
    winner,
    setWinner,
    isSoundPlaying,
    setIsBGMPlaying,
  } = useGameSettings();

  // ゲームをリセット
  const resetGame = useResetGame(
    setBoard,
    setCurrentPlayer,
    setScores,
    setPassCount,
    setGameState,
    setWinner,
    useInitializeBoard
  );

  // ゲームメニューの作成
  if (gameState === "playing" || gameState === "reset") {
    useGameMenu(
      resetGame,
      boardType,
      setBoardType,
      setIsBGMPlaying,
      isSoundPlaying
    );
  }

  // 有効な手を取得
  const validMoves = useGetValidMoves(board, currentPlayer);

  // ボードのスタイルを取得
  const boardStyle = useGetBoardStyle(boardType);

  return (
    <AutoLayout direction="vertical" spacing={20} horizontalAlignItems="center">
      <AutoLayout
        direction="vertical"
        spacing={10}
        padding={10}
        cornerRadius={8}
        fill={boardStyle.fill}
        width={boardSize}
        height={boardSize}
      >
        <AutoLayout direction="vertical" spacing={2}>
          {board.map((row, rowIndex) => (
            <AutoLayout key={rowIndex} direction="horizontal" spacing={2}>
              {row.map((cell: any, colIndex: any) => (
                <Frame
                  key={`${rowIndex}-${colIndex}`}
                  width={cellSize}
                  height={cellSize}
                  fill={boardStyle.cellFill}
                  cornerRadius={4}
                  onClick={() =>
                    // ボードのセルをクリックしたときの処理
                    useHandleCellClick(
                      rowIndex,
                      colIndex,
                      gameState,
                      board,
                      currentPlayer,
                      setBoard,
                      setScores,
                      setPassCount,
                      setCurrentPlayer,
                      setGameState,
                      setWinner
                    )
                  }
                  stroke={boardStyle.stroke}
                  strokeWidth={boardStyle.strokeWidth}
                  strokeAlign={boardStyle.strokeAlign}
                >
                  {cell && (
                    <Ellipse
                      width={cellSize - 10}
                      height={cellSize - 10}
                      x={5}
                      y={5}
                      fill={
                        cell === "black"
                          ? boardStyle.blackStone
                          : boardStyle.whiteStone
                      }
                    />
                  )}
                  {!cell &&
                    validMoves.some(
                      ([r, c]) => r === rowIndex && c === colIndex
                    ) && (
                      <Ellipse
                        width={cellSize / 4}
                        height={cellSize / 4}
                        x={(cellSize * 3) / 8}
                        y={(cellSize * 3) / 8}
                        fill={boardStyle.recommendFill}
                        opacity={0.5}
                      />
                    )}
                </Frame>
              ))}
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>
      {gameState !== "entry" && gameState !== "finished" && (
        <ScoreBoard
          boardStyle={boardStyle}
          players={players}
          currentPlayer={currentPlayer}
          scores={scores}
          gameState={gameState}
          winner={winner}
        />
      )}
    </AutoLayout>
  );
}
