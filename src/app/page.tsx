"use client";

import { HeroSection } from "@/components/HeroSection";
import { BirthdayCard } from "@/components/BirthdayCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CountdownTimer } from "@/components/CountdownTimer";
import { MessageBoard } from "@/components/MessageBoard";
import { MusicPlayer } from "@/components/MusicPlayer";
import { BalloonAnimation } from "@/components/BalloonAnimation";

export default function Home() {
  // Customize these values for the birthday person
  const birthdayConfig = {
    name: "You", // Change this to the birthday person's name
    age: undefined, // Optional: set age if desired, e.g., 25
    birthMonth: 12, // December (1-12)
    birthDay: 25, // 25th day
    personalMessage: "Wishing you a day filled with happiness and a year filled with joy! May all your dreams come true and every moment be filled with wonder and excitement!",
    sender: "With Love & Best Wishes"
  };

  return (
    <main className="relative">
      {/* Background Animations */}
      <BalloonAnimation />
      
      {/* Main Content Sections */}
      <HeroSection 
        birthdayPerson={birthdayConfig.name}
        age={birthdayConfig.age}
      />
      
      <BirthdayCard 
        birthdayPerson={birthdayConfig.name}
        message={birthdayConfig.personalMessage}
        sender={birthdayConfig.sender}
      />
      
      <PhotoGallery />
      
      <CountdownTimer 
        birthMonth={birthdayConfig.birthMonth}
        birthDay={birthdayConfig.birthDay}
        birthdayPerson={birthdayConfig.name}
      />
      
      <MessageBoard />
      
      <MusicPlayer />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-6">🎉✨🎂✨🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Happy Birthday {birthdayConfig.name}!
          </h2>
          <p className="text-lg font-medium mb-6"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            May this special day bring you endless joy, love, and wonderful memories that will last a lifetime!
          </p>
          <div className="text-2xl mb-4">🎈🎊🎁🌟💝</div>
          
          {/* Share Section */}
          <div className="border-t border-white border-opacity-30 pt-6 mt-6">
            <p className="text-sm opacity-90"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              Share the joy! Take a screenshot and spread the birthday love 📱💖
            </p>
          </div>
          
          {/* Credits */}
          <div className="border-t border-white border-opacity-30 pt-4 mt-4">
            <p className="text-xs opacity-75"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              Made with 💖 for your special day | © 2024 Birthday Celebration
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}