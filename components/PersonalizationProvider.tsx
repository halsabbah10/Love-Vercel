'use client';

import { PersonalizationContext } from "@/contexts/personalization";
import personalizationConfig from "@/config/personalization.json";

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  // Check if personalization values are missing
  const missingValues = Object.entries(personalizationConfig)
    .filter(([key, value]) => key !== "emoji" && !value)
    .map(([key]) => key);

  if (missingValues.length > 0) {
    console.warn(`Missing personalization values: ${missingValues.join(", ")}`);
  }

  return (
    <PersonalizationContext.Provider value={personalizationConfig}>
      {children}
    </PersonalizationContext.Provider>
  );
}