const { widget } = figma
const {
  AutoLayout,
  Text,
  Frame,
  Fragment,
  Ellipse,
  Line,
  Rectangle,
  Span,
  useSyncedState,
  useSyncedMap,
  useEffect,
  usePropertyMenu,
  useStickable,
  useStickableHost,
} = widget

function CustomComponent({ label }: { label: string }) {
  return <Text>{label}</Text>
}

function CustomComponentWithChildren({ children }: {
  children: FigmaDeclarativeNode | FigmaDeclarativeNode[]
}) {
  return (
    <AutoLayout>
      {children}
      <Text x={0} y={0} positioning="absolute">🍟</Text>
    </AutoLayout>
  )
}

function Widget() {
  const [foo, setFoo] = useSyncedState("foo", () => 0)
  const [bar, setBar] = useSyncedState("bar", 0)
  const bazMap = useSyncedMap("baz")

  useEffect(() => {
    console.log(foo)
    console.log(bar)
    if (bazMap.has("hello")) {
      console.log(bazMap.get("hello"))
    }
  })

  usePropertyMenu(
    [
      {
        itemType: 'action',
        tooltip: 'Action',
        propertyName: 'action',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'color-selector',
        propertyName: 'color-selector',
        tooltip: 'Color selector',
        selectedOption: '#000',
        options: [{option: '#000', tooltip: "Black"}],
      },
      {
        itemType: 'dropdown',
        propertyName: 'dropdown',
        tooltip: 'Dropdown',
        selectedOption: 'option1',
        options: [{option: 'option1', label: 'Option 1'}],
      },
      {
        itemType: 'toggle',
        tooltip: 'Toggle',
        propertyName: 'toggle',
        isToggled: true,
      },
      {
        itemType: 'link',
        propertyName: 'link',
        tooltip: 'link',
        href: 'www.google.com',
      },
      {
        tooltip: 'link with icon null',
        propertyName: 'Link',
        itemType: 'link',
        href: 'https://asana.com',
        icon: null,
      },
    ],
    ({propertyName, propertyValue}) => {}
  )

  useStickable(async ({newHostId, oldHostId}) => {
    console.log(newHostId)
    console.log(oldHostId)
  })

  // useStickableHost(async ({stuckNodeIds, unstuckNodeIds}) => {
  //   console.log(stuckNodeIds)
  //   console.log(unstuckNodeIds)
  // })

  return (
    <AutoLayout>
      <Text
        onClick={() => {
          setFoo(foo + 1)
          setBar(bar => bar + 1)
        }}
      >
        {foo}
        {" "}
        {bar}
        <Span>Hello <Span>World</Span></Span>
      </Text>
      <CustomComponentWithChildren>
        <CustomComponent key={1} label="Hello" />
      </CustomComponentWithChildren>
      <Frame width={100} height={200}>
        <Text
          x={{ type: 'left', offset: 5 }}
          y={{ type: 'bottom', offset: 5 }}
        >
          Offsets
        </Text>
        <Fragment>
          <Line />
          <Rectangle width={100} height={100} stroke='#000' strokeDashPattern={[10, 20]}/>
        </Fragment>
        <>
          <Line strokeCap='round'/>
          <Ellipse arcData={{ startingAngle: 1, endingAngle: 1, innerRadius: 1}} />
        </>
      </Frame>
    </AutoLayout>
  )
}

widget.register(Widget)