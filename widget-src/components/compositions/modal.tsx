const { widget, notify } = figma;
const { AutoLayout, Text, Image, useSyncedState, useSyncedMap } = widget;

import { Stone } from "../primitives/Stone";
import { Button } from "../primitives/Button";
import { EllipseWithImage } from "../primitives/EllipseWithImage";

interface Player {
  name: string;
  icon: string;
}

export function Modal({
  players,
  setGameStarted
}: {
  players: SyncedMap<unknown>;
  setGameStarted: (value: boolean) => void;
}) {
  const [label, setLabel] = useSyncedState("label", "Choose a stone");
  const [buttonLabel, setButtonLabel] = useSyncedState(
    "buttonLabel",
    "Start Game"
  );
  const [blackPlayer, setBlackPlayer] = useSyncedState<Player | null>("blackPlayer", null);
  const [whitePlayer, setWhitePlayer] = useSyncedState<Player | null>("whitePlayer", null);

  const handleJoin = (color: "black" | "white") => {
    const currentUser = figma.currentUser;
    const user = currentUser ? currentUser.name : "Unknown User";
    const icon =
      currentUser && currentUser.photoUrl ? currentUser.photoUrl : "";

    if (players.has(user)) {
      notify("あなたはすでに登録されています");
      return;
    }

    if (players.size < 2) {
      players.set(user, icon);
      notify(`${user} が参加しました`);
    }
    if (players.size === 1) {
      setLabel("Waiting for 1 more player...");
    }
    if (players.size === 2) {
      setLabel("Ready to start!");
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
      setGameStarted(true);
    }
  };

  return (
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
      fill="#FFFFFF"
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
    >
      <Image
        src={
          "https://raw.githubusercontent.com/daiki130/Reversi-Othello/main/widget-src/assets/logo.png"
        }
        width={245}
        height={103}
      />
      {players.size < 2 && (
        <Text fontSize={14} fontWeight={400}>
          {label}
        </Text>
      )}
      <AutoLayout
        direction="horizontal"
        verticalAlignItems="center"
        horizontalAlignItems="center"
        spacing={24}
        overflow="visible"
      >
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
          <Stone color="white" onClick={() => handleJoin("white")} />
        )}
        <Text fontFamily="Karantina">vs</Text>
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
          <Stone color="black" onClick={() => handleJoin("black")} />
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
      {/* <AutoLayout direction="horizontal" spacing={-4} overflow="visible">
        {Array.from(players.values()).map((icon, index) => (
          <EllipseWithImage
            
            key={index}
            src={icon as string}
            stroke=""
            strokeWidth={2}
            strokeAlign="outside"
          />
        ))}
      </AutoLayout> */}
    </AutoLayout>
  );
}
