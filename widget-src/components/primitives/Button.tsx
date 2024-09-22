const { widget } = figma;
const { AutoLayout, Text } = widget;

export function Button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <AutoLayout
      cornerRadius={8}
      padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
      fill="#000000"
    >
      <Text onClick={onClick} fill="#FFFDFD">
        {label}
      </Text>
    </AutoLayout>
  );
}
