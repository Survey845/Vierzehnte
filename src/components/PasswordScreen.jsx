import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const PasswordScreen = ({ setIsPasswordCorrect, setIsSudokuActive }) => {
    const [counter, setCounter] = useState(0);
    const [password, setPassword] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    // Enter pasword here
    const correctPassword = 'Enter your password';
    // Enter you hints here
    const hints = [
        "Hint 1: Enter hint 1",
        "Hint 2: Enter hint 2",
        "Hint 3: Enter hint 3",
        "Hint 4: Enter hint 4",
        "Hint 5: Enter hint 5"
    ];

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsPasswordCorrect(true);
        } else {
            setCounter(counter + 1);
            setPassword('');
        }
    };
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          handlePasswordSubmit(e);
      }
  };


    const handleSwitchToSudoku = () => {
        setIsSudokuActive(true);
    };
    useEffect(() => {
        if (showIntro) {
          const introTimer = setTimeout(() => {
            setShowIntro(false);
            setShowPassword(true);
          }, 3000);
    
          return () => clearTimeout(introTimer);
        }
      }, []);
    

    if (showIntro){
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
              <div className="text-2xl text-black-600 animate-pulse font-bold">
                Or guess the password instead...
              </div>
            </div>
          );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
            <Lock color="pink" size={64} className="mb-4"/>
            <h1 className="text-2xl mb-4 font-bold">Enter the Password</h1>
            
            <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-2 border rounded mb-4"
                    placeholder="Enter password"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
                >
                    Submit
                </button>
            </form>

            {counter==0 && (
              <div className="text-pink-600 mt-4 text-center">
              <p className="font-bold mb-2">Hint: Enter the first hint</p>
              <p className="mt-2 text-sm">Attempts: {counter}/5</p>
          </div>
            )}
            {counter > 0 && counter <= 5 && (
                <div className="text-pink-600 mt-4 text-center">
                    <p className="font-bold mb-2">Wrong password! Here's a hint:</p>
                    <p>{hints[counter-1]}</p>
                    <p className="mt-2 text-sm">Attempts: {counter}/5</p>
                </div>
            )}

            {counter > 5 && (
                <div className="text-center mt-6">
                    <p className="text-pink-600 mb-4">Still having trouble? Try solving the Sudoku puzzle instead!</p>
                </div>
            )}
            <button
                        onClick={handleSwitchToSudoku}
                        className="bg-rose-500 text-white p-2 rounded hover:bg-rose-800 mt-10"
                    >
                        Switch to Sudoku
                    </button>
        </div>
    );
};

export default PasswordScreen;