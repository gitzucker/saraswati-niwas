"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ScrollReveal({
  children,
  animation = "fadeUp", // fadeUp, fadeIn, slideLeft, slideRight, scaleUp
  delay = 0, // ms
  duration = 600, // ms
  threshold = 0.1,
  triggerOnce = true,
  className = ""
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, triggerOnce });

  const style = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationFillMode: "both",
  };

  const getAnimationClass = () => {
    if (!isVisible) return "";
    switch (animation) {
      case "fadeUp":
        return "animate-fade-up";
      case "fadeIn":
        return "animate-fade-in";
      case "slideLeft":
        return "animate-slide-left";
      case "slideRight":
        return "animate-slide-right";
      case "scaleUp":
        return "animate-scale-up";
      default:
        return "animate-fade-up";
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClass()}`}
      style={style}
    >
      {children}
    </div>
  );
}
