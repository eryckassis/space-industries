"use client";

import { useState, useEffect } from "react";
import { PreloaderProps } from "@/lib/types";
import { PRELOADER_TIMING } from "@/lib/constants";

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Aguardar 500ms antes de chamar onComplete
          setTimeout(() => {
            onComplete?.();
          }, PRELOADER_TIMING.fadeOutDelay);
          return 100;
        }
        return prev + 1;
      });
    }, PRELOADER_TIMING.counterInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="preloader show" id="preloader">
      <span id="counter">[{count.toString().padStart(3, "0")}]</span>
    </div>
  );
}
