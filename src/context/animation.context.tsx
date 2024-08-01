// src/contexts/AnimationContext.tsx
import React, { createContext, useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface AnimationContextType {
  timeline: gsap.core.Timeline;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const timeline = useRef(
    gsap.timeline({ paused: true, ease: "power2.inOut" })
  );

  useEffect(() => {
    // Start the timeline when the component mounts
    timeline.current.play();
  }, []);

  return (
    <AnimationContext.Provider value={{ timeline: timeline.current }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
