"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  emoji: string;
}

const birthdaySongs: Song[] = [
  {
    id: 1,
    title: "Happy Birthday",
    artist: "Traditional",
    duration: "0:30",
    emoji: "🎂"
  },
  {
    id: 2,
    title: "Birthday Celebration",
    artist: "Festive Tunes",
    duration: "3:24",
    emoji: "🎉"
  },
  {
    id: 3,
    title: "Party Time",
    artist: "Celebration Band",
    duration: "2:58",
    emoji: "🎊"
  },
  {
    id: 4,
    title: "Special Day",
    artist: "Birthday Wishes",
    duration: "3:15",
    emoji: "✨"
  }
];

interface MusicPlayerProps {
  songs?: Song[];
  autoPlay?: boolean;
}

export function MusicPlayer({ songs = birthdaySongs, autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  // Note: This is a demo player without actual audio files
  const [isDemo] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying && isDemo) {
      // Simulate audio playback for demo
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 180) { // 3 minutes demo duration
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isDemo]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % songs.length;
    setCurrentSong(nextIndex);
    setCurrentTime(0);
  };

  const previousSong = () => {
    const prevIndex = currentSong === 0 ? songs.length - 1 : currentSong - 1;
    setCurrentSong(prevIndex);
    setCurrentTime(0);
  };

  const selectSong = (index: number) => {
    setCurrentSong(index);
    setCurrentTime(0);
    setShowPlaylist(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSongData = songs[currentSong];

  return (
    <section className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 animate-pulse"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Birthday Playlist 🎵
          </h2>
          <p className="text-gray-600 font-medium"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            {isDemo ? "Demo Music Player - Enjoy the birthday vibes!" : "Perfect songs for your celebration!"}
          </p>
        </div>

        {/* Main Player */}
        <Card className="bg-gradient-to-br from-white to-purple-50 shadow-2xl border-2 border-white overflow-hidden">
          <div className="p-8">
            {/* Current Song Display */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">
                {currentSongData.emoji}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2"
                  style={{ fontFamily: 'Dancing Script, cursive' }}>
                {currentSongData.title}
              </h3>
              <p className="text-lg text-purple-600 font-medium"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                {currentSongData.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{currentSongData.duration}</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: isDemo ? `${(currentTime / 180) * 100}%` : '0%' }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                onClick={previousSong}
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-purple-400 text-purple-600 hover:bg-purple-50 w-12 h-12 p-0"
              >
                ⏮️
              </Button>
              
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-16 h-16 p-0 text-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </Button>
              
              <Button
                onClick={nextSong}
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-purple-400 text-purple-600 hover:bg-purple-50 w-12 h-12 p-0"
              >
                ⏭️
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-purple-600">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 max-w-32 accent-purple-500"
              />
              <span className="text-sm text-gray-600 font-medium w-8"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Playlist Toggle */}
            <div className="text-center">
              <Button
                onClick={() => setShowPlaylist(!showPlaylist)}
                variant="outline"
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-6 rounded-full"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {showPlaylist ? "Hide Playlist 🎵" : "Show Playlist 🎵"}
              </Button>
            </div>
          </div>

          {/* Playlist */}
          {showPlaylist && (
            <div className="border-t-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="p-6">
                <h4 className="text-xl font-bold text-purple-700 mb-4 text-center"
                    style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Birthday Songs Playlist 🎶
                </h4>
                <div className="space-y-2">
                  {songs.map((song, index) => (
                    <button
                      key={song.id}
                      onClick={() => selectSong(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        index === currentSong
                          ? 'bg-purple-200 border-2 border-purple-400 shadow-md'
                          : 'bg-white bg-opacity-60 hover:bg-purple-100 border border-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{song.emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-purple-800"
                               style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {song.title}
                          </div>
                          <div className="text-sm text-purple-600"
                               style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {song.artist}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600"
                             style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {song.duration}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Music Note Animation */}
        {isPlaying && (
          <div className="flex justify-center mt-8 space-x-4">
            <div className="text-3xl animate-bounce">🎵</div>
            <div className="text-3xl animate-bounce animation-delay-200">🎶</div>
            <div className="text-3xl animate-bounce animation-delay-400">🎵</div>
          </div>
        )}

        {/* Demo Notice */}
        {isDemo && (
          <div className="text-center mt-8">
            <Card className="bg-yellow-50 border-2 border-yellow-200 shadow-lg">
              <div className="p-4">
                <p className="text-sm text-yellow-800 font-medium"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  🎵 This is a demo music player for the birthday celebration website! 
                  In a real implementation, you would add actual audio files.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}