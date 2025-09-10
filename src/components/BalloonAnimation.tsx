"use client";

import { useState, useEffect, useRef } from "react";
import { BalloonParticle, createBalloonParticle, updateBalloonParticle } from "@/lib/animations";

interface BalloonAnimationProps {
  className?: string;
}

export function BalloonAnimation({ className = "" }: BalloonAnimationProps) {
  const [balloons, setBalloons] = useState<BalloonParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const balloonIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = (currentTime: number) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Spawn new balloons occasionally
      if (currentTime - lastSpawnRef.current > 3000 && balloons.length < 8) {
        lastSpawnRef.current = currentTime;
        setBalloons(prev => [
          ...prev,
          createBalloonParticle(balloonIdRef.current++, canvasWidth, canvasHeight)
        ]);
      }

      // Update existing balloons
      setBalloons(prevBalloons => 
        prevBalloons
          .map(balloon => updateBalloonParticle(balloon, currentTime))
          .filter(balloon => balloon.y > -balloon.size - 50)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [balloons.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      balloons.forEach(balloon => {
        // Draw balloon
        ctx.fillStyle = balloon.color;
        ctx.beginPath();
        ctx.ellipse(balloon.x, balloon.y, balloon.size * 0.7, balloon.size, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Draw balloon string
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y + balloon.size);
        ctx.lineTo(balloon.x, balloon.y + balloon.size + 40);
        ctx.stroke();

        // Draw balloon highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(
          balloon.x - balloon.size * 0.2, 
          balloon.y - balloon.size * 0.3, 
          balloon.size * 0.2, 
          balloon.size * 0.4, 
          0, 0, 2 * Math.PI
        );
        ctx.fill();
      });
    };

    draw();
  }, [balloons]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  );
}