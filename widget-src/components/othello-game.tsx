const { widget } = figma;

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image"; // アイコン表示のためにImageコンポーネントをインポート
import * as Dialog from "@radix-ui/react-dialog";
import { User } from "lucide-react"; // lucide-react の User アイコンをインポート

import "../styles/globals.css"; // グローバルスタイルを読み込む

type CellState = "black" | "white" | null;
type Player = "black" | "white";
type GameState = "entry" | "playing" | "finished";

const BOARD_SIZE = 8;

const themes = {
  standard: {
    board: "bg-green-900",
    cell: "bg-green-700",
    validMove: "bg-green-500",
    blackPiece: "bg-black",
    whitePiece: "bg-white",
  },
};

export function OthelloGame() {
  const [gameState, setGameState] = useState<GameState>("entry");
  const [players, setPlayers] = useState<{
    black: { name: string; icon: string };
    white: { name: string; icon: string };
  }>({
    black: { name: "", icon: "" },
    white: { name: "", icon: "" },
  });
  const [board, setBoard] = useState<CellState[][]>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("black");
  const [score, setScore] = useState({ black: 2, white: 2 });
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof themes>("standard");

  const [flipSound, setFlipSound] = useState<HTMLAudioElement | null>(null);
  const [invalidMoveSound, setInvalidMoveSound] =
    useState<HTMLAudioElement | null>(null);

  const [passCount, setPassCount] = useState(0);
  const [winner, setWinner] = useState<Player | null>(null);
  const { width, height } = useWindowSize();

  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const [pluginId, setPluginId] = useState<string>("");

  // ユーザーアイコン選択ステートの追加
  const [selectedUser, setSelectedUser] = useState<"black" | "white" | null>(
    null
  );

  useEffect(() => {
    setFlipSound(new Audio("/sounds/527530__jerimee__objective-complete.wav"));
    setInvalidMoveSound(new Audio("/sounds/invalid.mp3"));
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const { pluginMessage } = event.data;
      if (!pluginMessage) return;
      if (pluginMessage.type === "user") {
        const { name, photoUrl } = pluginMessage.user;
        const { playerType } = pluginMessage;
        console.log(name, photoUrl, playerType);
        if (playerType === "black") {
          setPlayers((prev) => ({
            ...prev,
            black: { name, icon: photoUrl },
          }));
        } else if (playerType === "white") {
          setPlayers((prev) => ({
            ...prev,
            white: { name, icon: photoUrl },
          }));
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const requestUser = (playerType: "black" | "white") => {
    parent.postMessage(
      { pluginMessage: { type: "get-user", playerType }, pluginId: PLUGIN_ID },
      "*"
    );
  };

  function initializeBoard(): CellState[][] {
    const board = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));
    const mid = BOARD_SIZE / 2;
    board[mid - 1][mid - 1] = board[mid][mid] = "white";
    board[mid - 1][mid] = board[mid][mid - 1] = "black";
    return board;
  }

  function handlePlayerEntry(player: Player, name: string) {
    setPlayers((prev) => ({ ...prev, [player]: { name, icon: "" } }));
  }

  function startGame() {
    if (players.black.name && players.white.name) {
      setGameState("playing");
      updateValidMoves("black");
    }
  }

  function handleCellClick(row: number, col: number) {
    if (gameState !== "playing" || board[row][col] !== null) return;
    if (!validMoves.some(([r, c]) => r === row && c === col)) {
      if (soundEnabled) {
        invalidMoveSound?.play();
      }
      return;
    }

    const flippedCells = getFlippedCells(row, col, currentPlayer);
    if (flippedCells.length === 0) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    flippedCells.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer;
    });

    setBoard(newBoard);
    setPassCount(0);
    const nextPlayer = currentPlayer === "black" ? "white" : "black";
    setCurrentPlayer(nextPlayer);
    if (soundEnabled) {
      flipSound?.play();
    }

    updateValidMoves(nextPlayer);
  }

  function getFlippedCells(
    row: number,
    col: number,
    player: Player
  ): [number, number][] {
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

    const flippedCells: [number, number][] = [];

    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      const cellsToFlip: [number, number][] = [];

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === null) break;
        if (board[x][y] === opponent) {
          cellsToFlip.push([x, y]);
        } else if (board[x][y] === player) {
          flippedCells.push(...cellsToFlip);
          break;
        }
        x += dx;
        y += dy;
      }
    });

    return flippedCells;
  }

  function updateValidMoves(player: Player) {
    const moves: [number, number][] = []; // 有効な手を格納する配列
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null) {
          const flipped = getFlippedCells(row, col, player);
          if (flipped.length > 0) {
            moves.push([row, col]); // 有効な手として追加
          }
        }
      }
    }
    setValidMoves(moves);

    if (moves.length === 0) {
      handlePass(player);
    }
  }

  function handlePass(player: Player) {
    if (passCount >= 2) {
      // 連続パスが2回になったらゲームを終了
      setGameState("finished");
    } else {
      const nextPlayer = player === "black" ? "white" : "black";
      setCurrentPlayer(nextPlayer);
      setPassCount((prev) => prev + 1); // パスカウントを増す
    }
  }

  useEffect(() => {
    const newScore = board.reduce(
      (acc, row) => {
        row.forEach((cell) => {
          if (cell === "black") acc.black++;
          if (cell === "white") acc.white++;
        });
        return acc;
      },
      { black: 0, white: 0 }
    );
    setScore(newScore);

    if (gameState === "finished") {
      // ゲーム終了に勝者を決定
      if (newScore.black > newScore.white) {
        setWinner("black");
      } else if (newScore.white > newScore.black) {
        setWinner("white");
      } else {
        setWinner(null); // 引き分けの場合
      }
    } else if (newScore.black + newScore.white === BOARD_SIZE * BOARD_SIZE) {
      if (newScore.black > newScore.white) {
        setWinner("black");
      } else if (newScore.white > newScore.black) {
        setWinner("white");
      } else {
        setWinner(null); // 引き分けの場合
      }
      setGameState("finished");
    }
  }, [board, gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      updateValidMoves(currentPlayer);
    }
  }, [board, currentPlayer, passCount]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 p-4 relative font-kongtext">
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 p-4 relative font-guanine">
      {/* Player Entry Form */}
      {gameState === "entry" && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
          <h2 className="text-2xl font-bold mb-4 text-center">Player Entry</h2>
          <div>
            {/* ユーザーアイコンの追加 */}
            <div className="mb-4">
              <div className="flex space-x-4 items-center">
                <div className="flex flex-1 items-center flex-col space-y-2">
                  <span className="text-xs font-semibold text-gray-700">
                    player1
                  </span>
                  <button
                    onClick={() => requestUser("black")}
                    className={`w-[100px] h-[100px] rounded-lg border-dashed flex items-center justify-center border ${
                      selectedUser === "black"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {players.black.icon ? (
                      <Image
                        src={players.black.icon}
                        alt="Black Player Icon"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* 「VS」要素を追加 */}
                <span className="text-xl font-bold text-gray-700">vs</span>

                <div className="flex flex-1 items-center flex-col space-y-2">
                  <span className="text-xs font-semibold text-gray-700">
                    player2
                  </span>
                  <button
                    onClick={() => requestUser("white")}
                    className={`w-[100px] h-[100px] rounded-lg border-dashed flex items-center justify-center border ${
                      selectedUser === "white"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {players.white.icon ? (
                      <Image
                        src={players.white.icon}
                        alt="White Player Icon"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center my-5 justify-between space-x-4">
              <span className="text-sm text-gray-700 mr-2">
                Enable Sound Effects
              </span>
              <Switch
                checked={soundEnabled}
                onCheckedChange={() => setSoundEnabled(!soundEnabled)}
                aria-label="Toggle sound"
                className="mr-2"
              />
            </div>
            <div className="mt-4">
              <Button
                onClick={startGame}
                disabled={!players.black.name || !players.white.name}
                className="w-full"
              >
                Start Game
              </Button>
            </div>
          </div>
        </div>
      )}

      {/*
        ゲーム中および終了時にUIを表示するために条件式を修正
      */}
      {(gameState === "playing" || gameState === "finished") && (
        <>
          <div className="mb-4 text-white text-xl flex items-center">
            Current Player:
            <span className="ml-2">
              {currentPlayer === "black"
                ? players.black.name
                : players.white.name}
            </span>
            <div
              className={`w-6 h-6 rounded-full ml-2 ${
                currentPlayer === "black" ? "bg-black" : "bg-white"
              }`}
            />
          </div>
          <div className="mb-4 text-white text-xl">
            Score - {players.black.name}: {score.black} | {players.white.name}:{" "}
            {score.white}
          </div>
          <div
            className={`${themes[currentTheme].board} grid grid-cols-8 gap-1 p-2 rounded-lg shadow-lg`}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 ${
                    themes[currentTheme].cell
                  } flex items-center justify-center cursor-pointer ${
                    validMoves.some(
                      ([r, c]) => r === rowIndex && c === colIndex
                    )
                      ? themes[currentTheme].validMove
                      : ""
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {cell && (
                    <motion.div
                      className={`w-10 h-10 rounded-full ${
                        cell === "black"
                          ? themes[currentTheme].blackPiece
                          : themes[currentTheme].whitePiece
                      }`}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 180 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {!cell &&
                    validMoves.some(
                      ([r, c]) => r === rowIndex && c === colIndex
                    ) && (
                      <motion.div
                        className="w-4 h-4 rounded-full bg-yellow-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                </motion.div>
              ))
            )}
          </div>
        </>
      )}

      {/* ゲーム終了時のモーダル */}
      {gameState === "finished" && (
        <Dialog.Root open={true}>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-50 w-2/4">
            <Dialog.Title className="text-2xl font-bold mb-4 text-center">
              {winner ? "Winner" : "Draw"}
            </Dialog.Title>
            {winner && (
              <div className="flex justify-center mb-4">
                {players.black.icon ? (
                  <Image
                    src={players.black.icon}
                    alt="Black Player Icon"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                ) : (
                  <Image
                    src={players.white.icon}
                    alt="Black Player Icon"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                )}
              </div>
            )}
            <Dialog.Description className="mb-4 text-center">
              {winner ? `${players[winner].name}` : "The game ended in a draw."}
            </Dialog.Description>
            <Button
              onClick={() => {
                // ゲームをリセットするロジックを追加
                setGameState("entry");
                setBoard(initializeBoard());
                setCurrentPlayer("black");
                setScore({ black: 2, white: 2 });
                setPassCount(0);
                setWinner(null);
              }}
              className="w-full"
            >
              Restart Game
            </Button>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Confetti エフェクトを勝者がいる場合のみ表示するように条件を追加 */}
      {gameState === "finished" && winner && (
        <Confetti width={width} height={height} />
      )}
    </div>
  );
}
