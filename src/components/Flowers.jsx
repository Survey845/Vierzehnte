import React, { useState } from 'react';
import { Heart, Send, X } from 'lucide-react';
import roseImage from '../images/rose.jpg';
import tulipImage from '../images/tulips.jpg';
import lilyImage from '../images/lily.jpeg';
import orchidImage from '../images/orchid.jpg';
import sunflowerImage from '../images/sunflower.jpg';
import peonyImage from '../images/peony.jpg';
import supabase from "../supabaseClient";

const flowers = [
  {
    id: 1,
    name: "Red Rose",
    description: "Classic symbol of love",
    image: roseImage,
    selected: false
  },
  {
    id: 2,
    name: "Pink Tulip",
    description: "Represents perfect love",
    image: tulipImage,
    selected: false
  },
  {
    id: 3,
    name: "White Lily",
    description: "Symbolizes purity",
    image: lilyImage,
    selected: false
  },
  {
    id: 4,
    name: "Sunflower",
    description: "Represents adoration",
    image: sunflowerImage,
    selected: false
  },
  {
    id: 5,
    name: "Purple Orchid",
    description: "Exotic and elegant",
    image: orchidImage,
    selected: false
  },
  {
    id: 6,
    name: "Pink Peony",
    description: "Romance and prosperity",
    image: peonyImage,
    selected: false
  }
];

const Flowers = ({ setIsLastPage }) => {
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleFlowerSelection = (flower) => {
    if (selectedFlowers.find(f => f.id === flower.id)) {
      setSelectedFlowers(selectedFlowers.filter(f => f.id !== flower.id));
    } else {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const sendSelection = async () => {
    try {
      const payload = {
        flowers: selectedFlowers.map(f => ({
          name: f.name,
          description: f.description
        })),
        personal_message: message || "No additional message"
      };
  
      console.log("Saving to Supabase:", payload);
      const { data, error } = await supabase
        .from("messages")
        .insert([payload]);
  
      if (error) throw error;
  
      console.log("Message saved:", data);
  
      setShowConfirmation(true);
      setSelectedFlowers([]);
      setMessage("");
      setIsLastPage(true);
    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="mx-auto text-red-500 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Valentine's Bouquet</h1>
          <p className="text-gray-600">Select the flowers you'd like in your bouquet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowers.map((flower) => (
            <div
              key={flower.id}
              onClick={() => toggleFlowerSelection(flower)}
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer
                ${selectedFlowers.find(f => f.id === flower.id) 
                  ? 'ring-4 ring-pink-500 transform scale-105' 
                  : 'hover:shadow-xl'}`}
            >
              <img
                src={flower.image}
                alt={flower.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-2">{flower.name}</h3>
                <p className="text-gray-600">{flower.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedFlowers.length > 0 && (
          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Selection</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedFlowers.map((flower) => (
                <div
                  key={flower.id}
                  className="bg-pink-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{flower.name}</span>
                  <X
                    size={16}
                    className="cursor-pointer hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlowerSelection(flower);
                    }}
                  />
                </div>
              ))}
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message, chocolates you want, places you want to go see..."
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              rows="3"
            />
            <button
              onClick={sendSelection}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 flex items-center gap-2"
            >
              <Send size={20} />
              Send Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flowers;