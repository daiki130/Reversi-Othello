const { widget } = figma;
const {
  // Components
  AutoLayout,
  Frame,
  Text,
  Input,
  Rectangle,
  Image,
  SVG,
  Ellipse,
  Line,
  Fragment,

  // Hooks
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  useEffect,
  useStickable,
  useStickableHost,
  useWidgetId,

  // Functions
  register,
  waitForTask,
} = widget;

import { OthelloGame } from "./components/othello-game";

function Widget() {
  return (
    <OthelloGame />
    // <AutoLayout
    //   direction="horizontal"
    //   horizontalAlignItems="center"
    //   verticalAlignItems="center"
    //   height="hug-contents"
    //   padding={8}
    //   fill="#FFFFFF"
    //   cornerRadius={8}
    //   spacing={12}
    // >
    //   <Text fontSize={32} horizontalAlignText="center">
    //     hey
    //   </Text>
    // </AutoLayout>
  );
}
widget.register(Widget);
