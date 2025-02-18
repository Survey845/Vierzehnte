import React from 'react';
import { Heart } from 'lucide-react';

const Last = () => {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg mx-auto text-center bg-white rounded-xl shadow-xl p-8 space-y-6">
        <Heart className="mx-auto text-red-500 animate-pulse" size={64} />
        
        <h1 className="text-3xl font-bold text-gray-800">
          I Can't Wait to See You! ❤️
        </h1>

        <img 
          src={require('../images/hug.gif')}
          alt="Hug Animation"
          className="rounded-lg shadow-md mx-auto my-6"
        />
        
        
      </div>
    </div>
  );
};

export default Last;