import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import ReactCardFlip from 'react-card-flip';

const Proposal = ({setIsPickFlowers}) => {
  console.log("setIsPickFlowers:", setIsPickFlowers);
  const [isFlipped, setIsFlipped] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const moveButton = () => {
    setIsMoving(true);
    const newPosition = {
      top: Math.random() * 200 - 100,
      left: Math.random() * 200 - 100
    };
    setNoButtonPosition(newPosition);
    
    setTimeout(() => setIsMoving(false), 500);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div 
          onClick={handleClick}
          className="w-96 h-96 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
        >
          <Heart color="red" size={128} className="mb-4 animate-pulse"/>
          <h1 className="text-2xl text-pink-600">Click to reveal a special question...</h1>
        </div>

        <div className="w-96 h-96 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 relative overflow-visible">
          <Heart color="red" size={96} className="mb-4"/>
          <h1 className="text-3xl mb-6 text-center">Will You Be My Valentine?</h1>
          <div className="flex justify-center w-full relative">
            {!accepted && (<button
              onClick={() => setAccepted(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Yes
            </button>
            )}
            {!accepted && (
              <button
                className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300
                  absolute transform ${isMoving ? 'transition-all duration-500 ease-in-out' : ''}`}
                onClick={moveButton}
                style={{
                  transform: `translate(${noButtonPosition.left + 120}px, ${noButtonPosition.top}px)`
                }}
              >
                No
              </button>
            )}
          </div>
          {accepted && (
            <>
              <button className={"bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"}
              onClick={() => setIsPickFlowers(true)}>
                Pick Flowers
              </button>
              <div className="mt-6 text-2xl text-red-600 animate-bounce">
                🌹 You've Made My Day! 💖
              </div>
            </>
          )}
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Proposal;