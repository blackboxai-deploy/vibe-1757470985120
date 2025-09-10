"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ConfettiParticle, createConfettiParticle, updateConfettiParticle, animationConfig } from "@/lib/animations";

interface UseConfettiReturn {
  particles: ConfettiParticle[];
  triggerConfetti: () => void;
  isActive: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useConfetti(): UseConfettiReturn {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number | undefined>(undefined);
  const particleIdRef = useRef(0);

  const animate = useCallback((currentTime: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = currentTime;
    }

    const elapsed = currentTime - startTimeRef.current;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Update existing particles
    setParticles(prevParticles => {
      return prevParticles
        .map(updateConfettiParticle)
        .filter(particle => 
          particle.y < canvasHeight + 20 && 
          particle.x > -20 && 
          particle.x < canvasWidth + 20
        );
    });

    // Add new particles if within spawn duration
    if (elapsed < animationConfig.confetti.duration) {
      const particlesToAdd = Math.floor(elapsed / 100) - Math.floor((elapsed - 16) / 100);
      
      if (particlesToAdd > 0) {
        setParticles(prevParticles => {
          const newParticles = [];
          for (let i = 0; i < Math.min(particlesToAdd, animationConfig.confetti.spawnRate); i++) {
            newParticles.push(createConfettiParticle(particleIdRef.current++, canvasWidth));
          }
          return [...prevParticles, ...newParticles];
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Animation duration reached, just update existing particles
      setParticles(prevParticles => {
        const updatedParticles = prevParticles
          .map(updateConfettiParticle)
          .filter(particle => 
            particle.y < canvasHeight + 20 && 
            particle.x > -20 && 
            particle.x < canvasWidth + 20
          );

        if (updatedParticles.length === 0) {
          setIsActive(false);
        }

        return updatedParticles;
      });

      if (particles.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
  }, [particles.length]);

  const triggerConfetti = useCallback(() => {
    if (isActive) return;

    setIsActive(true);
    setParticles([]);
    startTimeRef.current = undefined;
    particleIdRef.current = 0;

    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, animate]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    particles,
    triggerConfetti,
    isActive,
    canvasRef,
  };
}