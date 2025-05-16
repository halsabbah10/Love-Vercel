"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { AudioContext } from "./AudioController";
import { usePersonalization } from "@/contexts/personalization";

interface LoveLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ isOpen, onClose }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const { playSound } = useContext(AudioContext);
  const { insideJoke } = usePersonalization();
  
  const loveLetterText = `
    My Soul's Soul,

    Discovering you feels like unlocking the ultimate secret level—full of wonder, warmth, and infinite replay value.

    When we first met, I couldn't have predicted this amazing adventure we'd start together. Your smile is my power-up, your laugh my favorite sound effect, and your heart the greatest prize I could ever win.

    Remember when you ${insideJoke}? I smile just thinking about it. These little moments make our story unique and special.

    I've created this little digital arcade of memories and promises because I wanted to give you something as unique and special as you are to me. Each section represents a piece of what makes us "us"—our past moments, our inside jokes, and all the exciting levels we have yet to explore together.

    Every day with you feels like hitting the high score in life. I can't wait to see what bonus rounds are in store for us.

    Ready for our next adventure?

    With all my heart,
    Husam
  `;

  useEffect(() => {
    if (isOpen && typingIndex < loveLetterText.length) {
      const typingTimer = setTimeout(() => {
        setTypingIndex(typingIndex + 1);
        
        if (typingIndex % 3 === 0) {
          playSound("type");
        }
      }, 30);
      
      return () => clearTimeout(typingTimer);
    }
  }, [isOpen, typingIndex, loveLetterText.length, playSound]);

  useEffect(() => {
    if (!isOpen) {
      setTypingIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card max-w-2xl w-full p-8 rounded-xl relative overflow-y-auto max-h-[80vh] interactive-element"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground interactive-element"
              aria-label="Close letter"
            >
              ✕
            </button>
            
            <div className="mb-6 text-center">
              <Heart className="inline-block w-6 h-6 text-primary animate-pulse-slow" />
              <h2 className="text-2xl font-pixel neon-text mt-2">Secret Love Letter</h2>
            </div>
            
            <div className="font-script text-lg text-foreground whitespace-pre-line leading-relaxed">
              {loveLetterText.slice(0, typingIndex)}
              <span className="inline-block w-2 h-4 bg-primary animate-blink ml-1"></span>
            </div>
            
            {typingIndex >= loveLetterText.length && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={onClose}
                  className="font-pixel bg-primary text-primary-foreground py-2 px-6 rounded-md inline-flex items-center gap-2 interactive-element"
                >
                  <Heart className="w-4 h-4" />
                  <span>Close Letter</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};