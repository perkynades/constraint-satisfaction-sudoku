import React, { ReactElement, useState } from 'react'
import './App.css'
import SudokuGrid from './SudokuGrid'
import {
    setSudokuSolverCounter,
    setSudokuSolverReturnFalseCounter,
    sudokuSolver,
    sudokuSolverCounter,
    sudokuSolverReturnFalseCounter,
} from './sudokuSolver'

function App(): ReactElement {
    const [sudokuGrid, setSudokuGrid] = useState<number[][]>([])

    const [backtrackerCounter, setBacktrackerCounter] = useState<number>(0)
    const [bakcktrackFailureCounter, setBacktrackFailureCounter] = useState<number>(0)

    const [parsed, setParsed] = useState<string | ArrayBuffer | undefined | null>()

    const displaySudoku = (event: any) => {
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.onload = (e) => {
            setParsed(e.target?.result)
        }
        reader.readAsText(file)
    }

    const parseFileString = () => {
        let array: number[] = []
        if (typeof parsed == 'string') {
            array = parsed
                .split('')
                .filter((item) => item !== '\n')
                .map(Number)
        }

        let newArray: number[][] = []
        while (array.length) {
            newArray.push(array.splice(0, 9))
        }
        setSudokuGrid(newArray)
    }

    const solve = () => {
        let copy = [...sudokuGrid]
        sudokuSolver(copy)
        setSudokuGrid(copy)

        setBacktrackerCounter(sudokuSolverCounter)
        setBacktrackFailureCounter(sudokuSolverReturnFalseCounter)

        setSudokuSolverCounter(0)
        setSudokuSolverReturnFalseCounter(0)
    }
    // TODO Add logic to show when file is loaded
    return (
        <div className="App">
            <label className="file-upload">
                <input type="file" onChange={displaySudoku}></input>
                Upload file
            </label>

            <button onClick={parseFileString}>Create sudoku grid</button>
            <SudokuGrid sudokuGrid={sudokuGrid} />
            <p>Backtracker function called {backtrackerCounter} times</p>
            <p>Backtracker function returned failure {bakcktrackFailureCounter} times</p>
            <button onClick={solve}>Start solving</button>
        </div>
    )
}

export default App
