'use client';

import { motion } from 'framer-motion';
import { Heart, Star, MessageSquare, Gamepad, Music2 } from 'lucide-react';
import { usePersonalization } from '@/contexts/personalization';

export const BottomNav = () => {
  const { emoji } = usePersonalization();
  
  const navItems = [
    { icon: <Heart className="w-6 h-6" />, label: 'Love' },
    { icon: <Star className="w-6 h-6" />, label: 'Future' },
    { icon: <MessageSquare className="w-6 h-6" />, label: 'Notes' },
    { icon: <Gamepad className="w-6 h-6" />, label: 'Game' },
    { icon: <Music2 className="w-6 h-6" />, label: 'Music' },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border sm:hidden z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="flex justify-around items-center p-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item.icon}
            <span className="text-xs font-pixel">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};