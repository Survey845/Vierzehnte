import React, { useState, useEffect } from 'react';

const Home = ({ setIsChallengeAccepted }) => {
    const [showFirstLine, setShowFirstLine] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setShowFirstLine(true);

        const secondLineTimer = setTimeout(() => {
            setShowSecondLine(true);
        }, 2000);

        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 4000);

        return () => {
            clearTimeout(secondLineTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    const handleAccepted = () => {
        setIsChallengeAccepted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-100 space-y-8">
            <p className={`transition-opacity duration-1000 ease-in-out text-2xl font-bold text-black${showFirstLine ? 'opacity-100' : 'opacity-0'}`}>
                A challenge to make my proposal a bit more fun...
            </p>
            
            <p className={`transition-opacity duration-1000 ease-in-out text-2xl font-bold text-black ${showSecondLine ? 'opacity-100' : 'opacity-0'}`}>
                Would you like to try?
            </p>
            
            <button 
                onClick={handleAccepted} 
                className={`transition-opacity duration-1000 ease-in-out bg-pink-600 hover:bg-pink-700 text-white font-bold text-xl py-3 px-6 rounded-lg  ${showButton ? 'opacity-100' : 'opacity-0'}`}
            >
                Challenge Accepted
            </button>
        </div>
    );
};

export default Home;