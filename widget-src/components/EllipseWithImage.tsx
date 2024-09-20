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
          scalingFactor: 1.2,
        }}
        stroke="#000000"
        strokeWidth={2}
        width={50}
        height={50}
      />
    );
  }