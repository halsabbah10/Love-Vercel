"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { TowerControl as GameController, Heart, Calendar, Sparkles } from "lucide-react";
import { AudioContext } from "./AudioController";
import { usePersonalization } from "@/contexts/personalization";

export const FutureLevels = () => {
  const { playSound } = useContext(AudioContext);
  const { dreamDateIdea, nickname } = usePersonalization();
  
  const dateIdeas = [
    {
      title: "Sunrise Picnic",
      icon: <Calendar className="w-6 h-6 text-primary-foreground" />,
      description: `Level 1: Sunrise Picnic with my ${nickname} – Can't wait to chase the sunrise and your smile.`,
    },
    {
      title: "Dream Date",
      icon: <GameController className="w-6 h-6 text-primary-foreground" />,
      description: `Level 2: ${dreamDateIdea} with my ${nickname} 💗`,
    },
    {
      title: "Beach Day",
      icon: <Sparkles className="w-6 h-6 text-primary-foreground" />,
      description: `Level 3: Beach Day with ${nickname} – Sand, sun, and endless giggles ahead!`,
    },
    {
      title: "Stargazing",
      icon: <Heart className="w-6 h-6 text-primary-foreground" />,
      description: `Level 4: Stargazing with my ${nickname} – I'll map constellations on your smile under the night sky.`,
    },
  ];

  const handleHover = () => {
    playSound("click");
  };

  return (
    <div className="w-full py-16">
      <h2 className="text-3xl md:text-4xl font-pixel text-center mb-8 text-shadow-glow text-primary">
        Future Levels Roadmap
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10 max-w-7xl mx-auto">
        {dateIdeas.map((date, index) => (
          <motion.div
            key={index}
            className="game-cartridge will-change-transform perspective-1000"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.3,
              ease: "easeOut"
            }}
            onMouseEnter={handleHover}
          >
            <motion.div 
              className="cartridge-inner h-64 will-change-transform"
              initial={false}
              animate={{ rotateY: 0 }}
              whileHover={{ rotateY: 180 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <div className="cartridge-front absolute w-full h-full bg-card rounded-lg p-4 flex flex-col items-center justify-center text-center backface-hidden transform-gpu">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  {date.icon}
                </div>
                <h3 className="text-xl font-pixel mb-2">{date.title}</h3>
                <div className="text-sm text-muted-foreground">
                  Insert to play Level {index + 1}
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  * Hover to view mission details *
                </div>
                <div className="pixel-heart mt-4 animate-pulse-slow"></div>
              </div>
              
              <div className="cartridge-back absolute w-full h-full bg-muted rounded-lg p-6 flex flex-col items-center justify-center text-center backface-hidden transform-gpu" style={{ transform: 'rotateY(180deg)' }}>
                <p className="font-script text-xl text-foreground">
                  {date.description}
                </p>
                <div className="mt-4 flex space-x-2 justify-center">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};