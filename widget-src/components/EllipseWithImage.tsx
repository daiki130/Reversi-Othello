const { widget } = figma;
const { Frame, Image } = widget;

export function EllipseWithImage({ 
  src, 
  stroke, 
  strokeWidth, 
  strokeAlign 
}: { 
  src: string, 
  stroke?: string, 
  strokeWidth?: number,
  strokeAlign?: "inside" | "center" | "outside"
}) {
  return (
    <Frame
      width={32}
      height={32}
      cornerRadius={16}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeAlign={strokeAlign}
      overflow="visible"
    >
      <Image
        src={src}
        width={32}
        height={32}
        cornerRadius={16}
      />
    </Frame>
  );
}