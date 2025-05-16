"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AudioContext } from "./AudioController";

interface ArcadeLobbyProps {
  onStart: () => void;
}

export const ArcadeLobby: React.FC<ArcadeLobbyProps> = ({ onStart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { playSound } = useContext(AudioContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    playSound("coin");
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* VHS tracking effect that fades out */}
      <motion.div
        className="absolute inset-0 bg-black/50 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="w-full h-full bg-black/70">
          <div className="absolute inset-0 opacity-80">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[2px] bg-white/20"
                initial={{ y: -100 }}
                animate={{ y: [null, 1000] }}
                transition={{
                  duration: 0.2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5,
                }}
                style={{ top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="z-20 flex flex-col items-center justify-center gap-12 px-4 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="relative">
          <Sparkles className="absolute -top-8 -left-8 text-accent w-8 h-8 animate-pulse-slow" />
          <Sparkles className="absolute -top-8 -right-8 text-secondary w-8 h-8 animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
          
          <h1 className="text-4xl md:text-6xl font-pixel font-bold text-gradient animate-pulse-slow">
            HEARTBEATS
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-pixel font-bold text-primary mt-4">
            A Love Story
          </h2>
          
          <div className="mt-4 font-pixel text-xl text-accent animate-blink">
            ★ Our Journey ★
          </div>
          
          <Sparkles className="absolute -bottom-8 -left-8 text-primary w-8 h-8 animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <Sparkles className="absolute -bottom-8 -right-8 text-accent w-8 h-8 animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>

        <motion.button
          onClick={handleStart}
          className="font-pixel text-2xl bg-primary text-primary-foreground py-3 px-8 rounded-md shadow-lg neon-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Start Our Adventure ♥
        </motion.button>

        <div className="text-muted-foreground font-pixel text-sm animate-blink">
          INSERT COIN TO PLAY
        </div>
      </motion.div>
    </motion.div>
  );
};