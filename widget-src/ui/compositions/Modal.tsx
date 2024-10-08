const { widget, notify, loadFontAsync } = figma;
const {
  AutoLayout,
  Text,
  Image,
  useSyncedState,
  Fragment,
  useEffect,
} = widget;

import { Stone } from "../primitives/Stone";
import { Button } from "../primitives/Button";
import { EllipseWithImage } from "../primitives/EllipseWithImage";
import { useGameSettings, useInitializeBoard } from "../hooks";

interface Player {
  name: string;
  icon: string;
}

export function Modal({ players }: { players: SyncedMap<unknown> }) {
  const {
    gameState,
    setGameState,
    setBoardType,
    setBoard,
    setCurrentPlayer,
    setScores,
    setPassCount,
    winner,
    setWinner,
  } = useGameSettings();
  const [label, setLabel] = useSyncedState("label", "Waiting for 2 player...");
  const [buttonLabel, setButtonLabel] = useSyncedState(
    "buttonLabel",
    "Start Game"
  );
  const [blackPlayer, setBlackPlayer] = useSyncedState<Player | null>(
    "blackPlayer",
    null
  );
  const [whitePlayer, setWhitePlayer] = useSyncedState<Player | null>(
    "whitePlayer",
    null
  );
  const [fontLoaded, setFontLoaded] = useSyncedState("fontLoaded", false);

  useEffect(() => {
    const loadFont = async () => {
      await loadFontAsync({
        family: "Pacifico",
        style: "Regular",
      });
      setFontLoaded(true);
    };
    loadFont();
  });

  const handleJoin = (color: "black" | "white") => {
    const currentUser = figma.currentUser;
    const user = currentUser ? currentUser.name : "Unknown User";
    const icon =
      currentUser && currentUser.photoUrl ? currentUser.photoUrl : "";

    if (players.has(user)) {
      notify("You are already registered");
      return;
    }

    if (players.size < 2) {
      players.set(user, { icon, stone: color });
      notify(
        `${user} has joined with ${
          color === "black" ? "black" : "white"
        } stones`
      );
    }
    if (players.size === 1) {
      setLabel("Waiting for 1 more player...");
    }
    if (players.size === 2) {
      setLabel("✨ Ready to start!");
    }

    const playerInfo: Player = { name: user, icon };

    if (color === "black" && !blackPlayer) {
      setBlackPlayer(playerInfo);
    } else if (color === "white" && !whitePlayer) {
      setWhitePlayer(playerInfo);
    }
  };

  const handleGameStart = () => {
    if (players.size === 2) {
      setGameState("playing");
    }
  };

  const handleGameRestart = () => {
    setBoard(useInitializeBoard());
    setCurrentPlayer("black");
    setScores({ black: 2, white: 2 });
    setPassCount(0);
    setGameState("entry");
    setBoardType("standard");
    setLabel("Waiting for 2 player...");
    if (blackPlayer?.name) {
      players.delete(blackPlayer.name);
      setBlackPlayer(null);
    }
    if (whitePlayer?.name) {
      players.delete(whitePlayer.name);
      setWhitePlayer(null);
    }
    setWinner(null);
  };

  const winnerDisplay = winner ? (
    <Fragment>
      {winner !== "draw" ? (
        // winnerがblackかwhiteの場合の処理
        <AutoLayout
          direction="vertical"
          spacing={20}
          padding={{
            top: 8,
            bottom: 32,
            left: 24,
            right: 24,
          }}
          minWidth={240}
          verticalAlignItems="center"
          horizontalAlignItems="center"
          fill="#F9F9F9"
          cornerRadius={10}
          effect={{
            type: "drop-shadow",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 0.3,
            },
            blur: 10,
            offset: { x: 0, y: 0 },
          }}
          positioning="absolute"
          x={97}
          y={98}
        >
          <Text fontSize={40} fontFamily="Rampart One" fontWeight={400}>
            Winner
          </Text>
          <AutoLayout
            direction="vertical"
            spacing={24}
            horizontalAlignItems="center"
          >
            {winner === "black" && blackPlayer && (
              <EllipseWithImage
                width={60}
                height={60}
                src={blackPlayer.icon}
                stroke=""
                strokeWidth={2}
                strokeAlign="outside"
              />
            )}
            {winner === "white" && whitePlayer && (
              <EllipseWithImage
                width={60}
                height={60}
                src={whitePlayer.icon}
                stroke=""
                strokeWidth={2}
                strokeAlign="outside"
              />
            )}
            <Button
              label="Restart Game"
              onClick={handleGameRestart}
              disabled={false}
            />
          </AutoLayout>
        </AutoLayout>
      ) : (
        // ドローの場合の処理
        <AutoLayout
          direction="vertical"
          spacing={20}
          padding={{
            top: 8,
            bottom: 32,
            left: 24,
            right: 24,
          }}
          minWidth={240}
          verticalAlignItems="center"
          horizontalAlignItems="center"
          fill="#F9F9F9"
          cornerRadius={10}
          effect={{
            type: "drop-shadow",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 0.3,
            },
            blur: 10,
            offset: { x: 0, y: 0 },
          }}
          positioning="absolute"
          x={97}
          y={140}
        >
          <Text fontSize={40} fontFamily="Rampart One" fontWeight={400}>
            Draw
          </Text>
          <AutoLayout
            direction="vertical"
            spacing={24}
            horizontalAlignItems="center"
          >
            <Button
              label="Restart Game"
              onClick={handleGameRestart}
              disabled={false}
            />
          </AutoLayout>
        </AutoLayout>
      )}
    </Fragment>
  ) : null;

  return (
    <Fragment>
      {gameState === "finished" ? (
        winnerDisplay
      ) : (
        <AutoLayout
          direction="vertical"
          spacing={20}
          padding={{
            top: 16,
            bottom: 32,
            left: 24,
            right: 24,
          }}
          minWidth={240}
          verticalAlignItems="center"
          horizontalAlignItems="center"
          fill="#F9F9F9"
          cornerRadius={10}
          effect={{
            type: "drop-shadow",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 0.3,
            },
            blur: 10,
            offset: { x: 0, y: 0 },
          }}
          positioning="absolute"
          x={70}
          y={54}
        >
          <Image
            src={
              "https://raw.githubusercontent.com/daiki130/Reversi-Othello/main/widget-src/assets/logo/logo.png"
            }
            width={245}
            height={103}
          />
          <Fragment>
            <Text fontSize={14} fontFamily="Radio Canada Big" fontWeight={400}>
              {label}
            </Text>
            <AutoLayout
              direction="horizontal"
              verticalAlignItems="center"
              horizontalAlignItems="center"
              spacing={24}
              overflow="visible"
            >
              {blackPlayer ? (
                <EllipseWithImage
                  width={60}
                  height={60}
                  src={blackPlayer.icon}
                  stroke=""
                  strokeWidth={2}
                  strokeAlign="outside"
                />
              ) : (
                <Stone
                  color="black"
                  onClick={() => handleJoin("black")}
                  tooltip="Click to join as black"
                />
              )}
              <Text
                fontFamily={fontLoaded ? "Radio Canada Big" : "Inter"}
                fontSize={14}
                fontWeight={700}
              >
                vs
              </Text>
              {whitePlayer ? (
                <EllipseWithImage
                  width={60}
                  height={60}
                  src={whitePlayer.icon}
                  stroke=""
                  strokeWidth={2}
                  strokeAlign="outside"
                />
              ) : (
                <Stone
                  color="white"
                  onClick={() => handleJoin("white")}
                  tooltip="Click to join as white"
                />
              )}
            </AutoLayout>
            {players.size === 2 ? (
              <Button
                label={buttonLabel}
                onClick={handleGameStart}
                disabled={false}
              />
            ) : (
              <Button label={buttonLabel} onClick={() => {}} disabled={true} />
            )}
          </Fragment>
        </AutoLayout>
      )}
    </Fragment>
  );
}
