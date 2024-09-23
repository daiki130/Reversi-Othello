const { widget } = figma;
const { AutoLayout, Text } = widget;

import { Stone } from "../primitives/Stone";
import { Button } from "../primitives/Button";
import { EllipseWithImage } from "../primitives/EllipseWithImage";

export function Modal({
  handleJoin,
  handleGameStart,
  players,
  label,
  description,
  buttonLabel,
}: {
  handleJoin: () => void;
  handleGameStart: () => void;
  players: SyncedMap<unknown>;
  label: string;
  description: string;
  buttonLabel: string;
}) {
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
