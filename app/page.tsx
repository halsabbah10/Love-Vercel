'use client';

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, Music, Flower } from "lucide-react";
import { useTripleClick } from "@/hooks/useTripleClick";

// Lazy load components
const ArcadeLobby = lazy(() => import("@/components/ArcadeLobby").then(mod => ({ default: mod.ArcadeLobby })));
const FutureLevels = lazy(() => import("@/components/FutureLevels").then(mod => ({ default: mod.FutureLevels })));
const LoveGenerator = lazy(() => import("@/components/LoveGenerator").then(mod => ({ default: mod.LoveGenerator })));
const HeartShower = lazy(() => import("@/components/HeartShower").then(mod => ({ default: mod.HeartShower })));
const Guestbook = lazy(() => import("@/components/Guestbook").then(mod => ({ default: mod.Guestbook })));
const MiniGame = lazy(() => import("@/components/MiniGame").then(mod => ({ default: mod.MiniGame })));
const LoveLetter = lazy(() => import("@/components/LoveLetter").then(mod => ({ default: mod.LoveLetter })));
const AudioController = lazy(() => import("@/components/AudioController").then(mod => ({ default: mod.AudioController })));
const LovePoints = lazy(() => import("@/components/LovePoints").then(mod => ({ default: mod.LovePoints })));
const Achievements = lazy(() => import("@/components/Achievements").then(mod => ({ default: mod.Achievements })));
const PoetryCorner = lazy(() => import("@/components/PoetryCorner").then(mod => ({ default: mod.PoetryCorner })));
const BottomNav = lazy(() => import("@/components/BottomNav").then(mod => ({ default: mod.BottomNav })));

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-primary font-pixel">Loading...</div>
  </div>
);

const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  
  useTripleClick({
    element: footerRef.current,
    onTripleClick: () => setShowLoveLetter(true),
  });

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        className="min-h-screen relative overflow-hidden"
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Enhanced background with parallax and noise */}
        <div className="magical-background">
          <div className="retro-noise" />
          <div className="parallax-layer parallax-layer-1">
            <div className="floating-elements">
              <Sparkles className="floating-element text-primary w-8 h-8" />
              <Heart className="floating-element text-secondary w-8 h-8" />
            </div>
          </div>
          <div className="parallax-layer parallax-layer-2">
            <div className="floating-elements">
              <Star className="floating-element text-accent w-8 h-8" />
              <Music className="floating-element text-primary w-8 h-8" />
            </div>
          </div>
          <div className="parallax-layer parallax-layer-3">
            <div className="floating-elements">
              <Flower className="floating-element text-secondary w-8 h-8" />
              <Flower className="floating-element text-accent w-8 h-8 rotate-45" />
            </div>
          </div>
        </div>
        
        {/* Retro effects */}
        <div className="scanlines"></div>
        <div className="vhs-tracking"></div>
        
        {/* Love Points System */}
        <Suspense fallback={<LoadingFallback />}>
          <LovePoints />
        </Suspense>
        
        {/* Audio controller */}
        <Suspense fallback={null}>
          <AudioController />
        </Suspense>
        
        {/* Bottom Navigation for Mobile */}
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
        
        {showIntro ? (
          <Suspense fallback={<LoadingFallback />}>
            <ArcadeLobby onStart={() => setShowIntro(false)} />
          </Suspense>
        ) : (
          <div className="content-container">
            <Suspense fallback={<LoadingFallback />}>
              <FutureLevels />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <PoetryCorner />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <LoveGenerator />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <HeartShower />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <Guestbook />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <MiniGame />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <Achievements />
            </Suspense>
            
            {/* Footer with easter egg */}
            <div 
              ref={footerRef}
              className="mt-20 text-center py-8 relative"
            >
              <div className="inline-flex items-center gap-2 cursor-pointer">
                <div className="pixel-heart w-3 h-3 animate-pulse-slow"></div>
                <span className="text-xs text-muted-foreground font-pixel">
                  Built with love for Merah
                </span>
                <div className="pixel-heart w-3 h-3 animate-pulse-slow"></div>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground/50">
                Discover all secrets to unlock your special surprise!
              </div>
            </div>
          </div>
        )}
        
        {/* Secret love letter modal */}
        <Suspense fallback={null}>
          <LoveLetter isOpen={showLoveLetter} onClose={() => setShowLoveLetter(false)} />
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}