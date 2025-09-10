"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Message {
  id: number;
  name: string;
  message: string;
  emoji: string;
  timestamp: Date;
}

interface MessageBoardProps {
  initialMessages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: 1,
    name: "Sarah",
    message: "Hope your birthday is as amazing as you are! Have the most wonderful day filled with love and laughter! 🎉",
    emoji: "💖",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: 2,
    name: "Mike",
    message: "Happy birthday! May this year bring you incredible adventures and beautiful moments. You deserve all the happiness! 🎊",
    emoji: "🌟",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  },
  {
    id: 3,
    name: "Emma",
    message: "Wishing you a fantastic birthday and an even better year ahead! Thanks for being such an amazing friend! 🎈",
    emoji: "🦄",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    id: 4,
    name: "David",
    message: "Happy birthday to someone who makes the world brighter just by being in it! Have an awesome celebration! 🎂",
    emoji: "☀️",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    id: 5,
    name: "Lisa",
    message: "On your special day, I wish you nothing but joy, love, and all your heart's desires! You're incredible! ✨",
    emoji: "💫",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  }
];

const availableEmojis = ["💖", "🌟", "🦄", "☀️", "💫", "🎉", "🎊", "🎈", "🎂", "✨", "🌈", "💝", "🔥", "💎", "🌸"];

export function MessageBoard({ initialMessages = defaultMessages }: MessageBoardProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState({ name: "", message: "", emoji: "💖" });
  const [showForm, setShowForm] = useState(false);

  const addMessage = () => {
    if (newMessage.name.trim() && newMessage.message.trim()) {
      const message: Message = {
        id: Date.now(),
        name: newMessage.name.trim(),
        message: newMessage.message.trim(),
        emoji: newMessage.emoji,
        timestamp: new Date()
      };
      
      setMessages([message, ...messages]);
      setNewMessage({ name: "", message: "", emoji: "💖" });
      setShowForm(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-orange-700 mb-6 animate-pulse"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Birthday Wishes 💌
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium mb-8"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sweet messages and warm wishes from friends and family! 
            Add your own message to make this day even more special.
          </p>

          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {showForm ? "Cancel" : "💝 Add Your Message"}
          </Button>
        </div>

        {/* Add Message Form */}
        {showForm && (
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm shadow-xl border-2 border-white mb-12 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-orange-700 mb-6 text-center"
                  style={{ fontFamily: 'Dancing Script, cursive' }}>
                Write Your Birthday Message ✍️
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Your Name
                  </label>
                  <Input
                    value={newMessage.name}
                    onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Your Message
                  </label>
                  <Textarea
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    placeholder="Write your birthday wishes here..."
                    rows={4}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-lg resize-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"
                         style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Choose an Emoji
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewMessage({ ...newMessage, emoji })}
                        className={`text-2xl p-2 rounded-lg transition-all duration-200 ${
                          newMessage.emoji === emoji 
                            ? 'bg-orange-200 scale-110 shadow-lg' 
                            : 'bg-gray-100 hover:bg-orange-100 hover:scale-105'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={addMessage}
                    disabled={!newMessage.name.trim() || !newMessage.message.trim()}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    🎉 Send Message
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-2 px-6 rounded-full"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Messages Display */}
        <div className="space-y-6">
          {messages.map((message) => (
            <Card key={message.id} className="bg-white bg-opacity-70 backdrop-blur-sm shadow-lg border border-white hover:shadow-xl transition-all duration-300 transform hover:scale-102 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {message.emoji}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-orange-700 text-lg"
                          style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {message.name}
                      </h4>
                      <span className="text-sm text-gray-500 font-medium"
                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed font-medium"
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative border animation */}
              <div className="h-1 bg-gradient-to-r from-orange-300 via-red-300 to-pink-300"></div>
            </Card>
          ))}
        </div>

        {/* Message Count */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 font-medium"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            💝 {messages.length} birthday {messages.length === 1 ? 'message' : 'messages'} and counting! 💝
          </p>
        </div>
      </div>
    </section>
  );
}