"use client";

import { useState, useEffect } from "react";
import { ConfettiAnimation } from "./ConfettiAnimation";
import { Button } from "./ui/button";

interface HeroSectionProps {
  birthdayPerson?: string;
  age?: number;
}

export function HeroSection({ birthdayPerson = "You", age }: HeroSectionProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Auto-trigger confetti on load
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const triggerCelebration = () => {
    setShowCelebration(true);
    setShowConfetti(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-100 to-indigo-200">
      <ConfettiAnimation trigger={showConfetti} />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-purple-400 rounded-full opacity-25 animate-bounce delay-300"></div>
        <div className="absolute bottom-20 right-16 w-18 h-18 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-500"></div>
        
        {/* Floating Hearts */}
        <div className="absolute top-1/4 left-1/4 text-red-400 text-2xl opacity-60 animate-bounce">💖</div>
        <div className="absolute top-1/3 right-1/4 text-pink-400 text-3xl opacity-50 animate-pulse">💕</div>
        <div className="absolute bottom-1/3 left-1/3 text-purple-400 text-2xl opacity-70 animate-bounce delay-700">💜</div>
      </div>

      <div className="text-center z-20 max-w-4xl mx-auto px-4">
        {/* Main Birthday Message */}
        <div className={`transform transition-all duration-1000 ${showCelebration ? 'scale-110' : 'scale-100'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse" 
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Happy Birthday!
          </h1>
          
          <div className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 text-purple-700 animate-bounce"
               style={{ fontFamily: 'Dancing Script, cursive' }}>
            Dear {birthdayPerson}! 🎉
          </div>

          {age && (
            <div className="text-2xl md:text-4xl font-medium text-indigo-600 mb-8 animate-pulse"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
              {age} Years of Amazing! ✨
            </div>
          )}
        </div>

        {/* Birthday Message */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            Today is your special day! May your birthday be filled with wonderful surprises, 
            cherished moments, and all the happiness your heart can hold. Here&apos;s to another year 
            of incredible adventures and beautiful memories! 🎂🎈
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={triggerCelebration}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🎉 Celebrate! 🎉
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => document.getElementById('birthday-card')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold py-4 px-8 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🎁 Open Your Card 🎁
          </Button>
        </div>

        {/* Birthday Cake Illustration */}
        <div className="mt-16 text-8xl md:text-9xl animate-bounce">
          🎂
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-purple-600 text-sm mt-2 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Scroll down
        </p>
      </div>
    </section>
  );
}