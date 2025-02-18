import React, { useState, useEffect } from 'react';
import { Gamepad, Undo, RotateCcw } from 'lucide-react';

const SudokuGrid = ({ setIsSudokuSolved, setIsSudokuActive }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const createEmptyGrid = () => Array(9).fill().map(() => Array(9).fill(0));

  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }

    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  const solveSudoku = (grid) => {
    const empty = findEmpty(grid);
    if (!empty) return true;

    const [row, col] = empty;
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let num of nums) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (solveSudoku(grid)) return true;
        grid[row][col] = 0;
      }
    }

    return false;
  };

  const findEmpty = (grid) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) return [i, j];
      }
    }
    return null;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generatePuzzle = () => {
    const grid = createEmptyGrid();
    solveSudoku(grid); 
    const solution = grid.map(row => [...row]);
    
    const positions = shuffleArray(Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]));
    const cellsToRemove = 70; 
    
    for (let i = 0; i < cellsToRemove; i++) {
      const [row, col] = positions[i];
      grid[row][col] = 0;
    }

    return { puzzle: grid, solution };
  };

  // Generate puzzle and solution on component mount
  const [initialState] = useState(() => generatePuzzle());
  const [sudokuGrid, setSudokuGrid] = useState(initialState.puzzle);
  const [gridHistory, setGridHistory] = useState([initialState.puzzle]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState([]);

  const checkValidityAt = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (x !== col && grid[row][x] === num) {
        return { isValid: false, message: `${num} already exists in this row` };
      }
    }

    for (let x = 0; x < 9; x++) {
      if (x !== row && grid[x][col] === num) {
        return { isValid: false, message: `${num} already exists in this column` };
      }
    }

    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (boxRow + i !== row || boxCol + j !== col) {
          if (grid[boxRow + i][boxCol + j] === num) {
            return { isValid: false, message: `${num} already exists in this 3x3 box` };
          }
        }
      }
    }

    return { isValid: true, message: '' };
  };

  useEffect(() => {
    if (showIntro) {
      const introTimer = setTimeout(() => {
        setShowIntro(false);
        setShowGrid(true);
      }, 3000);

      return () => clearTimeout(introTimer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCell) {
        if (e.key >= '0' && e.key <= '9') {
          handleNumberInput(parseInt(e.key));
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          handleNumberInput(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell]);

  const handleNumberInput = (num) => {
    if (selectedCell) {
      if (initialState.puzzle[selectedCell.row][selectedCell.col] !== 0) {
        return;
      }
      const newGrid = sudokuGrid.map(row => [...row]);
      
      if (num !== 0) {
        const validity = checkValidityAt(newGrid, selectedCell.row, selectedCell.col, num);
        if (!validity.isValid) {
          setErrors([{ row: selectedCell.row, col: selectedCell.col, message: validity.message }]);
          return;
        }
      }

      newGrid[selectedCell.row][selectedCell.col] = num;
      setSudokuGrid(newGrid);
      setGridHistory(prev => [...prev, newGrid]);
      setErrors([]);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (errors.length > 0) {
      const newGrid = sudokuGrid.map(row => [...row]);
      errors.forEach(error => {
        newGrid[error.row][error.col] = 0;
      });
      setSudokuGrid(newGrid);
      setErrors([]);
    }
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  const handleUndo = () => {
    if (gridHistory.length > 1) {
      const newHistory = gridHistory.slice(0, -1);
      setSudokuGrid(newHistory[newHistory.length - 1]);
      setGridHistory(newHistory);
      setErrors([]);
    }
  };

  const handleReset = () => {
    setSudokuGrid(initialState.puzzle);
    setGridHistory([initialState.puzzle]);
    setErrors([]);
  };

  const getBorderStyle = (rowIndex, colIndex) => {
    let borderClasses = 'border';
    if (rowIndex % 3 === 0 && rowIndex !== 0) borderClasses += ' border-t-4';
    if (colIndex % 3 === 0 && colIndex !== 0) borderClasses += ' border-l-4';
    return borderClasses;
  };

  const handleSwitchToPassword = () => {
    setIsSudokuActive(false);
  }

  const handleSubmit = () => {
    const isComplete = sudokuGrid.every(row => row.every(cell => cell !== 0));
    
    if (!isComplete) {
      alert("Please fill in all cells before submitting!");
      return;
    }
  
    const isCorrect = sudokuGrid.every((row, i) => 
      row.every((cell, j) => cell === initialState.solution[i][j])
    );
  
    if (isCorrect) {
      setIsSudokuSolved(true);
    } else {
      alert("That's not quite right. Keep trying!");
    }
  };

  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
        <div className="text-2xl text-black-600 animate-pulse font-bold">
          Keep a pen and paper ready...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
      <Gamepad color="pink" size={64} className="mb-4"/>
      <h1 className="text-2xl mb-4">Solve the Sudoku to Reveal the Invitation</h1>
      <p className="text-sm mb-4">Use keyboard numbers (1-9) to fill cells. Backspace to clear.</p>
      <div className="grid grid-cols-9 gap-0 bg-pink-200 p-4 rounded-xl">
        {sudokuGrid.map((row, rowIndex) => 
          row.map((cell, colIndex) => {
            const hasError = errors.some(e => e.row === rowIndex && e.col === colIndex);
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`w-12 h-12 text-center ${getBorderStyle(rowIndex, colIndex)}
                  ${cell === 0 ? 'bg-white' : 'bg-pink-300 font-bold'}
                  ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex 
                    ? 'border-red-500 border-2' : 'border-pink-400'}
                  ${hasError ? 'bg-red-200' : ''}
                  ${initialState.puzzle[rowIndex][colIndex] !== 0 ? 'text-gray-600' : 'text-black'}`}
              >
                {cell || ''}
              </button>
            );
          })
        )}
      </div>
      {errors.length > 0 && (
        <div className="mt-2 text-red-500">
          {errors[0].message}
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={handleUndo}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 flex items-center"
        >
          <Undo size={20} className="mr-2"/> Undo
        </button>
        <button 
          onClick={handleReset}
          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 flex items-center"
        >
          <RotateCcw size={20} className="mr-2"/> Reset
        </button>
        <button 
          onClick={handleSwitchToPassword}
          className="bg-rose-500 text-white p-2 rounded hover:bg-rose-800"
        >
          Guess the password
        </button>
        <button 
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SudokuGrid;