const { widget } = figma;
const { AutoLayout, SVG } = widget;

export const Stone = ({
  color,
  onClick,
}: {
  color: "black" | "white";
  onClick: () => void;
}) => {
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
  const fillColor = color === "white" ? "#FFFFFF" : "#000000";
  const iconSrc = color === "white" ? blackFigmaIcon : whiteFigmaIcon;
  const innerShadowColor =
    color === "white"
      ? { r: 0, g: 0, b: 0, a: 0.5 } // 白い石の場合、内側の影は黒
      : { r: 1, g: 1, b: 1, a: 0.5 }; // 黒い石の場合、内側の影は白
  const dropShadowColor =
    color === "white"
      ? { r: 0, g: 0, b: 0, a: 0.25 }
      : { r: 0, g: 0, b: 0, a: 0.5 };
  const bluer = color === "white" ? 4 : 8;

  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="center"
      horizontalAlignItems="center"
      spacing={10}
      width={66}
      height={66}
      fill={fillColor}
      effect={[
        {
          type: "drop-shadow",
          color: dropShadowColor,
          offset: { x: 2, y: 0 },
          blur: bluer,
        },
        {
          type: "drop-shadow",
          color: dropShadowColor,
          offset: { x: 0, y: 4 },
          blur: bluer,
        },
        {
          type: "drop-shadow",
          color: dropShadowColor,
          offset: { x: -2, y: 0 },
          blur: bluer,
        },
        {
          type: "inner-shadow",
          color: innerShadowColor,
          offset: { x: -1, y: -1 },
          blur: bluer,
        },
        {
          type: "inner-shadow",
          color: innerShadowColor,
          offset: { x: 1, y: 1 },
          blur: bluer,
        },
      ]}
      cornerRadius={9999}
      onClick={onClick}
    >
      <SVG src={iconSrc} />
    </AutoLayout>
  );
};
