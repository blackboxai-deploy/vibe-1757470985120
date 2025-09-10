"use client";

import { useEffect } from "react";
import { useConfetti } from "@/hooks/use-confetti";

interface ConfettiAnimationProps {
  trigger?: boolean;
  className?: string;
}

export function ConfettiAnimation({ trigger = false, className = "" }: ConfettiAnimationProps) {
  const { particles, triggerConfetti, canvasRef } = useConfetti();

  useEffect(() => {
    if (trigger) {
      triggerConfetti();
    }
  }, [trigger, triggerConfetti]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        
        ctx.restore();
      });
    };

    draw();
  }, [particles, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
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