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
  SVG,
  useSyncedState,
  useSyncedMap,
  useEffect,
  usePropertyMenu,
  useStickable,
  useStickableHost,
} = widget;

import { Button } from "./components/Button";
import { EllipseWithImage } from "./components/EllipseWithImage";
const blackFigmaIcon = `
  <svg width="23" height="32" viewBox="0 0 172 247" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Group">
      <path id="Rectangle 55" d="M164 46.5C164 67.763 146.763 85 125.5 85L86 85L86 8.0001L125.5 8.0001C146.763 8.0001 164 25.2371 164 46.5V46.5Z" stroke="black" stroke-width="15.081"/>
      <path id="Rectangle 55_2" d="M8 46.5C8 67.763 25.237 85 46.5 85L86 85L86 8.0001L46.5 8.0001C25.237 8.0001 8 25.2371 8 46.5V46.5Z" stroke="black" stroke-width="15.081"/>
      <path id="Rectangle 55_3" d="M8 123.501C8 144.764 25.237 162.001 46.5 162.001H86L86 85.0011L46.5 85.0011C25.237 85.0011 8 102.238 8 123.501V123.501Z" stroke="black" stroke-width="15.081"/>
      <path id="Rectangle 55_4" d="M8 200.5C8 221.763 25.4854 239 46.7484 239V239C68.2875 239 86 221.539 86 200L86 162H46.5C25.237 162 8 179.237 8 200.5V200.5Z" stroke="black" stroke-width="15.081"/>
      <path id="Rectangle 55_5" d="M86 123.501C86 144.764 103.237 162.001 124.5 162.001H125.5C146.763 162.001 164 144.764 164 123.501V123.501C164 102.238 146.763 85.0011 125.5 85.0011H124.5C103.237 85.0011 86 102.238 86 123.501V123.501Z" stroke="black" stroke-width="15.081"/>
    </g>
  </svg>
`;
const whiteFigmaIcon = `
  <svg width="23" height="32" viewBox="0 0 172 247" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Group">
      <path id="Rectangle 55" d="M164 46.5C164 67.763 146.763 85 125.5 85L86 85L86 8.0001L125.5 8.0001C146.763 8.0001 164 25.2371 164 46.5V46.5Z" stroke="white" stroke-width="15.081"/>
      <path id="Rectangle 55_2" d="M8 46.5C8 67.763 25.237 85 46.5 85L86 85L86 8.0001L46.5 8.0001C25.237 8.0001 8 25.2371 8 46.5V46.5Z" stroke="white" stroke-width="15.081"/>
      <path id="Rectangle 55_3" d="M8 123.501C8 144.764 25.237 162.001 46.5 162.001H86L86 85.0011L46.5 85.0011C25.237 85.0011 8 102.238 8 123.501V123.501Z" stroke="white" stroke-width="15.081"/>
      <path id="Rectangle 55_4" d="M8 200.5C8 221.763 25.4854 239 46.7484 239V239C68.2875 239 86 221.539 86 200L86 162H46.5C25.237 162 8 179.237 8 200.5V200.5Z" stroke="white" stroke-width="15.081"/>
      <path id="Rectangle 55_5" d="M86 123.501C86 144.764 103.237 162.001 124.5 162.001H125.5C146.763 162.001 164 144.764 164 123.501V123.501C164 102.238 146.763 85.0011 125.5 85.0011H124.5C103.237 85.0011 86 102.238 86 123.501V123.501Z" stroke="white" stroke-width="15.081"/>
    </g>
  </svg>
`;

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
  const [description, setDescription] = useSyncedState(
    "description",
    "Waiting for 2 players"
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

    if (players.size < 2) {
      players.set(user, icon);
      notify(`${user} が参加しました`);
    }
    if (players.size === 1) {
      setDescription("Waiting for 1 more player");
      setButtonLabel("Join");
    }
    if (players.size === 2) {
      setDescription("Let's play!");
      setButtonLabel("Start Game");
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
      minWidth={240}
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
      <Text>{description}</Text>
      <SVG src={blackFigmaIcon} />
      <SVG src={whiteFigmaIcon} />
      <Button label={buttonLabel} onClick={handleJoin} />
      <AutoLayout direction="horizontal" spacing={-4}>
        {Array.from(players.values()).map((icon, index) => (
          <EllipseWithImage key={index} src={icon as string} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
