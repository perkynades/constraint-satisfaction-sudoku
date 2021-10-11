import React, { ReactElement } from 'react'
import './App.css'

function App(): ReactElement {
    const loadFile = (e: any) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.onload = (e) => {
            console.log(e.target?.result)
        }

        reader.readAsText(file)
    }

    return <div className="App"></div>
}

export default App
