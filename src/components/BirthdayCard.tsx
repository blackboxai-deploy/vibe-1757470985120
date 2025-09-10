"use client";

import { useState } from "react";
import { Card } from "./ui/card";

interface BirthdayCardProps {
  birthdayPerson?: string;
  message?: string;
  sender?: string;
}

export function BirthdayCard({ 
  birthdayPerson = "You", 
  message = "Wishing you a day filled with happiness and a year filled with joy!",
  sender = "With Love"
}: BirthdayCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section id="birthday-card" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-purple-700 mb-8 animate-pulse"
            style={{ fontFamily: 'Dancing Script, cursive' }}>
          Your Special Birthday Card 💌
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 font-medium"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Click the card to open it!
        </p>

        {/* Card Container with 3D Effect */}
        <div className="perspective-1000 cursor-pointer" onClick={handleCardClick}>
          <div className={`relative w-80 h-96 mx-auto transform-gpu transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front of Card */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-300 border-4 border-white shadow-2xl overflow-hidden ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="h-full flex flex-col justify-center items-center p-8 relative">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 text-4xl">🎈</div>
                  <div className="absolute top-8 right-6 text-3xl">🎉</div>
                  <div className="absolute bottom-8 left-6 text-3xl">🎂</div>
                  <div className="absolute bottom-4 right-4 text-4xl">🎁</div>
                  <div className="absolute top-1/2 left-8 text-2xl">⭐</div>
                  <div className="absolute top-1/2 right-8 text-2xl">✨</div>
                </div>

                {/* Front Content */}
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-6 animate-bounce">🎂</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
                      style={{ fontFamily: 'Dancing Script, cursive' }}>
                    Happy Birthday
                  </h3>
                  <h4 className="text-2xl md:text-3xl font-semibold text-indigo-700"
                      style={{ fontFamily: 'Dancing Script, cursive' }}>
                    {birthdayPerson}!
                  </h4>
                  <div className="mt-6 text-purple-600 font-medium animate-pulse"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Tap to open! ✨
                  </div>
                </div>
              </div>
            </Card>

            {/* Back of Card */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-yellow-200 via-orange-100 to-red-100 border-4 border-white shadow-2xl rotate-y-180 overflow-hidden ${!isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="h-full flex flex-col justify-center items-center p-8 relative">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-6 left-8 text-3xl">💖</div>
                  <div className="absolute top-12 right-6 text-2xl">🌟</div>
                  <div className="absolute bottom-12 left-4 text-3xl">🎊</div>
                  <div className="absolute bottom-6 right-8 text-2xl">💫</div>
                  <div className="absolute top-1/3 left-4 text-xl">🦄</div>
                  <div className="absolute bottom-1/3 right-4 text-xl">🌈</div>
                </div>

                {/* Inside Message */}
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-6 animate-pulse">💝</div>
                  
                  <div className="bg-white bg-opacity-60 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 font-medium"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {message}
                    </p>
                    
                    <div className="text-3xl mb-4">🎉✨🎈</div>
                    
                    <p className="text-lg text-purple-700 font-semibold"
                       style={{ fontFamily: 'Dancing Script, cursive' }}>
                      {sender}
                    </p>
                  </div>

                  <div className="mt-6 text-sm text-gray-600"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Click again to close ✨
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-md mx-auto">
          <p className="text-gray-600 font-medium"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            This special card was made just for you! Share the joy by taking a screenshot 📸
          </p>
        </div>
      </div>

      {/* Additional Styles for 3D Effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}