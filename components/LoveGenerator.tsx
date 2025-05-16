"use client";

import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { AudioContext } from "./AudioController";
import { usePersonalization } from "@/contexts/personalization";

// Enhanced love messages with AI-generated content
const loveMessages = [
  "You're my favorite {{flower}} bloom!",
  "Every beat of my heart is a high score for you, my princess!",
  "You're my favorite plot twist, my soul!",
  "Level up our love every day, my cutie patootie.",
  "You make my heart pixel-perfect, my moon!",
  "You've unlocked the ultimate achievement: my heart.",
  "Player 2 has entered the game of my life!",
  "Together we're the ultimate power-up combo, my pretty girl.",
  "I'd choose you in every game, every time.",
  "You've captured all the bonus hearts in my world, my strawberry.",
  "Our story is my favorite save file, my baby.",
  "Your smile illuminates my world like a thousand stars, my love.",
  "In the game of life, you're my perfect player two, habibi.",
  "Every moment with you feels like winning the ultimate prize.",
  "Your love is the power-up that makes my heart soar.",
  "You're the missing piece that makes my world complete.",
  "Like a rare achievement, your love is precious and unique.",
  "In this vast game world, you're my favorite destination.",
  "Your love gives me infinite lives and endless joy.",
  "Together, we're writing the most beautiful love story ever coded.",
  "You're the cheat code to unlimited happiness in my life.",
  "Every level is better with you by my side, my angel.",
  "Your love is the ultimate combo move that defeats all sadness.",
  "In the arcade of life, you're my highest score.",
  "Loading... infinite love for my precious princess.",
  "You're the easter egg that made my life extraordinary.",
  "Game developers couldn't design a love as perfect as ours.",
  "Your love is the legendary item I'll treasure forever.",
  "In every save file of my life, you're the main character.",
  "Our love story is my favorite open-world adventure.",
];

export const LoveGenerator = () => {
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { playSound } = useContext(AudioContext);
  const { favoriteFlower } = usePersonalization();
  
  const generateMessage = () => {
    setIsGenerating(true);
    playSound("click");
    
    let newMessage: string;
    do {
      newMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    } while (newMessage === message && loveMessages.length > 1);

    newMessage = newMessage.replace("{{flower}}", favoriteFlower);
    
    setTimeout(() => {
      setMessage(newMessage);
      setIsGenerating(false);
      playSound("success");
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9FF3', '#FFDFD3', '#A0F1EA', '#D8B5FF', '#FFF0AA']
      });
    }, 1000);
  };

  return (
    <div className="w-full py-16 flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl md:text-4xl font-pixel text-center mb-8 text-shadow-glow text-primary">
        Random Love Generator
      </h2>
      
      <motion.div
        className="w-full max-w-lg h-48 bg-card rounded-xl p-6 mb-8 flex items-center justify-center text-center relative pixel-border overflow-hidden interactive-element"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-primary"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <p className="mt-3 font-pixel text-muted-foreground">Generating love...</p>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              {message ? (
                <p className="font-script text-2xl text-foreground">
                  "{message}"
                </p>
              ) : (
                <p className="text-muted-foreground font-pixel">
                  Hit the button for a love boost!
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.button
        onClick={generateMessage}
        disabled={isGenerating}
        className="bg-accent text-accent-foreground font-pixel py-3 px-8 rounded-md shadow-lg flex items-center gap-2 neon-glow interactive-element"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart className="w-5 h-5" />
        <span>Gimme a Love Boost!</span>
      </motion.button>
    </div>
  );
};