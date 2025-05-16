"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Heart } from "lucide-react";
import { AudioContext } from "./AudioController";

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface Compliment {
  id: number;
  text: string;
  x: number;
  y: number;
}

const compliments = [
  "Great shot! 💘",
  "Bullseye! 💝",
  "Perfect aim! 💖",
  "You're amazing! 💗",
  "Love expert! 💓",
  "Heart hunter! 💕",
  "Love master! 💞",
  "Fantastic! ❤️",
  "Incredible! 💝",
  "Spectacular! 💖",
];

export const MiniGame = () => {
  const [gameActive, setGameActive] = useState(false);
  const [playerX, setPlayerX] = useState(50);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [arrows, setArrows] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [complimentToasts, setComplimentToasts] = useState<Compliment[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const heartSpawnTimerRef = useRef<NodeJS.Timeout>();
  const lastArrowTimeRef = useRef<number>(0);
  const { playSound } = useContext(AudioContext);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("loveQuestHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("loveQuestHighScore", score.toString());
    }
  }, [score, highScore]);

  const startGame = () => {
    playSound("coin");
    setGameActive(true);
    setScore(0);
    setHearts([]);
    setArrows([]);
    setComplimentToasts([]);
    spawnHearts();
    animate();
  };

  const endGame = () => {
    setGameActive(false);
    if (heartSpawnTimerRef.current) {
      clearInterval(heartSpawnTimerRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const spawnHearts = () => {
    heartSpawnTimerRef.current = setInterval(() => {
      if (!gameAreaRef.current) return;
      
      const width = gameAreaRef.current.clientWidth;
      setHearts(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * (width - 30),
          y: -30,
          speed: 1 + Math.random() * 2,
        },
      ]);
    }, 1000);
  };

  const shootArrow = (x: number) => {
    const now = Date.now();
    if (now - lastArrowTimeRef.current < 300) return;
    
    lastArrowTimeRef.current = now;
    if (!gameAreaRef.current) return;
    
    playSound("click");
    setArrows(prev => [
      ...prev,
      { x, y: gameAreaRef.current?.clientHeight || 300 },
    ]);
  };

  const checkCollisions = () => {
    if (!gameAreaRef.current) return;
    
    const gameHeight = gameAreaRef.current.clientHeight;
    
    setHearts(prev => 
      prev
        .map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
        }))
        .filter(heart => heart.y < gameHeight + 30)
    );
    
    setArrows(prev => 
      prev
        .map(arrow => ({
          ...arrow,
          y: arrow.y - 5,
        }))
        .filter(arrow => arrow.y > -30)
    );
    
    let updatedHearts = [...hearts];
    let hitFound = false;
    
    arrows.forEach(arrow => {
      if (hitFound) return;
      
      const hitHeartIndex = updatedHearts.findIndex(
        heart => 
          Math.abs(heart.x - arrow.x) < 20 && 
          Math.abs(heart.y - arrow.y) < 20
      );
      
      if (hitHeartIndex >= 0) {
        hitFound = true;
        const heartX = updatedHearts[hitHeartIndex].x;
        const heartY = updatedHearts[hitHeartIndex].y;
        
        updatedHearts = [
          ...updatedHearts.slice(0, hitHeartIndex),
          ...updatedHearts.slice(hitHeartIndex + 1),
        ];
        
        setArrows(prev => 
          prev.filter(a => a.x !== arrow.x || a.y !== arrow.y)
        );
        
        setScore(prev => prev + 1);
        playSound("pop");
        
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        setComplimentToasts(prev => [
          ...prev,
          {
            id: Date.now(),
            text: compliment,
            x: heartX,
            y: heartY,
          },
        ]);
        
        setTimeout(() => {
          setComplimentToasts(prev => 
            prev.filter(toast => toast.x !== heartX || toast.y !== heartY)
          );
        }, 1000);
      }
    });
    
    if (hitFound) {
      setHearts(updatedHearts);
    }
  };

  const animate = () => {
    checkCollisions();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameAreaRef.current || !gameActive) return;
    
    const gameArea = gameAreaRef.current;
    const gameRect = gameArea.getBoundingClientRect();
    
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    let newX = clientX - gameRect.left;
    newX = Math.max(15, Math.min(newX, gameRect.width - 15));
    
    setPlayerX(newX);
  };

  const handleShoot = () => {
    if (gameActive) {
      shootArrow(playerX);
    }
  };

  useEffect(() => {
    return () => {
      if (heartSpawnTimerRef.current) {
        clearInterval(heartSpawnTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full py-16 px-4">
      <h2 className="title-large text-center mb-8">
        Mini Love-Quest Game
      </h2>
      
      <div 
        ref={gameAreaRef}
        className="w-full max-w-lg h-80 bg-card/30 backdrop-blur-sm rounded-xl mx-auto relative overflow-hidden border border-primary/20"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onClick={handleShoot}
      >
        {gameActive ? (
          <>
            {hearts.map(heart => (
              <motion.div
                key={heart.id}
                className="absolute"
                style={{ left: heart.x, top: heart.y }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="pixel-heart"></div>
              </motion.div>
            ))}
            
            {arrows.map((arrow, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-6 bg-accent"
                style={{ left: arrow.x, top: arrow.y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ))}
            
            <motion.div
              className="absolute bottom-0 w-10 h-10 flex items-center justify-center"
              style={{ left: playerX - 20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
            </motion.div>
            
            <AnimatePresence>
              {complimentToasts.map(toast => (
                <motion.div
                  key={toast.id}
                  className="absolute text-accent font-pixel text-sm"
                  style={{ left: toast.x, top: toast.y }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -30 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {toast.text}
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="absolute top-2 left-2 bg-card/80 backdrop-blur-sm py-1 px-3 rounded-full font-pixel text-sm">
              Score: {score}
            </div>
            
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-pixel">
              Click/tap to shoot!
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              <span className="font-pixel text-lg">High Score: {highScore}</span>
            </div>
            
            <motion.button
              onClick={startGame}
              className="font-pixel text-lg bg-primary text-primary-foreground py-2 px-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
            
            <p className="mt-6 text-center text-sm text-muted-foreground max-w-xs px-4">
              Move with your mouse/finger and click/tap to shoot arrows at the falling hearts!
            </p>
          </div>
        )}
      </div>
      
      {gameActive && (
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={handleShoot}
            className="font-pixel bg-accent text-accent-foreground py-2 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shoot
          </motion.button>
          
          <motion.button
            onClick={endGame}
            className="font-pixel bg-muted text-foreground py-2 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            End Game
          </motion.button>
        </div>
      )}
    </div>
  );
};