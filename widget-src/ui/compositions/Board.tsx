const { widget } = figma;
const { AutoLayout, Frame, Ellipse, useSyncedState } = widget;

import {
  useGameState,
  useInitializeBoard,
  useGetValidMoves,
  cellSize,
  boardSize,
  useGetFlippedPieces,
  useGetBoardStyle,
  useScores,
  useGameMenu,
  useResetGame,
  useSwitchTurn,
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
  const [scores, setScores] = useSyncedState("scores", { black: 2, white: 2 });
  const [passCount, setPassCount] = useSyncedState("passCount", 0);
  const [winner, setWinner] = useSyncedState<string | null>("winner", null);
  const [isSoundPlaying, setIsBGMPlaying] = useSyncedState(
    "isSoundPlaying",
    false
  );

  // ゲームのリセット処理を呼び出す
  const resetGame = useResetGame(
    setBoard,
    setCurrentPlayer,
    setScores,
    setPassCount,
    setGameState,
    setWinner,
    useInitializeBoard
  );

  // ボードのセルをクリックしたときの処理
  function handleCellClick(row: number, col: number) {
    // ゲームが終了しているか、すでにそのセルが埋まっている場合は何もしない
    if (gameState === "finished" || board[row][col] !== null) return;

    // 選択したセルに基づいてひっくり返すべきピースを取得
    const flippedPieces = useGetFlippedPieces(row, col, currentPlayer, board);
    // ひっくり返すピースがない場合は何もしない
    if (flippedPieces.length === 0) return;

    // 新しいボードを作成
    const newBoard = board.map((row) => [...row]);
    // 選択したセルに現在のプレイヤーのマークを追加
    newBoard[row][col] = currentPlayer;
    // ひっくり返すピースを更新
    flippedPieces.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer;
    });

    // 新しいスコアを計算
    const newScores = useScores(newBoard);

    // ボード、スコア、プレイヤーを同時に更新
    setBoard(newBoard);
    setScores(newScores);
    setPassCount(0);

    // ターンを切り替える
    useSwitchTurn(
      newBoard,
      currentPlayer,
      setCurrentPlayer,
      newScores,
      setGameState,
      setWinner,
      setPassCount,
      useGetValidMoves,
    );
  }

  // ゲームメニューの作成
  useGameMenu(
    resetGame,
    boardType,
    setBoardType,
    setIsBGMPlaying,
    isSoundPlaying
  );

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
          gameState={gameState}
          winner={winner}
        />
      )}
    </AutoLayout>
  );
}
