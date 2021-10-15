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

    let rows = sudokuGrid.map(function (item, i) {
        let entry = item.map(function (element, j) {
            return (
                <td key={j} className="element">
                    {setGridCell(element)}
                </td>
            )
        })
        return (
            <tr key={i} className="entry">
                {entry}
            </tr>
        )
    })

    return (
        <table className="grid">
            <tbody>{rows}</tbody>
        </table>
    )
}
