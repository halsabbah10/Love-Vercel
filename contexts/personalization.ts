'use client';

import { createContext, useContext } from 'react';

export interface PersonalizationConfig {
  favoriteFlower: string;
  dreamDateIdea: string;
  insideJoke: string;
  nickname: string;
  emoji: string;
}

export const defaultConfig: PersonalizationConfig = {
  favoriteFlower: "",
  dreamDateIdea: "",
  insideJoke: "",
  nickname: "",
  emoji: "💗"
};

export const PersonalizationContext = createContext<PersonalizationConfig>(defaultConfig);

export const usePersonalization = () => {
  return useContext(PersonalizationContext);
};