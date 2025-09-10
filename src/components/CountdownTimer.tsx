"use client";

import { useCountdown, getNextBirthday } from "@/hooks/use-countdown";
import { Card } from "./ui/card";

interface CountdownTimerProps {
  birthMonth?: number;
  birthDay?: number;
  birthdayPerson?: string;
}

export function CountdownTimer({ 
  birthMonth = 12, 
  birthDay = 25, 
  birthdayPerson = "You" 
}: CountdownTimerProps) {
  const nextBirthday = getNextBirthday(birthMonth, birthDay);
  const { days, hours, minutes, seconds, isExpired } = useCountdown(nextBirthday);

  const timeUnits = [
    { value: days, label: "Days", emoji: "📅" },
    { value: hours, label: "Hours", emoji: "🕐" },
    { value: minutes, label: "Minutes", emoji: "⏰" },
    { value: seconds, label: "Seconds", emoji: "⚡" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-teal-700 mb-6 animate-pulse"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            {isExpired ? `🎉 Happy Birthday ${birthdayPerson}! 🎉` : `Birthday Countdown ⏳`}
          </h2>
          
          {!isExpired ? (
            <p className="text-lg text-gray-600 font-medium"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              Time until {birthdayPerson}&apos;s next birthday celebration!
            </p>
          ) : (
            <p className="text-lg text-gray-600 font-medium"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              🎂 Today is the special day! Let&apos;s celebrate! 🎉
            </p>
          )}
        </div>

        {!isExpired ? (
          <>
            {/* Countdown Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              {timeUnits.map((unit, index) => (
                <Card key={unit.label} className="bg-white bg-opacity-60 backdrop-blur-sm shadow-xl border-2 border-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="p-6 md:p-8 text-center">
                    <div className="text-4xl md:text-5xl mb-2 animate-bounce"
                         style={{ animationDelay: `${index * 0.2}s` }}>
                      {unit.emoji}
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 mb-2"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base font-semibold text-gray-600"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {unit.label}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Birthday Date Display */}
            <Card className="bg-gradient-to-r from-teal-200 to-blue-200 border-2 border-white shadow-xl max-w-md mx-auto">
              <div className="p-8 text-center">
                <div className="text-5xl mb-4 animate-pulse">🎯</div>
                <h3 className="text-2xl md:text-3xl font-bold text-teal-800 mb-2"
                    style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Next Birthday
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-teal-700"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {nextBirthday.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </Card>
          </>
        ) : (
          /* Birthday Is Today! */
          <div className="text-center">
            <div className="text-9xl md:text-[12rem] mb-8 animate-bounce">🎂</div>
            
            <Card className="bg-gradient-to-r from-pink-200 to-purple-200 border-4 border-white shadow-2xl max-w-2xl mx-auto">
              <div className="p-12">
                <div className="text-6xl mb-6 animate-pulse">🎉✨🎈</div>
                <h3 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4"
                    style={{ fontFamily: 'Dancing Script, cursive' }}>
                  It&apos;s Your Birthday!
                </h3>
                <p className="text-xl text-purple-700 font-semibold mb-6"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Today is {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="text-5xl animate-bounce">🥳🎊🎁</div>
              </div>
            </Card>
          </div>
        )}

        {/* Fun Birthday Facts */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-teal-700 mb-8"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Birthday Fun Facts! 🤓
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-white">
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">🎂</div>
                <p className="text-sm text-gray-700 font-medium"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  The tradition of birthday cakes dates back to ancient Greece!
                </p>
              </div>
            </Card>
            
            <Card className="bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-white">
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">🎈</div>
                <p className="text-sm text-gray-700 font-medium"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  The most popular birthday is September 9th!
                </p>
              </div>
            </Card>
            
            <Card className="bg-white bg-opacity-60 backdrop-blur-sm shadow-lg border border-white">
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">🎉</div>
                <p className="text-sm text-gray-700 font-medium"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  &quot;Happy Birthday&quot; is the most recognized song in English!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}