import React, { ReactElement, useState } from 'react'
import './App.css'

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

    return (
        <div className="App">
            <input type="file" className="file-input" onChange={displaySudoku}></input>
            <button onClick={parseFileString}>Create sudoku grid</button>
        </div>
    )
}

export default App
