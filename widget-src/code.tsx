const { widget, notify } = figma;
const {
  AutoLayout,
  Text,
  Frame,
  Fragment,
  Ellipse,
  Line,
  Rectangle,
  Image,
  Span,
  Input,
  useSyncedState,
  useSyncedMap,
  useEffect,
  usePropertyMenu,
  useStickable,
  useStickableHost,
} = widget;

function CustomComponent({ label }: { label: string }) {
  return <Text>{label}</Text>;
}

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Frame
      width={"fill-parent"}
      height={40}
      cornerRadius={10}
      stroke="#000"
      fill="#000000"
      strokeWidth={1}
    >
      <AutoLayout
        padding={10}
        cornerRadius={10}
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        width="hug-contents"
        height="hug-contents"
      >
        <Text onClick={onClick} fill="#FFFDFD">
          {label}
        </Text>
      </AutoLayout>
    </Frame>
  );
}

function EllipseWithImage({ src }: { src: string }) {
  return (
    <Ellipse
      fill={{
        type: "image",
        src: src,
        imageSize: { width: 150, height: 150 },
        scaleMode: "fit",
        rotation: 0,
        scalingFactor: 1.2,
      }}
      stroke="#000000"
      strokeWidth={2}
      width={200}
      height={200}
    />
  );
}

function CustomComponentWithChildren({
  children,
}: {
  children: FigmaDeclarativeNode | FigmaDeclarativeNode[];
}) {
  return (
    <AutoLayout>
      {children}
      <Text x={0} y={0} positioning="absolute">
        🍟
      </Text>
    </AutoLayout>
  );
}

function Widget() {
  const [foo, setFoo] = useSyncedState("foo", () => 0);
  const [bar, setBar] = useSyncedState("bar", 0);
  const [player1, setPlayer1] = useSyncedState("player1", {
    name: "",
    icon: "",
  });
  const [player2, setPlayer2] = useSyncedState("player2", {
    name: "",
    icon: "",
  });

  const bazMap = useSyncedMap("baz");

  // プレイヤー用の SyncedMap を追加
  const players = useSyncedMap("players");

  // handleJoin 関数を更新
  const handleJoin = () => {
    const currentUser = figma.currentUser;
    const user = currentUser ? currentUser.name : "Unknown User";
    const icon =
      currentUser && currentUser.photoUrl ? currentUser.photoUrl : "";

    if (players.size < 2) {
      players.set(user, icon);
      notify(`${user} が参加しました`);
    }
  };

  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Action",
        propertyName: "action",
      },
      {
        itemType: "separator",
      },
      {
        itemType: "color-selector",
        propertyName: "color-selector",
        tooltip: "Color selector",
        selectedOption: "#000",
        options: [{ option: "#000", tooltip: "Black" }],
      },
      {
        itemType: "dropdown",
        propertyName: "dropdown",
        tooltip: "Dropdown",
        selectedOption: "option1",
        options: [{ option: "option1", label: "Option 1" }],
      },
      {
        itemType: "toggle",
        tooltip: "Toggle",
        propertyName: "toggle",
        isToggled: true,
      },
      {
        itemType: "link",
        propertyName: "link",
        tooltip: "link",
        href: "www.google.com",
      },
      {
        tooltip: "link with icon null",
        propertyName: "Link",
        itemType: "link",
        href: "https://asana.com",
        icon: null,
      },
    ],
    ({ propertyName, propertyValue }) => {}
  );

  useStickable(async ({ newHostId, oldHostId }) => {
    console.log(newHostId);
    console.log(oldHostId);
  });

  return (
    <AutoLayout direction="vertical" spacing={20} padding={20}>
      {/* // {{ モーダルの追加 }} */}
      <Text>Waiting for 2 players</Text>
      <Button label="Join" onClick={handleJoin} />
      <AutoLayout direction="horizontal" spacing={20}>
        {Array.from(players.values()).map((icon, index) => (
          // <Image key={index} src={icon as string} />
          <EllipseWithImage key={index} src={icon as string} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
