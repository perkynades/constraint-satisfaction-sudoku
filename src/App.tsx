import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { ReactElement, useState } from 'react'
import './App.css'

function App(): ReactElement {
    const [sudokuGrid, setSudokuGrid] = useState<any[][]>([])

    const [parsed, setParsed] = useState<string | ArrayBuffer | undefined | null>()
    const [parsedArray, setParsedArray] = useState<string[]>([])

    const displaySudoku = (event: any) => {
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.onload = (e) => {
            setParsed(e.target?.result)
        }
        reader.readAsText(file)
    }

    const parseFileString = () => {
        if (typeof parsed == 'string') {
            let array = parsed.split('')
            setParsedArray(array)
        }
    }

    return (
        <div className="App">
            <input type="file" onChange={displaySudoku}></input>
            <button onClick={parseFileString}>Start solving</button>
            {console.log(parsedArray)}
        </div>
    )
}

export default App
