/**
 * A function that determines if a digit can be placed in a sudoku
 * grid cell.
 */
function isValid(grid: number[][], row: number, col: number, digit: number) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
        const n = 3 * Math.floor(col / 3) + (i % 3)
        if (grid[row][i] === digit || grid[i][col] === digit || grid[m][n] === digit) {
            return false
        }
    }
    return true
}

/**
 * A backtracker function that is used to solve a game of sudoku.
 * For every call of the backtracker function, the sudoku grid will be 
 * checked to see if it is solved or not. If it is not solved the
 * backtracker function will be called recursivly to try solve to sudoku
 * grid iterativly.
 * 
 * @param grid The sudoku grid to solve
 * @returns if the grid is solved or not
 */
export function backtracker(grid: number[][]): boolean {
    backtrackerCounter++

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(grid, i, j, k)) {
                        grid[i][j] = k
                        if (backtracker(grid)) {
                            return true
                        } else {
                            grid[i][j] = 0
                        }
                    }
                }
                backtrackerReturnFalseCounter++
                return false
            }
        }
    }
    return true
}


export let backtrackerCounter: number = 0;
export function setBacktrackerCounter(value: number) {
    backtrackerCounter = value
}

export let backtrackerReturnFalseCounter: number = 0
export function setBacktrackerReturnFalseCounter(value: number) {
    backtrackerReturnFalseCounter = value
}