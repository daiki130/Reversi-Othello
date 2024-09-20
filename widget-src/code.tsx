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

import { Button } from "./components/Button";
import { EllipseWithImage } from "./components/EllipseWithImage";

function CustomComponent({ label }: { label: string }) {
  return <Text>{label}</Text>;
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
    <AutoLayout
      direction="vertical"
      spacing={20}
      padding={24}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      fill="#ffffff"
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
      <Text>Waiting for 2 players</Text>
      <Button label="Join" onClick={handleJoin} />
      <AutoLayout direction="horizontal" spacing={-4} >
        {Array.from(players.values()).map((icon, index) => (
          <EllipseWithImage key={index} src={icon as string} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
