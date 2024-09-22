const { widget } = figma;
const {
  AutoLayout,
  Frame,
  Ellipse,
  useSyncedState,
  Text,
  useStickable,
  useSyncedMap,
} = widget;

import { ScoreBoard } from "./ScoreBoard";

export function Board({ boardType }: { boardType: string }) {
  const [board, setBoard] = useSyncedState("board", initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useSyncedState(
    "currentPlayer",
    "black"
  );
  const [gameOver, setGameOver] = useSyncedState("gameOver", false);
  const [scores, setScores] = useSyncedState("scores", { black: 2, white: 2 });
  const players = useSyncedMap("players");

  const cellSize = 50;
  const boardSize = cellSize * 8 + 20 + 2 * 7;

  function initializeBoard() {
    const newBoard = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    newBoard[3][3] = newBoard[4][4] = "white";
    newBoard[3][4] = newBoard[4][3] = "black";
    return newBoard;
  }

  function getValidMoves(player: string) {
    const validMoves: [number, number][] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          board[row][col] === null &&
          getFlippedPieces(row, col, player).length > 0
        ) {
          validMoves.push([row, col]);
        }
      }
    }
    return validMoves;
  }

  function handleCellClick(row: number, col: number) {
    if (gameOver || board[row][col] !== null) return;

    const flippedPieces = getFlippedPieces(row, col, currentPlayer);
    if (flippedPieces.length === 0) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    flippedPieces.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer;
    });

    // 新しいスコアを計算
    const newScores = calculateScores(newBoard);

    // ボード、スコア、プレイヤーを同時に更新
    setBoard(newBoard);
    setScores(newScores);
    switchTurn();
  }

  function calculateScores(boardState: string[][]) {
    const newScores = { black: 0, white: 0 };
    boardState.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "black") newScores.black++;
        if (cell === "white") newScores.white++;
      });
    });
    return newScores;
  }

  function switchTurn() {
    const nextPlayer = currentPlayer === "black" ? "white" : "black";
    const nextPlayerMoves = getValidMoves(nextPlayer);

    if (nextPlayerMoves.length > 0) {
      setCurrentPlayer(nextPlayer);
    } else {
      const currentPlayerMoves = getValidMoves(currentPlayer);
      if (currentPlayerMoves.length > 0) {
        console.log(`${nextPlayer} has no valid moves. Passing...`);
      } else {
        setGameOver(true);
      }
    }
  }

  function getFlippedPieces(row: number, col: number, player: string) {
    const opponent = player === "black" ? "white" : "black";
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    const flippedPieces: [number, number][] = [];

    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      const tempFlipped: [number, number][] = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        tempFlipped.push([x, y]);
        x += dx;
        y += dy;
      }

      if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        flippedPieces.push(...tempFlipped);
      }
    });

    return flippedPieces;
  }

  const validMoves = getValidMoves(currentPlayer);

  const getBoardStyle = (type: string) => {
    switch (type) {
      case "standard":
        return {
          fill: "#1E1E1E",
          cellFill: "#15803D",
          blackStone: "#000000",
          whiteStone: "#FFFFFF",
          recommendFill: "#000000",
          stroke: "",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
        };
      case "vintage":
        return {
          fill: "#004085",
          cellFill: "#F3F3E6",
          blackStone: "#033973",
          whiteStone: "#E69500",
          recommendFill: "#95A5A6",
          stroke: "",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
        };
      case "cyberpunk":
        return {
          fill: "#0A0E27",
          cellFill: "#0A0E27",
          blackStone: "#FF00FF",
          whiteStone: "#00FFFF",
          recommendFill: "#67E8F9",
          stroke: "#4EDBEF",
          strokeWidth: 1,
          strokeAlign: "inside" as const,
        };
      default: // dark
        return {
          fill: "#1e1e1e",
          cellFill: "#4a4a4a",
          blackStone: "#000000",
          whiteStone: "#FFFFFF",
          recommendFill: "#808080",
          stroke: "",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
        };
    }
  };

  const boardStyle = getBoardStyle(boardType);

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
                  onClick={() => handleCellClick(rowIndex, colIndex)}
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
      <ScoreBoard
        boardStyle={boardStyle}
        players={players}
        currentPlayer={currentPlayer}
        scores={scores}
        gameOver={gameOver}
      />
    </AutoLayout>
  );
}
