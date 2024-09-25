const { widget } = figma;
const { Frame, Image } = widget;

export function EllipseWithImage({
  width,
  height,
  src,
  stroke,
  strokeWidth,
  strokeAlign,
  isStrokeDash,
}: {
  width: number;
  height: number;
  src: string;
  stroke?: string;
  strokeWidth?: number;
  strokeAlign?: "inside" | "center" | "outside";
  isStrokeDash?: boolean;
}) {
  return (
    <Frame
      width={width}
      height={height}
      cornerRadius={16}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeAlign={strokeAlign}
      overflow="visible"
      strokeDashPattern={isStrokeDash ? [4, 4] : undefined}
    >
      <Image src={src} width={width} height={height} cornerRadius={9999} />
    </Frame>
  );
}
