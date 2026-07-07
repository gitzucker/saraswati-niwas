"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LottieWrapper.module.css";

export default function LottieWrapper({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  playOnHover = false,
  playOnScroll = false,
  fallback = null
}) {
  const containerRef = useRef(null);
  const [Lottie, setLottie] = useState(null);
  const [lottieInstance, setLottieInstance] = useState(null);

  // Lazy-load lottie-react on client side
  useEffect(() => {
    import("lottie-react").then((module) => {
      setLottie(() => module.default);
    }).catch(err => console.error("Lottie failed to load", err));
  }, []);

  useEffect(() => {
    if (!Lottie || !containerRef.current || !animationData) return;

    // Intersection observer for playOnScroll
    let observer;
    if (playOnScroll) {
      observer = new IntersectionObserver(([entry]) => {
        if (lottieInstance) {
          if (entry.isIntersecting) {
            lottieInstance.play();
          } else {
            lottieInstance.pause();
          }
        }
      }, { threshold: 0.1 });
      
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [Lottie, playOnScroll, lottieInstance, animationData]);

  if (!animationData) {
    return fallback || <div className={`${styles.placeholder} ${className}`} />;
  }

  if (!Lottie) {
    return fallback || <div className={`${styles.loading} ${className}`} />;
  }

  const handleMouseEnter = () => {
    if (playOnHover && lottieInstance) {
      lottieInstance.play();
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && lottieInstance) {
      lottieInstance.stop();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={!playOnHover && autoplay}
        lottieRef={(instance) => setLottieInstance(instance)}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
