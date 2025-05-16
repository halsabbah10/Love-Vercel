"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const sounds = {
  coin: "/sounds/coin.mp3",
  click: "/sounds/click.mp3",
  pop: "/sounds/pop.mp3",
  success: "/sounds/success.mp3",
  type: "/sounds/type.mp3",
  music: "/sounds/bgmusic.mp3",
};

export const AudioContext = React.createContext<{
  playSound: (sound: keyof typeof sounds) => void;
}>({
  playSound: () => {},
});

export const AudioController = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload all audio files
    Object.entries(sounds).forEach(([key, src]) => {
      if (key === "music") {
        const audio = new Audio();
        audio.src = src;
        audio.loop = true;
        audio.volume = 0.3;
        musicRef.current = audio;
      } else {
        const audio = new Audio();
        audio.src = src;
        audio.volume = 0.5;
        audioRefs.current[key] = audio;
      }
    });

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      if (isMuted) {
        musicRef.current.pause();
      } else {
        musicRef.current.play().catch((e) => {
          console.log("Audio playback failed:", e);
        });
      }
    }
  }, [isMuted]);

  const playSound = (sound: keyof typeof sounds) => {
    if (isMuted || !audioRefs.current[sound]) return;
    
    const audio = audioRefs.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => {
        console.log("Audio playback failed:", e);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AudioContext.Provider value={{ playSound }}>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 bg-card rounded-full flex items-center justify-center neon-glow transition-all duration-300 hover:scale-110"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-primary" />
          ) : (
            <Volume2 className="w-6 h-6 text-primary animate-pulse-slow" />
          )}
        </button>
      </div>
    </AudioContext.Provider>
  );
};