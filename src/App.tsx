import React, { ReactElement, useState } from 'react'
import './App.css'
import SudokuGrid from './SudokuGrid'
import {
    setBacktrackerCounter,
    setBacktrackerReturnFalseCounter,
    backtracker,
    backtrackerCounter,
    backtrackerReturnFalseCounter,
} from './sudokuSolver'
import { CheckOutlined } from '@ant-design/icons'

function App(): ReactElement {
    const [sudokuGrid, setSudokuGrid] = useState<number[][]>([])

    const [backtrackersCounter, setBacktrackersCounter] = useState<number>(0)
    const [bakcktrackFailureCounter, setBacktrackFailureCounter] = useState<number>(0)

    const [parsed, setParsed] = useState<string | ArrayBuffer | undefined | null>()

    const [fileUploaded, setFileUploaded] = useState<boolean>(false)

    const displaySudoku = (event: any) => {
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.onload = (e) => {
            setParsed(e.target?.result)
            setFileUploaded(true)
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
        backtracker(copy)
        setSudokuGrid(copy)

        setBacktrackersCounter(backtrackerCounter)
        setBacktrackFailureCounter(backtrackerReturnFalseCounter)

        setBacktrackerCounter(0)
        setBacktrackerReturnFalseCounter(0)
    }

    return (
        <div className="App">
            <div className="file-upload-container">
                <label className="file-upload">
                    <input type="file" onChange={displaySudoku}></input>
                    Upload file
                </label>
                {fileUploaded && <CheckOutlined className="file-upload-icon" />}
            </div>
            <button onClick={parseFileString}>Create sudoku grid</button>
            <SudokuGrid sudokuGrid={sudokuGrid} />
            <p>Backtracker function called {backtrackersCounter} times</p>
            <p>Backtracker function returned false {bakcktrackFailureCounter} times</p>
            <button onClick={solve}>Start solving</button>
        </div>
    )
}

export default App
