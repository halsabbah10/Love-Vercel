import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';

export const LovePoints = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    // Load points from localStorage
    const savedPoints = localStorage.getItem('lovePoints');
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  useEffect(() => {
    // Calculate level based on points
    const newLevel = Math.floor(points / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
    localStorage.setItem('lovePoints', points.toString());
  }, [points, level]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-card rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <Heart className="w-4 h-4 text-primary" />
          <span className="ml-2 font-pixel text-sm">{points}</span>
        </motion.div>
        
        <div className="w-px h-4 bg-border"></div>
        
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <Trophy className="w-4 h-4 text-accent" />
          <span className="ml-2 font-pixel text-sm">Lvl {level}</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-pixel text-sm flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Level Up!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};