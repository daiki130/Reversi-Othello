// ゲームの設定を管理する
const { widget } = figma;
const { useSyncedState } = widget;

import { useGameState, useInitializeBoard } from "../hooks";

export const useGameSettings = () => {
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

    return {
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
        setIsBGMPlaying
    }
}
