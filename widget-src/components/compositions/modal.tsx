const { widget, notify } = figma;
const { AutoLayout, Text, Image, useSyncedState, useSyncedMap } = widget;

import { Stone } from "../primitives/Stone";
import { Button } from "../primitives/Button";
import { EllipseWithImage } from "../primitives/EllipseWithImage";

export function Modal() {
  const [label, setLabel] = useSyncedState(
    "label",
    "👇 Pick a stone to start the game."
  );
  const [description, setDescription] = useSyncedState(
    "description",
    "Waiting for 2 players."
  );
  const [buttonLabel, setButtonLabel] = useSyncedState("buttonLabel", "Join");
  const players = useSyncedMap("players");
  const [gameStarted, setGameStarted] = useSyncedState("gameStarted", false);

  const handleJoin = () => {
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
      setDescription("Waiting for 1 more player");
    }
    if (players.size === 2) {
      setDescription("Let's play!");
      setButtonLabel("Start Game");
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
      <Image src={"https://raw.githubusercontent.com/daiki130/Reversi-Othello/main/widget-src/assets/logo.png"} width={264} height={110} />
      {players.size < 2 && <Text>{label}</Text>}
      <AutoLayout
        direction="horizontal"
        verticalAlignItems="center"
        horizontalAlignItems="center"
        spacing={32}
        overflow="visible"
      >
        <Stone color="white" onClick={handleJoin} />
        <Stone color="black" onClick={handleJoin} />
      </AutoLayout>
      {players.size === 2 ? (
        <Button label={buttonLabel} onClick={handleGameStart} />
      ) : (
        <Text>{description}</Text>
      )}
      <AutoLayout direction="horizontal" spacing={-4} overflow="visible">
        {Array.from(players.values()).map((icon, index) => (
          <EllipseWithImage
            key={index}
            src={icon as string}
            stroke=""
            strokeWidth={2}
            strokeAlign="outside"
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}
