import React, { useState } from "react";
import Home from "./components/Home";
import PasswordScreen from "./components/PasswordScreen";
import SudokuGrid from "./components/SudokuGrid";
import Proposal from "./components/Proposal";
import Flowers from "./components/Flowers";
import Last from "./components/Last";

const App = () => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isSudokuSolved, setIsSudokuSolved] = useState(false);
  const [isChallengeAccepted, setIsChallengeAccepted] = useState(false);
  const [isSudokuActive, setIsSudokuActive] = useState(true);
  const [isPickFlowers, setIsPickFlowers] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const hasSucceeded = isPasswordCorrect || isSudokuSolved;

  return (
    <div>
      {isLastPage ? (
        <Last />
      ) : isPickFlowers ? (
        <Flowers setIsLastPage={setIsLastPage} />
      ) : !isChallengeAccepted ? (
        <Home setIsChallengeAccepted={setIsChallengeAccepted} />
      ) : hasSucceeded ? (
        <Proposal setIsPickFlowers={setIsPickFlowers} />
      ) : isSudokuActive ? (
        <SudokuGrid
          setIsSudokuSolved={setIsSudokuSolved}
          setIsSudokuActive={setIsSudokuActive}
        />
      ) : (
        <PasswordScreen
          setIsPasswordCorrect={setIsPasswordCorrect}
          setIsSudokuActive={setIsSudokuActive}
        />
      )}
    </div>
  );
};

export default App;
