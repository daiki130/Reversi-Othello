const { widget } = figma
const { AutoLayout, Frame, Ellipse, useSyncedState } = widget

export function OthelloBoard() {
  const [board, setBoard] = useSyncedState('board', initializeBoard())
  const [currentPlayer, setCurrentPlayer] = useSyncedState('currentPlayer', 'black')

  const cellSize = 50
  const boardSize = cellSize * 8 + 20 + 2 * 7

  function initializeBoard() {
    const newBoard = Array(8).fill(null).map(() => Array(8).fill(null))
    newBoard[3][3] = newBoard[4][4] = 'white'
    newBoard[3][4] = newBoard[4][3] = 'black'
    return newBoard
  }

  function handleCellClick(row: number, col: number) {
    if (board[row][col] !== null) return

    const flippedPieces = getFlippedPieces(row, col, currentPlayer)
    if (flippedPieces.length === 0) return

    const newBoard = board.map(row => [...row])
    newBoard[row][col] = currentPlayer
    flippedPieces.forEach(([r, c]) => {
      newBoard[r][c] = currentPlayer
    })

    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black')
  }

  function getFlippedPieces(row: number, col: number, player: string) {
    const opponent = player === 'black' ? 'white' : 'black'
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ]

    const flippedPieces: [number, number][] = []

    directions.forEach(([dx, dy]) => {
      let x = row + dx
      let y = col + dy
      const tempFlipped: [number, number][] = []

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        tempFlipped.push([x, y])
        x += dx
        y += dy
      }

      if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        flippedPieces.push(...tempFlipped)
      }
    })

    return flippedPieces
  }

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
}