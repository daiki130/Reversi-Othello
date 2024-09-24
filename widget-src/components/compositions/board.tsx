const { widget } = figma;
const {
  AutoLayout,
  Frame,
  Ellipse,
  useSyncedState,
  usePropertyMenu,
  useEffect,
} = widget;

import {
  useGameState,
  useInitializeBoard,
  cellSize,
  boardSize,
  useGetFlippedPieces,
} from "../../hooks";

import { ScoreBoard } from "./ScoreBoard";

export function Board({
  players,
  gameStarted,
}: {
  players: SyncedMap<unknown>;
  gameStarted: boolean;
}) {
  const [gameState, setGameState] = useGameState();
  const [boardType, setBoardType] = useSyncedState("boardType", "standard");
  const [board, setBoard] = useSyncedState("board", useInitializeBoard());
  const [currentPlayer, setCurrentPlayer] = useSyncedState(
    "currentPlayer",
    "black"
  );
  const [gameOver, setGameOver] = useSyncedState("gameOver", false);
  const [scores, setScores] = useSyncedState("scores", { black: 2, white: 2 });
  const [passCount, setPassCount] = useSyncedState("passCount", 0);
  const [winner, setWinner] = useSyncedState("winner", null);
  const [isSoundPlaying, setIsBGMPlaying] = useSyncedState("isSoundPlaying", false);

  function getValidMoves(player: string) {
    const validMoves: [number, number][] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          board[row][col] === null &&
          useGetFlippedPieces(row, col, player, board).length > 0
        ) {
          validMoves.push([row, col]);
        }
      }
    }
    return validMoves;
  }

  function handleCellClick(row: number, col: number) {
    if (gameOver || board[row][col] !== null) return;

    const flippedPieces = useGetFlippedPieces(row, col, currentPlayer, board);
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
    setPassCount(0);
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
        setPassCount((prev) => {
          const newPassCount = prev + 1;
          if (newPassCount >= 2) {
            setGameOver(true);
            console.log("Game Over");
          }
          return newPassCount;
        });
      } else {
        // 両方のプレイヤーに有効な手がない場合、ゲームオーバーにする
        setGameOver(true);
        console.log("Game Over: No valid moves for both players");
      }
      setCurrentPlayer(currentPlayer); // 同じプレイヤーのターンを続ける
    }
  }

  function resetGame() {
    setBoard(useInitializeBoard());
    setCurrentPlayer("black");
    setGameOver(false);
    setScores({ black: 2, white: 2 });
    setPassCount(0); // パスカウントをリセット
    setGameState("entry");
    setWinner(null);
  }

  // function handlePass(player: string) {
  //   if (passCount >= 2) {
  //     // 連続パスが2回になったらゲームを終了
  //     setGameState("finished");
  //   } else {
  //     const nextPlayer = player === "black" ? "white" : "black";
  //     setCurrentPlayer(nextPlayer);
  //     setPassCount((prev) => prev + 1); // パスカウントを増す
  //   }
  // }

  // useEffect(() => {
  //   const newScore = board.reduce(
  //     (acc, row) => {
  //       row.forEach((cell) => {
  //         if (cell === "black") acc.black++;
  //         if (cell === "white") acc.white++;
  //       });
  //       return acc;
  //     },
  //     { black: 0, white: 0 }
  //   );
  //   setScores(newScore);

  //   if (gameState === "finished") {
  //     // ゲーム終了に勝者を決定
  //     if (newScore.black > newScore.white) {
  //       setWinner("black");
  //     } else if (newScore.white > newScore.black) {
  //       setWinner("white");
  //     } else {
  //       setWinner(null); // 引き分けの場合
  //     }
  //   } else if (newScore.black + newScore.white === 64) { // 8x8のボードサイズ
  //     if (newScore.black > newScore.white) {
  //       setWinner("black");
  //     } else if (newScore.white > newScore.black) {
  //       setWinner("white");
  //     } else {
  //       setWinner(null); // 引き分けの場合
  //     }
  //     setGameState("finished");
  //   }
  // }, [board, gameState]);

  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Reset Game",
        propertyName: "reset",
      },
      {
        itemType: "separator",
      },
      {
        itemType: "dropdown",
        propertyName: "boardType",
        tooltip: "Change board type",
        selectedOption: boardType,
        options: [
          { option: "standard", label: "Standard" },
          { option: "dark", label: "Dark" },
          { option: "vintage", label: "Vintage" },
          { option: "cyberpunk", label: "CyberPunk" },
        ],
      },
      {
        itemType: "toggle",
        tooltip: "Play sound effects",
        propertyName: "playSound",
        isToggled: isSoundPlaying,
        icon: isSoundPlaying
          ? `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.14 9.86011C41.8894 13.6107 43.9957 18.6968 43.9957 24.0001C43.9957 29.3034 41.8894 34.3896 38.14 38.1401M31.08 16.9201C32.9547 18.7954 34.0079 21.3385 34.0079 23.9901C34.0079 26.6417 32.9547 29.1848 31.08 31.0601M22 10.0001L12 18.0001H4V30.0001H12L22 38.0001V10.0001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
          : `<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46 18L34 30M34 18L46 30M22 10L12 18H4V30H12L22 38V10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "reset") {
        resetGame();
      } else if (propertyName === "boardType") {
        setBoardType(propertyValue as string);
      } else if (propertyName === "playSound") {
        setIsBGMPlaying((prev) => !prev);
        console.log("BGM再生:", !isSoundPlaying);
      }
    }
  );

  const validMoves = getValidMoves(currentPlayer);

  const getBoardStyle = (type: string) => {
    switch (type) {
      case "standard":
        return {
          fill: "#1E1E1E",
          cellFill: "#15803D",
          blackStone: "#000000",
          blackStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          whiteStone: "#FFFFFF",
          whiteStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          recommendFill: "#000000",
          stroke: "",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
          textFill: "#FFFFFF",
          stonePreviewBackground: "#DEDEDE",
        };
      default:
        return {
          fill: "#1e1e1e",
          cellFill: "#4a4a4a",
          blackStone: "#000000",
          blackStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          whiteStone: "#FFFFFF",
          whiteStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          recommendFill: "#808080",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
          textFill: "#FFFFFF",
          stonePreviewBackground: "#DEDEDE",
        };
      case "vintage":
        return {
          fill: "#004085",
          cellFill: "#F3F3E6",
          blackStone: "#033973",
          blackStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          whiteStone: "#E69500",
          whiteStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          recommendFill: "#808080",
          stroke: "",
          strokeWidth: 0,
          strokeAlign: "inside" as const,
          textFill: "#FFFFFF",
          stonePreviewBackground: "#ffffff",
        };
      case "cyberpunk":
        return {
          fill: "#0A0E27",
          cellFill: "#0A0E27",
          blackStone: "#FF00FF",
          blackStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          whiteStone: "#00FFFF",
          whiteStoneEffect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 1 },
            offset: { x: 0, y: 1 },
            blur: 0,
          },
          recommendFill: "#67E8F9",
          stroke: "#4EDBEF",
          strokeWidth: 1,
          strokeAlign: "inside" as const,
          textFill: "#FFFFFF",
          stonePreviewBackground: "#ffffff",
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
      {gameStarted && (
        <ScoreBoard
          boardStyle={boardStyle}
          players={players}
          currentPlayer={currentPlayer}
          scores={scores}
          gameOver={gameOver}
        />
      )}
    </AutoLayout>
  );
}
