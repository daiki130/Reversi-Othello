const { widget, notify } = figma;
const { useSyncedState, AutoLayout, Text, usePropertyMenu, useSyncedMap } =
  widget;

import { Board } from "./components/compositions/board";
import { Modal } from "./components/compositions/modal";

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

  const [boardType, setBoardType] = useSyncedState("boardType", "dark");

  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "ゲームをリセット",
        propertyName: "reset",
      },
      {
        itemType: "separator",
      },
      {
        itemType: "dropdown",
        propertyName: "boardType",
        tooltip: "ボードタイプを変更",
        selectedOption: boardType,
        options: [
          { option: "standard", label: "Standard" },
          { option: "dark", label: "Dark" },
          { option: "vintage", label: "Vintage" },
          { option: "cyberpunk", label: "CyberPunk" },
        ],
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "reset") {
        console.log("reset");
        // resetGame();
      } else if (propertyName === "boardType") {
        console.log(propertyValue);
        setBoardType(propertyValue as string);
      }
    }
  );

  if (gameStarted) {
    return <Board boardType={boardType} />;
  }

  return (
    <Modal
      handleJoin={handleJoin}
      handleGameStart={handleGameStart}
      players={players}
      label={label}
      description={description}
      buttonLabel={buttonLabel}
    />
  );
}

widget.register(Widget);
