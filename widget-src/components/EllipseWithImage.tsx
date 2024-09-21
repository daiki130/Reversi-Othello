const { widget } = figma;
const {
  Ellipse,
} = widget;


export function EllipseWithImage({ src }: { src: string }) {
    return (
      <Ellipse
        fill={{
          type: "image",
          src: src,
          imageSize: { width: 150, height: 150 },
          scaleMode: "fit",
          rotation: 0,
        }}
        stroke="#000000"
        strokeWidth={2}
        strokeAlign="outside"
        width={48}
        height={48}
        x={-24}
        y={-24}
      />
    );
  }