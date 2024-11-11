import React, { useEffect, useState } from 'react';

import { useLanguage } from '../contexts/LanguageContext';

interface CellData {
  row: number;
  column: string;
  color: string;
  besetzt: boolean;
  text: string;
}

const HtmlTable: React.FC = () => {
  const { texts, setLanguage } = useLanguage();
  const [cellData, setCellData] = useState<{ [key: string]: CellData }>({});
  const [selectedColor, setSelectedColor] = useState<string>('green');

  useEffect(() => {
    const storedData = localStorage.getItem('cellData');
    if (storedData) {
      setCellData(JSON.parse(storedData));
    }
  }, []);

  // Update the cell texts when language changes
  useEffect(() => {
    const updatedCellData = Object.keys(cellData).reduce((acc, key) => {
      const cell = cellData[key];
      if (cell.besetzt) {
        acc[key] = { ...cell, text: texts.cellOccupied(key) };
      } else {
        acc[key] = { ...cell };
      }
      return acc;
    }, {} as { [key: string]: CellData });

    setCellData(updatedCellData);
  }, [texts]);

  const handleClick = (row: number, column: string) => {
    const cellKey = `${row}-${column}`;
    if (cellData[cellKey]?.besetzt) {
      alert(`${texts.occupied}`);
      return;
    }

    const updatedCell = {
      row,
      column,
      color: selectedColor,
      besetzt: true,
      text: texts.cellOccupied(cellKey),
    };

    const updatedCellData = { ...cellData, [cellKey]: updatedCell };
    setCellData(updatedCellData);
    localStorage.setItem('cellData', JSON.stringify(updatedCellData));
  };

  const handleResetColors = () => {
    const resetCellData = Object.keys(cellData).reduce((acc, key) => {
      acc[key] = { ...cellData[key], color: 'transparent', besetzt: false, text: '' };
      return acc;
    }, {} as { [key: string]: CellData });
    setCellData(resetCellData);
    localStorage.setItem('cellData', JSON.stringify(resetCellData));
  };

  const getCellText = (row: number, column: string) => {
    const cellKey = `${row}-${column}`;
    return cellData[cellKey]?.text || '';
  };

  return (
    <div>
      <h1>{texts.selectColor}</h1>
      <button className={`color-button green ${selectedColor === 'green' ? 'selected' : ''}`} onClick={() => setSelectedColor('green')}>
        {texts.green}
      </button>
      <button className={`color-button red ${selectedColor === 'red' ? 'selected' : ''}`} onClick={() => setSelectedColor('red')}>
        {texts.red}
      </button>
      <button onClick={handleResetColors}>{texts.resetColors}</button>
      <button onClick={() => setLanguage('de')}>{texts.lan1}</button>
      <button onClick={() => setLanguage('en')}>{texts.lan2}</button>

      <table>
        <thead>
          <tr>
            <th>{texts.clickCell}</th>
            <th>{texts.column} A</th>
            <th>{texts.column} B</th>
            <th>{texts.column} C</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td>{texts.row} {row}</td>
              {['A', 'B', 'C'].map((column) => (
                <td
                  key={`${row}-${column}`}
                  onClick={() => handleClick(row, column)}
                  style={{ cursor: 'pointer', backgroundColor: cellData[`${row}-${column}`]?.color }}
                >
                  {getCellText(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HtmlTable;