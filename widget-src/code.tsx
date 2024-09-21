const { widget, notify } = figma;
const { useSyncedState, AutoLayout, Text, usePropertyMenu, useSyncedMap } =
  widget;

import { Button } from "./components/Button";
import { Stone } from "./components/Stone";
import { EllipseWithImage } from "./components/EllipseWithImage";
import { OthelloBoard } from "./components/board";

function Widget() {
  const [gameStarted, setGameStarted] = useSyncedState("gameStarted", false);

  const [label, setLabel] = useSyncedState(
    "label",
    "👇 Pick a stone to start the game."
  );
  const [description, setDescription] = useSyncedState(
    "description",
    "Waiting for 2 players."
  );
  const [buttonLabel, setButtonLabel] = useSyncedState("buttonLabel", "Join");
  // プレイヤー用の SyncedMap を追加
  const players = useSyncedMap("players");
  // handleJoin 関数を更新
  const handleJoin = () => {
    const currentUser = figma.currentUser;
    const user = currentUser ? currentUser.name : "Unknown User";
    const icon =
      currentUser && currentUser.photoUrl ? currentUser.photoUrl : "";

    // ユーザーが既に登録されているかチェック
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

  function handleGameStart() {
    if (players.size === 2) {
      setGameStarted(true);
    }
  }

  if (gameStarted) {
    return <OthelloBoard />;
  }

  return (
    <AutoLayout
      direction="vertical"
      spacing={20}
      padding={24}
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
          <EllipseWithImage key={index} src={icon as string} stroke="" strokeWidth={2} strokeAlign="outside" />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
