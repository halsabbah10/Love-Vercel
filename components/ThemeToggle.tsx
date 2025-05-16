"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "pastel" : "dark")}
      className="fixed top-4 left-4 z-50 w-12 h-12 bg-card/80 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg border border-primary/20 hover:border-primary/40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-primary animate-pulse-slow" />
          ) : (
            <Moon className="w-6 h-6 text-primary animate-pulse-slow" />
          )}
          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full -z-10" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}