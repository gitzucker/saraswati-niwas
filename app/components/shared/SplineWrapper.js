"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import styles from "./SplineWrapper.module.css";
import ErrorBoundary from "./ErrorBoundary";

export default function SplineWrapper({
  sceneUrl,
  fallbackImage = "/images/hero/hero-hostel.png",
  className = "",
  aspectRatio = "16/9"
}) {
  const [Spline, setSpline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // Lazy-load Spline on mount to avoid server-side errors
  useEffect(() => {
    import("@splinetool/react-spline")
      .then((module) => {
        setSpline(() => module.default);
      })
      .catch((err) => {
        console.error("Spline package load error:", err);
        setHasError(true);
        setLoading(false);
      });
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (e) => {
    console.error("Spline scene loading error:", e);
    setHasError(true);
    setLoading(false);
  };

  const fallbackView = (
    <div className={styles.fallback}>
      <Image
        src={fallbackImage}
        alt="3D Scene Fallback View"
        fill
        className={styles.fallbackImg}
        priority
      />
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ aspectRatio }}
    >
      {fallbackView}
    </div>
  );
}
