import React, { ReactElement } from 'react'
import './SudokuGrid.css'

export default function SudokuGrid({ sudokuGrid }: { sudokuGrid: number[][] }): ReactElement {
    const setGridCell = (value: number): string => {
        let gridString = ''

        if (value !== 0) {
            gridString = value.toString()
        }

        return gridString
    }

    return (
        <div className="grid-container">
            {sudokuGrid.map((row, i) => {
                return (
                    <div key={i}>
                        {row.map((item, j) => (
                            <div key={j} className="grid-item">
                                {setGridCell(row[j])}
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
