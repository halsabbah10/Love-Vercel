"use client";

import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { AudioContext } from "./AudioController";
import { usePersonalization } from "@/contexts/personalization";

interface GuestMessage {
  id: number;
  name: string;
  message: string;
  color: string;
}

const colors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-foreground",
];

export const Guestbook = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { playSound } = useContext(AudioContext);
  const { nickname } = usePersonalization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && message.trim()) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setMessages([
        ...messages,
        { 
          id: Date.now(), 
          name: name.trim(), 
          message: message.trim(), 
          color 
        },
      ]);
      
      playSound("type");
      setName("");
      setMessage("");
      setShowForm(false);
    }
  };

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-2xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-pixel text-center mb-4 text-shadow-glow text-primary">
          Love Notes for My Heart
        </h2>
        
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm">
            Leave a sweet message to brighten her day!
          </p>
        </div>
        
        <div className="h-16 bg-muted/30 rounded-lg mb-6 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full whitespace-nowrap">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    className={`inline-block px-4 py-2 mx-2 rounded-md bg-card/50 ${msg.color}`}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ 
                      x: "-100%", 
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: 15,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatDelay: messages.length * 2.5
                    }}
                  >
                    <span className="font-bold">{msg.name}:</span> {msg.message}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={() => {
            setShowForm(!showForm);
            playSound("click");
          }}
          className="flex items-center gap-2 mx-auto bg-secondary text-secondary-foreground font-pixel py-2 px-4 rounded-md interactive-element"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{showForm ? "Hide Form" : "Add Message"}</span>
        </motion.button>
        
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <form onSubmit={handleSubmit} className="bg-card p-4 rounded-lg pixel-border">
                <div className="mb-3">
                  <label htmlFor="name" className="block text-sm font-pixel mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                    className="w-full p-2 rounded bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary interactive-element"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-pixel mb-1">
                    Your Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={50}
                    className="w-full p-2 rounded bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary interactive-element"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-pixel py-2 rounded flex items-center justify-center gap-2 interactive-element"
                >
                  <SendHorizontal className="w-4 h-4" />
                  <span>Send Love</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};