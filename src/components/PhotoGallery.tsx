"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
}

const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5a8e2875-3d39-483d-af26-ab3926a3f0f4.png",
    alt: "Birthday Memory 1 - Beautiful celebration moments",
    caption: "Amazing birthday celebration! 🎉"
  },
  {
    id: 2,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e05ce29e-a514-43a9-8c34-6afcb4adadfa.png",
    alt: "Happy Times 2 - Joyful friends gathering",
    caption: "Great times with friends! 👥"
  },
  {
    id: 3,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a59f844-43cf-4592-b21a-cdcbf0949c66.png",
    alt: "Special Moment 3 - Birthday cake celebration",
    caption: "The perfect birthday cake! 🎂"
  },
  {
    id: 4,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70e02e69-f568-4479-974d-994456cfd5b6.png",
    alt: "Fun Times 4 - Party games and laughter",
    caption: "Fun and games all day! 🎮"
  },
  {
    id: 5,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b3aaeb8-8a09-4edd-bcbe-e18d3045ff7c.png",
    alt: "Memory Lane 5 - Precious birthday moments",
    caption: "Precious memories made! 💖"
  },
  {
    id: 6,
    src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e4e5efea-27b0-487d-8c8c-6a1a3c954634.png",
    alt: "Celebration 6 - Festive birthday decorations",
    caption: "Beautiful decorations! 🎈"
  }
];

export function PhotoGallery({ photos = defaultPhotos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6 animate-pulse"
              style={{ fontFamily: 'Dancing Script, cursive' }}>
            Birthday Memories 📸
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            A collection of beautiful moments and memories from this special day! 
            Click on any photo to view it in full size.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <Card 
              key={photo.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden bg-white"
              onClick={() => openLightbox(photo, index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.backgroundColor = '#f3f4f6';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.alt = '📷 Photo loading...';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium">Click to view</p>
                  </div>
                </div>
              </div>
              {photo.caption && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 font-medium text-center"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {photo.caption}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Add More Photos Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            📱 Share Your Photos Too!
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation Buttons */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3"
            >
              ←
            </Button>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3"
            >
              →
            </Button>
            
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3"
            >
              ✕
            </Button>

            {/* Photo Caption */}
            {selectedPhoto.caption && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-6 py-3 rounded-full">
                <p className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {selectedPhoto.caption}
                </p>
              </div>
            )}

            {/* Photo Counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full">
              <p className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {currentIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}