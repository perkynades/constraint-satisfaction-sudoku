function isValid(board: number[][], row: number, col: number, k: number) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
        const n = 3 * Math.floor(col / 3) + (i % 3)
        if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
            return false
        }
    }
    return true
}

export function sudokuSolver(data: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(data, i, j, k)) {
                        data[i][j] = k
                        if (sudokuSolver(data)) {
                            return true
                        } else {
                            data[i][j] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}