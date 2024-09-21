const { widget } = figma
const { AutoLayout, Frame, Ellipse, useSyncedState } = widget

export function OthelloBoard() {
  const [board, setBoard] = useSyncedState('board', Array(8).fill(Array(8).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useSyncedState('currentPlayer', 'black')

  const cellSize = 50
  const boardSize = cellSize * 8 + 20 + 2 * 7

  return (
    <AutoLayout
      direction="vertical"
      spacing={2}
      padding={10}
      cornerRadius={8}
      fill="#1e1e1e"
      width={boardSize}
      height={boardSize}
    >
      {board.map((row, rowIndex) => (
        <AutoLayout key={rowIndex} direction="horizontal" spacing={2}>
          {row.map((cell: any, colIndex: any) => (
            <Frame
              key={`${rowIndex}-${colIndex}`}
              width={cellSize}
              height={cellSize}
              fill="#4a4a4a"
              cornerRadius={4}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell && (
                <Ellipse
                  width={cellSize - 10}
                  height={cellSize - 10}
                  x={5}
                  y={5}
                  fill={cell === 'black' ? '#000000' : '#ffffff'}
                />
              )}
            </Frame>
          ))}
        </AutoLayout>
      ))}
    </AutoLayout>
  )

  function handleCellClick(row: number, col: number) {
    // ここにクリック時の処理を実装します
    // 例: 駒を置く、ターンを切り替える、など
  }
}