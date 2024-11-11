import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useLanguage } from '../contexts/LanguageContext';

interface CellData {
  row: number;
  column: string;
  color: string;
  besetzt: boolean;
  text: string;
}

const MUITable: React.FC = () => {
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
    <Box>
      <h1>{texts.selectColor}</h1>
      <Button
        variant="contained"
        onClick={() => setSelectedColor('green')}
        sx={{
          backgroundColor: selectedColor === 'green' ? 'green' : 'grey',
          '&:hover': {
            backgroundColor: selectedColor === 'green' ? '#388e3c' : 'darkgrey',
          },
          border: selectedColor === 'green' ? '2px solid white' : 'none',
        }}
      >
        {texts.green}
      </Button>
      <Button
        variant="contained"
        onClick={() => setSelectedColor('red')}
        sx={{
          backgroundColor: selectedColor === 'red' ? 'red' : 'grey',
          '&:hover': {
            backgroundColor: selectedColor === 'red' ? '#d32f2f' : 'darkgrey',
          },
          border: selectedColor === 'red' ? '2px solid white' : 'none',
        }}
      >
        {texts.red}
      </Button>
      <Button variant="contained" onClick={handleResetColors}>
        {texts.resetColors}
      </Button>
      <Button variant="contained" onClick={() => setLanguage('de')}>
        {texts.lan1}
      </Button>
      <Button variant="contained" onClick={() => setLanguage('en')}>
        {texts.lan2}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{texts.clickCell}</TableCell>
              <TableCell>{texts.column} A</TableCell>
              <TableCell>{texts.column} B</TableCell>
              <TableCell>{texts.column} C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((row) => (
              <TableRow key={row}>
                <TableCell>{texts.row} {row}</TableCell>
                {['A', 'B', 'C'].map((column) => (
                  <TableCell
                    key={`${row}-${column}`}
                    onClick={() => handleClick(row, column)}
                    style={{ cursor: 'pointer', backgroundColor: cellData[`${row}-${column}`]?.color }}
                  >
                    {getCellText(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MUITable;