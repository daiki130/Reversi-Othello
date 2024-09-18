(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var {
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
    useSyncedState,
    useSyncedMap,
    usePropertyMenu,
    useEffect,
    useStickable,
    useStickableHost,
    useWidgetId,
    register,
    waitForTask
  } = widget;
  function Widget() {
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "horizontal",
      horizontalAlignItems: "center",
      verticalAlignItems: "center",
      height: "hug-contents",
      padding: 8,
      fill: "#FFFFFF",
      cornerRadius: 8,
      spacing: 12
    }, /* @__PURE__ */ figma.widget.h(Text, {
      fontSize: 32,
      horizontalAlignText: "center"
    }, "hey"));
  }
  widget.register(Widget);
})();
