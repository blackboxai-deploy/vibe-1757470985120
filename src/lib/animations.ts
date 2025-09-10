export const confettiColors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b",
  "#eb4d4b", "#6c5ce7", "#a29bfe", "#fd79a8", "#e84393",
  "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#fd79a8"
];

export const balloonColors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b",
  "#eb4d4b", "#6c5ce7", "#a29bfe", "#fd79a8", "#e84393"
];

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

export interface BalloonParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  bobOffset: number;
}

export const createConfettiParticle = (id: number, canvasWidth: number): ConfettiParticle => {
  return {
    id,
    x: Math.random() * canvasWidth,
    y: -10,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 5,
    size: Math.random() * 6 + 3
  };
};

export const createBalloonParticle = (id: number, canvasWidth: number, canvasHeight: number): BalloonParticle => {
  return {
    id,
    x: Math.random() * canvasWidth,
    y: canvasHeight + Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 1 - 0.5,
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    size: Math.random() * 20 + 15,
    bobOffset: Math.random() * Math.PI * 2
  };
};

export const updateConfettiParticle = (particle: ConfettiParticle): ConfettiParticle => {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    rotation: particle.rotation + particle.rotationSpeed,
    vy: particle.vy + 0.1 // gravity
  };
};

export const updateBalloonParticle = (particle: BalloonParticle, time: number): BalloonParticle => {
  return {
    ...particle,
    x: particle.x + particle.vx + Math.sin(time * 0.001 + particle.bobOffset) * 0.5,
    y: particle.y + particle.vy,
    bobOffset: particle.bobOffset + 0.01
  };
};

export const animationConfig = {
  confetti: {
    particleCount: 100,
    duration: 5000,
    spawnRate: 10
  },
  balloons: {
    particleCount: 15,
    duration: Infinity,
    spawnRate: 2
  },
  transitions: {
    cardFlip: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    bounce: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    smooth: "all 0.3s ease-in-out",
    slow: "all 0.5s ease-in-out"
  }
};