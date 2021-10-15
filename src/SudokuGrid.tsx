import React, { ReactElement } from 'react'
import './SudokuGrid.css'

export default function SudokuGrid({ sudokuGrid }: { sudokuGrid: number[][] }): ReactElement {
    let rows = sudokuGrid.map(function (item, i) {
        let entry = item.map(function (element, j) {
            return (
                <td key={j} className="entry">
                    {element}
                </td>
            )
        })
        return <tr key={i}>{entry}</tr>
    })

    return (
        <table className="grid">
            <tbody>{rows}</tbody>
        </table>
    )
}
