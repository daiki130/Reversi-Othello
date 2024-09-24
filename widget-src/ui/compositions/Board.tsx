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
  useGetBoardStyle,
  useScores,
  useGameMenu,
} from "../hooks";

import { ScoreBoard } from "./ScoreBoard";

export function Board({ players }: { players: SyncedMap<unknown> }) {
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
  const [isSoundPlaying, setIsBGMPlaying] = useSyncedState(
    "isSoundPlaying",
    false
  );

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
    const newScores = useScores(newBoard);

    // ボード、スコア、プレイヤーを同時に更新
    setBoard(newBoard);
    setScores(newScores);
    setPassCount(0);
    switchTurn();
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

  useGameMenu(
    resetGame,
    boardType,
    setBoardType,
    setIsBGMPlaying,
    isSoundPlaying
  );

  const validMoves = getValidMoves(currentPlayer);

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
      {gameState === "playing" && (
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
