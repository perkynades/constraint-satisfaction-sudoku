import React, { ReactElement, useState } from 'react'
import './App.css'
import SudokuGrid from './SudokuGrid'
import { sudokuSolver } from './sudokuSolver'

function App(): ReactElement {
    const [sudokuGrid, setSudokuGrid] = useState<number[][]>([])

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
    }

    return (
        <div className="App">
            <label className="file-upload">
                <input type="file" onChange={displaySudoku}></input>
                Upload file
            </label>

            <button onClick={parseFileString}>Create sudoku grid</button>
            <SudokuGrid sudokuGrid={sudokuGrid} />
            <button onClick={solve}>Start solving</button>
        </div>
    )
}

export default App
