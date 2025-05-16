"use client";

import { useEffect, useRef } from "react";

interface UseTripleClickOptions {
  element: HTMLElement | null;
  onTripleClick: () => void;
  delay?: number;
}

export const useTripleClick = ({
  element,
  onTripleClick,
  delay = 500,
}: UseTripleClickOptions) => {
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!element) return;

    const handleClick = () => {
      clickCount.current += 1;

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      if (clickCount.current === 3) {
        onTripleClick();
        clickCount.current = 0;
      } else {
        clickTimer.current = setTimeout(() => {
          clickCount.current = 0;
        }, delay);
      }
    };

    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("click", handleClick);
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [element, onTripleClick, delay]);
};