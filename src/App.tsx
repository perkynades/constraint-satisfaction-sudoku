import React, { ReactElement, useState } from 'react'
import './App.css'
import SudokuGrid from './SudokuGrid'

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

    const possible = (y: number, x: number, n: number): boolean => {
        let isPossible: boolean = true

        for (let i = 0; i < 9; i++) {
            if (sudokuGrid[y][i] === n) {
                isPossible = false
            }
        }
        for (let i = 0; i < 9; i++) {
            if (sudokuGrid[i][x] === n) {
                isPossible = false
            }
        }

        let x0 = Math.trunc(x / 3) * 3
        let y0 = Math.trunc(y / 3) * 3

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (sudokuGrid[y0 + i][x0 + j] === n) {
                    isPossible = false
                }
            }
        }

        return isPossible
    }

    return (
        <div className="App">
            <label className="file-upload">
                <input type="file" onChange={displaySudoku}></input>
                Upload file
            </label>

            <button onClick={parseFileString}>Create sudoku grid</button>
            <SudokuGrid sudokuGrid={sudokuGrid} />
            <button>Start solving</button>
        </div>
    )
}

export default App
