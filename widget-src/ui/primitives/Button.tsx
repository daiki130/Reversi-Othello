const { widget } = figma;
const { AutoLayout, Text } = widget;

export function Button({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <AutoLayout
      cornerRadius={8}
      padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
      fill={disabled ? "#7F7F7F" : "#000000"}
      opacity={disabled ? 0.5 : 1}
      width={160}
      verticalAlignItems="center"
      horizontalAlignItems="center"
    >
      <Text
        onClick={disabled ? undefined : onClick}
        fill="#FFFDFD"
        opacity={1}
        fontFamily="Radio Canada Big"
        fontWeight={600}
      >
        {label}
      </Text>
    </AutoLayout>
  );
}
