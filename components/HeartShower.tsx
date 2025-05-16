import React, { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioContext } from "./AudioController";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
}

const colors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-foreground",
];

// Enhanced love words with more variety and AI-generated compliments
const loveWords = [
  "My Heart",
  "My Soul",
  "My Love",
  "Princess",
  "Beautiful",
  "Stunning",
  "Adorable", 
  "Precious",
  "Sunshine",
  "Star",
  "Lovely",
  "Amazing",
  "Perfect",
  "Wonderful",
  "Enchanting",
  "Radiant",
  "Mesmerizing",
  "Magical",
  "Ethereal",
  "Divine",
  "Angelic",
  "Dreamy",
  "Charming",
  "Graceful",
  "Elegant",
  "Dazzling",
  "Captivating",
  "Alluring",
  "Delightful",
  "Magnificent",
  "Extraordinary",
  "Phenomenal",
  "Spectacular",
  "Brilliant",
  "Glowing",
  "Luminous",
  "Resplendent",
  "Sublime",
  "Exquisite",
  "Heavenly",
];

export const HeartShower = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [instruction, setInstruction] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const { playSound } = useContext(AudioContext);

  const createHeart = (x: number, y: number) => {
    if (!containerRef.current) return;
    
    const word = loveWords[Math.floor(Math.random() * loveWords.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    playSound("pop");
    
    setHearts(prev => [
      ...prev,
      {
        id: nextId.current++,
        x,
        y,
        word,
        color,
      }
    ]);

    if (instruction) {
      setInstruction(false);
    }
  };

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    const clientY = 'touches' in e 
      ? e.touches[0].clientY 
      : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    createHeart(x, y);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-60 md:h-80 bg-card/30 backdrop-blur-sm rounded-xl relative overflow-hidden mt-16 interactive-element border border-primary/20"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <AnimatePresence>
        {instruction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <p className="font-pixel text-muted-foreground text-center px-4">
              Click or tap anywhere to create hearts with sweet words!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none flex flex-col items-center"
            initial={{ 
              x: heart.x,
              y: heart.y,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              y: heart.y - 150,
              scale: 1,
              opacity: [0, 1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2,
              ease: "easeOut"
            }}
            style={{ 
              left: 0,
              top: 0,
              transform: `translate(${heart.x}px, ${heart.y}px)`
            }}
          >
            <div className="pixel-heart w-6 h-6" />
            <div className={`mt-2 font-script text-lg ${heart.color} text-shadow-glow`}>
              {heart.word}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};